---
layout: post
title: Morning Routine Game 
authors: Anika Marathe
permalink: /candyland/morningroutine
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Importing Google Fonts for a professional look -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <title>Morning Routine Game</title>

<style>
    /* --- General Styling & Setup --- */
    :root {
        --bg-color: #FEF6F0;
        --card-bg: #FFF9F3;
        --text-color: #6B4F4F;
        --title-color: #D4746A;
        --border-color: #F7E6DC;
        --correct-color: #5cb85c;
        --incorrect-color: #d9534f;
        --sprite-bg: #E4F1FF;
        --sprite-border: #A3D5FF;
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

    /* --- Game Container --- */
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

    /* --- Header & Instructions --- */
    .game-header {
        margin-bottom: 30px;
    }

    .game-title {
        font-family: var(--font-title);
        color: var(--title-color);
        font-size: 2.5rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }
    
    .game-title .icon {
        background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: inline-block;
        /* Placeholder for a magnifying glass icon */
    }

    #instruction-text {
        font-size: 1.2rem;
        margin-top: 10px;
        color: var(--text-color);
    }
    
    #sprite-box {
        position: absolute;
        top: 40px;
        right: 40px;
        width: 100px;
        height: 100px;
        background-color: var(--sprite-bg);
        border: 2px dashed var(--sprite-border);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
    }


    /* --- Items Grid (CSS Grid) --- */
    #items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 25px;
        margin-top: 20px;
    }

    /* --- Item Card Styling --- */
    .item-card {
        background-color: var(--card-bg);
        border: 2px solid var(--border-color);
        border-radius: 15px;
        padding: 20px;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-align: center;
        font-weight: 600;
        min-height: 180px; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
    
    .item-card.disabled {
        pointer-events: none;
        opacity: 0.7;
    }

    .item-card .img-container {
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .item-card .img-container img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    /* --- Visual Feedback Classes --- */
    .item-card.correct {
        border-color: var(--correct-color);
        box-shadow: 0 0 15px rgba(92, 184, 92, 0.5);
        animation: pulse 0.5s ease;
    }

    .item-card.incorrect {
        border-color: var(--incorrect-color);
        box-shadow: 0 0 15px rgba(217, 83, 79, 0.5);
        animation: shake 0.4s ease;
    }

    /* --- Score Display --- */
    #score-display {
        margin-top: 30px;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    /* --- Game Over Modal --- */
    #game-over-modal {
        display: none; /* Initially hidden */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 249, 243, 0.9);
        border-radius: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }
    
    #game-over-modal h2 {
        font-family: var(--font-title);
        color: var(--title-color);
        font-size: 2.5rem;
    }
    
    #next-module-btn {
        background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        border: none;
        border-radius: 10px;
        color: white;
        padding: 15px 30px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    #next-module-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(212, 116, 106, 0.4);
    }
    

    /* --- Animations --- */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

</style>
</head>
<body>

