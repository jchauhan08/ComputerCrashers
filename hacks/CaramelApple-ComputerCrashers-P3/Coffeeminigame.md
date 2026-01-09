---
layout: base
title: Coffee Shop Mini Game
permalink: /candyland/coffee-mini-game
---

<div class="coffee-shop">
  <h1>☕ Candyland Coffee Café ☕</h1>
  <p>Walk across the café and talk to the barista.</p>

  <div id="game">
    <div class="banner">☕ SWEET BEANS CAFÉ ☕</div>

    <!-- Tables -->
    <div class="table t1">🪑🍩🪑</div>
    <div class="table t2">🪑🧁🪑</div>
    <div class="table t3">🪑🍪🪑</div>

    <!-- Counter & Barista -->
    <div id="counter"></div>
    <div id="barista">🧑‍🍳</div>

    <!-- Player -->
    <div id="player">🙂</div>
  </div>

  <div id="menuModal" class="menu">
    <div class="menu-box">
      <h2>☕ Coffee Menu</h2>

      <button class="option">Chocolate Coffee Beans ☕</button>
      <button class="option">Caramel Espresso 🍬</button>
      <button class="option">Gummy Worm Latte 🐛</button>

      <p id="feedback"></p>
      <button id="closeMenu">Leave Café →</button>
    </div>
  </div>
</div>

<style>
.coffee-shop {
  text-align: center;
  font-family: inherit;
}

/* Game Area */
#game {
  position: relative;
  width: 600px;
  height: 360px;
  margin: 30px auto;
  background:
    repeating-linear-gradient(
      45deg,
      #f5f5dc,
      #f5f5dc 20px,
      #eee 20px,
      #eee 40px
    );
  border: 6px solid #6f4e37;
  border-radius: 25px;
  overflow: hidden;
}

/* Banner */
.banner {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  background: #6f4e37;
  color: white;
  padding: 8px;
}

/* Tables */
.table {
  position: absolute;
  font-size: 1.5em;
  background: #d7ccc8;
  padding: 6px 10px;
  border-radius: 15px;
  border: 2px solid #6f4e37;
}

.t1 { left: 60px; bottom: 120px; }
.t2 { left: 240px; bottom: 160px; }
.t3 { left: 420px; bottom: 120px; }

/* Counter */
#counter {
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(#8d6e63, #5d4037);
}

/* Barista */
#barista {
  position: absolute;
  bottom: 140px;
  left: 280px;
  font-size: 2.7em;
}

/* Player */
#player {
  position: absolute;
  bottom: 0;
  left: 20px;
  font-size: 2.7em;
}

/* Menu Overlay */
.menu {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  align-items: center;
  justify-content: center;
}

.menu.show {
  display: flex;
}

.menu-box {
  background: #fff8e1;
  padding: 30px;
  border-radius: 20px;
  border: 4px solid #6f4e37;
  width: 90%;
  max-width: 400px;
}

.option {
  display: block;
  margin: 10px auto;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid #6f4e37;
  background: white;
  cursor: pointer;
}

.option:hover {
  background: #ffe0b2;
}

#feedback {
  min-height: 24px;
  font-weight: bold;
}

#closeMenu {
  margin-top: 15px;
}
</style>

<script>
const player = document.getElementById("player");
const barista = document.getElementById("barista");
const menu = document.getElementById("menuModal");
const feedback = document.getElementById("feedback");

let x = 20;
let y = 0;
let speed = 10;
let paused = false;

function move(dx, dy) {
  if (paused) return;

  x += dx;
  y += dy;

  x = Math.max(0, Math.min(540, x));
  y = Math.max(0, Math.min(260, y));

  player.style.left = x + "px";
  player.style.bottom = y + "px";

  checkCollision();
}

function checkCollision() {
  const p = player.getBoundingClientRect();
  const b = barista.getBoundingClientRect();

  if (
    p.left < b.right &&
    p.right > b.left &&
    p.top < b.bottom &&
    p.bottom > b.top
  ) {
    paused = true;
    menu.classList.add("show");
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") move(speed, 0);
  if (e.key === "ArrowLeft") move(-speed, 0);
  if (e.key === "ArrowUp") move(0, speed);
  if (e.key === "ArrowDown") move(0, -speed);
});

document.querySelectorAll(".option").forEach(btn => {
  btn.onclick = () => {
    if (btn.textContent.includes("Coffee") || btn.textContent.includes("Espresso")) {
      feedback.textContent = "✅ Correct! Coffee collected ☕";
      feedback.style.color = "green";
    } else {
      feedback.textContent = "❌ That’s not coffee!";
      feedback.style.color = "red";
    }
  };
});

document.getElementById("closeMenu").onclick = () => {
  window.location.href = "/candyland/workmaze";
};
</script>
