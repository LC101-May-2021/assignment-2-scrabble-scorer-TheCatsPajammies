// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
  // 0: [' '] <-- adds blank space = 0 bonus mission.
};

let word = '';
let scoringSystem;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
  let numberPoints = 0 
	for (let i = 0; i < word.length; i++) {
 	  for (const pointValue in oldPointStructure) {
 		  if (oldPointStructure[pointValue].includes(word[i])) {
        numberPoints += Number(pointValue);
		  }
    }
	}
	return numberPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
  return word;
};

let simpleScore = function (word) {
  word = word.toUpperCase();
  let simpleScoreWordTotal = 0;
  let pointsPerLetter = 1;
  for (let i = 0; i < word.length; i++) {
    simpleScoreWordTotal += 1;
  }
  return simpleScoreWordTotal;
};

let vowelBonusScore = function (word) {
  word = word.toUpperCase();
  let vowelScoreWordTotal = 0;
  let vowels = 'AEIOU'.split('');
  for (let i = 0; i < word.length; i++) {
    let vowelScorer = (vowels.includes(word[i])) ? vowelScoreWordTotal += 3: vowelScoreWordTotal += 1;
  } 
  return vowelScoreWordTotal;
};

let scrabbleScore = function (word) {
  word = word.toLowerCase();
  let scrabbleScoreTotal = 0;
  for (let i = 0; i < word.length; i++) {
  scrabbleScoreTotal += newPointStructure[word[i]]
  }
  return scrabbleScoreTotal;
};

const scoringAlgorithms = [

  {
    name: "Simple Score", 
    description: "Each letter is worth 1 point.", 
    scoringFunction: simpleScore
  },

  {
    name: "Bonus Vowels", 
    description: "Vowels are 3 pts, consonants are 1 pt.", 
    scoringFunction: vowelBonusScore
  },

  {
    name: "Scrabble", 
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
  }

];

function scorerPrompt() {
  while (scoringSystem < 0 || scoringSystem > 2 || isNaN(scoringSystem)) {
    scoringSystem = input.question('Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ');
  }
  console.log(`Score for '${word}': ${scoringAlgorithms[scoringSystem].scoringFunction(word)}`);
}

let modifiedPointStructure = {};

function transform(oldPointStructure) {
  for (keys in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[keys].length; i++) {
      if ('aelioulnrst'.split('').includes(oldPointStructure[keys][i].toLowerCase())) {
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 1;
      } else if ('dg'.split('').includes(oldPointStructure[keys][i].toLowerCase())) {
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 2;
      } else if ('bcmp'.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 3;
      } else if ('fhvwy'.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 4;
      } else if ('k'.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 5;
      } else if ('jx'.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 8;
      } else if ('qz'.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 10;
      } //else if (' '.split('').includes(oldPointStructure[keys][i].toLowerCase())) { 
      //   modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 0;
      // } <---These lines add the blank space = 0 Bonus mission.

    }
  }
  return modifiedPointStructure;
}

let newPointStructure = transform(oldPointStructure);



function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

