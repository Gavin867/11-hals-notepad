const { response } = require("express");
const fs = require("fs");

// Alternative way to set up express router
const router = require("express").Router();

// File path
// Get "/api/note" responds with all notes from the database - db.json
router.get("/notes", function (req, res) {

    fs.readFile ("./db/db.json", "utf8", (err, response) => {

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


// delete

module.exports = router;