const express = require("express");
const app = express();

const server = app.listen(8080, function () {
  console.log("C'est parti ! En attente de connexion sur le port 34112...");
  console.log("Se connecter à l'application en local : http://localhost:34112");
});

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
