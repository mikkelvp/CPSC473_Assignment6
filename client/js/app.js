var main = function() {
	"use strict";

	var url = "http://localhost:3000/play/";

	function processJSON(o) {
		switch (o.outcome) {
			case "win":
				$("#alert").removeClass().addClass("alert alert-success");
				$("#alertMsg").text("You won!");
				$("#wins").text(o.wins);
				break;
			case "tie":
				$("#alert").removeClass().addClass("alert alert-warning");
				$("#alertMsg").text("It's a tie!");
				$("#ties").text(o.ties);
				break;
			case "loose":
				$("#alert").removeClass().addClass("alert alert-danger");
				$("#alertMsg").text("Yot lost!");
				$("#losses").text(o.losses);
				break;
			default:
				$("#alert").removeClass().addClass("alert alert-danger");
				$("#alertMsg").text("ERROR! What did you do?");
		}
	}

	$("#btnRock").click(function() {
		$.getJSON(url + "rock", processJSON);
	});

	$("#btnPaper").click(function() {
		$.getJSON(url + "paper", processJSON);
	});

	$("#btnScissors").click(function() {
		$.getJSON(url + "scissors", processJSON);
	});

	$("#btnSpock").click(function() {
		$.getJSON(url + "spock", processJSON);
	});

	$("#btnLizard").click(function() {
		$.getJSON(url + "lizard", processJSON);
	});
};

$(document).ready(main);