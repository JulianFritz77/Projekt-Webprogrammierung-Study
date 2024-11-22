const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainer = document.getElementById('question-container')
const startScreen = document.getElementById('start-screen')
const endScreen = document.getElementById('end-screen')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex, correctAnswers

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nächsteFrage()
})
restartButton.addEventListener('click', startGame)

function startGame() {
    startScreen.classList.add('hide')
    endScreen.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    correctAnswers = 0
    questionContainer.classList.remove('hide')
    nächsteFrage()
}

function nächsteFrage() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(questionContainer)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct === 'true'
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true')
    })
    if (correct) correctAnswers++
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        showEndScreen()
    }
}

function showEndScreen() {
    questionContainer.classList.add('hide')
    endScreen.classList.remove('hide')
    scoreElement.innerText = `Du hast ${correctAnswers} von ${shuffledQuestions.length} richtig beantwortet!`
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}



/* Fragekatalog zu Ernährung und Gesundheit */

const questions = [
    {
        question: 'Wie viele Kalorien hat ein Gramm Fett?',
        answers: [
            { text: '4 Kalorien', correct: false },
            { text: '9 Kalorien', correct: true },
            { text: '7 Kalorien', correct: false },
            { text: '5 Kalorien', correct: false }
        ]
    },
    {
        question: 'Welches Vitamin ist besonders wichtig für das Immunsystem?',
        answers: [
            { text: 'Vitamin A', correct: false },
            { text: 'Vitamin C', correct: true },
            { text: 'Vitamin D', correct: false },
            { text: 'Vitamin K', correct: false }
        ]
    },
    {
        question: 'Wieb viel Prozent Wasser enthält der menschliche Körper ungefähr?',
        answers: [
            { text: '50%', correct: false },
            { text: '60%', correct: true },
            { text: '70%', correct: false },
            { text: '80%', correct: false }
        ]
    },
    {
        question: 'Welche dieser Nahrungsmittel sind gute Proteinquellen?',
        answers: [
            { text: 'Nüsse', correct: true },
            { text: 'Äpfel', correct: false },
            { text: 'Bananen', correct: false },
            { text: 'Kartoffeln', correct: false }
        ]
    },
    {
        question: 'Was ist der Hauptbestandteil von Bananen?',
        answers: [
            { text: 'Protein', correct: false },
            { text: 'Fett', correct: false },
            { text: 'Kohlenhydrate', correct: true },
            { text: 'Ballaststoffe', correct: false }
        ]
    },
    {
        question: 'Welches Mineral ist wichtig für starke Knochen?',
        answers: [
            { text: 'Kalzium', correct: true },
            { text: 'Eisen', correct: false },
            { text: 'Magnesium', correct: false },
            { text: 'Natrium', correct: false }
        ]
    },
    {
        question: 'Was ist eine empfohlene Tagesmenge an Wasser für Erwachsene?',
        answers: [
            { text: '1 Liter', correct: false },
            { text: '1,5 Liter', correct: false },
            { text: '2 Liter', correct: true },
            { text: '3 Liter', correct: false }
        ]
    },
    {
        question: 'Welche dieser Lebensmittel sind reich an Omega-3-Fettsäuren?',
        answers: [
            { text: 'Lachs', correct: true },
            { text: 'Apfel', correct: false },
            { text: 'Brot', correct: false },
            { text: 'Milch', correct: false }
        ]
    },
    {
        question: 'Welches dieser Vitamine wird vom Körper selbst durch Sonnenlicht produziert?',
        answers: [
            { text: 'Vitamin A', correct: false },
            { text: 'Vitamin C', correct: false },
            { text: 'Vitamin D', correct: true },
            { text: 'Vitamin B12', correct: false }
        ]
    },
    {
        question: 'Welches Gemüse enthält besonders viel Eisen?',
        answers: [
            { text: 'Karotten', correct: false },
            { text: 'Brokkoli', correct: false },
            { text: 'Spinat', correct: true },
            { text: 'Tomaten', correct: false }
        ]
    },
    {
        question: 'Welches dieser Lebensmittel ist eine gute Quelle für Ballaststoffe?',
        answers: [
            { text: 'Weißbrot', correct: false },
            { text: 'Vollkornbrot', correct: true },
            { text: 'Butter', correct: false },
            { text: 'Käse', correct: false }
        ]
    },
    {
        question: 'Welches Vitamin ist für die Blutgerinnung wichtig?',
        answers: [
            { text: 'Vitamin A', correct: false },
            { text: 'Vitamin C', correct: false },
            { text: 'Vitamin K', correct: true },
            { text: 'Vitamin D', correct: false }
        ]
    },
    {
        question: 'Wie viele Hauptmahlzeiten werden im Allgemeinen pro Tag empfohlen?',
        answers: [
            { text: '1-2', correct: false },
            { text: '2-3', correct: false },
            { text: '3-5', correct: true },
            { text: '5-7', correct: false }
        ]
    },
    {
        question: 'Welcher Nährstoff ist die Hauptenergiequelle für den Körper?',
        answers: [
            { text: 'Fette', correct: false },
            { text: 'Proteine', correct: false },
            { text: 'Kohlenhydrate', correct: true },
            { text: 'Vitamine', correct: false }
        ]
    },
    {
        question: 'Was ist die empfohlene tägliche Zufuhr von Obst und Gemüse?',
        answers: [
            { text: '1 Portion', correct: false },
            { text: '2 Portionen', correct: false },
            { text: '3-5 Portionen', correct: true },
            { text: '6-8 Portionen', correct: false }
        ]
    },
    {
        question: 'Welcher Nährstoff hilft beim Aufbau und Erhalt von Muskelmasse?',
        answers: [
            { text: 'Kohlenhydrate', correct: false },
            { text: 'Proteine', correct: true },
            { text: 'Fette', correct: false },
            { text: 'Ballaststoffe', correct: false }
        ]
    },
    {
        question: 'Welche Art von Fett sollte man in der Ernährung bevorzugen?',
        answers: [
            { text: 'Transfette', correct: false },
            { text: 'Gesättigte Fette', correct: false },
            { text: 'Ungesättigte Fette', correct: true },
            { text: 'Hydrierte Fette', correct: false }
        ]
    },
    {
        question: 'Was ist der Hauptbestandteil von Olivenöl?',
        answers: [
            { text: 'Gesättigte Fette', correct: false },
            { text: 'Transfette', correct: false },
            { text: 'Ungesättigte Fette', correct: true },
            { text: 'Omega-6-Fettsäuren', correct: false }
        ]
    },
    {
        question: 'Welches Getränk ist die beste Wahl zur Hydratation?',
        answers: [
            { text: 'Limonade', correct: false },
            { text: 'Wasser', correct: true },
            { text: 'Kaffee', correct: false },
            { text: 'Bier', correct: false }
        ]
    },
    {
        question: 'Welche dieser Vitamine sind wasserlöslich?',
        answers: [
            { text: 'Vitamin A und D', correct: false },
            { text: 'Vitamin C und B', correct: true },
            { text: 'Vitamin E und K', correct: false },
            { text: 'Vitamin D und K', correct: false }
        ]
    }
];






 /* Hamburger - Aktivierung - onclick - öffnen und schließen des Menüs */
  /* Erst - festlegen dass das Dokument komplett gelden sein muss bis JS startet (DOMContentLoaded) + 
  Holen der verschiedenen classes mit .querySelector und festlegen mit const */
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navElements = document.querySelector('.nav-elements ul');

    hamburger.addEventListener('click', function() {
        navElements.classList.toggle('show');
        console.log('Hamburger Menu clicked');

// Überprüfe, ob die Klasse .show hinzugefügt wurde
                if (navElements.classList.contains('show')) {
// Menü ist geöffnet, Scrolling auf der Seite deaktivieren
                  document.body.style.overflow = 'hidden';
              } else {
// Menü ist geschlossen, Scrolling auf der Seite wieder aktivieren
                  document.body.style.overflow = '';
             }
    });
});

