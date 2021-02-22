let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;

// start the game
$(document).keypress(function() {
	if (!gameStarted) {
		$("#level-title").text("Level " + level);
		nextSequence();
		gameStarted = true;
	}
});


// user clicks a button
$(".btn").click(function() {
	// get the id of the button that was clicked
	let userChosenColor = $(this).attr("id");

	userPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userPattern.length - 1);
});


// game generates the next sequence
function nextSequence() {
	level++;
	$("#level-title").text("Level " + level);

	let index = Math.floor(Math.random() * buttonColors.length);
	let chosenColor = buttonColors[index];

	gamePattern.push(chosenColor);
	$("#" + chosenColor).fadeOut(100).fadeIn(100);
	playSound(chosenColor);
}


// check user's sequence against the game's
function checkAnswer(currentLevel) {
	if (userPattern[currentLevel] == gamePattern[currentLevel]) {
		if (userPattern.length == gamePattern.length) {
			setTimeout(function() {
				nextSequence();
				userPattern = [];
			}, 1000);
		}
	}
	// game over!
	else {
		let gameOverSound = new Audio('sounds/wrong.mp3');
		$("#level-title").text("Game Over, Press Any Key to Restart");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);
		restart();
	}
}


// restart the game
function restart() {
	level = 0;
	gamePattern = [];
	userPattern = [];
	gameStarted = false;
}


function playSound(name) {
	let sound = new Audio('sounds/' + name + '.mp3');
	sound.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
	
}