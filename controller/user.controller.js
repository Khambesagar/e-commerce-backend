import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const hashPassword = await bcryptjs.hash(password, 10); // use for hashpassword
            const createUser = new User({
                userName,
                email,
                password: hashPassword,
            });
            await createUser.save();
            res.status(201).json({
                message: 'User created Successfuly',
                user: {
                    _id: createUser._id,
                    userName: createUser.userName,
                    email: createUser.email
                }
            });
        }
    } catch (error) {
        console.log('Error : ', error.message);
        res.status(500), json({ message: 'Intrernal server Error' })
    }
};

// Login ...

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!user || !isMatch) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }
        // Send back user info
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
            },
        });

    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};