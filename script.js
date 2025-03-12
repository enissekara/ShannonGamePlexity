let wordPairs = {};
let currentWord = "";
let correctGuesses = 0;
let totalGuesses = 0;

function startGame() {
    let text = document.getElementById("textInput").value.toLowerCase();
    let words = text.split(/\s+/);

    wordPairs = {};
    for (let i = 0; i < words.length - 1; i++) {
        if (!wordPairs[words[i]]) {
            wordPairs[words[i]] = [];
        }
        wordPairs[words[i]].push(words[i + 1]);
    }

    document.getElementById("gameArea").classList.remove("hidden");
    askQuestion();
}

function askQuestion() {
    let keys = Object.keys(wordPairs);
    if (keys.length === 0) return;

    currentWord = keys[Math.floor(Math.random() * keys.length)];
    document.getElementById("question").textContent = `"${currentWord}" kelimesinden sonra hangi kelime gelir?`;
}

function checkAnswer() {
    let userGuess = document.getElementById("answer").value.toLowerCase();
    let resultText = document.getElementById("result");

    if (!wordPairs[currentWord]) return;

    if (wordPairs[currentWord].includes(userGuess)) {
        resultText.textContent = "Doğru!";
        resultText.className = "correct";
        correctGuesses++;
    } else {
        resultText.textContent = `Yanlış! Doğru kelimeler: ${wordPairs[currentWord].join(", ")}`;
        resultText.className = "wrong";
    }
    totalGuesses++;

    let perplexity = calculatePerplexity(correctGuesses, totalGuesses);
    document.getElementById("perplexity").textContent = `Perplexity: ${perplexity}`;

    askQuestion();
}

function calculatePerplexity(correct, total) {
    if (total === 0 || correct === 0) {
        return "∞"; // sıfıra bölme hatası olursa sonsuz simgesi gösteriyor
    }
    return (1 / (correct / total)).toFixed(2);
}
