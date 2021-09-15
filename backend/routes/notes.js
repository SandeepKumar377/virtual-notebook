const express = require('express');
const router = express.Router();
let fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route:1 Get all the notes : GET "/api/notes/fetchallnotes".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }

})

//Route:2 Add note : POST "/api/notes/addnote".
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

//Route:3 Update note : PUT "/api/notes/updatenote".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allow");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }

})

//Route:4 Delete note : PUT "/api/notes/updatenote".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Successful deleted note!" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servar error!");
    }

})

module.exports = router