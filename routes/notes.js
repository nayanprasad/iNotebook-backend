const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const getUser = require("../middleware/getUser")


router.get("/fetchallnotes", getUser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });   // user.id is from getUser
		res.json(notes);

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});


router.post("/addnote", getUser, [
	body('title', "invalid title").isLength({ min: 1 }),
	body('discription', "invalid discription").isLength({ min: 5 }),],
	async (req, res) => {
		// console.log(req.body.title);
		// console.log(req.body.discription);
		// console.log(req.body.tag);
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		
		const { title, discription, tag } = req.body;
		// console.log(req.user.id);
		const newNote = new Note({
			title,
			discription,
			tag,
			user: req.user.id
		});
		
		const savedNote = await newNote.save()
		res.json(savedNote)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});


router.put("/updatenote/:id", getUser,async (req, res) => {
const {title, discription, tag} = req.body;

	try {
		const newNote = {};
		if(title){
			newNote.title = title
		}
		if(discription){
			newNote.discription = discription
		}
		if(tag){
			newNote.tag = tag
		}

		let note = await Note.findById(req.params.id);
		if(!note){
			return res.status(404).send("not found");
		}

		console.log(note)
		console.log(note.user)
		console.log(req.user.id)
	
		if(note.user.toString()  !== req.user.id){
			return res.status(401).send("not allowed");
		}

		note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
		res.json({note});

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}

});



router.delete("/deletenote/:id", getUser, async (req, res) => {

	try {
		let note = await Note.findById(req.params.id);
		if(!note){
			return res.status(404).send("not found");
		}

		if(note.user.toString()  !== req.user.id){
			return res.status(401).send("not allowed");
		}

		note = await Note.findByIdAndDelete(req.params.id, );
		res.json({"Success": "Note has been deleted", note : note});

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});



module.exports = router;