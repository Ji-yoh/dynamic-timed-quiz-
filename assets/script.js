// create query selectors for html elements
var mainScreen = document.getElementById("main_screen");
var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var timerHolder = document.getElementById("timer_holder");
var qaScreen = document.getElementById("qa_screen");
var questionScreen = document.getElementById("question_screen");
/*var questionText = document.getElementById("question_text");*/
var answerList = document.getElementById("answer_holder");


// generate answer buttons on answer holder and have choices change with each question
// refactoring code to pull questions and answers from array of objects

var timer = 90;
var quizStarted = false;

// if correct button is selected the next question is displayed
// if incorrect button is selected timer needs to decrement

function clearScreen() {
    qaScreen.innerHTML = "";
}

startButton.addEventListener("click", function(){
    splashScreen.style.display = "none";
    renderTimerToBrowser();
    quizStarted = true;
    renderQuestionToBrowser(0);

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
});

function renderTimerToBrowser() {
    timerHolder.textContent = "Time: " + timer;
}

function renderQuestionToBrowser(questionNumber) {
    questionScreen.style.display = "block";
    answerList.style.display = "flex";
    var questionText = document.createElement("h3");
    questionText.setAttribute("id", "question");
    questionText.textContent = questions[questionNumber].question; // sets questionText content to question in array of objects
    
    questionScreen.appendChild(questionText);
      
    for (var i = 0; i < questions[questionNumber].answers.length; i++) { // creates answer buttons for each answer choice in object array
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "answerBtn");
        answerButton.setAttribute("id", "answers" + i);
        answerButton.textContent = questions[questionNumber].answers[i];
        answerList.appendChild(answerButton);

        var selectedAnswer = document.querySelector("#answers" + i); // display message if correct or incorrect answer is selected, disable other answer buttons, and display next question
        selectedAnswer.addEventListener("click", function(event) {
                if (this.textContent === questions[questionNumber].answers[questions[questionNumber].correct]) {
                    var youAreCorrect = document.createElement("p");
                    youAreCorrect.setAttribute("class", "message");
                    youAreCorrect.textContent = "You are correct!";
                    mainScreen.appendChild(youAreCorrect)
                    console.log(event);
                    disableButtons();
                    renderNextQuestion(questionNumber);
                } else {
                    var youAreIncorrect = document.createElement("p");
                    youAreIncorrect.setAttribute("class", "message");
                    youAreIncorrect.textContent = "You are incorrect!";
                    mainScreen.appendChild(youAreIncorrect);
                    minusTime();
                    disableButtons();
                    renderNextQuestion(questionNumber);
                    console.log(event);
                }
                console.log(selectedAnswer);
            });
    }   
};

function renderNextQuestion(questionNumber) { // supposed to increment the object array and display next question
    questionNumber++;
    if (questionNumber < questions.length) {
        clearScreen();
        renderQuestionToBrowser(questionNumber);
    } else {
        clearScreen();
    }
}

function minusTime() { // subtract from timer, called in renderQuestionToBrowser to decrease timer if incorrect answer is selected
    timer -= 5;
    timerHolder.textContent = "Time: " + timer;
};

function disableButtons() { // disable buttons, called in renderQuestionToBrowser to disable answer buttons after user selects an answer
    var disabledBtn = document.querySelectorAll("button");
    for (var i = 0; i < disabledBtn.length; i++) {
        disabledBtn[i].setAttribute("disabled", "true");
    }
};


//create array of objects for questions and answers
var questions = [
    {
        question: "What language adds functionality to webpages?",
        answers: [
            "Javascript",
            "HTML",
            "CSS",
            "None of the above"
        ],
        correct: 0
    },
    {
        question: "What is the Javascript operator used for logical OR?",
        answers: [
            "&&",
            "===",
            "||",
            "**"
        ],
        correct: 2
    },
    {
        question: "True or False: Functions can be used as arguments in other functions.",
        answers: [
            "true",
            "false",
            "I don't know"
        ],
        correct: 0
    }
]



// when quiz ends save user initials and score to local storage
// user data needs to be displayed