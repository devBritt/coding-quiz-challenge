// global variables
// DOM element references
var instructionsEl = document.querySelector("#instructions");
var startQuizBtnEl = document.querySelector("#start");
var quizSectionEl = document.querySelector("#quiz");
var finalScoreSectionEl = document.querySelector("#final-score");
var submitScoreBtnEl = document.querySelector("#submit")
var viewScoresSectionEl = document.querySelector("#high-scores");
var highScoresEl = document.querySelector("#scores-list");
var viewScoresEl = document.querySelector("#view-scores");
// array containing quiz question objects with answers arrays
var quizOptions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {
                answer: "a) strings",
                correct: false
            },
            {
                answer: "b) booleans",
                correct: false
            },
            {
                answer: "c) alerts",
                correct: true
            },
            {
                answer: "d) numbers",
                correct: false
            }
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with ____",
        answers: [
            {
                answer: "a) quotes",
                correct: false
            },
            {
                answer: "b) curly brackets",
                correct: false
            },
            {
                answer: "c) parenthesis",
                correct: true
            },
            {
                answer: "d) square brackets",
                correct: false
            }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            {
                answer: "a) numbers and strings",
                correct: false
            },
            {
                answer: "b) booleans",
                correct: false
            },
            {
                answer: "c) other arrays",
                correct: false
            },
            {
                answer: "d) all of the above",
                correct: true
            }
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            {
                answer: "a) commas",
                correct: false
            },
            {
                answer: "b) curly brackets",
                correct: false
            },
            {
                answer: "c) quotes",
                correct: true
            },
            {
                answer: "d) parenthesis",
                correct: false
            }
        ]
    },
    {
        question: "A very common tool used for development and debugging to print content to the debugger is:",
        answers: [
            {
                answer: "a) JavaScript",
                correct: false
            },
            {
                answer: "b) terminal/bash",
                correct: false
            },
            {
                answer: "c) for loop",
                correct: false
            },
            {
                answer: "d) console.log",
                correct: true
            }
        ]
    }
]
// to track current question
var questionIndex = 0;
var score = 0;
// to update timer when penalized
var timeLeft = 0;
// array containing submitted high scores
var scoreList = [];
// to clear interval when quiz is completed before time runs out
var timeInterval;

// functions
// function to toggle active/inactive sections
function toggleSections(hideSection, showSection) {
    hideSection.className = "hide";
    showSection.classList.remove("hide");

    // call function to create active section
    if (showSection === quizSectionEl) {
        createQuiz();
    }

    // call function to create list of high scores
    if (showSection === viewScoresSectionEl) {
        createHighScoresList();
    }
}

// function to create quiz question and answer section
function createQuiz() {
    // create question element
    var questionEl = document.createElement("h2");
    // add class for styling
    questionEl.className = "question";
    // add text
    questionEl.textContent = quizOptions[questionIndex].question;
    // append to quiz section
    quizSectionEl.appendChild(questionEl);

    // create div to hold answer buttons
    var answersEl = document.createElement("div");
    // add class for styling
    answersEl.className = "answers-container";
    // create button elements
    for (var i = 0; i < quizOptions[questionIndex].answers.length; i++) {
        var answerBtnEl = document.createElement("button");
        // add class for styling
        answerBtnEl.className = "answer btn";
        // add id
        answerBtnEl.setAttribute("data-answer-id", i);
        // add text
        answerBtnEl.textContent = quizOptions[questionIndex].answers[i].answer;
        // append to answers container
        answersEl.appendChild(answerBtnEl);
    }
    // append answers to quiz section
    quizSectionEl.appendChild(answersEl);
    
    // create div to display when answer button is clicked
    var isCorrectEl = document.createElement("div");
    // add classes for styling
    isCorrectEl.className = "is-correct hide";
    // add id
    isCorrectEl.id = "is-correct";
    // append isCorrectEl to quiz section
    quizSectionEl.appendChild(isCorrectEl);
}

// function to display if chosen answer was correct
function isAnswerCorrect(isCorrect) {
    // create div to display when answer button is clicked
    var isCorrectEl = document.querySelector("#is-correct");
    if (isCorrectEl.classList == "is-correct hide") {
        isCorrectEl.classList.remove("hide");
    }

    // display "Correct!" if isCorrect is true, otherwise, display "Wrong!"
    if (isCorrect) {
        isCorrectEl.innerHTML = "<p>Correct!</p>";
    } else {
        isCorrectEl.innerHTML = "<p>Wrong!</p>";
        timeLeft -= 10;
    }
}

// funtion to update quiz question and answer text
function updateQuiz() {
    // increment questionIndex to create next question
    questionIndex++;
    
    // get question element
    var questionEl = document.querySelector(".question");
    // update question
    questionEl.textContent = quizOptions[questionIndex].question;

    // iterate through quiz options to update answer buttons
    for (var i = 0; i < quizOptions[questionIndex].answers.length; i++) {
        var answerBtnEl = document.querySelector("[data-answer-id='" + i + "']");
        answerBtnEl.textContent = quizOptions[questionIndex].answers[i].answer;
    }
}

