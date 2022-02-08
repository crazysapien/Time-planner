import dbConnect from '../../../../lib/dbConnect'
import Schedule from '../../../../models/Schedule';
var jwt = require('jsonwebtoken');


// jwt secret 
const secret = 'sdjvdsn^%&*sdjkcnw23432dkjc';

export default async function handler(req, res) {
    // connecting to database
    dbConnect();

    const { method } = req;

    switch (method) {
        case 'DELETE':
            try {
                // verifying authtoken provided 
                const token = req.headers.token;
                if (!token) { return res.status(401).json({ msg: 'Please authenticate usina a valid token.' }) }
                const data = jwt.verify(token, secret);

                // check is schedule exists or not 
                let schedule = await Schedule.findById(req.query.id);
                if (!schedule) { return res.status(404).json({ msg: 'not found' }) }

                // check is the same user is owning the schedule 
                if (schedule.user.toString() !== data.user.id) { return res.status(401).json({ msg: 'not allowed' }) }

                schedule = await Schedule.findByIdAndDelete(req.query.id)

                res.json({ success: 'schedule deleted succesfully.' })
            } catch (error) {
                res.status(500).json({ msg: 'error occured.' })
            }
    }
}