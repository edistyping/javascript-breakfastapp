const questionEl = document.getElementById("question");
const answerFirstButtonEl = document.getElementById("answerFirstButton");
const answerSecondButtonEl = document.getElementById("answerSecondButton");
const answerThirdButtonEl = document.getElementById("answerThirdButton");
const answerFourthButtonEl = document.getElementById("answerFourthButton");

const answerButtons = document.getElementsByName("answerButtons");

const numberOfQuestions = 5;
const questionRange = 25;

var numberOfCorrectAnswers = 0; // This is the number of User's correct answers

var correctAnswer = undefined;
var currentQuestion = 0;
var questions = [];

// Orange: FDB927
// Purple: 552583


// Create an 'num'-sized array between 0 ~ maxNumber without duplicate
function generateNumbers(num, maxNumber) {
    
    let arr_temp = [];    
    let numberRange = maxNumber; 
    // We can't have an 'num'-sized array with unique MaxNumber-ranged numbers  
    if (num > maxNumber) {
        numberRange = num;    
    }
    
    var i = 0;
    while(i < num) {
        var rand0 = Math.floor(Math.random() * numberRange);

        if (arr_temp.includes(rand0) == false) {
            arr_temp.push(rand0);
            i++;
        }
    }        
    return arr_temp;
}

function showQuestionsButtons() {  
    document.getElementsByClassName("container-questions")[0].style.display = "block";
} 
function hideQuestionsButtons() {
    document.getElementsByClassName("container-questions")[0].style.display = "none";
}

function showAnswerButtons() {  
    document.getElementsByClassName("container-answers")[0].style.display = "grid";
} 

function hideAnswerButtons() {
    document.getElementsByClassName("container-answers")[0].style.display = "none";
}
function showReplayContainer() {
    document.getElementsByClassName("container-replay")[0].style.display = "block";   
}
function hideReplayContainer() {
    document.getElementsByClassName("container-replay")[0].style.display = "none";   
}
function hideScores() {
    document.getElementById("numberofCorrectAnswers").style.display = "none";   
}


/* loadQuestions from json file  */
async function loadQuestions() {
    console.log("*loadQuestions() finished...");
    const randomNumbers = generateNumbers(numberOfQuestions, questionRange); 
    // Get Data from json file
    const response = await fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(err => console.log(err));

    for(i= 0; i < numberOfQuestions; i++) { 
        var x = randomNumbers[i];
        questions.push(response[x]); 
    };
}

// when submit is clicked or if 3 seconds are passed, increment currentQuestion 
function displayQuestions() {  
    // currentQuestion < numberOfQuestions
    // Replaced currentQuestion for x
    var temp = questions[currentQuestion].false_answer;    
    const fakeAnswers = temp.split(";");
    const arr_answers = [questions[currentQuestion].answer].concat(fakeAnswers); // both real and fake
    const randomNumbers = generateNumbers(4, 3); // 4 items between 0 to 10        
    correctAnswer = randomNumbers.indexOf(0); // answerFirst, answerSecond, etc.

    questionEl.innerHTML = questions[currentQuestion].question;
    answerFirstButtonEl.innerHTML =  arr_answers[randomNumbers[0]];
    answerSecondButtonEl.innerHTML =  arr_answers[randomNumbers[1]];
    answerThirdButtonEl.innerHTML =  arr_answers[randomNumbers[2]];
    answerFourthButtonEl.innerHTML =  arr_answers[randomNumbers[3]];

}

function displayGameOver() {
    const correctAnswerEl = document.getElementById("numberofCorrectAnswers");
    correctAnswerEl.style.display = "block";
    correctAnswerEl.innerHTML = "Score: " + numberOfCorrectAnswers;

    if (numberOfCorrectAnswers == numberOfQuestions) {
        correctAnswerEl.innerHTML = "You Won. Now get out please";
    } else {
        correctAnswerEl.innerHTML = "Congratulation, you lost";
    }
    
    hideQuestionsButtons();
    hideAnswerButtons();
    showReplayContainer();
    
    // Pause the timer since the game is over
    count = 10;
    pause = true;
}

/* Given User's choice, see if selected the correct answer */
function checkAnswer(choice) { 
    const temp = ["answerFirst", "answerSecond", "answerThird", "answerFourth"];
    if (choice == temp[correctAnswer]) {
        console.log("checkAnswer() ---> User got the answer correct!!!")
        numberOfCorrectAnswers++;
    }
}

// One way to use onclick()
function onClickAnswer(choice) {
    // check if i got the right answer
    checkAnswer(choice);    
    
    // Increment for next Question
    currentQuestion++;
    count = 11;    

    
    if (currentQuestion >= numberOfQuestions) {
        displayGameOver();        
    } else {

        resetTimer();
        displayQuestions();
    }
}

// Another way to use onclick()
const replayButton = document.getElementById("buttonReplay");
replayButton.addEventListener("click", () => {
    // Reset
    currentQuestion = 0;
    numberOfCorrectAnswers = 0;

    hideScores();
    hideReplayContainer();
    showQuestionsButtons();
    showAnswerButtons();
    displayQuestions();
    
    // Restart the timer
    resetTimer();

});


/* Start Game button:  */
const gamestartButton = document.getElementById("gamestartButton");
gamestartButton.addEventListener("click", () => {
    console.log("gamestartButton() clicked...");

    // Hide Start button and show questions
    document.getElementsByClassName("container-header")[0].style.display = "none";
    document.getElementsByClassName("container-quiz")[0].style.display = "block";

    hideReplayContainer();
    showQuestionsButtons();
    displayQuestions();    

    // Timer
    resetTimer();
})

loadQuestions();

var pause = true; //is timer paused
var counter = setInterval(timer, 1000);

var count;

function resetTimer() {
    pause = false;
    count = 10;    
    document.getElementById("textTimer").innerHTML = count;
}

function timer() {
    if (!pause) { //do something if not paused
        count = count - 1;

        if (count == 0) {
            currentQuestion++;
            count = 10;
            displayQuestions();
            //clearInterval(counter);
            
            //setTimeout(countTimers, 6000); //start count from 6 again after 5 sec
            //currentQuestion++; 
        } 
        
        if (currentQuestion >= numberOfQuestions) {
            console.log("Game is over.... ")
            pause = true;
            displayGameOver();
        }



    document.getElementById("textTimer").innerHTML = count;
    
}
}

