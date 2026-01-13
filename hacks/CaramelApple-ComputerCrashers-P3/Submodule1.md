---
layout: base
title: Morning Routine Game 
authors: Anika Marathe
permalink: /candyland/morningroutine
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Importing Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title>Morning Routine Game</title>
    
<style>
    /* --- General Styling --- */
    :root {
        --bg-color: #efb5d6ff; 
        --card-bg: #FFF9F3;
        --card-back-bg: #FFC3A0; 
        --card-pattern: #D4746A;
        --text-color: #6B4F4F;
        --title-color: #D4746A;
        --border-color: #F7E6DC;
        --correct-color: #5cb85c;
        --incorrect-color: #d9534f;
        --font-title: 'Fredoka', sans-serif;
        --font-body: 'Nunito', sans-serif;
    }

    body {
        font-family: var(--font-body);
        background-color: var(--bg-color);
        color: var(--text-color);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
    }

    .game-container {
        width: 100%;
        max-width: 800px;
        background-color: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
        padding: 40px;
        text-align: center;
        position: relative;
        min-height: 600px;
    }

    /* --- NEW: START SCREEN STYLING --- */
    #start-screen {
        position: absolute;
        inset: 0;
        background: white;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        padding: 20px;
    }

    .start-btn {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        border: none;
        padding: 20px 40px;
        font-size: 1.5rem;
        font-family: var(--font-title);
        border-radius: 15px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
    }

    .start-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(245, 87, 108, 0.6);
    }

    .game-header { margin-bottom: 30px; }
    .game-title {
        font-family: var(--font-title);
        color: var(--title-color);
        font-size: 2.5rem;
        font-weight: 500;
    }
    #instruction-text { font-size: 1.2rem; margin-top: 10px; font-weight: bold;}

    /* --- FLIP CARD CSS --- */
    
    #items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }

    .item-card {
        background-color: transparent;
        min-height: 180px;
        perspective: 1000px; 
        cursor: pointer;
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .item-card.flipped .card-inner {
        transform: rotateY(180deg);
    }

    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 15px;
        border: 3px solid var(--border-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card-front {
        background-color: var(--card-back-bg);
        color: white;
        font-size: 3rem;
        font-family: var(--font-title);
        background-image: repeating-linear-gradient(
            45deg,
            var(--card-back-bg),
            var(--card-back-bg) 10px,
            #ffafbd 10px,
            #ffafbd 20px
        );
    }

    .card-back {
        background-color: var(--card-bg);
        transform: rotateY(180deg); 
    }

    .card-back img {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
    }

    .card-inner.correct .card-back {
        border-color: var(--correct-color);
        background-color: #e8f5e9;
        box-shadow: 0 0 15px var(--correct-color);
    }

    .card-inner.incorrect .card-back {
        border-color: var(--incorrect-color);
        background-color: #fce4ec;
        box-shadow: 0 0 15px var(--incorrect-color);
        animation: shake 0.4s ease;
    }

    #score-display { margin-top: 30px; font-size: 1.1rem; font-weight: 600; color: black; }

    /* --- Game Over Modal --- */
    #game-over-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 1000;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 50px;
        border-radius: 30px;
        text-align: center;
        border: 8px solid var(--title-color);
        box-shadow: 0 0 50px rgba(212, 116, 106, 0.8);
        max-width: 500px;
        animation: slideIn 0.5s ease;
    }

    @keyframes slideIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    .modal-content h2 { 
        font-family: var(--font-title); 
        color: var(--title-color); 
        font-size: 2.5rem;
        margin-bottom: 20px;
    }
    
    .modal-content p { 
        font-size: 1.3rem; 
        font-weight: bold; 
        margin-bottom: 25px;
        color: var(--text-color);
    }

    .confetti {
        font-size: 2em;
        margin: 20px 0;
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

    #next-module-btn, #retry-btn {
        background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        border: none;
        border-radius: 15px;
        color: white;
        padding: 15px 35px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s;
        margin: 10px;
        font-family: var(--font-body);
    }

    #next-module-btn:hover, #retry-btn:hover { 
        transform: scale(1.05); 
    }

    #next-module-btn {
        background: linear-gradient(to bottom, #90EE90, #32CD32);
    }

    @keyframes shake {
        0%, 100% { transform: rotateY(180deg) translateX(0); } 
        25% { transform: rotateY(180deg) translateX(-5px); }
        50% { transform: rotateY(180deg) translateX(5px); }
        75% { transform: rotateY(180deg) translateX(-5px); }
    }

    #logout-btn {
        position: absolute;
        top: 25px;
        right: 25px;
        z-index: 10;
    }

    .ca-button.secondary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.2s;
    }

    .ca-button.secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
