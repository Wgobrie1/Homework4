var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"), //highscores variable pulls from localstorage to create the variable
    scoreList = document.getElementById("score-list");

//this function sorts the scores from highest to lowest
highScores.sort(function (a, b) {
    return b.score - a.score
})

//this function creates a list to display the scores in, along with the names
for (var s = 0; s < highScores.length; s++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[s].name + " - " + highScores[s].score
    scoreList.appendChild(newLi)
}


// this function clears the localstorage and goes back 1 webpage... it is supposed to at least
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back();
});
//this function just goes back 1 webpage, back to the quiz page
restartBtn.addEventListener("click", function () {
    history.back();
});

//this is its own js file, as a different HTML file is calling it, and the functions within the other js file are not needed on this page