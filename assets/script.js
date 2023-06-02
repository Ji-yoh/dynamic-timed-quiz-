// create query selectors for html elements

var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var timerHolder = document.getElementById("timer_holder");
var questionScreen = document.getElementById("question_screen");
var questionText = document.getElementById("question_text");
var answerList = document.getElementById("answer_holder");

var firstAnswer = document.getElementById("answer_1");
var secondAnswer = document.getElementById("answer_2");
var thirdAnswer = document.getElementById("answer_3");
var fourthAnswer = document.getElementById("answer_4");

var timer = 60;
var quizStarted = false;

// event listener to start quiz (done)
// create timer element (done)
// timer needs to countdown when question screen is displayed (done)
// question text needs to be displayed on page (done)
// answer choices need to appear as buttons, each html button needs to display a question- look for a JS method that creates buttons(?)
// if correct button is selected the next question is displayed
// if incorrect button is selected timer needs to decrement

startButton.addEventListener("click", function(event){
    splashScreen.style.display = "none";
    renderTimerToBrowser();
    quizStarted = true;
    renderQuestionToBrowser();
    renderAnswerToBrowser();

    var interval = setInterval(function() {
        if (!quizStarted) {
            return;
        }
        timer --;

        if (timer <= 0) {
            clearInterval(interval);

            questionScreen.textContent = "Out of time! Try Again!"
            questionScreen.style.fontWeight = "bold";
            quizStarted = false;
        }
        renderTimerToBrowser();
    }, 1000);
})

function renderTimerToBrowser() {
    timerHolder.textContent = "Time: " + timer;
}

function renderQuestionToBrowser() {
    questionScreen.style.display = "block";
    questionScreen.textContent = questionList.text_1;// create variable/object for questions
}

function renderAnswerToBrowser() {
    answerList.style.display = "block";
    answerList.textContent = answerList1.first_choice;
}

var questionList = {
    text_1: "What language adds functionality to webpages?"

}

var answerList1 = {
    first_choice: firstAnswer.textContent = "Javascript",
    second_choice: secondAnswer.textContent = "HTML",
    third_choice: thirdAnswer.textContent = "CSS",
    fourth_choice: fourthAnswer.textContent = "None of the above"
};

// when quiz ends save user initials and score to local storage
// user data needs to be displayed