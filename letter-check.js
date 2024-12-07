const MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
};

let currentScore = 0;
let totalAttempts = 0;
let currentLetter = '';

function generateRandomLetter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return characters[Math.floor(Math.random() * characters.length)];
}

function generateOptions(correctMorse) {
    const allMorseCodes = Object.values(MORSE_CODE);
    let options = [correctMorse];
    
    while (options.length < 8) {
        const randomMorse = allMorseCodes[Math.floor(Math.random() * allMorseCodes.length)];
        if (!options.includes(randomMorse)) {
            options.push(randomMorse);
        }
    }
    
    return options.sort(() => Math.random() - 0.5);
}

function updateScore(correct) {
    totalAttempts++;
    if (correct) {
        currentScore++;
    }
    document.getElementById('scoreDisplay').textContent = `${currentScore}/${totalAttempts}`;
    
    const historyMark = document.createElement('div');
    historyMark.className = `history-mark ${correct ? 'correct' : 'incorrect'}`;
    document.getElementById('scoreHistory').appendChild(historyMark);
}

function resetGame() {
    currentScore = 0;
    totalAttempts = 0;
    document.getElementById('scoreDisplay').textContent = '0/0';
    document.getElementById('scoreHistory').innerHTML = '';
    startNewRound();
}

function checkAnswer(selectedMorse, button) {
    const correctMorse = MORSE_CODE[currentLetter];
    const isCorrect = selectedMorse === correctMorse;
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        button.classList.add('correct');
        document.getElementById('currentLetter').classList.add('correct');
    } else {
        button.classList.add('incorrect');
        document.getElementById('currentLetter').classList.add('incorrect');
        buttons.forEach(btn => {
            if (btn.textContent === correctMorse) {
                btn.classList.add('correct');
            }
        });
    }
    
    updateScore(isCorrect);
    
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.classList.remove('correct', 'incorrect');
            btn.disabled = false;
        });
        document.getElementById('currentLetter').classList.remove('correct', 'incorrect');
        startNewRound();
    }, 600);
}

function startNewRound() {
    currentLetter = generateRandomLetter();
    document.getElementById('currentLetter').textContent = currentLetter;
    
    const correctMorse = MORSE_CODE[currentLetter];
    const options = generateOptions(correctMorse);
    
    const optionsGrid = document.getElementById('morseOptions');
    optionsGrid.innerHTML = '';
    
    options.forEach(morse => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        const morseSymbols = morse.replace(/\./g, '•').replace(/\-/g, '—');
        button.textContent = morseSymbols;
        button.style.fontFamily = "'Courier New', monospace";
        button.onclick = () => checkAnswer(morse, button);
        optionsGrid.appendChild(button);
    });
}

function createMorseSymbols(pattern) {
    const container = document.createElement('div');
    container.className = 'morse-symbol';
    
    pattern.split('').forEach(char => {
        const symbol = document.createElement('div');
        symbol.className = char === '.' ? 'history-mark correct' : 'history-mark incorrect';
        container.appendChild(symbol);
    });
    
    return container;
}

function createOptionButton(pattern) {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.appendChild(createMorseSymbols(pattern));
    return btn;
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', startNewRound); 