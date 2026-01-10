---
layout: base
title: Whack-a-Bug
Author: Avantika Chittari
permalink: /candyland/whack-a-candy
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whack-a-Candy</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(to bottom, #ffe6f2 0%, #ffd6f0 100%);
            font-family: "Comic Sans MS", cursive;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        #gameContainer {
            padding: 30px;
            background: #fff0fa;
            border: 6px solid #ffb3e6;
            border-radius: 25px;
            width: 450px;
            max-width: 100%;
            box-shadow: 0 10px 40px rgba(255, 105, 180, 0.3);
            position: relative;
            overflow: hidden;
            min-height: 500px;
        }

        /* --- START SCREEN OVERLAY --- */
        #start-screen {
            position: absolute;
            inset: 0;
            background: #fff0fa;
            z-index: 100;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        h1 {
            color: #ff69b4;
            text-shadow: 2px 2px #ffc6e9;
            font-size: 2.5em;
            margin-bottom: 20px;
        }

        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
        }

        #score, #timer {
            font-size: 1.5em;
            color: #ff5ca8;
            font-weight: bold;
            background: white;
            padding: 10px 20px;
            border-radius: 15px;
            border: 3px solid #ffb3e6;
        }

        #timer.warning {
            background: #ffe0e0;
            border-color: #ff6b6b;
            color: #c23616;
            animation: pulse-warning 0.5s infinite;
        }

        @keyframes pulse-warning {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        #startBtn, .start-game-btn {
            margin: 20px 0;
            padding: 15px 35px;
            font-size: 1.3em;
            background: linear-gradient(to bottom, #ff85c2, #ff5ca8);
            color: white;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            box-shadow: 0 6px #ff3d93;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            transition: all 0.1s;
        }

        #startBtn:hover:not(:disabled), .start-game-btn:hover {
            background: linear-gradient(to bottom, #ff6bb5, #ff4d9c);
        }

        #startBtn:active, .start-game-btn:active {
            box-shadow: 0 2px #ff3d93;
            transform: translateY(4px);
        }

        #grid {
            width: 360px;
            max-width: 100%;
            margin: 20px auto;
            display: grid;
            grid-template-columns: repeat(3, 110px);
            gap: 15px;
            justify-content: center;
        }

        .square {
            width: 110px;
            height: 110px;
            background: #ffe1f7;
            border: 4px solid #ffb3e6;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 65px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .square:hover {
            background: #ffd6f4;
            transform: scale(1.05);
        }

        .square.bug {
            background: #fff5cc;
            animation: wiggle 0.5s infinite;
        }

        @keyframes wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }

        /* Quiz Modal */
        .quiz-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 1500;
            justify-content: center;
            align-items: center;
        }

        .quiz-modal.show {
            display: flex;
        }

        .quiz-content {
            background: #fff0fa;
            padding: 40px;
            border-radius: 25px;
            border: 6px solid #ff69b4;
            box-shadow: 0 0 50px rgba(255, 105, 180, 0.8);
            max-width: 600px;
            width: 90%;
            animation: slideIn 0.5s ease;
        }

        .quiz-content h2 {
            color: #ff69b4;
            font-size: 2em;
            margin-bottom: 20px;
            text-shadow: 2px 2px #ffc6e9;
        }

        .quiz-question {
            background: white;
            padding: 20px;
            border-radius: 15px;
            border: 3px solid #ffb3e6;
            margin-bottom: 20px;
            font-size: 1.2em;
            color: #333;
            text-align: left;
            line-height: 1.6;
        }

        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }

        .quiz-option {
            background: linear-gradient(to right, #ffe1f7, #ffd6f4);
            border: 3px solid #ffb3e6;
            padding: 15px 20px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 1.1em;
            text-align: left;
            transition: all 0.2s;
            font-family: "Comic Sans MS", cursive;
        }

        .quiz-option:hover {
            background: linear-gradient(to right, #ffd6f4, #ffb3e6);
            transform: translateX(5px);
        }

        .quiz-option.correct {
            background: linear-gradient(to right, #90EE90, #7FFF7F);
            border-color: #32CD32;
        }

        .quiz-option.incorrect {
            background: linear-gradient(to right, #ffb3b3, #ff8080);
            border-color: #ff4d4d;
        }

        .quiz-option.disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }

        .quiz-feedback {
            background: white;
            padding: 15px;
            border-radius: 15px;
            border: 3px solid #ffb3e6;
            margin-bottom: 20px;
            font-size: 1.1em;
            color: #333;
            font-weight: bold;
        }

        .quiz-feedback.correct {
            background: #e8f5e9;
            border-color: #32CD32;
            color: #2e7d32;
        }

        .quiz-feedback.incorrect {
            background: #fce4ec;
            border-color: #ff4d4d;
            color: #c62828;
        }

        .quiz-continue {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            border-radius: 20px;
            cursor: pointer;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.2s;
        }

        .quiz-continue:hover {
            transform: scale(1.05);
        }

        /* Completion Screen */
        .completion-screen {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .completion-screen.show {
            display: flex;
        }

        .completion-content {
            background: white;
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            border: 8px solid #ff69b4;
            box-shadow: 0 0 50px rgba(255, 105, 180, 0.8);
            max-width: 500px;
            width: 90%;
            animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .completion-content h2 {
            font-size: 2.5em;
            color: #ff69b4;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .completion-content p {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 25px;
        }

        .badges-earned {
            margin: 20px 0;
        }

        .badge-earned {
            display: inline-block;
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            padding: 15px 25px;
            border-radius: 15px;
            margin: 10px;
            font-size: 1.2em;
            box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4);
            font-weight: 600;
        }

        .confetti {
            font-size: 2em;
            margin: 20px 0;
        }

        button.continue-btn, button.retry-btn {
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
            font-family: 'Comic Sans MS', cursive;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            font-weight: bold;
            transition: all 0.2s;
        }

        .continue-btn {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
        }

        .retry-btn {
            background: linear-gradient(to bottom, #ff85c2, #ff5ca8);
        }

        .continue-btn:hover, .retry-btn:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <!-- START SCREEN OVERLAY (PHASE 1) -->
        <div id="start-screen">
            <h1>🍭 Whack-a-Candy 🍬</h1>
            <p style="margin-bottom: 20px; font-weight: bold; color: #ff5ca8;">Catch the bugs to earn sweet rewards!</p>
            <button class="start-game-btn" id="realStartBtn">Start Quest</button>
        </div>

        <h1>🍭 Whack-a-Candy 🍬</h1>
        <div class="stats">
            <div id="score">Score: 0</div> 
            <div id="timer">Time: 20</div>
        </div>
        <button id="startBtn" style="display: none;">Start Game</button> <!-- Original button hidden -->
        <div id="grid"></div>
    </div>

    <!-- Quiz Modal -->
    <div class="quiz-modal" id="quizModal">
        <div class="quiz-content">
            <h2>🎓 College Board Question! 🎓</h2>
            <div class="quiz-question" id="quizQuestion"></div>
            <div class="quiz-options" id="quizOptions"></div>
            <div class="quiz-feedback" id="quizFeedback" style="display: none;"></div>
            <button class="quiz-continue" id="quizContinue" style="display: none;">Continue Game →</button>
        </div>
    </div>

    <!-- Completion Screen -->
    <div class="completion-screen" id="completionScreen">
        <div class="completion-content">
            <h2 id="completionTitle">🎉 Time's Up! 🎉</h2>
            <div class="confetti">🍬 🍭 ✨ 🎊 🎈</div>
            <p id="completionMessage">Great job whacking those candy bugs!</p>
            <p style="font-size: 1.2em;">Final Score: <span id="finalScore">0</span></p>
            <p style="font-size: 1.1em;">Quiz Score: <span id="quizScoreDisplay">0</span> / <span id="totalQuizzes">0</span></p>
            <div class="badges-earned" id="badgesEarned"></div>
            <button class="continue-btn" onclick="nextModule()">Continue to Next Module →</button>
            <button class="retry-btn" onclick="closeCompletion()">Play Again</button>
        </div>
    </div>

    <script type="module">
        // Import the API logic
        import { saveGameScore, saveBadge } from '/assets/js/candyland/candyland_api.js';

        // College Board AP CSP Questions
        const cbQuestions = [
            {
                question: "Which of the following best describes an algorithm?",
                options: [
                    "A) A set of instructions to solve a problem",
                    "B) A programming language",
                    "C) A type of computer hardware",
                    "D) A way to store data"
                ],
                correct: 0,
                explanation: "An algorithm is a finite set of instructions that accomplish a specific task."
            },
            {
                question: "What is the purpose of an IP address?",
                options: [
                    "A) To identify a specific device on a network",
                    "B) To store website information",
                    "C) To encrypt data",
                    "D) To increase internet speed"
                ],
                correct: 0,
                explanation: "An IP address uniquely identifies each device connected to a network."
            },
            {
                question: "Which programming construct is used to repeat a set of instructions?",
                options: [
                    "A) Selection",
                    "B) Iteration",
                    "C) Sequence",
                    "D) Function"
                ],
                correct: 1,
                explanation: "Iteration (loops) allows a program to repeat instructions multiple times."
            },
            {
                question: "What does ASCII stand for?",
                options: [
                    "A) American Standard Code for Information Interchange",
                    "B) Advanced System Computer Integration Interface",
                    "C) Automated Secure Computer Information Index",
                    "D) Application Software Code Integration Interface"
                ],
                correct: 0,
                explanation: "ASCII is a character encoding standard for electronic communication."
            },
            {
                question: "Which of the following is an example of abstraction in programming?",
                options: [
                    "A) Using a variable name instead of its value",
                    "B) Writing code in lowercase",
                    "C) Compiling a program",
                    "D) Saving a file"
                ],
                correct: 0,
                explanation: "Abstraction reduces complexity by hiding details and using simpler representations."
            },
            {
                question: "What is the purpose of encryption?",
                options: [
                    "A) To protect data from unauthorized access",
                    "B) To make programs run faster",
                    "C) To reduce file size",
                    "D) To display data on screen"
                ],
                correct: 0,
                explanation: "Encryption converts data into a coded format to protect it from unauthorized access."
            }
        ];

        const grid = document.getElementById("grid");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const realStartBtn = document.getElementById("realStartBtn");
        const startScreen = document.getElementById("start-screen");
        const completionScreen = document.getElementById("completionScreen");
        const quizModal = document.getElementById("quizModal");

        let score = 0;
        let timeLeft = 20;
        let gameInterval;
        let bugTimeout;
        let currentBug = null;
        let misses = 0;
        let hits = 0;
        let quizScore = 0;
        let totalQuizzes = 0;
        let gamePaused = false;
        let askedQuestions = []; 

        // Create grid squares
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.id = i;
            grid.appendChild(square);

            square.addEventListener("click", () => {
                if (square.classList.contains("bug") && !gamePaused) {
                    hits++;
                    score++;
                    scoreDisplay.textContent = "Score: " + score;
                    removeBug();
                    
                    if (score % 5 === 0) {
                        pauseGame();
                        showQuiz();
                    } else {
                        spawnBug();
                    }
                }
            });
        }

        // --- NEW: PHASE 1 START LOGIC ---
        realStartBtn.addEventListener('click', async () => {
            startScreen.style.display = 'none';

            // List of all 6 badges potentially earnable in this game
            const possibleBadges = [
                'Bug Master', 
                'Quick Reflexes', 
                'Good Shot', 
                'Slow and Steady', 
                'Eagle Eye', 
                'Perfect Scholar'
            ];

            // Log attempt in JinjaAdmin Table for accurate rarity denominator
            try {
                await Promise.all(possibleBadges.map(badgeName => 
                    fetch('http://localhost:8587/api/candyland/increment_attempts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ game_id: badgeName })
                    })
                ));
                console.log("Global attempts logged for rarity denominator.");
            } catch (e) {
                console.error("Failed to log attempts in JinjaAdmin:", e);
            }

            startGame(); // Start the game logic
        });

        function startGame() {
            score = 0;
            timeLeft = 20;
            misses = 0;
            hits = 0;
            quizScore = 0;
            totalQuizzes = 0;
            gamePaused = false;
            askedQuestions = []; 
            scoreDisplay.textContent = "Score: 0";
            timerDisplay.textContent = "Time: 20";
            timerDisplay.classList.remove("warning");

            gameInterval = setInterval(() => {
                if (!gamePaused) {
                    timeLeft--;
                    timerDisplay.textContent = "Time: " + timeLeft;

                    if (timeLeft <= 7) {
                        timerDisplay.classList.add("warning");
                    }

                    if (timeLeft <= 0) {
                        endGame();
                    }
                }
            }, 1000);

            spawnBug();
        }

        function pauseGame() {
            gamePaused = true;
            removeBug();
        }

        function resumeGame() {
            gamePaused = false;
            if (timeLeft > 0) {
                spawnBug();
            }
        }

        function showQuiz() {
            const availableQuestions = cbQuestions.filter((q, index) => !askedQuestions.includes(index));
            if (availableQuestions.length === 0) {
                resumeGame();
                return;
            }
            totalQuizzes++;
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const randomQuestion = availableQuestions[randomIndex];
            const originalIndex = cbQuestions.indexOf(randomQuestion);
            askedQuestions.push(originalIndex);
            
            document.getElementById('quizQuestion').textContent = randomQuestion.question;
            const optionsDiv = document.getElementById('quizOptions');
            optionsDiv.innerHTML = '';
            
            randomQuestion.options.forEach((option, index) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.textContent = option;
                btn.onclick = () => handleQuizAnswer(index, randomQuestion.correct, randomQuestion.explanation);
                optionsDiv.appendChild(btn);
            });

            document.getElementById('quizFeedback').style.display = 'none';
            document.getElementById('quizContinue').style.display = 'none';
            quizModal.classList.add('show');
        }

        function handleQuizAnswer(selected, correct, explanation) {
            const options = document.querySelectorAll('.quiz-option');
            const feedback = document.getElementById('quizFeedback');
            options.forEach((opt, index) => {
                opt.classList.add('disabled');
                opt.onclick = null;
                if (index === correct) opt.classList.add('correct');
                if (index === selected && index !== correct) opt.classList.add('incorrect');
            });

            if (selected === correct) {
                quizScore++;
                feedback.textContent = "✓ Correct! " + explanation;
                feedback.className = 'quiz-feedback correct';
            } else {
                feedback.textContent = "✗ Incorrect. " + explanation;
                feedback.className = 'quiz-feedback incorrect';
            }
            feedback.style.display = 'block';
            document.getElementById('quizContinue').style.display = 'block';
        }

        document.getElementById('quizContinue').addEventListener('click', () => {
            quizModal.classList.remove('show');
            resumeGame();
        });

        function spawnBug() {
            if (timeLeft <= 0 || gamePaused) return;
            removeBug();
            const squares = document.querySelectorAll(".square");
            const randomSquare = squares[Math.floor(Math.random() * squares.length)];
            randomSquare.classList.add("bug");
            randomSquare.textContent = "🍬";
            currentBug = randomSquare;

            bugTimeout = setTimeout(() => {
                if (currentBug) {
                    misses++;
                    removeBug();
                    if (timeLeft > 0 && !gamePaused) spawnBug();
                }
            }, 1500);
        }

        function removeBug() {
            if (currentBug) {
                currentBug.classList.remove("bug");
                currentBug.textContent = "";
                currentBug = null;
            }
            clearTimeout(bugTimeout);
        }

        function endGame() {
            clearInterval(gameInterval);
            removeBug();
            timerDisplay.classList.remove("warning");
            
            // Save final game score to DB
            saveGameScore('whack_a_candy_score', score);
            
            showCompletionScreen();
        }

        function showCompletionScreen() {
            const earnedBadges = [];

            if (score >= 15) earnedBadges.push({ icon: '🏆', name: 'Bug Master' });
            if (score >= 12) earnedBadges.push({ icon: '⚡', name: 'Quick Reflexes' });
            if (score >= 8) earnedBadges.push({ icon: '🎯', name: 'Good Shot' });
            if (score < 4) earnedBadges.push({ icon: '🐌', name: 'Slow and Steady' });
            if (misses <= 2) earnedBadges.push({ icon: '👁️', name: 'Eagle Eye' });
            if (quizScore === totalQuizzes && totalQuizzes > 0) earnedBadges.push({ icon: '🎓', name: 'Perfect Scholar' });

            document.getElementById('finalScore').textContent = score;
            document.getElementById('quizScoreDisplay').textContent = quizScore;
            document.getElementById('totalQuizzes').textContent = totalQuizzes;
            
            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            earnedBadges.forEach(badge => {
                // Save each earned badge to DB
                saveBadge(badge.name, badge.icon);
                
                const badgeEl = document.createElement('div');
                badgeEl.className = 'badge-earned';
                badgeEl.textContent = `${badge.icon} ${badge.name}`;
                badgesDiv.appendChild(badgeEl);
            });

            completionScreen.classList.add('show');
        }

        window.closeCompletion = function() {
            completionScreen.classList.remove('show');
            startScreen.style.display = 'flex'; // Reset to start screen
        }

        window.nextModule = function() {
            window.location.href = '/candyland/ending'; // Adjust to your actual next path
        }
    </script>
</body>
</html>