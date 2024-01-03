import connectMongo from '../../../database/conn';
import Reports from '../../../model/ReportSchema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!", success: false }))

    if (req.method === 'POST') {

        // console.log(req.body);

        if (!req.body) return res.status(404).json({ error: "Dont't have the user ID.", success: false });
        const { userId } = req.body;

        const chatsAndCalls = await Reports.find({ userId: userId });
        if (!chatsAndCalls) return res.status(404).json({ message: "No chats and calls found...!", success: false });

        const chats = chatsAndCalls.filter(chat => chat.sentimentType === "chat");
        const calls = chatsAndCalls.filter(call => call.sentimentType === "audio");


        return res.status(201).json({ status: true, data: chatsAndCalls, chats: chats, calls: calls });

    } else {
        res.status(500).json({ message: "HTTP method not valid only POST Accepted" })
    }

}