var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;


// User click action
$(".btn").click(function(event) {
  userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  if (gamePattern.length === userClickedPattern.length) {
    checkAnswer(userClickedPattern);
  }

});

// User keypress - triggers the game
$("body").keypress(function(event) {
  if (level === 0) {
    userClickedPattern = [];
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level).css("color", "#FEF2BF");
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animateSequence();
}


function checkAnswer(userSequence) {
  var rightAnswer = 0;
  for (var i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === userSequence[i]) {
      rightAnswer++;
    }
  }

  if (rightAnswer === gamePattern.length) {

    $("#level-title").text("Good work!").css("color", "green");
    setTimeout(function() {
      nextSequence()
    }, 1000);

  } else { //GAME OVER
    playAudio("wrong");
    $("#level-title").text("Game Over - Press Any Key To Restart").css("color", "red");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }

}


// Button animations and sound

function animatePress(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function() {
    $("#" + button).removeClass("pressed")
  }, 100);
}

function flashButton(button) {
  $("#" + button).fadeOut(100).fadeIn(100);
}

function playAudio(button) {
  var audioElement = document.createElement("audio");
  var audioSource = "sounds/" + button + ".mp3";
  audioElement.setAttribute("src", audioSource);
  audioElement.play();
}

// Sequence animation with delay
function animateSequence() {
  for (var i = 0; i < gamePattern.length; i++) {
    timeDelay(i);
  }
}

function timeDelay(i) {
  setTimeout(function() {
    playAudio(gamePattern[i]);
    flashButton(gamePattern[i]);
  }, 500 * i);
}
