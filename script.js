let currentScore = 0;
let currentQuestion = null;
let usedPatterns = new Set();
const totalPatterns = Object.keys(morseCode).length;

// Only initialize quiz if we're on the quiz page
if (document.querySelector('#codeQuiz')) {
    initializeCodeQuiz();
}

function initializeCodeQuiz() {
    generateNewCodeQuestion();
}

function generateNewCodeQuestion() {
    if (usedPatterns.size === totalPatterns) {
        usedPatterns.clear();
    }

    const letters = Object.keys(morseCode);
    let correctLetter;
    
    do {
        correctLetter = letters[Math.floor(Math.random() * letters.length)];
    } while (usedPatterns.has(correctLetter));
    
    usedPatterns.add(correctLetter);
    const correctPattern = morseCode[correctLetter];
    
    let options = [correctLetter];
    while (options.length < 6) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        if (!options.includes(randomLetter)) {
            options.push(randomLetter);
        }
    }
    
    options = options.sort(() => Math.random() - 0.5);
    
    currentQuestion = {
        pattern: correctPattern,
        correct: correctLetter
    };
    
    document.getElementById('morsePattern').textContent = correctPattern;
    
    const optionsGrid = document.querySelector('.options-grid');
    optionsGrid.innerHTML = '';
    
    options.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = letter;
        button.onclick = () => checkCodeAnswer(letter);
        optionsGrid.appendChild(button);
    });
}

function checkCodeAnswer(selectedLetter) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.correct) {
            button.classList.add('correct');
        } else if (button.textContent === selectedLetter) {
            button.classList.add('incorrect');
        }
    });
    
    if (selectedLetter === currentQuestion.correct) {
        currentScore++;
        document.getElementById('scoreDisplay').textContent = currentScore;
    }
    
    setTimeout(() => {
        generateNewCodeQuestion();
    }, 1500);
} 