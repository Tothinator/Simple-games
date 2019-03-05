# Simple-games

## About This Project

This project is a webpage with a splash page, and 2 games, Psychic and Word Guess.

### Psychic

Psychic is a simplified word game where the user has 10 guesses to figure out a random letter of the alphabet.
They are able to choose 2 ways to play the game, through keyboard inputs or by pressing buttons.  
The user is able to switch between these methods of input at anytime without losing their current progress on the game or resetting their guesses.
When the user has used all their guesses or has guessed the correct letter, the game will end and a message will appear along with a reset button.  By clicking this button, the user is able to reset the game and play again.


### Word Guess

Word Guess is a slightly more complicate word game where the user has 10 guesses to figure out a song name from the vaporwave/80s retro genre of music.
This is the theme that I went with for the game and there is a total of about 10 songs that will be randomly picked.
Similarly to the Psychic game, when the user guesses a letter in the song name, all instances of that letter will be displayed.  


### How to get started

To get started having fun with the game, users must go to https://tothinator.github.io/Simple-games/ and in the top right of the splash page, choose which game they wish to play.

### Design Choices

I tried to make the design unique and themed to my word bank choice (though mostly the other way around).
I spent some extra time finding a suitable font and animating it for whenever the user found a correct letter.  I did not, however animate the missed guesses as I believe it might cause issues when switching back and forth between the 2 input types.


### Code Design

As I am new to Javascript, I can see my code is kind of a mess, even though it's functional.  A lot of the functions spend time switching visibility/display to hidden/none.  
Definite improvements can be made by this by making a function that takes an element or a list of elements that would switch the visibility/display of these elements, rather than setting them manually.
Also, most of javascript across both .js files is redundant, however I separated an early js file premateurly to keep the code sorted for testing purposes and have no immediate plans to combine them.


### Possible future improvements

1. Obtain the audio files for the songs in the word bank and allow the user to play this song if they succeed in guessing the song name.
2. Getting rid of the underscores beneath the animated letters when they are guess would improve the visual aspect.
3. Getting a better background the for content on the bottom of the page to make it more readable.
4. Make the game more mobile friendly
