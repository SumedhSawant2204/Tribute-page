const questions = [
    
    {
        question: "What is the full name of Dr. Abdul Kalam?",
        answers: [
            { text: "Avul Jakir Jalaluddin Kalam", correct: false},
            { text: "Avul Pakir Jainulabdeen Abdul Kalam", correct: true},
            { text: "Abdul Sakir Jainulabdeen Kalam", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "When was Dr. A.P.J. Abdul Kalam born?",
        answers: [
            { text: "15 October 1931", correct: true},
            { text: "2 September 1929", correct: false},
            { text: "15 August 1923", correct: false},
            { text: "29 February 1936", correct: false},
        ]
    },
    {
        question: "Which of the following book is not written by Dr. A.P.J. Abdul Kalam?",
        answers: [
            { text: "Failure to Success: Legendary Lives", correct: false},
            { text: "You Are Born to Blossom", correct: false},
            { text: "Ignited Minds", correct: false},
            { text: "A House for Mr. Biswas", correct: true},
        ]
    },
    {
        question: "Which of the following award is not given to Dr. A.P.J. Abdul Kalam?",
        answers: [
            { text: "Padma Bhushan", correct: false},
            { text: "Padma Vibhushan", correct: false},
            { text: "Shanti Swaroop Bhatnagar", correct: true},
            { text: "Bharat Ratna", correct: false},
        ]
    },
    {
        question: "Dr. A.P.J. Abdul Kalam was the ......President of India.",
        answers: [
            { text: "9th", correct: false},
            { text: "10th", correct: false},
            { text: "11th", correct: true},
            { text: "12th", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();

}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
    handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
