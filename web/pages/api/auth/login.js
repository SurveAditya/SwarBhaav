import connectMongo from '../../../database/conn';
import Users from '../../../model/UserSchema'
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({ error: "Connection Failed...!", message: "Database Connection Failed", success: false }))

    // only post method is accepted
    if (req.method === 'POST') {

        if (!req.body) return res.status(404).json({ error: "Don't have form data...!", message: "Request does not have a form data.", success: false });
        const { username, email, password, role, timestamps } = req.body;

        // check duplicate users
        const checkexisting = await Users.find({ email: email });
        // console.log(checkexisting);
        if (checkexisting.length > 0) return res.status(422).json({ message: "User Already Exists...!", success: false });

        // hash password
        Users.create({ username, email, password: await hash(password, 12), role, timestamps }, function (err, data) {
            if (err) return res.status(404).json({ err });
            return res.status(201).json({ user: data, success: true })
        })

    } else {
        return res.status(500).json({ message: "HTTP method not valid only POST Accepted", success: false })
    }

}