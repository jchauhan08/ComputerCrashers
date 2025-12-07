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
        position: absolute; top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: rgba(255, 249, 243, 0.95);
        border-radius: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 20;
    }
    
    #game-over-modal h2 { 
        font-family: var(--font-title); 
        color: #3e2723; 
        font-size: 2.5rem; 
    }
    
    #game-over-modal p { 
        font-size: 1.5rem; 
        font-weight: bold; 
        margin-bottom: 20px; 
    }

    #next-module-btn {
        background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        border: none; border-radius: 10px;
        color: white; padding: 15px 30px;
        font-size: 1rem; font-weight: 700;
        cursor: pointer; transition: transform 0.2s;
    }
    #next-module-btn:hover { transform: scale(1.05); }

    @keyframes shake {
        0%, 100% { transform: rotateY(180deg) translateX(0); } 
        25% { transform: rotateY(180deg) translateX(-5px); }
        50% { transform: rotateY(180deg) translateX(5px); }
        75% { transform: rotateY(180deg) translateX(-5px); }
    }

    /* Add this to your style section */
    #logout-btn {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 10; /* Ensures it sits on top of other elements */
}
</style>
</head>
<body>

<div class="game-container">
    <div class="game-header">
        <h1 class="game-title">
            <span id="game-round-title">Morning Routine — Round 1/5</span>
        </h1>
        <p id="instruction-text">Find the Candy Cane Toothbrush!</p>
    </div>
    <button id="logout-btn" class="ca-button secondary" onclick="logout()">Logout</button>
    <!-- The grid is now generated ONCE at the start -->
    <div id="items-grid"></div>

    <div id="score-display">Score: 0</div>
    
    <div id="game-over-modal">
        <h2>Quest Complete!</h2>
        <p>You did an amazing job!</p>
        <button id="next-module-btn" onclick="window.location.href='/candyland/workmaze'">Proceed to Module 2</button>
    </div>
    
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {

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

    // We only need the correct item per round now.
    // The visual grid will stay consistent.
    const gameData = [
        {
            round: 1,
            instruction: "Find the Candy Cane Toothbrush!",
            correctItem: "Candy Cane Toothbrush"
        },
        {
            round: 2,
            instruction: "Find the Marshmallow Soap!",
            correctItem: "Marshmallow Soap"
        },
        {
            round: 3,
            instruction: "Find the Peppermint Comb!",
            correctItem: "Peppermint Comb"
        },
        {
            round: 4,
            instruction: "Find the Caramel Coffee!",
            correctItem: "Caramel Coffee"
        },
        {
            round: 5,
            instruction: "Find the Breakfast Bar!",
            correctItem: "Breakfast Bar"
        }
    ];

    // --- STATE VARIABLES ---
    let currentRound = 0;
    let score = 0;
    let isProcessing = false; 
    let attempts = 0; 

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

    // --- INITIALIZATION ---
    function initGame() {
        // 1. Get all available items from the image dictionary
        const allItems = Object.keys(imagePaths);
        
        // 2. Shuffle them ONCE. They will stay in this order forever.
        const boardLayout = shuffle([...allItems]);
        
        // 3. Build the Grid ONCE.
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

        // 4. Start the first round
        startRound();
    }

    function startRound() {
        if (currentRound >= gameData.length) {
            gameOverModal.style.display = 'flex';
            return;
        }

        const roundData = gameData[currentRound];
        isProcessing = false;
        attempts = 0; 
        
        // Update Text
        instructionText.textContent = roundData.instruction;
        roundTitle.textContent = `Morning Routine — Round ${roundData.round}/5`;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // RESET VISUALS: Flip all cards back to "?" and remove colors
        const allCards = document.querySelectorAll('.item-card');
        allCards.forEach(card => {
            card.classList.remove('flipped');
            const inner = card.querySelector('.card-inner');
            inner.classList.remove('correct', 'incorrect');
        });
    }

    function handleCardClick(event) {
        const clickedCard = event.currentTarget;
        
        // Prevent clicking if busy, or if card is already revealed
        if (isProcessing || clickedCard.classList.contains('flipped')) return;

        // 1. Flip the card
        clickedCard.classList.add('flipped');
        
        // 2. Increment attempts
        attempts++;

        const selectedItem = clickedCard.dataset.name;
        const correctItem = gameData[currentRound].correctItem;
        const innerCard = clickedCard.querySelector('.card-inner');

        // 3. Check Logic
        if (selectedItem === correctItem) {
            // --- CORRECT ---
            
            // Point only if attempts <= 2 (allowing for memory errors)
            if (attempts <= 2) {
                score++;
            }
            
            scoreDisplay.textContent = `Score: ${score}`;
            innerCard.classList.add('correct');
            isProcessing = true; 

            // Wait a moment, then start next round (which hides cards again)
            setTimeout(() => {
                currentRound++;
                startRound();
            }, 1500); 

        } else {
            // --- INCORRECT ---
            isProcessing = true; 
            innerCard.classList.add('incorrect'); 

            setTimeout(() => {
                clickedCard.classList.remove('flipped');
                innerCard.classList.remove('incorrect');
                isProcessing = false; 
            }, 1200); 
        }
    }

    // Begin
    initGame();
});

// --- LOGOUT LOGIC ---
async function logout() {
    try {
        // UPDATED URL HERE 👇
        await fetch('http://localhost:8587/api/candyland/logout', { 
            method: 'POST',
            credentials: 'include' 
        });
        console.log("Logout successful");
    } catch(e) { 
        console.log("Logout error", e); 
    }
    
    window.location.href = '/candyland/login';
}

</script>

</body>
</html>