const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("client/dist"));
app.use(express.json());

app.listen(port, (e) => {
  console.log(
    e
      ? `Unable to start Express server: ${e}`
      : `Server Listening at http://localhost:${port}`
  );
});

module.exports = app;
