"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const ExpServer = express();

ExpServer.use(
  bodyParser.urlencoded({
    extended: true
  })
);

ExpServer.use(bodyParser.json());

ExpServer.post("/orders", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.ID
      ? req.body.result.parameters.ID
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-nodejs-sample"
  });
});


ExpServer.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
