var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var timerHolder = document.getElementById("timer_holder");
var timer = 60;
var quizStarted = false;

startButton.addEventListener("click", function(event){
    splashScreen.style.display = "none";
    renderTimerToBrowser();
})

function renderTimerToBrowser() {
    timerHolder.textContent = "Time: " + timer;
}