</style>
</head>
<body>

<div class="game-container">
    <!-- START SCREEN OVERLAY (NEW) -->
    <div id="start-screen">
        <h1 class="game-title">Morning Routine</h1>
        <p style="margin-bottom: 30px; font-weight: bold; font-size: 1.1rem;">Click below to begin your quest!</p>
        <button class="start-btn" id="start-game-btn">Start Game</button>
    </div>

    <div class="game-header">
        <h1 class="game-title">
            <span id="game-round-title">Morning Routine — Round 1/5</span>
        </h1>
        <p id="instruction-text">Find the Candy Cane Toothbrush!</p>
    </div>
    <button id="logout-btn" class="ca-button secondary" onclick="logout()">Logout</button>
    
    <div id="items-grid"></div>

    <div id="score-display">Score: 0</div>
</div>

<!-- Game Over Modal -->
<div id="game-over-modal">
    <div class="modal-content">
        <h2 id="completion-title">Quest Complete!</h2>
        <div class="confetti">🍭 ✨ 🎉 🍬 🎊</div>
        <p id="completion-message">You did an amazing job!</p>
        <p style="font-size: 1.2em;">Final Score: <span id="final-score">0</span> / 5</p>
        <div class="badges-earned" id="badgesEarned"></div>
        <button id="next-module-btn" onclick="nextModule()">Proceed to Getting to Work →</button>
        <button id="retry-btn" onclick="retryGame()">🔄 Play Again</button>
    </div>
</div>

