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
        check('name', 'Enter a valid name').isLength({ min: 3 }),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
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

                // checking if the user already exists in database 
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    return res.status(400).json({ success: false, error: "Sorry a user with this email already exists" })
                }

                // generating salt for hashing password 
                const salt = await bcrypt.genSalt(10);
                const securePassword = await bcrypt.hash(req.body.password, salt);

                // creating a new user
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securePassword
                })

                // using user-id of a user to generate json web token 
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, secret);

                // return jwt as response if all goes well 
                return res.status(201).json({ success: true, authtoken });

            } catch (error) {
                // if any errors then
                res.status(500).json({ success: false, error })
            }
    }
}