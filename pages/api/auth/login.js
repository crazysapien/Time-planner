import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs';
var jwt = require('jsonwebtoken');

// jwt secret 
const secret = 'sdjvdsn^%&*sdjkcnw23432dkjc';

// vaildating inputs in request's body 
const validateBody = initMiddleware(
    validateMiddleware([
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password must be atleast 5 characters').exists(),
    ], validationResult)
)

export default async function handler(req, res) {
    // connecting to database 
    dbConnect();

    // getting method of request through destructuring 
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                await validateBody(req, res);
                // returning validation errors if true
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ success: false, errors: errors.array() })
                }

                // checking if the user exists in database 
                let user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(400).json({ success: false, error: "Sorry user doesn't exists." })
                }

                const checkPassword = await bcrypt.compare(req.body.password, user.password);
                if (!checkPassword) {
                    return res.status(400).json({ success: false, error: "Invalid password" })
                }

                // using user-id of a user to generate json web token 
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, secret);

                // return jwt as response if all goes well 
                return res.status(201).json({ 'success': true, authtoken, message: 'login succesful' });

            } catch (error) {
                // if any errors then
                res.status(500).json({ success: false, error: 'some error occured' })
            }
    }
}