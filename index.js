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
	if(req.body.result.action =="getthestatus" && req.body.result.parameters.ID.length = 10){	
	gettheorderstatus(req.body.result.parameters.ID, function(resp){
    var jsonres = JSON.parse(resp);
    console.log(jsonres.speech);
    console.log(jsonres.displayText);
	return res.json({
    speech: jsonres.speech,
    displayText: jsonres.displayText,
    source: "webhook-echo-sample"
     });
	});	
	}else{
	return res.json({
    speech: "Please provide valid order number",
    displayText: "Please provide valid order number",
    source: "webhook-echo-sample"
     });
	}
});


function gettheorderstatus(trust_you_id, callback) {
    var options = {
        uri : 'https://prashanthdbp1942060739trial.hanatrial.ondemand.com/Testing/data/searchorder.xsjs?ID='+trust_you_id,
        method : 'GET'
    }; 
    var res = '';
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res = body;
        }
        else {
            res = 'Not Found';
        }
        callback(res);
    });
}

ExpServer.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
