var playstyle = 0; // 0 is default keyboard playstyle, 1 is button playstyle
var guessedLetters = [];
var guesses = 10;
var answer = "";
letters = "abcdefghijklmnopqrstuvwxyz";

document.addEventListener("DOMContentLoaded", function() {
    setDefaults();
    playstyle = 0;
    document.getElementById("keyboard-instructions").style.display = "inline";
    document.getElementById("button-instructions").style.display = "none";
    document.getElementById("btn-container").style.display = "none";
    document.getElementById("playstyle-btn").textContent = "Play with buttons!";
});

function setDefaults() {
    guesses = 10;
    answer = setRandomLetter();
    console.log("This is the answer! " + answer);
    // document.getElementById("answer").textContent = answer.toUpperCase();
    document.getElementById("guessNumber").textContent = guesses;
    // document.getElementById("answer").style.visibility = "hidden";
    document.getElementById("congrats-message").style.display = "none";
    var guessDivs = document.getElementById("guessed-letters");
    while (guessDivs.firstChild){
        guessDivs.removeChild(guessDivs.firstChild);
    }
    for (var i = 0; i < guessedLetters.length; i++){
        document.getElementById(guessedLetters[i]).classList.remove("btn-disabled");
    }
    guessedLetters = [];
}

function changePlaystyle() {
    if (playstyle === 0) {
        document.getElementById("keyboard-instructions").style.display = "none";
        document.getElementById("button-instructions").style.display = "inline";
        document.getElementById("btn-container").style.display = "block";
        document.getElementById("guessed-letters-title").style.display = "none";
        document.getElementById("guessed-letters").style.display = "none";
        document.getElementById("playstyle-btn").textContent = "Play with Keyboard!";
        playstyle++;
    } else {
        document.getElementById("keyboard-instructions").style.display = "inline";
        document.getElementById("button-instructions").style.display = "none";
        document.getElementById("btn-container").style.display = "none";
        document.getElementById("guessed-letters-title").style.display = "block";
        document.getElementById("guessed-letters").style.display = "flex";
        document.getElementById("playstyle-btn").textContent = "Play with buttons!";
        playstyle--;
    }
    console.log(playstyle);
}

function getRandomLetter() {
    return letters.charAt(Math.floor(Math.random() * letters.length));
}

function setRandomLetter() {
    answerSpan = document.getElementById("answer");
    if (answerSpan.firstChild) {
        answerSpan.removeChild(answerSpan.firstChild);
    }
    answer = letters.charAt(Math.floor(Math.random() * letters.length));
    var node = document.createElement("img");
    answerSpan.appendChild(node);
    return answer;
}

function letterGuess(letter) {
    if (letter === answer && guesses !== 0) {
        // ended up changing this process to mimic the wordguess js to load the gif in at the time of guessing
        // instead of revealing it with visibility style changes.
        document.getElementById("answer").firstChild.src = "assets/gifs/" + answer.toLocaleUpperCase() + ".gif";
        document.getElementById("win-or-lose").textContent = "Nice!"
        document.getElementById("congrats-message").style.display = "block";
    } else if (guesses !== 0) {
        addGuess(letter);
        document.getElementById("guessNumber").textContent = guesses;
    }
    if (guesses === 0) {
        document.getElementById("win-or-lose").textContent = "Sorry!"
        document.getElementById("congrats-message").style.display = "block";
    } 
}

function addGuess(letter) {
    if (letters.includes(letter) && guessedLetters.indexOf(letter) < 0) {
        guesses--;
        guessedLetters.push(letter);
        var node = document.createElement("div");
        node.appendChild(document.createTextNode(letter.toUpperCase()));
        node.classList.add("col-1");
        node.classList.add("text-center");
        node.classList.add("large-letter");
        document.getElementById("guessed-letters").appendChild(node);
        document.getElementById(letter).classList.add("btn-disabled");
    }
}

document.onkeyup = function(event) {
    if (playstyle === 0) {
        letterGuess(event.key);
    }
}