const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let fetchuser = require('../middleware/fetchuser');

// const { route } = require('./notes');

const JWT_SECRET = 'sandeepkumar$sk';
//Route:1 Create a User Registration : POST "/api/auth/createuser". 
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email!').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check user email exist or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exist with this email!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }
})

//Route:2 Login authentication : POST "/api/auth/login". 
router.post('/login', [
    body('email', 'Enter valid email!').isEmail(),
    body('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please enter correct password and email!" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct password and email!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
        console.log(authtoken)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }
})

//Route:3 Get user details : POST "/api/auth/getuser".
router.post('./getuser', fetchuser, async (req, res) => {
    console.log("in Post router");
    try {
        userId = req.user.id;
        const user = await User.findById({userId}).select("-password");
        console.log(user);
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }
})

module.exports = router