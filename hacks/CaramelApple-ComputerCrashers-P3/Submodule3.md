---
layout: base
title: Whack-a-Bug
Author: Avantika Chittari
permalink: /candyland/whack-a-bug
---

<style>
body {
  background: #ffe6f2;
  font-family: "Comic Sans MS", cursive;
  text-align: center;
}

#gameContainer {
  padding: 20px;
  background: #fff0fa;
  border: 4px solid #ffb3e6;
  border-radius: 20px;
  width: 400px;
  margin: 20px auto;
  box-shadow: 0 0 20px #ffccf9;
}

h1 {
  color: #ff69b4;
  text-shadow: 2px 2px #ffc6e9;
  font-size: 40px;
  margin-bottom: 10px;
}

#grid {
  width: 330px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
}

.square {
  width: 100px;
  height: 100px;
  background: #ffe1f7;
  border: 3px solid #ffb3e6;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 55px;
  cursor: pointer;
  transition: 0.2s;
}

.square:hover {
  background: #ffd6f4;
}

.bug {
  font-size: 55px;
}

#score, #timer {
  font-size: 22px;
  margin: 10px;
  color: #ff5ca8;
  font-weight: bold;
}

#startBtn {
  margin-top: 15px;
  padding: 12px 25px;
  font-size: 20px;
  background: #ff85c2;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px #ff5ca8;
}

#startBtn:hover {
  background: #ff6bb5;
}

#startBtn:active {
  box-shadow: 0 2px #ff5ca8;
  transform: translateY(2px);
}
</style>

<div id="gameContainer">
  <h1>🍭 Whack-a-Candy 🍬</h1>
  <div id="score">Score: 0</div>
  <div id="timer">Time: 30</div>
  <button id="startBtn">Start Game</button>
  <div id="grid"></div>
</div>

<script>
const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 30;
let gameInterval;
let bugTimeout;
let currentBug = null;

for (let i = 0; i < 9; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.id = i;
  grid.appendChild(square);

  square.addEventListener("click", () => {
    if (square.classList.contains("bug")) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      removeBug();
    }
  });
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30";

  startBtn.disabled = true;

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnBug();
}

function spawnBug() {
  removeBug();

  const squares = document.querySelectorAll(".square");
  const randomSquare = squares[Math.floor(Math.random() * squares.length)];

  randomSquare.classList.add("bug");
  randomSquare.textContent = "🍬";
  currentBug = randomSquare;

  bugTimeout = setTimeout(spawnBug, 2000 + Math.random() * 1000);
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
  alert("Time's up! Your candy score: " + score);
}

startBtn.addEventListener("click", startGame);
</script>
