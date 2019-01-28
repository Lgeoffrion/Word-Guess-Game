var heroGuessGame = {  

heroChoices: {
      captainamerica: {
          displayName: "Captain America"
      },
      ironman: {
        displayName: "Iron Man"
      },
      thor: {
        displayName: "Thor"
      },
      antman: {
        displayName: "Ant-Man"
      },
      vision: {
        displayName: "Vision"
      },
      blackpanther: {
        displayName: "Black Panther"
      },
      thehulk: {
        displayName: "The Incredible Hulk"
      },
      falcon: {
        displayName: "Falcon"
      },
      spiderman: {
        displayName: "Spider-Man"
      },
      starlord: {
        displayName: "Star Lord"
      },
      groot: {
        displayName: "Groot"
      },
      rocketracoon: {
        displayName: "Rocket Racoon"
      },
      drax: {
        displayName: "Drax the Destroyer"
      },
      gamora: {
        displayName: "Gamora"
      },
      doctorstrange: {
        displayName: "Doctor Strange"
      },
},
  
    wordPlayed: null,
    lettersOfHeroName: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,
  
    // Pick a random hero
    setupGame: function() {
      var objKeys = Object.keys(this.heroChoices);
      this.wordPlayed = objKeys[Math.floor(Math.random() * objKeys.length)];
      console.log(this.wordPlayed)
      this.lettersOfHeroName = this.wordPlayed.split("");
      this.heroToGuess();
      this.updateTotalGuesses();
    },
  
    // Guessing Letters function
    guessingLetters: function(letter) {
    if (this.guessesLeft === 0) {
        this.restartGame();
      }
    else {
        this.updateGuesses(letter);
        this.updateMatchedLetters(letter);
        this.heroToGuess();
    if (this.updateWins() === true) {
          this.restartGame();
        }
      }
    },
  
    // Wrong Guesses
    updateGuesses: function(letter) {
      if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfHeroName.indexOf(letter) === -1)) {   
          this.guessedLetters.push(letter);
          this.guessesLeft--;
        document.querySelector("#guessesLeft").innerHTML = this.guessesLeft;
        document.querySelector("#guessed-letters").innerHTML =
        this.guessedLetters.join(", ");
      }
    },
  
    // how many guesses are given
    updateTotalGuesses: function() {
      this.totalGuesses = 6;
      this.guessesLeft = this.totalGuesses;
  
      // guesses left
      document.querySelector("#guessesLeft").innerHTML = this.guessesLeft;
    },
  
    // Good Guess
    updateMatchedLetters: function(letter) {
      for (var i = 0; i < this.lettersOfHeroName.length; i++) {
        if ((letter === this.lettersOfHeroName[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
          this.matchedLetters.push(letter);
        }
      }
    },
  
    // Hero being guessed
    heroToGuess: function() {
      var wordbeingguessed = "";
      for (var i = 0; i < this.lettersOfHeroName.length; i++) {
        if (this.matchedLetters.indexOf(this.lettersOfHeroName[i]) !== -1) {
            wordbeingguessed += this.lettersOfHeroName[i];
        }
        else {
            wordbeingguessed += "&nbsp;_&nbsp;";
        }
      }
      document.querySelector("#currentHero").innerHTML = wordbeingguessed;
    },
  
    // restart game
    restartGame: function() {
      document.querySelector("#guessed-letters").innerHTML = "";
      this.wordPlayed = null;
      this.lettersOfHeroName = [];
      this.matchedLetters = [];
      this.guessedLetters = [];
      this.guessesLeft = 0;
      this.totalGuesses = 0;
      this.letterGuessed = null;
      this.setupGame();
      this.heroToGuess();
    },
  
     // Won yet?
    updateWins: function() {
      var win;
  
      if (this.matchedLetters.length === 0) {
        win = false;
      }
      else {
        win = true;
      }
      for (var i = 0; i < this.lettersOfHeroName.length; i++) {
        if (this.matchedLetters.indexOf(this.lettersOfHeroName[i]) === -1) {
          win = false;
        }
      }
  
      // Winning the Game
      if (win) {
        this.wins = this.wins + 1;
        document.querySelector("#wins").innerHTML = this.wins;
        document.querySelector("#heroWin").innerHTML = "Our Hero! " + this.heroChoices[this.wordPlayed].displayName;
        return true;
      }
      return false;
    }
  };
  
  heroGuessGame.setupGame();
  
  document.onkeyup = function(event) {
    heroGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    heroGuessGame.guessingLetters(heroGuessGame.letterGuessed);
  };
   