---
layout: base
title: Whack-a-Bug
Author: Avantika Chittari
permalink: /candyland/whack-a-bug
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Whack-a-Bug</title>
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

        #startBtn {
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

        #startBtn:hover:not(:disabled) {
            background: linear-gradient(to bottom, #ff6bb5, #ff4d9c);
        }

        #startBtn:active {
            box-shadow: 0 2px #ff3d93;
            transform: translateY(4px);
        }

        #startBtn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
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

        /* Victory Screen */
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

        button.continue-btn {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
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
        }

        button.continue-btn:hover {
            transform: scale(1.05);
        }

        button.retry-btn {
            background: linear-gradient(to bottom, #ff85c2, #ff5ca8);
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
        }

        button.retry-btn:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <h1>🍭 Whack-a-Candy 🍬</h1>
        <div class="stats">
            <div id="score">Score: 0</div>
            <div id="timer">Time: 20</div>
        </div>
        <button id="startBtn">Start Game</button>
        <div id="grid"></div>
    </div>

    <!-- Completion Screen -->
    <div class="completion-screen" id="completionScreen">
        <div class="completion-content">
            <h2 id="completionTitle">🎉 Time's Up! 🎉</h2>
            <div class="confetti">🍬 🍭 ✨ 🎊 🎈</div>
            <p id="completionMessage">Great job whacking those candy bugs!</p>
            <p style="font-size: 1.2em;">Final Score: <span id="finalScore">0</span></p>
            <div class="badges-earned" id="badgesEarned"></div>
            <button class="continue-btn" onclick="nextModule()">Continue to Next Module →</button>
            <button class="retry-btn" onclick="closeCompletion()">Play Again</button>
        </div>
    </div>

    <script>
        const grid = document.getElementById("grid");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const startBtn = document.getElementById("startBtn");
        const completionScreen = document.getElementById("completionScreen");

        let score = 0;
        let timeLeft = 20;
        let gameInterval;
        let bugTimeout;
        let currentBug = null;
        let misses = 0;
        let hits = 0;

        // Create grid squares
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.id = i;
            grid.appendChild(square);

            square.addEventListener("click", () => {
                if (square.classList.contains("bug")) {
                    hits++;
                    score++;
                    scoreDisplay.textContent = "Score: " + score;
                    removeBug();
                    spawnBug(); // Spawn new bug immediately
                }
            });
        }

        function startGame() {
            score = 0;
            timeLeft = 20;
            misses = 0;
            hits = 0;
            scoreDisplay.textContent = "Score: 0";
            timerDisplay.textContent = "Time: 20";
            timerDisplay.classList.remove("warning");

            startBtn.disabled = true;

            gameInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = "Time: " + timeLeft;

                if (timeLeft <= 7) {
                    timerDisplay.classList.add("warning");
                }

                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);

            spawnBug();
        }

        function spawnBug() {
            if (timeLeft <= 0) return;
            
            removeBug();

            const squares = document.querySelectorAll(".square");
            const randomSquare = squares[Math.floor(Math.random() * squares.length)];

            randomSquare.classList.add("bug");
            randomSquare.textContent = "🍬";
            currentBug = randomSquare;

            // Bug disappears after 1.5 seconds
            bugTimeout = setTimeout(() => {
                if (currentBug) {
                    misses++;
                    removeBug();
                    if (timeLeft > 0) {
                        spawnBug();
                    }
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
            startBtn.disabled = false;
            timerDisplay.classList.remove("warning");
            showCompletionScreen();
        }

        function showCompletionScreen() {
            const earnedBadges = [];

            // Determine badges (adjusted for 20 seconds)
            if (score >= 15) {
                earnedBadges.push({ icon: '🏆', name: 'Bug Master' });
            }

            if (score >= 12) {
                earnedBadges.push({ icon: '⚡', name: 'Quick Reflexes' });
            }

            if (score >= 8) {
                earnedBadges.push({ icon: '🎯', name: 'Good Shot' });
            }

            if (score < 4) {
                earnedBadges.push({ icon: '🐌', name: 'Slow and Steady' });
            }

            if (misses <= 2) {
                earnedBadges.push({ icon: '🎪', name: 'Eagle Eye' });
            }

            if (score === 0) {
                earnedBadges.push({ icon: '😅', name: 'Better Luck Next Time' });
            }

            // Update completion screen
            document.getElementById('finalScore').textContent = score;
            
            if (score >= 12) {
                document.getElementById('completionTitle').textContent = '🎉 Amazing! 🎉';
                document.getElementById('completionMessage').textContent = 'You\'re a candy-catching champion!';
            } else if (score >= 8) {
                document.getElementById('completionTitle').textContent = '😊 Good Job! 😊';
                document.getElementById('completionMessage').textContent = 'Nice work whacking those candy bugs!';
            } else {
                document.getElementById('completionTitle').textContent = '🍬 Time\'s Up! 🍬';
                document.getElementById('completionMessage').textContent = 'Keep practicing those reflexes!';
            }

            // Display badges
            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            if (earnedBadges.length > 0) {
                earnedBadges.forEach(badge => {
                    const badgeEl = document.createElement('div');
                    badgeEl.className = 'badge-earned';
                    badgeEl.textContent = `${badge.icon} ${badge.name}`;
                    badgesDiv.appendChild(badgeEl);
                });
            }

            completionScreen.classList.add('show');
        }

        function closeCompletion() {
            completionScreen.classList.remove('show');
        }

        function nextModule() {
            window.location.href = '/candyland/hotchocolate'; // Navigate to Submodule 4
        }

        startBtn.addEventListener("click", startGame);
    </script>
</body>
</html>