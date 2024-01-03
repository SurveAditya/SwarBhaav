import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../lib/fadein";
import Image from "next/image";
import Link from "next/link";

const Articles = () => {
    return (
        <section className="bg-cyan-100">
            <motion.div
                variants={fadeIn("down", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col text-center w-full mb-20"
            >
                <h2 className="text-cyan-700">
                    Read the latest articles to learn best customer service
                    practices.
                </h2>
                <h1 className="sm:text-4xl text-2xl font-semibold uppercase text-cyan-700">
                    Articles
                </h1>
            </motion.div>
            <div className="px-5 mx-auto">
                <div className="flex flex-wrap">
                    {articles.map((article, index) => {
                        return (
                            <motion.div
                                key={index}
                                variants={fadeIn("up", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.3 }}
                                className="p-4 md:w-1/3 "
                            >
                                <div className="h-full border-2 border-cyan-400 border-opacity-60 rounded-lg overflow-hidden bg-cyan-50">
                                    <Image
                                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                                        src={article.image}
                                        alt="blog"
                                        width={720}
                                        height={400}
                                    />
                                    <div className="p-4 ">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-cyan-400 mb-1 uppercase">
                                            {article.category}
                                        </h2>
                                        <h1 className="title-font text-lg font-semibold text-cyan-700 mb-3">
                                            {article.title}
                                        </h1>
                                        <p className="leading-relaxed mb-3">
                                            {article.description}
                                        </p>
                                        <div className="flex items-center flex-wrap ">
                                            <a
                                                href={article.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-cyan-500 hover:text-cyan-600 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer font-medium"
                                            >
                                                Learn More
                                                <svg
                                                    className="w-4 h-4 ml-2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="M12 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                            <span className="text-cyan-800 hover:text-cyan-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle
                                                        cx={12}
                                                        cy={12}
                                                        r={3}
                                                    />
                                                </svg>
                                                {article.likes}K
                                            </span>
                                            <span className="text-cyan-800 hover:text-cyan-600 inline-flex items-center leading-none text-sm">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                                </svg>
                                                {article.comment}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Articles;

const articles = [
    {
        title: "First Day in the Call Center Floor: What You NEED to Know",
        link: "https://pisopinoy.com/first-day-in-the-call-center-floor-how-to-deal/",
        image: "/assets/articles/1.jpg",
        comment: 5,
        likes: 1.4,
    },
    {
        title: "How to Organize Your Call Center Training Program Into 5 Phases",
        link: "https://blog.screensteps.com/call-center-training-program-phases",
        image: "/assets/articles/2.jpg",
        comment: 3,
        likes: 1.3,
    },
    {
        title: "Call center burnout: what it is and how to overcome it",
        link: "https://www.zendesk.com/in/blog/call-center-burnout/",
        image: "/assets/articles/3.png",
        comment: 4,
        likes: 1.2,
    },
    {
        title: "How to Improve Call Center Performance",
        link: "https://www.callcentrehelper.com/12-great-tips-to-improve-call-centre-performance-2694.htm",
        image: "/assets/articles/4.jpg",
        comment: 2,
        likes: 0.7,
    },
    {
        title: "Your Call Center Manager Playbook",
        link: "https://sharpencx.com/blog/call-center-management/",
        image: "/assets/articles/5.png",
        comment: 8,
        likes: 1.5,
    },
    {
        title: "Elevate your contact center management strategy with our trusted contact center solution.",
        link: "https://www.ringcentral.com/call-center-management.html",
        image: "/assets/articles/6.jpg",
        comment: 6,
        likes: 1.1,
    },
];
