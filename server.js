const express = require('express');
const fs = require('fs');

// Call upon unique id generator
const uuid = require('./uuid');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);