<script type="module">
    import { saveGameScore , saveBadge } from '/assets/js/candyland/candyland_api.js';

    document.addEventListener('DOMContentLoaded', () => {

        const startScreen = document.getElementById('start-screen');
        const startBtn = document.getElementById('start-game-btn');

        // --- PHASE 1: START GAME & LOG ATTEMPTS ---
        startBtn.addEventListener('click', async () => {
            startScreen.style.display = 'none';

            // List of all 5 badges the user could potentially earn
            const possibleBadges = [
                'Perfect Morning', 
                'Sharp Memory', 
                'Morning Star', 
                'Still Sleepy', 
                'Careful Observer'
            ];

            // Pings the Jinja Admin Table to log an attempt for EVERY badge
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

            initGame(); // Begin the actual logic
        });

        // --- CONFIGURATION ---
        const imagePaths = {
            "Candy Cane Toothbrush": "/images/tb2.png",
            "Marshmallow Soap": "/images/soap2.png",
            "Peppermint Comb": "/images/comb2.png",
            "Caramel Coffee": "/images/coffee.png",
            "Breakfast Bar": "/images/bar.png",
            "Gummy Vitamin Bottle": "/images/gummi2.png",
            "Bubblegum Face Wash": "/images/facewash.png"
        };

        const gameData = [
            { round: 1, instruction: "Find the Candy Cane Toothbrush!", correctItem: "Candy Cane Toothbrush" },
            { round: 2, instruction: "Find the Marshmallow Soap!", correctItem: "Marshmallow Soap" },
            { round: 3, instruction: "Find the Peppermint Comb!", correctItem: "Peppermint Comb" },
            { round: 4, instruction: "Find the Caramel Coffee!", correctItem: "Caramel Coffee" },
            { round: 5, instruction: "Find the Breakfast Bar!", correctItem: "Breakfast Bar" }
        ];

        // --- STATE VARIABLES ---
        let currentRound = 0;
        let score = 0;
        let isProcessing = false; 
        let attempts = 0;
        let totalAttempts = 0; 
        let firstTryCorrect = 0; 

        const grid = document.getElementById('items-grid');
        const instructionText = document.getElementById('instruction-text');
        const roundTitle = document.getElementById('game-round-title');
        const scoreDisplay = document.getElementById('score-display');
        const gameOverModal = document.getElementById('game-over-modal');

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function initGame() {
            const allItems = Object.keys(imagePaths);
            const boardLayout = shuffle([...allItems]);
            
            grid.innerHTML = '';
            boardLayout.forEach(itemName => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.dataset.name = itemName;

                card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">?</div>
                        <div class="card-back">
                            <img src="${imagePaths[itemName]}" alt="${itemName}">
                        </div>
                    </div>
                `;
                
                card.addEventListener('click', handleCardClick);
                grid.appendChild(card);
            });

            startRound();
        }

        function startRound() {
            if (currentRound >= gameData.length) {
                saveGameScore('morning_routine_score', score);
                showGameOver(); 
                return;
            }

            const roundData = gameData[currentRound];
            isProcessing = false;
            attempts = 0; 
            
            instructionText.textContent = roundData.instruction;
            roundTitle.textContent = `Morning Routine — Round ${roundData.round}/5`;
            scoreDisplay.textContent = `Score: ${score}`;
            
            const allCards = document.querySelectorAll('.item-card');
            allCards.forEach(card => {
                card.classList.remove('flipped');
                const inner = card.querySelector('.card-inner');
                inner.classList.remove('correct', 'incorrect');
            });
        }

        function handleCardClick(event) {
            const clickedCard = event.currentTarget;
            if (isProcessing || clickedCard.classList.contains('flipped')) return;

            clickedCard.classList.add('flipped');
            attempts++;
            totalAttempts++; 

            const selectedItem = clickedCard.dataset.name;
            const correctItem = gameData[currentRound].correctItem;
            const innerCard = clickedCard.querySelector('.card-inner');

            if (selectedItem === correctItem) {
                if (attempts === 1) firstTryCorrect++;
                if (attempts <= 2) score++;
                
                scoreDisplay.textContent = `Score: ${score}`;
                innerCard.classList.add('correct');
                isProcessing = true; 

                setTimeout(() => {
                    currentRound++;
                    startRound();
                }, 1500); 

            } else {
                isProcessing = true; 
                innerCard.classList.add('incorrect'); 

                setTimeout(() => {
                    clickedCard.classList.remove('flipped');
                    innerCard.classList.remove('incorrect');
                    isProcessing = false; 
                }, 1200); 
            }
        }

        function showGameOver() {
            const earnedBadges = [];

            if (score === 5) earnedBadges.push({ icon: '🏆', name: 'Perfect Morning' });
            if (firstTryCorrect >= 4) earnedBadges.push({ icon: '🎯', name: 'Sharp Memory' });
            if (score >= 4) earnedBadges.push({ icon: '⭐', name: 'Morning Star' });
            if (score <= 2) earnedBadges.push({ icon: '🐌', name: 'Still Sleepy' });
            if (totalAttempts <= 15) earnedBadges.push({ icon: '🔍', name: 'Careful Observer' });

            document.getElementById('final-score').textContent = score;
            
            if (score === 5) {
                document.getElementById('completion-title').textContent = '🎉 Perfect Morning! 🎉';
                document.getElementById('completion-message').textContent = 'You have an amazing memory!';
            } else if (score >= 3) {
                document.getElementById('completion-title').textContent = '😊 Great Job! 😊';
                document.getElementById('completion-message').textContent = 'You did really well!';
            } else {
                document.getElementById('completion-title').textContent = '🍭 Quest Complete! 🍭';
                document.getElementById('completion-message').textContent = 'Keep practicing your memory!';
            }

            const badgesDiv = document.getElementById('badgesEarned');
            badgesDiv.innerHTML = '';
            
            earnedBadges.forEach(badge => {
                saveBadge(badge.name, badge.icon); 
                const badgeEl = document.createElement('div');
                badgeEl.className = 'badge-earned';
                badgeEl.textContent = `${badge.icon} ${badge.name}`;
                badgesDiv.appendChild(badgeEl);
            });

            gameOverModal.style.display = 'flex';
        }

        window.nextModule = function() {
            window.location.href = '/candyland/workmaze';
        };

        window.retryGame = function() {
            currentRound = 0;
            score = 0;
            totalAttempts = 0;
            firstTryCorrect = 0;
            gameOverModal.style.display = 'none';
            initGame();
        };
    });

    window.logout = async function() {
        try {
            await fetch('http://localhost:8587/api/candyland/logout', { 
                method: 'POST',
                credentials: 'include' 
            });
            window.location.href = '/candyland/login';
        } catch(e) { 
            console.log("Logout error", e); 
        }
    }
</script>

</body>
</html>