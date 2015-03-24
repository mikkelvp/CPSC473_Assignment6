#!/usr/bin/env node

var express = require('express'),
	http = require('http'),
	app = express(),
	router = express.Router(),
	wins = 0, // wins of the client
	losses = 0, 
	ties = 0;

http.createServer(app).listen(3000);
console.log("Service started on port 3000");

function randomGameResponse() {
		// get random number from 1-5
		switch ( Math.floor(Math.random() * (6 - 1)) + 1 ) {
			case 1:
				return "rock";
			case 2:
				return "paper";
			case 3:
				return "scissors";
			case 4:
				return "spock";
			case 5:
				return "lizard";
			default:
				return null;
		}
	}

// return win if client is winner
// c client, s server 
function getOutcome(c, s) {
		switch (c) {
			case "rock":
				switch (s) {
					case "paper":
						wins++;
						return "win";
					case "spock":
						wins++;
						return "win";
					case "rock":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
					}
				break;
			case "paper":
				switch (s) {
					case "scissors":
						wins++;
						return "win";
					case "lizard":
						wins++;
						return "win";
					case "paper":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
				}
				break;
			case "scissors":
				switch (s) {
					case "rock":
						wins++;
						return "win";
					case "spock":
						wins++;
						return "win";
					case "scissors":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
				}
				break;
			case "spock":
				switch (s) {
					case "paper":
						wins++;
						return "win";
					case "lizard":
						wins++;
						return "win";
					case "spock":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
				}
				break;
			case "lizard":
				switch (s) {
						case "rock":
						wins++;
						return "win";
					case "scissors":
						wins++;
						return "win";
					case "lizard":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
			}
		}
}

// build and return response object
function buildResponse(choice) {
	return {
	outcome: getOutcome( choice, randomGameResponse() ),
	wins: wins,
	losses: losses,
	ties: ties,
	};
}
	
// set up routes
router.route('/rock')
.get(function(req, res) {
	res.json(buildResponse("rock"));
});

router.route('/paper')
.get(function(req, res) {
	res.json(buildResponse("paper"));
});

router.route('/scissors')
.get(function(req, res) {
	res.json(buildResponse("scissors"));
});

router.route('/spock')
.get(function(req, res) {
	res.json(buildResponse("spock"));
});

router.route('/lizard')
.get(function(req, res) {
	res.json(buildResponse("lizard"));
});

// add /play to route and use router as middleware
app.use('/play', router);
// use static middleware to serve client files
app.use(express.static(__dirname + '/client'));
