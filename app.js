//Use ES6 classes to define the logic for the application
//Create a quiz class 
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex(){
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex() .isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

//Create a question class
//text: the question itself, choices: the options and answer: correct answer
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

//Display question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        //show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" 
            + i);
            choiceElement.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }

        //call show progress function 
        showProgress();
    }
};

//Guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

//Show quiz progress function
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElemnt = document.getElementById("progress");
    progressElemnt.innerHTML =
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

//show score function
function showScores() {
    let quizEndHTML = 
    `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}

//Create quiz questions
let questions = [
    new Question(
        "What is does HTML stand for?", ["Hyper Text Markup Language", 
        "Hyper Tranform Main Language", "Home Text Mark Language", "Hyper Truck Mixup Language"], "Hyper Text Markup Language"
    ),
    new Question(
        "What is does CSS stand for?", ["Calling Single Sheets", 
        "Casting Style Sheets", "Cascading Style sheets", "Contain Single Style"], "Cascading Style sheets"
    ),
    new Question(
        "What is used to store JavaScript code?", ["Link tags", 
        "a tags", "HTML", "Script tags"], "Script tags"
    ),
    new Question(
        "where is the style tag placed?", ["At the bottom", 
        "Footer", "Inside the body tag", "Inside the head tags"], "Inside the head tags"
    ),
    new Question(
        "which of the following is a JavaScript library?", ["Tailwind css", 
        "React", "Bootstrap", "Github"], "React"
    )
];

let quiz = new Quiz(questions);

//Display question
displayQuestion();

//Add the countdown
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000)
}

startCountDown();