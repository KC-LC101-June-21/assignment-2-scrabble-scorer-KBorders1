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

let vowels = ['A', 'E', 'I', 'O', 'U'];
let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let answer = input.question(`Let's play some Scrabble!\n\nEnter a word to score: `);

  while (/[^A-Za-z\s]/.test(answer) === true || answer === "") {
    answer = input.question(`\nNo numbers or special characters please.\n\nEnter a word to score: `);
}

  return answer;

};

let simpleScore = function(word) {
  let score = word.length;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ' ') {
      score -= 1;
    }
  }
  return score;
}


let vowelBonusScore = function(word) {
  let score = 0;
  word = word.toUpperCase();

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
    score += 3;
  } else if (consonants.includes(word[i])) {
    score += 1;
  } else {
    score += 0;
  }
  }
  return score;
};

let scrabbleScore = function(word) {
  let score = 0;
  word = word.toLowerCase();

  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }
  return score;
}

let simple = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore
};

let vowel = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
};

let scrabble = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simple, vowel, scrabble];

function scorerPrompt() {
  
  let prompt = `\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `;
  
  let choice = input.question(prompt);
  
  while (choice === "" || choice < 0 || choice > 2 || isNaN(choice)) {
     choice = input.question(prompt);
  }
  return scoringAlgorithms[choice];
}

function transform(oldObj) {
  let newObj = {};
  let counter = 0;
  let keyValues = Object.keys(oldObj);

  for (item in oldObj) {
    for (let i = 0; i < oldObj[item].length; i++) {
    let temp = oldPointStructure[item][i].toLowerCase();
    newObj[temp] = Number(keyValues[counter]);
  }
  counter ++;
}
  return newObj;
};

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   let wordToScore = initialPrompt();
   let selection = scorerPrompt();
   console.log(`\nScore for '${wordToScore}': ${selection.scoringFunction(wordToScore)}`);
   
  
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

