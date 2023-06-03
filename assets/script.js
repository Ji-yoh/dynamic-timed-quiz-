// create query selectors for html elements

var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var timerHolder = document.getElementById("timer_holder");
var questionScreen = document.getElementById("question_screen");
var questionText = document.getElementById("question_text");
var answerList = document.getElementById("answer_holder");

// generate answer buttons on answer holder and have choices change with each question
var firstAnswer = document.createElement("button");
firstAnswer.setAttribute("class", "answers");
var secondAnswer = document.createElement("button");
secondAnswer.setAttribute("class", "answers");
var thirdAnswer = document.createElement("button");
thirdAnswer.setAttribute("class", "answers")
var fourthAnswer = document.createElement("button");
fourthAnswer.setAttribute("class", "answers")

var timer = 90;
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
            answerList.style.display = "none";
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
    answerList.appendChild(firstAnswer);
    firstAnswer.textContent = answersText.a;
    answerList.appendChild(secondAnswer);
    secondAnswer.textContent = answersText.b;
    answerList.appendChild(thirdAnswer);
    thirdAnswer.textContent = answersText.c;
    answerList.appendChild(fourthAnswer);
    fourthAnswer.textContent = answersText.d;
}

var questionList = {
    text_1: "What language adds functionality to webpages?"

}

var answersText = {
    a: "Javascript",
    b: "HTML",
    c: "CSS",
    d: "None of the above"
}


// when quiz ends save user initials and score to local storage
// user data needs to be displayed