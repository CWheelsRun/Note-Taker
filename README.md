# NOTE TAKER

## Description

This is a deployed Heroku application making use of Express.js to allow a user to write, store, and delete notes on once convenient app.

## Usage

### Navigate to the deployed app here:
[Note Taker](https://note-taker-on-wheels.herokuapp.com/)
### Write notes with title and body text, then click the save icon to save the note to the left column
![Screenshot](./images/notes1.png)
### Access saved notes by clicking on them in the left column
### Delete any saved notes by clicking on the trash bin icon at the right side of the saved note entry
![Screenshot](./images/notes2.png)

## Routes

### HTML Routes established
* GET /notes returns 'notes.html'.
* GET * returns 'index.html'.

### API Routes establised
* GET /api/notes reads the db.json file and returns all saved notes as JSON.
* POST /api/notes receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client. Each note has a unique id when it's saved.
* DELETE /api/notes/:id receives a query parameter containing the id of a note to delete, removes the note with the given id property, and then rewrites the notes to the db.json file.

## Questions

Created by: [CWheelsRun](https://github.com/CWheelsRun)
  
If you have any further questions please feel free to contact me at [corey.bennett@live.com](corey.bennett@live.com)