//For taking user input
let readLineSync = require('readline-sync');

let kuler = require('kuler');   //Used to add colors in any line

//Creating data set
const database = {
  data : [                 //created an array of objects
     // First question object
    {
      question: `let a = {}, b = {}
      console.log(a == b)
      console.log(a === b)`,
      options: {
        a: "false false",
        b: "true false",
        c: "false true",
        d: "true true"
      },
      correctAnswer: "a"
    },
     // Second question object
    {
      question: "Object.assign(target, source) creates which type of copy?",
      options: {
        a: "Deep Copy",
        b: "Shallow Copy",
        c: "Nested Copy",
        d: "Creates a new reference"
      },
      correctAnswer: "b"
    },

    //Third Question Object
    {
      question: "Is method chaining possible with forEach?",
      options: {
        a: "Yes",
        b: "No"
      },
      correctAnswer: "b"
    }
  ]
}

const userName = readLineSync.question("What's your name? ");
console.log(kuler(`Hello, ${userName} 
Welcome to the QuizWhiz!`, "#dc2626"));


//Creating Leaderboard
const leaderBoard = {
  data : [
    {
      name: "Rohit",
      score: 2
    }, 
    {
      name: "Rahul",
      score: 1
    },
    {
      name: "Rohan",
      score: 3
    }
  ]
}

let score = 0;

// Function to check the user's answer against the correct answer
function playQuiz(userAnswer, correctAnswer){
  if(userAnswer === correctAnswer){
    console.log(kuler("Correct Answer", "#059669"));
    score++;
  }else{
    console.log(kuler("Wrong Answer", "#d52d1a"));
    console.log(kuler(`Correct Answer is ${correctAnswer}`, "#dbde18"));
  }
}


// Function to display the questions and take user input
function showQuestionsAndAnswers(database){

   // Looping through each question in the dataset
  for(let i = 0; i < database.data.length; i++){
    console.log(`\nQ${i+1} -  ${database.data[i].question}\n`);

     // Looping through and displaying all the options for the current question
    for(let key in database.data[i].options){
      console.log(`${key} - ${database.data[i].options[key]}`);
    }

    // Taking user input for the answer and convert user answers into lowercase if he/she entered it in Uppercase
    let userAnswer = readLineSync.question("Enter your answer (a/b/c/d) - ").toLowerCase();

    // Call playQuiz to check if the user's answer is correct
    playQuiz(userAnswer, database.data[i].correctAnswer);
  }
}


showQuestionsAndAnswers(database);

console.log(kuler("\nYour score is " + score + "\n", "#1842de"));

// Function to show and update the scoreboard (leaderboard)
function showScoreBoard(leaderBoard){
  
  // Add the current user's score to the leaderboard
  leaderBoard.data.push({name: userName, score: score});
  
  // Sort the leaderboard in descending order based on the scores
  let sortedList = leaderBoard.data.sort((a,b) => b.score - a.score);
  
  console.log(kuler("Check your posiiton on the Leaderboard\n   ↓↓↓↓", "#1842de"));
  
  for(let leader of sortedList){
    console.log(kuler(`${leader.name} - ${leader.score}`, "#eb58f0"));
  }
}

showScoreBoard(leaderBoard);