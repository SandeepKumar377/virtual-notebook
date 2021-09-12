const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using : POST "/api/auth/". Doesn't required Auth 
router.post('/', [
    body('name','Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email!').isEmail(),
    body('password').isLength({ min: 5 }),
], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }).then(user => res.json(user)).catch(err => {console.log(err)
          res.json({error: 'Please enter unique mail!'})})
    })

module.exports = router