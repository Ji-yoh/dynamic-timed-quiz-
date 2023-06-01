var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var timerHolder = document.getElementById("timer_holder");
var questionScreen = document.getElementById("question_screen");
var questionText = document.getElementById("question_text");
var firstAnswer = document.getElementById("answer_1");
var secondAnswer = document.getElementById("answer_2");
var thirdAnswer = document.getElementById("answer_3");
var fourthAnswer = document.getElementById("answer_4");

var timer = 60;
var quizStarted = false;

startButton.addEventListener("click", function(event){
    splashScreen.style.display = "none";
    renderTimerToBrowser();
    quizStarted = true;
    renderQuestionToBrowser();
})

function renderTimerToBrowser() {
    timerHolder.textContent = "Time: " + timer;
}

function renderQuestionToBrowser() {
    questionScreen.style.display = "block";
}