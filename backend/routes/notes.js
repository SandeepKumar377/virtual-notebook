const express = require('express');
const router = express.Router();
let fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route:1 Get all the notes : GET "/api/auth/fetchallnotes".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }

})

//Route:2 Add note : POST "/api/auth/addnote".
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter valid description at least 5 charactor!').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const noteSave = await note.save()
        res.json(noteSave)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }

})

module.exports = router