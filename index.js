var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var count = 0;

$("h1").text("Press Akey to Start");

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}


$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(!checkAnswer()){
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        count = 0;
        return;
    }
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function (){
            nextSequence();
            userClickedPattern = [];
        },1000)
    }
})

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function  animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

$("body").keypress(function () {
    if(count==0){
        nextSequence();
        count++;
    }
    $("h1").text("Level 1");
})

function checkAnswer(){
    for(var i = 0;i < userClickedPattern.length;i++){
        if(gamePattern[i]==userClickedPattern[i]){
            continue;
        }else{
            return false;
        }
    }
    return true;
}