// create query selectors for html elements
var mainScreen = document.getElementById("main_screen");
var splashScreen = document.getElementById("splash_screen");
var startButton = document.getElementById("start_quiz");
var questionScreen = document.getElementById("question_screen");
var timerHolder = document.getElementById("timer");
var scoreHolder = document.getElementById("current_score");
var highScore = document.getElementById("high_score");


// have Q&A generate dynamically instead of hardcoded, this is causing issues with event listener

// generate answer buttons on answer holder and have choices change with each question
// refactoring code to pull questions and answers from array of objects

var timer = 90;
var score = 0;


// if correct button is selected the next question is displayed
// if incorrect button is selected timer needs to decrement

function clearScreen() {
    mainScreen.innerHTML = "";
}

// creating separate function to start quiz and render all elements dynamically
function startQuiz(){
    var quizTitle = document.createElement("h1");
    quizTitle.textContent = "Coding Quiz!";
    mainScreen.appendChild(quizTitle);

    var quizDescription = document.createElement("p");
    quizDescription.textContent = "Test your knowledge of Javascript with this quiz! You will have 90 seconds to answer 3 questions. If you answer incorrectly, 5 seconds will be deducted from your time. Good luck!";
    mainScreen.appendChild(quizDescription);

    var buttonHolder = document.createElement("div");
    buttonHolder.setAttribute("id", "button_holder");
    mainScreen.appendChild(buttonHolder);

    var startButton = document.createElement("button");
    startButton.setAttribute("id", "start_quiz");
    startButton.textContent = "Start Quiz";
    buttonHolder.appendChild(startButton);

    var viewScore = document.createElement("button");
    viewScore.setAttribute("id", "view_score");
    viewScore.textContent = "High Scores";

    startButton.addEventListener("click", function(){
        clearScreen();
        renderQuestionToBrowser(0);
        countdown();    
    });

    viewScore.addEventListener("click", function(){
        // display high scores when user clicks view score button
    });

    timerHolder.textContent = timer;
    scoreHolder.textContent = score;
    // highScore.textContent = // pull high score from local storage;
}

function renderQuestionToBrowser(questionNumber) {
    var questionScreen = document.createElement("div");
    questionScreen.setAttribute("id","question_screen");
    
    mainScreen.appendChild(questionScreen);

    var questionText = document.createElement("h3");
    questionText.setAttribute("id", "question");
    questionText.textContent = questions[questionNumber].question; // sets questionText content to question in array of objects
    
    questionScreen.appendChild(questionText);

    var answerList = document.createElement("div");
    answerList.setAttribute("id", "answer_holder");
    mainScreen.appendChild(answerList);
      
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
                    addScore()
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
        setTimeout(function() {
            clearScreen();
            renderQuestionToBrowser(questionNumber);
    }, 500);
    } else {
        setTimeout(function() {
            clearScreen();
            quizOver();
        }, 500);
    }
}; 

function countdown() {
    var interval = setInterval(function() {
        if (timer > 0) {
            timerHolder.textContent = timer;
            timer --;
        } else {
            timerHolder.textContent = 0;
            clearInterval(interval);
            questionScreen.textContent = "Out of time! Try Again!"
            questionScreen.style.fontWeight = "bold";
            
        }
    }, 1000);
};

function minusTime() { // subtract from timer, called in renderQuestionToBrowser to decrease timer if incorrect answer is selected
    timer -= 5;
    timerHolder.textContent = timer;
};

function disableButtons() { // disable buttons, called in renderQuestionToBrowser to disable answer buttons after user selects an answer
    var disabledBtn = document.querySelectorAll("button");
    for (var i = 0; i < disabledBtn.length; i++) {
        disabledBtn[i].setAttribute("disabled", "true");
    }
};

function addScore() {
    score++;
    scoreHolder.textContent = score;
}

var userEntry = localStorage.getItem("userEntry");
var getEntry = JSON.parse(userEntry);
if(!getEntry) {
    var highScoreValue = 0;
} else { // sort high scores from highest to lowest
    getEntry.sort(function(a, b){
        return b.score - a.score;
    })
    var highScoreValue = getEntry[0].score;
};

// create function that creates a form for user to enter initials and save score to local storage
function quizOver() {
    timer = 0;
    timerHolder.textContent = timer;

    var endTitle = document.createElement("h1");
    endTitle.textContent = "End of quiz! Thanks for trying!";
    mainScreen.appendChild(endTitle);

    var scoreSubmit = document.createElement("form");
    scoreSubmit.setAttribute("id", "score_submit");
    mainScreen.appendChild(scoreSubmit);

    var inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("id", "user_initials");
    inputField.setAttribute("maxlength", "2"); // set max length to 2 characters
    inputField.setAttribute("placeholder", "Enter your initials");
    scoreSubmit.appendChild(inputField);

    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit_button");
    submitButton.textContent = "Submit";
    scoreSubmit.appendChild(submitButton);
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        var scoreSubmit = document.querySelector("#user_initials").value;
        var capitalizeSubmit = scoreSubmit.toUpperCase();
        var allowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var i=0; i < capitalizeSubmit.length; i++) {
            if (allowedCharacters.indexOf(capitalizeSubmit[i]) === -1) {
                alert("Please enter only letters");
                return;
            }
        }

        var userInput = {
            initials: capitalizeSubmit,
            score: score
        }
        var savedEntry = localStorage.getItem("userEntry");
        var entry;
        if (savedEntry) {
            entry = JSON.parse(savedEntry);
        } else {
            entry = [];
        }
        entry.push(userInput);
        localStorage.setItem("userEntry", JSON.stringify(entry));
        clearScreen();
        // display high scores
    })
}

function displayHighScores() {
    var highScoreTitle = document.createElement("h1");
    highScoreTitle.textContent = "High Scores";
    mainScreen.appendChild(highScoreTitle);

    var userEntry = localStorage.getItem("userEntry");
    if (!savedEntry) {
        savedEntry = [];
    } else {
        savedEntry.sort(function(a, b){
            return b.score - a.score;
        })
    }

    highScoreValue = savedEntry[0].score;
    highScore.textContent = highScoreValue;
    var highScoreList = document.createElement("ol");
    highScoreList.setAttribute("id", "high_score_list");
    mainScreen.appendChild(highScoreList);

    for (var i=0; i<savedEntry.length; i++) {
        var highScoreEntry = document.createElement("li");
        highScoreList.appendChild(highScoreEntry);
    }
}


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

startQuiz();

// when quiz ends save user initials and score to local storage
// user data needs to be displayed