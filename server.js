const express = require("express");
const path = require("path");
const fs = require("fs");

// Call upon unique id generator
const uuid = require("./uuid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API

// Notes displayed
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

// Note submission
app.post("/api/notes", (req, res) => {
  const id = uuid();
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id,
      title,
      text,
    };

    // Pull notes from db
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const savedNotes = JSON.parse(data);
        savedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(savedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Notes updated successfully")
        );
      }
    });

    const success = {
      status: "success",
      body: newNote,
    };

    res.json(success);
  } else {
    res.send("Error posting note");
  }
});

// Note deletion
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  // Pull notes from db
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const savedNotes = JSON.parse(data);
      // Remove note matching ID
      const newNotes = savedNotes.filter((el) => el.id != id);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(savedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info("Notes updated successfully")
      );
    }
  });

  res.send("Note deleted");
});

// HTML

// Main HTML displayed
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Notes HTML displayed
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Main HTML failsafe
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);