<div class="game-container">
    <div class="game-header">
        <h1 class="game-title">
            <span class="icon"></span>
            <span id="game-round-title">Morning Routine — Round 1/5</span>
        </h1>
        <p id="instruction-text">Find the Candy Cane Toothbrush!</p>
    </div>
    
    <div id="sprite-box">Sprite</div>

    <div id="items-grid">
        <!-- Item cards will be generated by JavaScript -->
    </div>

    <div id="score-display">Score: 0</div>
    
    <div id="game-over-modal">
        <h2>Quest Complete!</h2>
        <p>You did an amazing job!</p>
        <button id="next-module-btn">Proceed to Module 2</button>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------
    // --- STEP 1: EDIT YOUR IMAGE PATHS HERE ---
    // -------------------------------------------------------------------
    // Replace the paths below with the actual paths to your image files.
    // For example: "images/toothbrush.png"
    const imagePaths = {
        "Candy Cane Toothbrush": "/images/toothbrush.png",
        "Marshmallow Soap": "/images/soap.png",
        "Peppermint Comb": "/images/comb.png",
        "Caramel Coffee": "/images/caramel.png",
        "Breakfast Bar": "/images/bar.png",
        "Gummy Vitamin Bottle": "/images/gummy1.png",
        "Bubblegum Face Wash": "/images/facewash.png"
    };
    // -------------------------------------------------------------------

    // --- GAME DATA (No need to edit below this line) ---
    const gameData = [
        {
            round: 1,
            instruction: "Find the Candy Cane Toothbrush!",
            correctItem: "Candy Cane Toothbrush",
            items: [
                { name: "Candy Cane Toothbrush", img: imagePaths["Candy Cane Toothbrush"] },
                { name: "Marshmallow Soap", img: imagePaths["Marshmallow Soap"] },
                { name: "Peppermint Comb", img: imagePaths["Peppermint Comb"] },
                { name: "Caramel Coffee", img: imagePaths["Caramel Coffee"] },
                { name: "Breakfast Bar", img: imagePaths["Breakfast Bar"] }
            ]
        },
        {
            round: 2,
            instruction: "Find the Marshmallow Soap!",
            correctItem: "Marshmallow Soap",
            items: [
                { name: "Bubblegum Face Wash", img: imagePaths["Bubblegum Face Wash"] },
                { name: "Marshmallow Soap", img: imagePaths["Marshmallow Soap"] },
                { name: "Peppermint Comb", img: imagePaths["Peppermint Comb"] },
                { name: "Candy Cane Toothbrush", img: imagePaths["Candy Cane Toothbrush"] },
                { name: "Gummy Vitamin Bottle", img: imagePaths["Gummy Vitamin Bottle"] }
            ]
        },
        {
            round: 3,
            instruction: "Find the Peppermint Comb!",
            correctItem: "Peppermint Comb",
            items: [
                { name: "Peppermint Comb", img: imagePaths["Peppermint Comb"] },
                { name: "Caramel Coffee", img: imagePaths["Caramel Coffee"] },
                { name: "Breakfast Bar", img: imagePaths["Breakfast Bar"] },
                { name: "Gummy Vitamin Bottle", img: imagePaths["Gummy Vitamin Bottle"] },
                { name: "Marshmallow Soap", img: imagePaths["Marshmallow Soap"] }
            ]
        },
        {
            round: 4,
            instruction: "Find the Caramel Coffee!",
            correctItem: "Caramel Coffee",
            items: [
                { name: "Candy Cane Toothbrush", img: imagePaths["Candy Cane Toothbrush"] },
                { name: "Breakfast Bar", img: imagePaths["Breakfast Bar"] },
                { name: "Caramel Coffee", img: imagePaths["Caramel Coffee"] },
                { name: "Bubblegum Face Wash", img: imagePaths["Bubblegum Face Wash"] },
                { name: "Peppermint Comb", img: imagePaths["Peppermint Comb"] }
            ]
        },
        {
            round: 5,
            instruction: "Find the Breakfast Bar!",
            correctItem: "Breakfast Bar",
            items: [
                { name: "Gummy Vitamin Bottle", img: imagePaths["Gummy Vitamin Bottle"] },
                { name: "Marshmallow Soap", img: imagePaths["Marshmallow Soap"] },
                { name: "Breakfast Bar", img: imagePaths["Breakfast Bar"] },
                { name: "Caramel Coffee", img: imagePaths["Caramel Coffee"] },
                { name: "Candy Cane Toothbrush", img: imagePaths["Candy Cane Toothbrush"] }
            ]
        }
    ];

    // --- STATE VARIABLES ---
    let currentRound = 0;
    let score = 0;

    // --- DOM ELEMENTS ---
    const grid = document.getElementById('items-grid');
    const instructionText = document.getElementById('instruction-text');
    const roundTitle = document.getElementById('game-round-title');
    const scoreDisplay = document.getElementById('score-display');
    const gameOverModal = document.getElementById('game-over-modal');

    // --- GAME LOGIC FUNCTIONS ---

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function renderRound() {
        if (currentRound >= gameData.length) {
            endGame();
            return;
        }

        const roundData = gameData[currentRound];
        
        instructionText.textContent = roundData.instruction;
        roundTitle.textContent = `Morning Routine — Round ${roundData.round}/5`;
        scoreDisplay.textContent = `Score: ${score}`;
        
        grid.innerHTML = '';
        const shuffledItems = shuffle([...roundData.items]);
        
        shuffledItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.dataset.name = item.name;

            // *** THIS IS THE UPDATED PART ***
            // It now uses a real <img> tag with the path you provide.
            card.innerHTML = `
                <div class="img-container">
                    <img src="${item.img}" alt="${item.name}">
                </div>
            `;
            
            card.addEventListener('click', handleCardClick);
            grid.appendChild(card);
        });
    }

    function handleCardClick(event) {
        const clickedCard = event.currentTarget;
        const selectedItem = clickedCard.dataset.name;
        const correctItem = gameData[currentRound].correctItem;
        
        document.querySelectorAll('.item-card').forEach(card => card.classList.add('disabled'));

        if (selectedItem === correctItem) {
            score++;
            clickedCard.classList.add('correct');
            scoreDisplay.textContent = `Score: ${score}`;
            
            setTimeout(() => {
                currentRound++;
                renderRound();
            }, 1500);
            
        } else {
            clickedCard.classList.add('incorrect');
            
            setTimeout(() => {
                clickedCard.classList.remove('incorrect');
                document.querySelectorAll('.item-card').forEach(card => card.classList.remove('disabled'));
            }, 1000);
        }
    }
    
    function endGame() {
        gameOverModal.style.display = 'flex';
    }

    // --- INITIALIZE GAME ---
    renderRound();
});
</script>

</body>
</html>