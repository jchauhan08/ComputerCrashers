---
layout: base
title: Candyland Maze Adventure
authors: Jaynee Chauhan
permalink: /candyland/workmaze
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candyland Commute</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', cursive;
            background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            overflow-x: hidden;
        }

        /* Decorative clouds */
        .cloud {
            position: absolute;
            background: white;
            border-radius: 100px;
            opacity: 0.8;
            animation: float 20s infinite;
        }

        .cloud:before, .cloud:after {
            content: '';
            position: absolute;
            background: white;
            border-radius: 100px;
        }

        .cloud1 { width: 100px; height: 40px; top: 50px; left: 10%; }
        .cloud1:before { width: 50px; height: 50px; top: -25px; left: 10px; }
        .cloud1:after { width: 60px; height: 40px; top: -15px; right: 10px; }

        .cloud2 { width: 120px; height: 50px; top: 100px; right: 15%; animation-delay: -10s; }
        .cloud2:before { width: 60px; height: 60px; top: -30px; left: 15px; }
        .cloud2:after { width: 70px; height: 50px; top: -20px; right: 15px; }

        @keyframes float {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(20px) translateY(-10px); }
        }

        /* Candy decorations */
        .lollipop {
            position: absolute;
            font-size: 60px;
            animation: spin 4s linear infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .lollipop1 { top: 150px; left: 5%; }
        .lollipop2 { top: 400px; right: 8%; animation-delay: -2s; }

        .game-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            border: 5px solid #FF69B4;
            position: relative;
            z-index: 10;
            max-width: 700px;
            width: 100%;
        }

        h1 {
            text-align: center;
            color: #FF1493;
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
            text-align: center;
            color: #FF69B4;
            font-size: 1.2em;
            margin-bottom: 20px;
        }

        .stats-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            gap: 10px;
        }

        .timer-display {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 15px;
            font-size: 1.3em;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 120px;
            text-align: center;
        }

        .timer-display.warning {
            background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
            animation: pulse-timer 0.5s infinite;
        }

        @keyframes pulse-timer {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .wall-counter {
            background: rgba(255, 107, 107, 0.2);
            padding: 8px 15px;
            border-radius: 10px;
            font-size: 1em;
            color: #c23616;
            font-weight: 600;
        }

        .task-list {
            background: #FFF8DC;
            border: 3px dashed #FFD700;
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 20px;
        }

        .task-item {
            display: flex;
            align-items: center;
            padding: 10px;
            margin: 8px 0;
            background: white;
            border-radius: 10px;
            border: 2px solid #FFB6C1;
            font-size: 1.1em;
        }

        .task-item.completed {
            background: #90EE90;
            border-color: #32CD32;
        }

        .task-icon {
            font-size: 1.5em;
            margin-right: 10px;
            width: 30px;
            text-align: center;
        }

        .maze-grid {
            display: grid;
            grid-template-columns: repeat(10, 50px);
            grid-template-rows: repeat(10, 50px);
            gap: 2px;
            margin: 20px auto;
            border: 5px solid #8B4513;
            border-radius: 10px;
            background: #D2691E;
            padding: 5px;
            justify-content: center;
        }

        .cell {
            width: 50px;
            height: 50px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8em;
            transition: all 0.2s;
        }

        .cell.path {
            background: #FFF8DC;
        }

        .cell.wall {
            background: #8B4513;
        }

        .cell.player {
            background: #FFB6C1;
            animation: pulse 0.5s infinite;
        }

        .cell.checkpoint {
            background: #FFDAB9;
            animation: glow 1s infinite;
        }

        .cell.checkpoint.collected {
            background: #90EE90;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px #FFD700; }
            50% { box-shadow: 0 0 15px #FFD700; }
        }

        .controls {
            text-align: center;
            margin-top: 20px;
            font-size: 1.1em;
            color: #333;
        }

        .message {
            text-align: center;
            font-size: 1.3em;
            color: #FF1493;
            margin-top: 15px;
            min-height: 30px;
            font-weight: bold;
        }

        .cell.visited {
            background: #E6E6FA !important;
            opacity: 0.6;
        }

        /* --- Quiz Modal Styles --- */
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
            background: #f0faff;
            padding: 35px;
            border-radius: 25px;
            border: 6px solid #87CEEB;
            box-shadow: 0 0 50px rgba(135, 206, 235, 0.8);
            max-width: 600px;
            width: 90%;
            animation: slideIn 0.5s ease;
            text-align: center;
        }

        .quiz-content h2 {
            color: #4682B4;
            font-size: 1.8em;
            margin-bottom: 20px;
        }

        .quiz-question {
            background: white;
            padding: 20px;
            border-radius: 15px;
            border: 3px solid #b0e0e6;
            margin-bottom: 20px;
            font-size: 1.1em;
            color: #333;
            text-align: left;
        }

        .quiz-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }

        .quiz-option {
            background: #fff;
            border: 2px solid #87CEEB;
            padding: 12px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
        }

        .quiz-option:hover {
            background: #e0f4ff;
            transform: translateX(5px);
        }

        .quiz-option.correct { background: #90EE90; border-color: #32CD32; }
        .quiz-option.incorrect { background: #ffb3b3; border-color: #ff4d4d; }
        .quiz-option.disabled { cursor: not-allowed; opacity: 0.8; }

        .quiz-feedback {
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .quiz-feedback.correct { background: #e8f5e9; color: #2e7d32; border: 2px solid #32CD32; }
        .quiz-feedback.incorrect { background: #fce4ec; color: #c62828; border: 2px solid #ff4d4d; }

        /* End Screens */
        .victory-screen, .game-over-screen {
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

        .victory-content, .game-over-content {
            background: white;
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
            max-width: 500px;
        }

        .victory-content { border: 8px solid #FFD700; }
        .game-over-content { border: 8px solid #FF6B6B; }

        @keyframes slideIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        button.quiz-continue {
            background: #32CD32;
            color: white;
            padding: 12px 30px;
            border-radius: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="cloud cloud1"></div>
    <div class="cloud cloud2"></div>
    <div class="lollipop lollipop1">🍭</div>
    <div class="lollipop lollipop2">🍬</div>

    <div class="game-container">
        <h1>🍭 Getting to Work! 🍬</h1>
        <p class="subtitle">Navigate through Licorice Lane</p>

        <div class="stats-bar">
            <div class="timer-display" id="timerDisplay">⏱️ 30s</div>
            <div class="wall-counter" id="wallCounter">🚧 Wall Hits: 0</div>
        </div>

        <div class="task-list">
            <div class="task-item" id="task1">
                <span class="task-icon">⛽</span>
                <span>1. Fill up with Candy Gas</span>
            </div>
            <div class="task-item" id="task2">
                <span class="task-icon">☕</span>
                <span>2. Get Coffee Bean Candies</span>
            </div>
            <div class="task-item" id="task3">
                <span class="task-icon">👥</span>
                <span>3. Pick up Friend Graham</span>
            </div>
            <div class="task-item" id="task4">
                <span class="task-icon">🏢</span>
                <span>4. Arrive at Caramel Apple HQ</span>
            </div>
        </div>

        <div class="maze-grid" id="maze"></div>

        <div class="controls">
            Use Arrow Keys ⬆️ ⬇️ ⬅️ ➡️ to move
        </div>
        <div class="message" id="message"></div>
        <div style="text-align: center;">
            <button onclick="resetGame()">🔄 Start Over</button>
        </div>
    </div>

    <!-- Quiz Modal -->
    <div class="quiz-modal" id="quizModal">
        <div class="quiz-content">
            <h2 id="quizTitle">🏁 Checkpoint Challenge! 🏁</h2>
            <div class="quiz-question" id="quizQuestion"></div>
            <div class="quiz-options" id="quizOptions"></div>
            <div class="quiz-feedback" id="quizFeedback" style="display: none;"></div>
            <button class="quiz-continue" id="quizContinue" style="display: none;">Continue Journey →</button>
        </div>
    </div>

    <!-- Victory Screen -->
    <div class="victory-screen" id="victoryScreen">
        <div class="victory-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <div class="confetti">🎊 🎈 🎁 ✨ 🍭 🍬 🎊</div>
            <p>You made it to Caramel Apple HQ on time!</p>
            <p style="font-size: 1.2em;">Time: <span id="finalTime"></span></p>
            <div id="badgesEarned"></div>
            
            <button class="next-module" onclick="window.location.href='/candyland/whack-a-candy'">
            Continue to Work Module →
            </button>
            <button onclick="resetGame()">🔄 Play Again</button>
        </div>
    </div>

    <!-- Game Over Screen -->
    <div class="game-over-screen" id="gameOverScreen">
        <div class="game-over-content">
            <h2>⏰ Time's Up! ⏰</h2>
            <p>You ran out of time getting to work!</p>
            <button onclick="resetGame()">🔄 Try Again</button>
        </div>
    </div>

    <script type="module">
        import { saveGameScore, saveBadge } from '/assets/js/candyland/candyland_api.js';

        // Specific Questions for each checkpoint
        const checkpointQuestions = {
            2: { // GAS STATION
                question: "To fuel your car, you need data! Which of the following is a way to represent a single character in a computer?",
                options: ["A) Using a logic gate", "B) Using ASCII or Unicode", "C) Using a compiler", "D) Using an IP address"],
                correct: 1,
                explanation: "ASCII and Unicode are standard encoding systems used to represent text characters in binary."
            },
            3: { // COFFEE SHOP
                question: "Caffeine for logic! What is the primary purpose of an algorithm in computer science?",
                options: ["A) To create hardware", "B) To increase physical RAM", "C) A step-by-step procedure to solve a problem", "D) To delete old files"],
                correct: 2,
                explanation: "An algorithm is a finite, ordered set of instructions designed to perform a specific task."
            },
            4: { // FRIEND GRAHAM
                question: "Picking up a friend! In a network, what is the role of a Router?",
                options: ["A) To store the user's password", "B) To direct data packets across networks", "C) To physically build the internet cable", "D) To encrypt hard drives"],
                correct: 1,
                explanation: "Routers manage traffic between networks by forwarding data packets to their intended IP addresses."
            },
            5: { // HQ
                question: "Final Boss! Which of these is an example of 'High-Level' abstraction in programming?",
                options: ["A) Writing binary code (0s and 1s)", "B) Using a simple function name like 'movePlayer()' to hide complex code", "C) Manually wiring a circuit board", "D) Viewing the voltage levels in a CPU"],
                correct: 1,
                explanation: "High-level abstraction hides complex implementation details, making it easier for humans to program."
            }
        };

        const mazeLayout = [
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
            [0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1, 1, 0, 1],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 3, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 4, 1, 1, 1, 1, 1, 0, 1],
            [0, 1, 1, 1, 0, 0, 0, 1, 5, 1]
        ];

        const checkpoints = {
            2: { icon: '⛽', task: 'task1', name: 'Candy Gas Station', next: 3 },
            3: { icon: '☕', task: 'task2', name: 'Coffee Bean Shop', next: 4 },
            4: { icon: '👥', task: 'task3', name: 'Graham\'s House', next: 5 },
            5: { icon: '🏢', task: 'task4', name: 'Caramel Apple HQ', next: null }
        };

        let playerPos = { x: 0, y: 0 };
        let currentCheckpoint = 2;
        let collectedCheckpoints = new Set();
        let visitedCells = new Set();
        let gameComplete = false;
        let gamePaused = false;
        let timeRemaining = 30;
        let timerInterval = null;
        let wallHits = 0;

        function createMaze() {
            const mazeEl = document.getElementById('maze');
            mazeEl.innerHTML = '';
            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 10; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.id = `cell-${x}-${y}`;
                    const value = mazeLayout[y][x];
                    if (value === 0) {
                        cell.classList.add('wall');
                        cell.textContent = '🍫';
                    } else {
                        cell.classList.add('path');
                        if (value >= 2 && value <= 5) {
                            cell.classList.add('checkpoint');
                            cell.dataset.checkpoint = value;
                            cell.textContent = checkpoints[value].icon;
                        }
                    }
                    mazeEl.appendChild(cell);
                }
            }
            visitedCells.add('0-0');
            updatePlayerPosition();
            startTimer();
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (!gamePaused && !gameComplete) {
                    timeRemaining--;
                    updateTimerDisplay();
                    if (timeRemaining <= 10) document.getElementById('timerDisplay').classList.add('warning');
                    if (timeRemaining <= 0) gameOver();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            document.getElementById('timerDisplay').textContent = `⏱️ ${timeRemaining}s`;
        }

        function updateWallCounter() {
            document.getElementById('wallCounter').textContent = `🚧 Wall Hits: ${wallHits}`;
        }

        function updatePlayerPosition() {
            document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
            const currentCell = document.getElementById(`cell-${playerPos.x}-${playerPos.y}`);
            currentCell.classList.add('player');
            currentCell.textContent = '🙂';
        }

        function movePlayer(dx, dy) {
            if (gameComplete || gamePaused) return;
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            
            if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) { wallHits++; updateWallCounter(); return; }
            if (mazeLayout[newY][newX] === 0) { wallHits++; updateWallCounter(); showMessage("🍫 That's a wall!"); return; }
            
            const cellKey = `${newX}-${newY}`;
            if (visitedCells.has(cellKey)) { showMessage("⚠️ Can't go back!"); return; }
            
            document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).classList.add('visited');
            playerPos.x = newX;
            playerPos.y = newY;
            visitedCells.add(cellKey);
            
            checkCheckpoint();
            updatePlayerPosition();
        }

        function checkCheckpoint() {
            const cellValue = mazeLayout[playerPos.y][playerPos.x];
            if (cellValue >= 2 && cellValue <= 5) {
                if (cellValue === currentCheckpoint) {
                    triggerQuiz(cellValue);
                } else if (cellValue > currentCheckpoint) {
                    showMessage(`⚠️ Go to ${checkpoints[currentCheckpoint].name} first!`);
                }
            }
        }

        function triggerQuiz(checkpointId) {
            gamePaused = true;
            const qData = checkpointQuestions[checkpointId];
            
            document.getElementById('quizQuestion').textContent = qData.question;
            const optionsDiv = document.getElementById('quizOptions');
            optionsDiv.innerHTML = '';
            
            qData.options.forEach((opt, idx) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.onclick = () => handleQuizAnswer(idx, qData.correct, qData.explanation, checkpointId);
                optionsDiv.appendChild(btn);
            });

            document.getElementById('quizFeedback').style.display = 'none';
            document.getElementById('quizContinue').style.display = 'none';
            document.getElementById('quizModal').classList.add('show');
        }

        function handleQuizAnswer(selected, correct, explanation, checkpointId) {
            const options = document.querySelectorAll('.quiz-option');
            const feedback = document.getElementById('quizFeedback');
            
            options.forEach((opt, idx) => {
                opt.classList.add('disabled');
                opt.onclick = null;
                if (idx === correct) opt.classList.add('correct');
                if (idx === selected && idx !== correct) opt.classList.add('incorrect');
            });

            feedback.style.display = 'block';
            feedback.className = (selected === correct) ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
            feedback.textContent = (selected === correct) ? "✓ Correct! " + explanation : "✗ Incorrect. " + explanation;
            
            document.getElementById('quizContinue').style.display = 'block';
            document.getElementById('quizContinue').onclick = () => completeCheckpoint(checkpointId);
        }

        function completeCheckpoint(checkpointId) {
            document.getElementById('quizModal').classList.remove('show');
            gamePaused = false;

            const checkpoint = checkpoints[checkpointId];
            collectedCheckpoints.add(checkpointId);
            document.getElementById(checkpoint.task).classList.add('completed');
            document.getElementById(`cell-${playerPos.x}-${playerPos.y}`).classList.add('collected');
            
            showMessage(`✓ ${checkpoint.name} Complete!`);
            
            if (checkpoint.next) {
                currentCheckpoint = checkpoint.next;
            } else {
                gameComplete = true;
                clearInterval(timerInterval);
                showVictoryScreen();
            }
        }

        function showVictoryScreen() {
            const timeTaken = 30 - timeRemaining;
            document.getElementById('finalTime').textContent = `${timeTaken} seconds`;
            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            saveGameScore('maze_score', timeTaken);
            saveBadge('Path Finder', '🧭');
            badgesDiv.innerHTML += '<div class="badge-earned">🧭 Path Finder</div>';
            
            if (timeTaken <= 20) {
                saveBadge('Speed Runner', '⚡');
                badgesDiv.innerHTML += '<div class="badge-earned">⚡ Speed Runner</div>';
            }
            if (wallHits === 0) {
                saveBadge('Perfect Navigator', '🎯');
                badgesDiv.innerHTML += '<div class="badge-earned">🎯 Perfect Navigator</div>';
            }
            
            document.getElementById('victoryScreen').style.display = 'flex';
        }

        function gameOver() {
            gameComplete = true;
            clearInterval(timerInterval);
            document.getElementById('gameOverScreen').style.display = 'flex';
        }

        function showMessage(text) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            setTimeout(() => { if (!gameComplete) messageEl.textContent = ''; }, 2500);
        }

        function resetGame() {
            playerPos = { x: 0, y: 0 };
            currentCheckpoint = 2;
            collectedCheckpoints.clear();
            visitedCells.clear();
            gameComplete = false;
            gamePaused = false;
            timeRemaining = 30;
            wallHits = 0;
            if (timerInterval) clearInterval(timerInterval);
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'none';
            document.getElementById('timerDisplay').classList.remove('warning');
            document.querySelectorAll('.task-item').forEach(t => t.classList.remove('completed'));
            updateTimerDisplay();
            updateWallCounter();
            createMaze();
        }

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': movePlayer(0, -1); break;
                case 'ArrowDown': movePlayer(0, 1); break;
                case 'ArrowLeft': movePlayer(-1, 0); break;
                case 'ArrowRight': movePlayer(1, 0); break;
            }
        });

        window.resetGame = resetGame;
        createMaze();
    </script>
</body>
</html>