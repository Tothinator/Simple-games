var playstyle = 0; // 0 is default keyboard playstyle, 1 is button playstyle
var guessedLetters = [];
var guesses = 10;
var answer = "";
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

songArray = ["Space Echo", "Burn Rubber", "Beach", "Sunset Love", "Disco Lover", 
               "Lightning", "Fast Track", "Waves", "Retrochrome", "Hotlines"];

document.addEventListener("DOMContentLoaded", function() {
    setDefaults();
    playstyle = 0;
    document.getElementById("keyboard-instructions").style.display = "inline";
    document.getElementById("button-instructions").style.display = "none";
    document.getElementById("playstyle-btn").textContent = "Play with buttons!";
});

function setDefaults() {
    guesses = 10;
    answer = getRandomWord().toUpperCase();
    console.log("This is the answer! " + answer);
    document.getElementById("guessNumber").textContent = guesses;
    document.getElementById("congrats-message").style.display = "none";
    var guessDivs = document.getElementById("guessed-letters");
    while (guessDivs.firstChild){
        guessDivs.removeChild(guessDivs.firstChild);
    }
    var songDivs = document.getElementById("song-container");
    while (songDivs.firstChild){
        songDivs.removeChild(songDivs.firstChild);
    }
    for (var i = 0; i < guessedLetters.length; i++){
        document.getElementById(guessedLetters[i]).classList.remove("btn-disabled");
    }
    setUpSongDisplay(answer);
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

function getRandomWord() {
    return songArray[Math.floor(Math.random() * songArray.length)];
}

function songGuess(letter) {
    letter = letter.toUpperCase();
    if (answer.includes(letter) && guesses !== 0) {
        revealLetter(letter);
        if (answer === "") {
            document.getElementById("win-or-lose").textContent = "Nice!"
            document.getElementById("congrats-message").style.display = "block";
        }
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

function setUpSongDisplay(song) {
    for (var i = 0; i < song.length; i++){
        var letter = song.charAt(i);
        var newDiv = document.createElement("div");
        var newSpan = document.createElement("span");
        var newImg = document.createElement("img");
        newDiv.classList.add("text-center");
        newSpan.classList.add("large-letter");
        // If there is a space in the song name then we will put a space in the answer container
        if (letter !== ' ') {
            newDiv.classList.add("answer-container");
            newDiv.classList.add("col-1");
            newSpan.classList.add("answer-" + letter);
            // newImg.src = "assets/gifs/" + letter + ".gif";
            // newSpan.style.visibility = "hidden";
        } else {
            newDiv.classList.add("col-1");
            // this is a little dangerous scope wise but it works
            answer = answer.replace(" ", "");
        }
        newSpan.appendChild(newImg);
        newDiv.appendChild(newSpan);
        document.getElementById("song-container").appendChild(newDiv);
    }
}

// When I added the gifs I had to load them in when users input a guess rather 
// than when making the div because I had an issue of them caching and not playing
// the animation of the gif.
function revealLetter(letter) {
    var reg = new RegExp(letter, "g");
    answer = answer.replace(reg, "");
    var revealedLetters = document.getElementsByClassName("answer-" + letter);
    for (var i = 0; i < revealedLetters.length; i++){
        // revealedLetters[i].style.visibility = "visible";
        revealedLetters[i].firstChild.src = "assets/gifs/" + letter + ".gif";
    }
    guessedLetters.push(letter);
    document.getElementById(letter).classList.add("btn-disabled");
}

document.onkeyup = function(event) {
    if (playstyle === 0) {
        songGuess(event.key);
    }
}