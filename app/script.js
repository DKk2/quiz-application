document.addEventListener('DOMContentLoaded', function() {
    const quizQuestions = [
        {
            question: "What is the size of int in Java?",
            options: ["4 bytes", "2 bytes", "8 bytes", "Depends on the system"],
            correctAnswer: 0
        },
        {
            question: "Which keyword is used for inheritance in Java?",
            options: ["implements", "extends", "inherits", "parent"],
            correctAnswer: 1
        },
        {
            question: "What is the default value of a boolean variable in Java?",
            options: ["true", "false", "null", "0"],
            correctAnswer: 1
        },
        {
            question: "Which of the following is not a Java feature?",
            options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic"],
            correctAnswer: 1
        },
        {
            question: "What is the return type of the hashCode() method in the Object class?",
            options: ["int", "Object", "long", "void"],
            correctAnswer: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    function loadQuestion() {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('answer-buttons');

        if (!questionElement || !optionsElement) {
            console.error("Error: Question or options element not found.");
            return;
        }

        questionElement.innerHTML = quizQuestions[currentQuestion].question;
        optionsElement.innerHTML = '';

        quizQuestions[currentQuestion].options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.innerText = option;
            button.onclick = () => selectAnswer(index);

            if (userAnswers[currentQuestion] === index) {
                button.classList.add('selected');
            }
            optionsElement.appendChild(button);
        });

        document.getElementById('progress').innerText = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    }

    function selectAnswer(index) {
        userAnswers[currentQuestion] = index;
        loadQuestion();
    }

    function nextQuestion() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            console.log("Error: Reached the last question.");
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    }

    function submitQuiz() {
        let resultHTML = '<h2>Your score: ' + calculateScore() + '/' + quizQuestions.length + '</h2>';
        quizQuestions.forEach((question, index) => {
            resultHTML += `<p><b>Q${index + 1}:</b> ${question.question}</p>`;
            resultHTML += `<p>Your answer: <b>${question.options[userAnswers[index]] || "No answer"}</b></p>`;
            resultHTML += `<p>Correct answer: <b>${question.options[question.correctAnswer]}</b></p><hr>`;
        });

        document.getElementById('quiz').style.display = 'none';
        document.getElementById('result').innerHTML = resultHTML;
    }

    function calculateScore() {
        score = 0;
        quizQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    }

    function startQuiz() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        loadQuestion();
    }

    // Attach functions to window object
    window.startQuiz = startQuiz;
    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    window.submitQuiz = submitQuiz;
});
