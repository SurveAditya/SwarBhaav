const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/User");
const config = require("../config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isUser = require("../middlewares/isUser");
const Report = require("../models/Report");

//Text analysis setup
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const multer = require("multer");
const OpenAI = require("openai");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const sentimentApiOptions = {
    method: "POST",
    url: "https://text-sentiment.p.rapidapi.com/analyze",
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "text-sentiment.p.rapidapi.com",
    },
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const runPrompt = async (trimmedData, userID) => {
    const dateTimePattern = /(\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2})/g;

    const dateTimeMatches = trimmedData.match(dateTimePattern);

    const startDate = dateTimeMatches[0];
    const endDate = dateTimeMatches[dateTimeMatches.length - 1];

    const sentimentPrompt =
        "Please provide a comprehensive sentiment analysis report of the following chat conversation. Detect the overall sentiment and emotion of each speaker turn. Also identify any key topics, themes, opinions, attitudes, and arguments made by each speaker. Provide an objective analysis without any subjective judgment. Present the report in a clear, organized manner. It is important to only have one paragraph about each section";

    const wordListPrompt =
        "Please analyze the following paragraph and make a list of the top 4 single-word positive and negative words found in the text.";

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: sentimentPrompt },
                { role: "user", content: trimmedData },
            ],
            max_tokens: 1000,
        });

        const sentimentResponse = chatCompletion.choices[0].message.content;

        const wordListCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: wordListPrompt },
                { role: "user", content: trimmedData },
            ],
            max_tokens: 500, // Adjust max tokens as needed
        });

        const wordListResponse = wordListCompletion.choices[0].message.content;

        // Parse the wordListResponse into arrays of positive and negative words
        const positiveWords = [];
        const negativeWords = [];

        const lines = wordListResponse.split("\n");
        let isPositiveList = true;

        for (const line of lines) {
            if (
                line.startsWith("Positive words:") ||
                line.startsWith("Single-word positive words:")
            ) {
                isPositiveList = true;
            } else if (
                line.startsWith("Negative words:") ||
                line.startsWith("Single-word negative words:")
            ) {
                isPositiveList = false;
            } else if (line.trim() !== "") {
                if (isPositiveList) {
                    positiveWords.push(line.trim());
                } else {
                    negativeWords.push(line.trim());
                }
            }
        }

        const sentimentData = new URLSearchParams();
        sentimentData.set("text", trimmedData);

        const sentimentApiResponse = await axios.request({
            ...sentimentApiOptions,
            data: sentimentData,
        });

        const { pos_percent, neg_percent, mid_percent } =
            sentimentApiResponse.data;

        const sentimentType = "chat";
        const jsonResponse = {
            openai_response: sentimentResponse,
            sentiment_scores: {
                positive: pos_percent,
                negative: neg_percent,
                neutral: mid_percent,
            },
            positive_words: positiveWords,
            negative_words: negativeWords,
            start_date: startDate,
            end_date: endDate,
        };
        const newReport = new Report({
            userId: userID,
            sentimentType: sentimentType,
            result: jsonResponse,
        });
        newReport
            .save()
            .then((report) => {
                console.log("Report saved:", report);
            })
            .catch((error) => {
                console.error("Error saving report:", error);
            });

        return jsonResponse;
    } catch (error) {
        console.error("Error analyzing data:", error);
        throw error;
    }
};

// Login and Sign up setup
router.post("/userregister", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const confPassword = req.body.confPassword;
    const admin = false;

    if (!password || !email || !username || !confPassword)
        return res.status(400).send("One or more of the fields are missing.");

    //checking for multiple accounts for a single email
    const emailcheck = await User.find({ email: email });
    if (emailcheck.length > 0)
        return res
            .status(400)
            .send("Only one account per email address is allowed");

    if (password != confPassword)
        return res
            .status(400)
            .send("Password and Confirm Password do not match");

    // add user
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        const newUser = new User({ password: hash, username, email, admin });
        return res.json(await newUser.save());
    });
});

router.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send("Missing email or password");

    // checking if email exists
    const emails = await User.find({ email: email });
    if (emails.length === 0) return res.status(400).send("Email is incorrect");

    const user = emails[0];

    bcrypt.compare(password, user.password, async function (err, result) {
        if (result == false) return res.status(400).send("Incorrect password");

        // sending token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.setHeader("token", token);
        const name = user.username;
        res.json({ token, name });
    });
});

//Text analysis route

router.post(
    "/upload",
    isUser,
    upload.single("input_file"),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        const uploadedFilePath = req.file.path;
        const userID = req.auth.user._id;

        fs.readFile(uploadedFilePath, "utf-8", async (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Error reading file.");
            }

            const cleanedData = data.replace(/\s+/g, " ").trim();

            const maxLength = 5937;
            const trimmedData = cleanedData.substring(0, maxLength);

            const encodedParams = new URLSearchParams();
            encodedParams.set("source_language", "auto");
            encodedParams.set("target_language", "en");
            encodedParams.set("text", trimmedData);

            // const options = {
            //   method: 'POST',
            //   url: 'https://text-translator2.p.rapidapi.com/translate',
            //   headers: {
            //     'content-type': 'application/x-www-form-urlencoded',
            //     'X-RapidAPI-Key': process.env.RAPID_API_KEY2,
            //     'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            //   },
            //   data: encodedParams,
            // };

            const options = {
                method: "POST",
                url: "https://text-translator2.p.rapidapi.com/translate",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key": process.env.RAPID_API_KEY2,
                    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
                },
                data: encodedParams,
            };

            try {
                // const result = await runPrompt(trimmedData);

                const result = await axios.request(options);
                const results = await runPrompt(
                    result.data["data"]["translatedText"],
                    userID
                );
                res.status(200).json(results);
            } catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
);

//Get reports of the user that is logged in
router.get("/reports", isUser, async (req, res) => {
    const userID = req.auth.user._id;
    const reports = await Report.find({ userId: userID });
    res.json(reports);
});

module.exports = router;