// function to end quiz
function endQuiz() {
    clearInterval(timeInterval);
    // set score
    score = timeLeft;
    // clear quiz section contents
    while (quizSectionEl.firstChild) {
        quizSectionEl.removeChild(quizSectionEl.firstChild);
    }
}

// function to create list of high scores
function createHighScoresList() {
    // get high scores
    var scores = scoreList;

    // list item counter
    var counter = 1

    // until scores is empty, iterate through to find highest score
    while (scores.length > 0) {
        // index of high score
        var scoreIndex = 0;
        // find highest score
        for (var i = 1; i < scores.length; i++) {
            // compare current highest value to current index
            if (scores[i].score > scores[scoreIndex].score) {
                scoreIndex = i;
                console.log(scores[i].score);
            }
        }
        // remove score from array and create list item with contents
        var scoreItem = scores.splice(scoreIndex, 1);
        createLiEl(scoreItem, counter);

        // increment list item counter
        counter++;
    }
}

// function to create high score list item
function createLiEl(scoreItem, counter) {
    // create list item element
    var scoreItemEl = document.createElement("li");
    
    // add class(es) for styles
    if (!(counter%2 === 0)) {
        scoreItemEl.className = "score-item odd";
    } else {
        scoreItemEl.className = "score-item";
    }

    // add text to list item
    scoreItemEl.textContent = counter + ". " + scoreItem[0].initials.toUpperCase() + "  " + scoreItem[0].score;

    // append list item to unordered list
    highScoresEl.appendChild(scoreItemEl);
}

// timer function
function startTimer() {
    // get time element reference
    var timeEl = document.querySelector("#time");
    // initial time
    timeLeft = 75;
    // display time
    timeEl.textContent = timeLeft

    timeInterval = setInterval(function () {
        // decrement time
        timeLeft--;
        // update timer
        timeEl.textContent = timeLeft
        if (timeLeft < 1) {
            endQuiz();
            clearInterval(timeInterval);
        }
    }, 1000);
}

// function to save scores to local storage
function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scoreList));
}

// function to load scores from local storage
function loadScores() {
    // get scores list from storage
    var savedScores = localStorage.getItem("scores");

    // if savedScores is empty, don't load anything, otherwise load items
    if (savedScores === null) {
        return false;
    }
    scoreList = JSON.parse(savedScores);
}

// event handlers
// function to handle "Start Quiz" button click
function startQuizBtnHandler() {
    // hide start screen
    startTimer();
    toggleSections(instructionsEl, quizSectionEl);
}

// function to handle answer button clicks
function answerBtnHandler(event) {
    // get answer id
    var answerId = parseInt(event.target.getAttribute("data-answer-id"));
    // get answer correct info for corresponding answer button
    var isCorrect = quizOptions[questionIndex].answers[answerId].correct;
    // display answer correct status
    isAnswerCorrect(isCorrect);
    // update quiz question and answer buttons
    if (questionIndex < quizOptions.length - 1) {
        updateQuiz();
    } else {
        // stop timer
        endQuiz();
        
        // update timer display
        document.querySelector("#time").textContent = timeLeft;
        
        // display final score section
        toggleSections(quizSectionEl, finalScoreSectionEl);

        // display final score
        document.querySelector("#score").textContent = score;
    }
}

// function to handle "Submit" button click
function submitBtnHandler() {
    // get initials from input
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        window.alert("Please enter your initials in the box below!");
    } else if (initials.length === 2 || initials.length === 3) {
        // create high score object
        var highScore = {
            initials: initials,
            score: score
        };
        // add high score object to score list
        scoreList.push(highScore);
        saveScores();

        // switch section views
        toggleSections(finalScoreSectionEl, viewScoresSectionEl);
        // hide header
        document.querySelector("header").className = "hide";
    } else {
        window.alert("Make sure you enter 2 or 3 initials.");
    }
}

// function to handle "View high scores" click
function viewScoresBtnHandler() {
    // determine current screen
    if (instructionsEl.classList[0] !== "hide") {
        toggleSections(instructionsEl, viewScoresSectionEl);
    }
    if (quizSectionEl.classList[0] !== "hide") {
        endQuiz();
        toggleSections(quizSectionEl, viewScoresSectionEl);
        // hide header
        document.querySelector("header").className = "hide";
    }
    if (finalScoreSectionEl.classList[0] !== "hide") {
        toggleSections(finalScoreSectionEl, viewScoresEl);
    }
    
}

// event listeners
// listen for "Start Quiz" button click
startQuizBtnEl.addEventListener("click", startQuizBtnHandler);

// listen for answer button clicks
quizSectionEl.addEventListener("click", answerBtnHandler);

// listen for submit button click
submitScoreBtnEl.addEventListener("click", submitBtnHandler);

// listen for "View high scores" button click
viewScoresEl.addEventListener("click", viewScoresBtnHandler);

// load high scores list on app load
loadScores();
