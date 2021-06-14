// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelPointStructure = {
  3: ['A', 'E', 'I', 'O', 'U'],
  1: ['L', 'N', 'R', 'S', 'T', 'D', 'G', 'B', 'C', 'M', 'P', 'F', 'H', 'V', 'W', 'Y', 'K', 'J', 'X', 'Q', 'Z']
}

let word = '';
let scoringSystem = '';

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let numberPoints = 0
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      numberPoints += Number(pointValue);
		 }
   }
	}
	return numberPoints;
 }
// console.log(oldScrabbleScorer('foo'))
// console.log(oldScrabbleScorer('bar'))
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
  let simplePoints = "";
  for (let i = 0; i < word.length; i++) {
    simpleScoreWordTotal += 1;
    simplePoints += `Points for '${word[i]}': ${pointsPerLetter}\n`;
  }
  return simpleScoreWordTotal;
};
// console.log(simpleScore('foo') + ' points')
// console.log(simpleScore('bar') + ' points')


let vowelBonusScore = function (word) {
  word = word.toUpperCase();
  let vowelScoreWordTotal = 0;
  let consonantPoint = 1;
  let vowelPoints = "";
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in vowelPointStructure) {
      if (vowelPointStructure[pointValue].includes(word[i])) {
        vowelPoints += `Points for '${word[i]}': ${pointValue}\n`;
        vowelScoreWordTotal += Number(pointValue);
      }
    }
  }
  return vowelScoreWordTotal;
};

// console.log(vowelBonusScore('foo') + ' points'); // <-- should be 7
// console.log(vowelBonusScore('bar') + ' points'); // <-- should be 5

let scrabbleScore;

const scoringAlgorithms = [

  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: function (word) {
      word = word.toUpperCase();
      let simpleScoreWordTotal = 0;
      let pointsPerLetter = 1;
      let simplePoints = "";
      for (let i = 0; i < word.length; i++) {
      simpleScoreWordTotal += 1;
      simplePoints += `Points for '${word[i]}': ${pointsPerLetter}\n`;
      }
    return simpleScoreWordTotal;
    }
  },

  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: function (word) {
      word = word.toUpperCase();
      let vowelScoreWordTotal = 0;
      let consonantPoint = 1;
      let vowelPoints = "";
      for (let i = 0; i < word.length; i++) {
        for (const pointValue in vowelPointStructure) {
          if (vowelPointStructure[pointValue].includes(word[i])) {
            vowelPoints += `Points for '${word[i]}': ${pointValue}\n`;
            vowelScoreWordTotal += Number(pointValue);
          }
        }
      }
      return vowelScoreWordTotal;
    }
  },

  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: function (word) {
      word = word.toLowerCase();
      let scrabbleScoreTotal = 0;
      for (let i = 0; i < word.length; i++) {
      //console.log(newPointStructure[word[i]])
      scrabbleScoreTotal += newPointStructure[word[i]]
      }
      return scrabbleScoreTotal;
      // word = word.toUpperCase();
      // let letterPoints = "";
      // let scrabbleScoreTotal = 0;
      // for (let i = 0; i < word.length; i++) {
    
      //   for (const pointValue in oldPointStructure) {
    
      //   if (oldPointStructure[pointValue].includes(word[i])) {
      //     letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      //     scrabbleScoreTotal += Number(pointValue);
      //   }
      // }
      // }
      // return scrabbleScoreTotal;
    }
  }

];

function scorerPrompt() {
  scoringSystem = input.question('Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ');
  console.log(`Score for '${word}': ${scoringAlgorithms[scoringSystem].scorerFunction(word)}`);
}

let modifiedPointStructure = {};

function transform() {
  for (keys in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[keys].length; i++) {
      // console.log(oldPointStructure[keys][i].toLowerCase()); // Shows the individual letter values from old oldPointStructure
      if ('aelioulnrst'.split('').includes(oldPointStructure[keys][i].toLowerCase())) {
        modifiedPointStructure[String(oldPointStructure[keys][i].toLowerCase())] = 1; // Puts the key:value pairs into the object.
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
      }
    }
  }
  return modifiedPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt();
  console.log('Tests:\n');
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

