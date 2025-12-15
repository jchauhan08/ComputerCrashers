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

        .victory-content {
            border: 8px solid #FFD700;
        }

        .game-over-content {
            border: 8px solid #FF6B6B;
        }

        .victory-content h2, .game-over-content h2 {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .victory-content h2 {
            color: #FF1493;
        }

        .game-over-content h2 {
            color: #c23616;
        }

        .victory-content p, .game-over-content p {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 30px;
        }

        .badge-earned {
            display: inline-block;
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            padding: 15px 25px;
            border-radius: 15px;
            margin: 10px;
            font-size: 1.2em;
            box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4);
        }

        .confetti {
            font-size: 2em;
            margin: 20px 0;
        }

        button {
            background: linear-gradient(to bottom, #FF69B4, #FF1493);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.1em;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 15px;
            font-family: 'Comic Sans MS', cursive;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }

        button.next-module {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
            padding: 15px 40px;
            font-size: 1.3em;
            margin: 10px;
        }
    </style>
</head>
<body>
    <!-- Decorations -->
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
            <div class="confetti">😅 🕐 ⏱️ 🍭</div>
            <p>You ran out of time getting to work!</p>
            <p style="font-size: 1.2em;">Don't worry, try again!</p>
            <div id="gameOverBadges"></div>
            <button onclick="resetGame()">🔄 Try Again</button>
        </div>
    </div>

    <script type="module">

        import { saveGameScore, viewScores } from '/assets/js/candyland/candyland_api.js';
        // Maze layout: 0 = wall, 1 = path, 2 = gas, 3 = coffee, 4 = friend, 5 = work
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
        let timeRemaining = 30;
        let timerInterval = null;
        let wallHits = 0;
        let startTime = null;

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
            startTime = Date.now();
            
            timerInterval = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay();
                
                if (timeRemaining <= 10) {
                    document.getElementById('timerDisplay').classList.add('warning');
                }
                
                if (timeRemaining <= 0) {
                    gameOver();
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
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('player');
            });
            
            const currentCell = document.getElementById(`cell-${playerPos.x}-${playerPos.y}`);
            currentCell.classList.add('player');
            currentCell.textContent = '🙂';
        }

        function movePlayer(dx, dy) {
            if (gameComplete) return;
            
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            
            // Check boundaries
            if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) {
                wallHits++;
                updateWallCounter();
                return;
            }
            
            // Check if it's a wall
            if (mazeLayout[newY][newX] === 0) {
                wallHits++;
                updateWallCounter();
                showMessage("🍫 Oops! That's a chocolate wall!");
                return;
            }
            
            // Check if already visited
            const cellKey = `${newX}-${newY}`;
            if (visitedCells.has(cellKey)) {
                showMessage("⚠️ You can't go back! Find a new path!");
                return;
            }
            
            // Mark old position as visited
            const oldCell = document.getElementById(`cell-${playerPos.x}-${playerPos.y}`);
            oldCell.classList.add('visited');
            
            // Move player
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
                    collectedCheckpoints.add(cellValue);
                    
                    const checkpoint = checkpoints[cellValue];
                    document.getElementById(checkpoint.task).classList.add('completed');
                    
                    const currentCell = document.getElementById(`cell-${playerPos.x}-${playerPos.y}`);
                    currentCell.classList.add('collected');
                    
                    showMessage(`✓ ${checkpoint.name} Complete!`);
                    
                    if (checkpoint.next) {
                        currentCheckpoint = checkpoint.next;
                    } else {
                        // Game complete!
                        gameComplete = true;
                        clearInterval(timerInterval);
                        setTimeout(() => {
                            showVictoryScreen();
                        }, 1000);
                    }
                } else if (cellValue > currentCheckpoint) {
                    showMessage(`⚠️ You need to complete tasks in order first!`);
                }
            }
        }

        function showVictoryScreen() {
            const finalTimeEl = document.getElementById('finalTime');
            const timeTaken = 30 - timeRemaining;
            finalTimeEl.textContent = `${timeTaken} seconds`;
            
            // Determine badges
            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            // Path Finder badge (always earned on completion)
            badgesDiv.innerHTML += '<div class="badge-earned">🧭 Path Finder</div>';
            
            saveGameScore('Maze Time Taken (sec)', timeTaken);

            // Speed badges
            if (timeTaken <= 15) {
                badgesDiv.innerHTML += '<div class="badge-earned">⚡ Speed Runner</div>';
            }
            
            // Directionally Challenged badge
            if (wallHits >= 5) {
                badgesDiv.innerHTML += '<div class="badge-earned">🌀 Directionally Challenged</div>';
            }
            
            // Perfect Navigation badge
            if (wallHits === 0) {
                badgesDiv.innerHTML += '<div class="badge-earned">🎯 Perfect Navigator</div>';
            }
            
            document.getElementById('victoryScreen').style.display = 'flex';
        }

        function gameOver() {
            gameComplete = true;
            clearInterval(timerInterval);
            
            // Award Directionally Challenged badge if earned
            const gameOverBadgesDiv = document.getElementById('gameOverBadges');
            gameOverBadgesDiv.innerHTML = '';
            
            if (wallHits >= 5) {
                gameOverBadgesDiv.innerHTML = '<div class="badge-earned">🌀 Directionally Challenged</div><p style="font-size: 1em;">At least you earned a badge! 😅</p>';
            }
            
            document.getElementById('gameOverScreen').style.display = 'flex';
        }

        function nextModule() {
            alert('Moving to the Work Module! 🎉');
        }

        function showMessage(text) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            setTimeout(() => {
                if (!gameComplete) {
                    messageEl.textContent = '';
                }
            }, 2500);
        }

        function resetGame() {
            playerPos = { x: 0, y: 0 };
            currentCheckpoint = 2;
            collectedCheckpoints.clear();
            visitedCells.clear();
            gameComplete = false;
            timeRemaining = 30;
            wallHits = 0;
            
            if (timerInterval) clearInterval(timerInterval);
            
            document.getElementById('victoryScreen').style.display = 'none';
            document.getElementById('gameOverScreen').style.display = 'none';
            document.getElementById('timerDisplay').classList.remove('warning');
            
            document.querySelectorAll('.task-item').forEach(task => {
                task.classList.remove('completed');
            });
            
            updateTimerDisplay();
            updateWallCounter();
            createMaze();
            showMessage('Start your journey! Head to the gas station first ⛽');
        }

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': movePlayer(0, -1); break;
                case 'ArrowDown': movePlayer(0, 1); break;
                case 'ArrowLeft': movePlayer(-1, 0); break;
                case 'ArrowRight': movePlayer(1, 0); break;
            }
        });

        createMaze();
        showMessage('Welcome! Use arrow keys to navigate to the gas station first! ⛽');
    </script>
</body>
</html>