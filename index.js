const express = require("express");
const app = express();

const PORT = 3000;

app.listen(
  (PORT,
  () => {
    console.log(`App was started on http://localhost:${PORT}`);
  })
);
