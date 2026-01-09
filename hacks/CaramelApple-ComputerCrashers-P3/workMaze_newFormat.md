---
layout: base
title: Candyland Maze Adventure
authors: Jaynee Chauhan
permalink: /candyland/workmaze
---
<!DOCTYPE html>
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

        .cell.collected {
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

        @keyframes slideIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .binary-display {
            font-size: 2.5em;
            font-family: monospace;
            color: #667eea;
            margin: 20px 0;
            padding: 15px;
            background: white;
            border-radius: 15px;
            border: 3px solid #667eea;
        }

        .decimal-display {
            font-size: 1.5em;
            color: #764ba2;
            margin: 15px 0;
            font-weight: bold;
        }

        .bit-buttons {
            display: flex;
            gap: 8px;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .bit-button {
            width: 60px;
            height: 60px;
            font-size: 1.8em;
            font-weight: bold;
            background: #e0e0e0;
            color: #333;
            border: 4px solid #999;
            border-radius: 12px;
            transition: all 0.2s;
            cursor: pointer;
        }

        .bit-button.on {
            background: #667eea;
            color: white;
            border-color: #667eea;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }

        .lightbulb {
            font-size: 5em;
            margin: 20px 0;
            filter: grayscale(100%);
            transition: all 0.5s;
        }

        .lightbulb.on {
            filter: grayscale(0%) drop-shadow(0 0 30px yellow);
            animation: flicker 0.3s;
        }

        @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .coffee-steps {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 20px 0;
        }

        .step-slot {
            min-height: 60px;
            background: white;
            border: 3px dashed #87CEEB;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
            padding: 10px;
        }

        .step-slot.filled {
            background: #e0f4ff;
            border-style: solid;
        }

        .step-options {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 20px 0;
        }

        .step-option {
            background: #fff;
            border: 2px solid #87CEEB;
            padding: 12px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .step-option:hover {
            background: #e0f4ff;
            transform: translateY(-2px);
        }

        .step-option.used {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .network-diagram {
            margin: 30px 0;
        }

        .network-node {
            display: inline-block;
            padding: 20px 30px;
            margin: 10px;
            background: white;
            border: 3px solid #87CEEB;
            border-radius: 15px;
            font-size: 1.2em;
            font-weight: bold;
        }

        .network-path {
            font-size: 2em;
            margin: 0 10px;
        }

        .path-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 20px 0;
        }

        .path-option {
            background: #fff;
            border: 2px solid #87CEEB;
            padding: 15px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .path-option:hover {
            background: #e0f4ff;
            transform: translateX(5px);
        }

        .success {
            color: #28a745;
            font-size: 1.3em;
            margin-top: 15px;
        }

        .error {
            color: #dc3545;
            font-size: 1.1em;
            margin-top: 10px;
        }

        button.continue-btn {
            background: #32CD32;
            color: white;
            padding: 12px 30px;
            border-radius: 20px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            font-size: 1.1em;
            margin-top: 15px;
        }

        button.continue-btn:hover {
            background: #28a745;
        }

        .victory-screen {
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

        .victory-content {
            background: white;
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 215, 0, 0.8);
            max-width: 500px;
            border: 8px solid #FFD700;
        }

        .game-over-screen {
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

        .game-over-content {
            background: white;
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 107, 107, 0.8);
            max-width: 500px;
            border: 8px solid #FF6B6B;
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

    <div class="quiz-modal" id="gameModal">
        <div class="quiz-content" id="gameContent"></div>
    </div>

    <div class="victory-screen" id="victoryScreen">
        <div class="victory-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <div style="font-size: 3em;">🎊 🎈 🎁 ✨ 🍭 🍬 🎊</div>
            <p>You made it to Caramel Apple HQ on time!</p>
            <p style="font-size: 1.2em;">Time: <span id="finalTime"></span></p>
            <div id="badgesEarned"></div>
            <button onclick="resetGame()">🔄 Play Again</button>
        </div>
    </div>

    <div class="game-over-screen" id="gameOverScreen">
        <div class="game-over-content">
            <h2>⏰ Time's Up! ⏰</h2>
            <p>You ran out of time getting to work!</p>
            <button onclick="resetGame()">🔄 Try Again</button>
        </div>
    </div>

    <script>
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
                    cell.id = 'cell-' + x + '-' + y;
                    const value = mazeLayout[y][x];
                    
                    if (value === 0) {
                        cell.classList.add('wall');
                        cell.textContent = '🍫';
                    } else {
                        cell.classList.add('path');
                        if (value >= 2 && value <= 5) {
                            if (!collectedCheckpoints.has(value)) {
                                cell.classList.add('checkpoint');
                            } else {
                                cell.classList.add('collected');
                            }
                            cell.textContent = checkpoints[value].icon;
                        }
                    }
                    mazeEl.appendChild(cell);
                }
            }
            
            visitedCells.add('0-0');
            updatePlayerPosition();
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(function() {
                if (!gamePaused && !gameComplete) {
                    timeRemaining--;
                    updateTimerDisplay();
                    if (timeRemaining <= 10) {
                        document.getElementById('timerDisplay').classList.add('warning');
                    }
                    if (timeRemaining <= 0) {
                        gameOver();
                    }
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            document.getElementById('timerDisplay').textContent = '⏱️ ' + timeRemaining + 's';
        }

        function updateWallCounter() {
            document.getElementById('wallCounter').textContent = '🚧 Wall Hits: ' + wallHits;
        }

        function updatePlayerPosition() {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(function(cell) {
                cell.classList.remove('player');
            });
            const currentCell = document.getElementById('cell-' + playerPos.x + '-' + playerPos.y);
            if (currentCell) {
                currentCell.classList.add('player');
                currentCell.textContent = '🙂';
            }
        }

        function movePlayer(dx, dy) {
            if (gameComplete || gamePaused) return;
            
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            
            if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) {
                wallHits++;
                updateWallCounter();
                return;
            }
            
            if (mazeLayout[newY][newX] === 0) {
                wallHits++;
                updateWallCounter();
                showMessage("🍫 That's a wall!");
                return;
            }
            
            const cellKey = newX + '-' + newY;
            if (visitedCells.has(cellKey)) {
                showMessage("⚠️ Can't go back!");
                return;
            }
            
            const oldCell = document.getElementById('cell-' + playerPos.x + '-' + playerPos.y);
            if (oldCell) {
                oldCell.classList.add('visited');
            }
            
            playerPos.x = newX;
            playerPos.y = newY;
            visitedCells.add(cellKey);
            
            checkCheckpoint();
            updatePlayerPosition();
        }

        function checkCheckpoint() {
            const cellValue = mazeLayout[playerPos.y][playerPos.x];
            if (cellValue >= 2 && cellValue <= 5) {
                if (cellValue === currentCheckpoint && !collectedCheckpoints.has(cellValue)) {
                    launchGame(cellValue);
                } else if (cellValue > currentCheckpoint) {
                    showMessage('⚠️ Go to ' + checkpoints[currentCheckpoint].name + ' first!');
                }
            }
        }

        function launchGame(checkpointId) {
            gamePaused = true;
            const modal = document.getElementById('gameModal');
            const content = document.getElementById('gameContent');
            
            if (checkpointId === 2) {
                launchGasGame(content);
            } else if (checkpointId === 3) {
                launchCoffeeMemoryGame(content);
            } else if (checkpointId === 4) {
                launchFindGrahamGame(content);
            } else if (checkpointId === 5) {
                launchBinaryGame(content, 13, 'Clock in');
            }
            
            modal.classList.add('show');
        }

        function launchGasGame(content) {
            const sequence = [];
            const sequenceLength = 4;
            
            // Generate random sequence
            for (let i = 0; i < sequenceLength; i++) {
                sequence.push(Math.floor(Math.random() * 5));
            }
            
            let playerSequence = [];
            let showingSequence = true;
            
            let html = '<h2>⛽ Gas Station</h2>';
            html += '<p id="gasInstruction">Watch the pumps light up in sequence!</p>';
            html += '<div style="display: flex; gap: 20px; justify-content: center; margin: 30px 0;" id="pumpContainer">';
            for (let i = 0; i < 5; i++) {
                html += '<button class="bit-button" id="pump' + i + '" style="width: 80px; height: 80px; font-size: 2.5em; background: #e0e0e0;">⛽</button>';
            }
            html += '</div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
            
            // Show sequence
            let index = 0;
            const showInterval = setInterval(function() {
                if (index > 0) {
                    document.getElementById('pump' + sequence[index - 1]).style.background = '#e0e0e0';
                }
                
                if (index < sequence.length) {
                    const pumpId = sequence[index];
                    document.getElementById('pump' + pumpId).style.background = '#667eea';
                    document.getElementById('pump' + pumpId).style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.8)';
                    index++;
                } else {
                    clearInterval(showInterval);
                    document.getElementById('pump' + sequence[sequence.length - 1]).style.background = '#e0e0e0';
                    document.getElementById('pump' + sequence[sequence.length - 1]).style.boxShadow = 'none';
                    
                    // Enable clicking
                    document.getElementById('gasInstruction').textContent = 'Now repeat the sequence!';
                    for (let i = 0; i < 5; i++) {
                        document.getElementById('pump' + i).onclick = function() {
                            checkGasSequence(i, sequence, playerSequence);
                        };
                    }
                }
            }, 800);
            
            window.gasGameState = { sequence: sequence, playerSequence: playerSequence };
        }

        function checkGasSequence(pumpId, sequence, playerSequence) {
            // Flash the pump
            const pump = document.getElementById('pump' + pumpId);
            pump.style.background = '#667eea';
            setTimeout(function() {
                pump.style.background = '#e0e0e0';
            }, 300);
            
            playerSequence.push(pumpId);
            
            // Check if correct so far
            for (let i = 0; i < playerSequence.length; i++) {
                if (playerSequence[i] !== sequence[i]) {
                    document.getElementById('feedback').innerHTML = '<div class="error">❌ Wrong sequence! Try again.</div>';
                    setTimeout(function() {
                        launchGame(2);
                    }, 1500);
                    return;
                }
            }
            
            // Check if complete
            if (playerSequence.length === sequence.length) {
                document.getElementById('feedback').innerHTML = '<div class="success">✅ Perfect! Gas pumped in the right order!</div><button class="continue-btn" onclick="completeCheckpoint(2)">Continue →</button>';
            }
        }

        function launchCoffeeMemoryGame(content) {
            const cups = ['☕', '☕', '☕', '☕', '☕', '☕'];
            const showCup = Math.floor(Math.random() * 6);
            const finalCup = Math.floor(Math.random() * 6);
            let showingCoffee = true;
            
            let html = '<h2>☕ Coffee Shop</h2>';
            html += '<p id="coffeeInstruction">Remember which cup has the coffee bean!</p>';
            html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 30px 0;" id="cupGrid">';
            for (let i = 0; i < 6; i++) {
                html += '<button class="bit-button" id="cup' + i + '" style="width: 100px; height: 100px; font-size: 2.5em;">';
                html += (i === showCup ? '🫘' : '☕');
                html += '</button>';
            }
            html += '</div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
            
            setTimeout(function() {
                document.getElementById('coffeeInstruction').textContent = 'Shuffling cups...';
                for (let i = 0; i < 6; i++) {
                    document.getElementById('cup' + i).textContent = '☕';
                }
                
                setTimeout(function() {
                    document.getElementById('coffeeInstruction').textContent = 'Find the cup with the coffee bean!';
                    for (let i = 0; i < 6; i++) {
                        const btn = document.getElementById('cup' + i);
                        btn.onclick = function() {
                            checkCoffee(i, finalCup);
                        };
                    }
                }, 800);
            }, 2000);
        }

        function checkCoffee(selected, correct) {
            const feedback = document.getElementById('feedback');
            if (selected === correct) {
                document.getElementById('cup' + correct).textContent = '🫘';
                feedback.innerHTML = '<div class="success">✅ Found the coffee bean!</div><button class="continue-btn" onclick="completeCheckpoint(3)">Continue →</button>';
            } else {
                document.getElementById('cup' + selected).textContent = '❌';
                feedback.innerHTML = '<div class="error">❌ Wrong cup! Try again.</div>';
                setTimeout(function() {
                    launchGame(3);
                }, 1500);
            }
        }

        function launchFindGrahamGame(content) {
            const gridSize = 5;
            let grahamPos = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
            let playerGridPos = { x: 0, y: 0 };
            
            // Make sure Graham isn't at starting position
            while (grahamPos.x === 0 && grahamPos.y === 0) {
                grahamPos = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
            }
            
            // Calculate minimum moves needed (Manhattan distance)
            const minMoves = Math.abs(grahamPos.x - playerGridPos.x) + Math.abs(grahamPos.y - playerGridPos.y);
            const maxMoves = minMoves + 3; // Give 3 extra moves
            let movesLeft = maxMoves;
            
            let html = '<h2>👥 Find Graham</h2>';
            html += '<p>Graham is at the green square! Get there before moves run out!</p>';
            html += '<div id="moveCounter" style="font-size: 1.3em; margin: 10px; color: #FF1493; font-weight: bold;">Moves Left: ' + movesLeft + '</div>';
            html += '<div style="display: grid; grid-template-columns: repeat(' + gridSize + ', 60px); gap: 5px; margin: 20px auto; justify-content: center;" id="grahamGrid"></div>';
            html += '<div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0;">';
            html += '<button onclick="moveGrahamPlayer(0, -1)" style="width: 60px;">⬆️</button>';
            html += '<div style="display: flex; gap: 10px;">';
            html += '<button onclick="moveGrahamPlayer(-1, 0)" style="width: 60px;">⬅️</button>';
            html += '<button onclick="moveGrahamPlayer(1, 0)" style="width: 60px;">➡️</button>';
            html += '</div>';
            html += '<button onclick="moveGrahamPlayer(0, 1)" style="width: 60px;">⬇️</button>';
            html += '</div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
            
            window.grahamGameState = { grahamPos: grahamPos, playerGridPos: playerGridPos, gridSize: gridSize, movesLeft: movesLeft, maxMoves: maxMoves };
            renderGrahamGrid();
        }

        function renderGrahamGrid() {
            const state = window.grahamGameState;
            const grid = document.getElementById('grahamGrid');
            grid.innerHTML = '';
            
            for (let y = 0; y < state.gridSize; y++) {
                for (let x = 0; x < state.gridSize; x++) {
                    const cell = document.createElement('div');
                    cell.style.width = '60px';
                    cell.style.height = '60px';
                    cell.style.border = '2px solid #87CEEB';
                    cell.style.borderRadius = '10px';
                    cell.style.display = 'flex';
                    cell.style.alignItems = 'center';
                    cell.style.justifyContent = 'center';
                    cell.style.fontSize = '2em';
                    cell.style.background = 'white';
                    
                    // Show Graham's location
                    if (x === state.grahamPos.x && y === state.grahamPos.y) {
                        cell.style.background = '#90EE90';
                    }
                    
                    // Show player position
                    if (x === state.playerGridPos.x && y === state.playerGridPos.y) {
                        cell.textContent = '🚗';
                        cell.style.background = '#FFB6C1';
                    }
                    
                    grid.appendChild(cell);
                }
            }
        }

        function moveGrahamPlayer(dx, dy) {
            const state = window.grahamGameState;
            const newX = state.playerGridPos.x + dx;
            const newY = state.playerGridPos.y + dy;
            
            if (newX < 0 || newX >= state.gridSize || newY < 0 || newY >= state.gridSize) return;
            
            state.playerGridPos.x = newX;
            state.playerGridPos.y = newY;
            state.movesLeft--;
            
            document.getElementById('moveCounter').textContent = 'Moves Left: ' + state.movesLeft;
            if (state.movesLeft <= 2) {
                document.getElementById('moveCounter').style.color = '#dc3545';
            }
            
            if (newX === state.grahamPos.x && newY === state.grahamPos.y) {
                const grid = document.getElementById('grahamGrid');
                const cells = grid.children;
                const grahamIndex = state.grahamPos.y * state.gridSize + state.grahamPos.x;
                cells[grahamIndex].textContent = '👥';
                cells[grahamIndex].style.background = '#90EE90';
                
                document.getElementById('feedback').innerHTML = '<div class="success">✅ Found Graham with ' + state.movesLeft + ' moves to spare!</div><button class="continue-btn" onclick="completeCheckpoint(4)">Continue →</button>';
            } else if (state.movesLeft <= 0) {
                document.getElementById('feedback').innerHTML = '<div class="error">❌ Out of moves! Try again.</div>';
                setTimeout(function() {
                    launchGame(4);
                }, 1500);
            } else {
                renderGrahamGrid();
            }
        }

        function launchBinaryGame(content, targetNumber, actionText) {
            let bits = [0, 0, 0, 0, 0, 0, 0, 0];
            let currentCheckpointId = currentCheckpoint;
            
            let html = '<h2>⛽ Gas Station Challenge</h2>';
            html += '<p>Make binary number <strong>' + targetNumber + '</strong> to ' + actionText + '</p>';
            
            if (targetNumber === 65) {
                html += '<div class="lightbulb" id="lightbulb">💡</div>';
            }
            
            html += '<div class="binary-display" id="binaryDisplay">00000000</div>';
            html += '<div class="decimal-display" id="decimalDisplay">Decimal: 0</div>';
            html += '<div class="bit-buttons" id="bitButtons"></div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
            
            const container = document.getElementById('bitButtons');
            for (let i = 0; i < 8; i++) {
                const btn = document.createElement('button');
                btn.className = 'bit-button';
                btn.textContent = '0';
                btn.setAttribute('data-index', i);
                btn.onclick = function() {
                    const idx = parseInt(this.getAttribute('data-index'));
                    bits[idx] = bits[idx] === 0 ? 1 : 0;
                    this.textContent = bits[idx];
                    if (bits[idx] === 1) {
                        this.classList.add('on');
                    } else {
                        this.classList.remove('on');
                    }
                    
                    const binary = bits.join('');
                    const decimal = parseInt(binary, 2);
                    document.getElementById('binaryDisplay').textContent = binary;
                    document.getElementById('decimalDisplay').textContent = 'Decimal: ' + decimal;
                    
                    if (decimal === targetNumber) {
                        const lightbulb = document.getElementById('lightbulb');
                        if (lightbulb) {
                            lightbulb.classList.add('on');
                        }
                        const feedback = document.getElementById('feedback');
                        feedback.innerHTML = '<div class="success">✅ Success!</div><button class="continue-btn" onclick="completeCheckpoint(' + currentCheckpointId + ')">Continue →</button>';
                    } else {
                        const lightbulb = document.getElementById('lightbulb');
                        if (lightbulb) {
                            lightbulb.classList.remove('on');
                        }
                    }
                };
                container.appendChild(btn);
            }
        }

        function launchCoffeeGame(content) {
            const correctOrder = ["Boil water", "Add coffee", "Pour water", "Serve"];
            let selectedSteps = [];
            
            let html = '<h2>☕ Coffee Shop Algorithm</h2>';
            html += '<p>Arrange the steps in the correct order to make coffee</p>';
            html += '<div class="coffee-steps" id="stepSlots"></div>';
            html += '<div class="step-options" id="stepOptions"></div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
            
            const slotsDiv = document.getElementById('stepSlots');
            for (let i = 0; i < 4; i++) {
                const slot = document.createElement('div');
                slot.className = 'step-slot';
                slot.id = 'slot-' + i;
                slot.textContent = 'Step ' + (i + 1) + ': _____';
                slotsDiv.appendChild(slot);
            }
            
            const optionsDiv = document.getElementById('stepOptions');
            const shuffled = correctOrder.slice().sort(function() { return Math.random() - 0.5; });
            
            shuffled.forEach(function(step) {
                const btn = document.createElement('div');
                btn.className = 'step-option';
                btn.textContent = step;
                btn.onclick = function() {
                    if (this.classList.contains('used')) return;
                    this.classList.add('used');
                    selectedSteps.push(step);
                    const slot = document.getElementById('slot-' + (selectedSteps.length - 1));
                    slot.textContent = 'Step ' + selectedSteps.length + ': ' + step;
                    slot.classList.add('filled');
                    
                    if (selectedSteps.length === 4) {
                        if (JSON.stringify(selectedSteps) === JSON.stringify(correctOrder)) {
                            document.getElementById('feedback').innerHTML = '<div class="success">✅ Perfect algorithm! Coffee ready!</div><button class="continue-btn" onclick="completeCheckpoint(3)">Continue →</button>';
                        } else {
                            document.getElementById('feedback').innerHTML = '<div class="error">❌ Wrong order! Try again.</div>';
                            setTimeout(function() {
                                selectedSteps = [];
                                launchGame(3);
                            }, 1500);
                        }
                    }
                };
                optionsDiv.appendChild(btn);
            });
        }

        function launchNetworkGame(content) {
            let html = '<h2>👥 Pick Up Graham</h2>';
            html += '<p>How does data travel from your laptop to a server?</p>';
            html += '<div class="network-diagram">';
            html += '<div class="network-node">💻 Laptop</div>';
            html += '<span class="network-path">→</span>';
            html += '<div class="network-node">❓</div>';
            html += '<span class="network-path">→</span>';
            html += '<div class="network-node">🖥️ Server</div>';
            html += '</div>';
            html += '<div class="path-options">';
            html += '<div class="path-option" onclick="checkNetworkPath(\'direct\')">Direct connection</div>';
            html += '<div class="path-option" onclick="checkNetworkPath(\'router\')">Through a Router</div>';
            html += '<div class="path-option" onclick="checkNetworkPath(\'satellite\')">Via Satellite</div>';
            html += '</div>';
            html += '<div id="feedback"></div>';
            
            content.innerHTML = html;
        }

        function checkNetworkPath(path) {
            const feedback = document.getElementById('feedback');
            if (path === 'router') {
                feedback.innerHTML = '<div class="success">✅ Correct! Routers direct network traffic!</div><button class="continue-btn" onclick="completeCheckpoint(4)">Continue →</button>';
            } else {
                feedback.innerHTML = '<div class="error">❌ Not quite. Think about how home networks work.</div>';
            }
        }

        function completeCheckpoint(checkpointId) {
            document.getElementById('gameModal').classList.remove('show');
            gamePaused = false;

            const checkpoint = checkpoints[checkpointId];
            collectedCheckpoints.add(checkpointId);
            document.getElementById(checkpoint.task).classList.add('completed');
            
            showMessage('✓ ' + checkpoint.name + ' Complete!');
            
            if (checkpoint.next) {
                currentCheckpoint = checkpoint.next;
            } else {
                gameComplete = true;
                clearInterval(timerInterval);
                showVictoryScreen();
            }
            
            createMaze();
        }

        function showVictoryScreen() {
            const timeTaken = 30 - timeRemaining;
            document.getElementById('finalTime').textContent = timeTaken + ' seconds';
            
            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            badgesDiv.innerHTML += '<div style="margin: 20px 0; font-size: 1.2em;">🧭 Path Finder</div>';
            
            if (timeTaken <= 20) {
                badgesDiv.innerHTML += '<div style="margin: 20px 0; font-size: 1.2em;">⚡ Speed Runner</div>';
            }
            
            if (wallHits === 0) {
                badgesDiv.innerHTML += '<div style="margin: 20px 0; font-size: 1.2em;">🎯 Perfect Navigator</div>';
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
            setTimeout(function() {
                if (!gameComplete) messageEl.textContent = '';
            }, 2500);
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
            document.getElementById('gameModal').classList.remove('show');
            document.getElementById('timerDisplay').classList.remove('warning');
            
            const tasks = document.querySelectorAll('.task-item');
            tasks.forEach(function(t) {
                t.classList.remove('completed');
            });
            
            updateTimerDisplay();
            updateWallCounter();
            createMaze();
            startTimer();
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') {
                movePlayer(0, -1);
            } else if (e.key === 'ArrowDown') {
                movePlayer(0, 1);
            } else if (e.key === 'ArrowLeft') {
                movePlayer(-1, 0);
            } else if (e.key === 'ArrowRight') {
                movePlayer(1, 0);
            }
        });

        window.checkNetworkPath = checkNetworkPath;
        window.completeCheckpoint = completeCheckpoint;
        window.resetGame = resetGame;
        window.checkGasSequence = checkGasSequence;
        window.checkCoffee = checkCoffee;
        window.moveGrahamPlayer = moveGrahamPlayer;

        createMaze();
        startTimer();
    </script>
</body>
</html>