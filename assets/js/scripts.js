// global variables
var instructionsEl = document.querySelector("#instructions");
var startQuizBtnEl = document.querySelector("#start");
var quizSectionEl = document.querySelector("#quiz");
var submitScoreSectionEl = document.querySelector("#submit-score");
var viewScoresSectionEl = document.querySelector("#high-scores");
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
var questionIndex = 0;

// functions
// function to toggle active/inactive sections
function toggleSections(hideSection, showSection) {
    hideSection.className = "hide";
    showSection.classList.remove("hide");

    // call function to create active section
    if (showSection === quizSectionEl) {
        createQuiz();
    }
    else if (showSection === submitScoreSectionEl) {
        console.log(true);
    }
    else if (showSection === viewScoresSectionEl) {
        console.log(true);
    }
}

// function to create quiz q and a screen
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
    }
}
// funtion to update quiz q and a text
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

// event handlers
// function to handle "Start Quiz" button click
function startQuizBtnHandler() {
    // hide start screen
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
    }
}

// event listeners
// listen for "Start Quiz" button click
startQuizBtnEl.addEventListener("click", startQuizBtnHandler);

// listen for answer button clicks
quizSectionEl.addEventListener("click", answerBtnHandler);