"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ExpServer = express();

ExpServer.use(
  bodyParser.urlencoded({
    extended: true
  })
);

ExpServer.use(bodyParser.json());

ExpServer.post("/orders", function(req, res) {
	if((req.body.result.action == "getthestatus") && (req.body.result.parameters.ID != "")){	
	gettheorderstatus(req.body.result.parameters.ID, function(resp){
	var jsonres = JSON.parse(resp);
	return res.json({
    speech: jsonres[0].orderStatus,
    displayText: jsonres[0].orderStatus,
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


function gettheorderstatus(id, callback) {
    var options = {
        uri : 'http://35.202.179.196/EventEngine/rest/googlepoc/minifetchorders?orderId='+id,
        method : 'GET'
    }; 
    var respo = '';
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
		respo = body;			
        }
        else {            
			respo.json({
			speech: "Not Found",
			displayText: "Not Found",
			source: "webhook-echo-sample"
			});
        }
        callback(respo);
    });
}

ExpServer.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
