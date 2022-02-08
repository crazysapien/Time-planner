import dbConnect from '../../../lib/dbConnect'
import Schedule from '../../../models/Schedule';
var jwt = require('jsonwebtoken');



// jwt secret 
const secret = 'sdjvdsn^%&*sdjkcnw23432dkjc';

export default async function handler(req, res) {
    // connecting to database 
    dbConnect();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                // verifying authtoken provided 
                const token = req.headers.token;
                if (!token) { res.status(401).json({ msg: 'Please authenticate usina a valid token.' }) }
                const data = jwt.verify(token, secret);

                const { title, start, end } = req.body;
                const schedule = new Schedule({
                    title, start, end, user: data.user.id
                })

                const savedschedule = await schedule.save();

                res.status(201).json({ success: true });
            } catch (error) {
                res.status(401).json({ msg: 'An error occured.' })
            }

    }




}