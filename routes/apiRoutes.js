const { response } = require("express");
const fs = require("fs");

// Alternative way to set up express router
const router = require("express").Router();

// File path
// Get "/api/note" responds with all notes from the database - db.json
router.get("/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", (err, response) => {

        if (err) throw err;

        let notepad;

        try {

            notepad = [].concat(JSON.parse(response));

        } catch (err) {

            notepad = [];
        }

        console.log("Reading notes", notepad);

        res.json(notepad);
    });
});

// post
router.post("/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", (err, response) => {

        if (err) throw err;

        let notepad;

        try {

            notepad = [].concat(JSON.parse(response));

        } catch (err) {

            notepad = [];
        }

        console.log("Reading notes", notepad);

        if (notepad.length > 0) {

            let latestNoteID = notepad[notepad.length - 1].id;

            latestNoteID = latestNoteID + 1;

        } else {

            let latestNoteID = 1;
        }

        const newNote = { ...req.body, id: latestNoteID };

        console.log(latestNoteID);

        console.log(newNote);

        // combine the notes
        notepad = [...notepad, newNote];

        console.log ("Combined notes are", notepad);

        // file path, json.stringify, call back function from the read file
        // check hw10
        fs.writeFile (notepad);
    });
});


// delete

// delete existing 

module.exports = router;