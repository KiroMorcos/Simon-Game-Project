var buttonColors = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").click(function(event){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(){
    if (started === false)
    {
        nextSequence();
        started = true;
    }
});

function playSound(name){
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        $("h1").text("Game Over, Press Any Key to Play Again");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        started = false;
        level = 0;
        gamePattern = [];
    }
}

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var sound = new Audio("./sounds/" + randomChosenColor + ".mp3");
    sound.play();

}