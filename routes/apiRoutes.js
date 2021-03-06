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

        console.log("HAL has read your notes...", notepad);

        let latestNoteID;

        if (notepad.length > 0) {

            latestNoteID = notepad[notepad.length - 1].id;

            latestNoteID = latestNoteID + 1;

        } else {

            latestNoteID = 1;
        }

        const newNote = { ...req.body, id: latestNoteID };

        console.log(latestNoteID);

        console.log(newNote);

        // combine the notes
        notepad = [...notepad, newNote];

        console.log("HAL has combined notes", notepad);

        // file path, json.stringify, call back function from the read file
        // check hw10
        fs.writeFile("./db/db.json", JSON.stringify(notepad, null, 2), function (error) {

            if (error) throw error;

            console.log("HAL has stored your notes...");
        
            res.json({ success: true, msg: 'Created new note' });
        });
    });
});


// delete
router.delete("/notes/:id", function (req, res) {

    let deleteNote = req.params.id

    // read the file look for the specific item to be deleted
    fs.readFile("./db/db.json", "utf8", (err, response) => {

        if (err) throw err;

        let thisNotepad = JSON.parse(response);

        console.log("HAL is tracking these notes", thisNotepad);

        // filter the notes/delete identified object
        let filteredNotes = thisNotepad.filter((note) => note.id != deleteNote);

        console.log("HAL has these filtered notes", filteredNotes);

        //rewrite what's left
        fs.writeFile("./db/db.json", JSON.stringify(filteredNotes, null, 2), function (error) {

            if (error) throw error;

            res.json(filteredNotes);

            console.log("HAL has deleted the identified notes", deleteNote);
        });
    });

});

// need id for item to delete

// delete existing 

module.exports = router;