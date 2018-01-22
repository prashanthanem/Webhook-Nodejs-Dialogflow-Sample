"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

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
    request.get({ url: "https://prashanthdbp1942060739trial.hanatrial.ondemand.com/Testing/data/searchorder.xsjs?ID=1000100103"},      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                 return res;
                 } 
             }); 
});

ExpServer.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
