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
        case 'GET':
            try {
                // verifying authtoken provided 
                const token = req.headers.token;
                if (!token) { res.status(401).json({ msg: 'Please authenticate usina a valid token.' }) }
                const data = jwt.verify(token, secret);

                const schedule = await Schedule.find({ user: data.user.id });
                res.status(200).json({ schedule });
            } catch (error) {
                res.status(500).json({ msg: 'error occurred.' })
            }
    }
}