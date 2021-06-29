var startBtn = document.getElementById("startBtn"); //the lines 1-12 are just to state variables for later use in the code
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 20 + 1);
var timerElement = document.getElementById("timer");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;



function startTimer() { //this function, as the name suggests, starts the timer when called, along with starting the quiz itself by calling the makeQuestions function
 
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    //timer set and begins 120 second countdown
    setTimer();

    //create questions to display
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() { //this function adds to the questionNumber var, to iterate, and builds the questions from the questions.js file
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

//This function allows the final score to be displayed when called
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}

//listeners for the startTimer function
startBtn.addEventListener("click", startTimer);
//listener for the submitBtn, which allows the score to be sent to the highscores.html
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    //uses the secondsLeft to display a score (which is the seconds left) and allows the input name to be used as the name
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    //check if there are scores in local storage first and take value
    //if not, make a blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    //push object into score array
    highScores.push(newScore)
    //turns objects into string, stores into localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){ //function to hide the feedback to the user (in relation to current answer)
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){ //function to hide the feedback to the user (in relation to current answer)
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) { //listener for the answer selection, answerChoices
    var pElement = document.getElementsByClassName("feedback")[0]
    
    //shows relevant feedback based on user input, for correct and incorrect answers.
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "YES!";
        setTimeout(hideFeedback,1225);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "WRONG.";
        setTimeout(hideFeedback,1225);
        secondsLeft = secondsLeft - 20;
        showFeedback();
    }    
    makeQuestions(); //calls makeQuestions to make the next question
});