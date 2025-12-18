---
layout: base
title: Maze Mini-Game
authors: Rishabh Jha
description: "Mini-game: choose coffee, gas type, and gallons"
permalink: /candyland/maze-mini-game
categories: [Quest, MiniGame]
tags: [maze, mini-game, choices]
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maze Mini-Game</title>
  <style>
    * { box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 30px 20px;
    }

    .wrap {
      max-width: 900px;
      margin: 0 auto;
    }

    .card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 22px;
      box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
      overflow: hidden;
    }

    header {
      text-align: center;
      margin-bottom: 18px;
    }

    h1 {
      color: white;
      margin: 0 0 10px 0;
      font-size: 2.2rem;
      text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.92);
      margin: 0;
    }

    .step {
      display: none;
    }

    .step.show {
      display: block;
    }

    .step-title {
      margin: 0 0 10px 0;
      font-size: 1.4rem;
      color: #333;
    }

    .step-desc {
      margin: 0 0 16px 0;
      color: #555;
      line-height: 1.5;
    }

    .options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 10px;
      margin-top: 8px;
    }

    .option {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 12px 14px;
      cursor: pointer;
      user-select: none;
      display: flex;
      gap: 10px;
      align-items: center;
      transition: transform 0.15s ease, border-color 0.15s ease;
      background: #fff;
    }

    .option:hover {
      transform: translateY(-1px);
      border-color: #667eea;
    }

    .option input {
      margin: 0;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      margin-top: 18px;
      flex-wrap: wrap;
    }

    .btn {
      border: none;
      background: white;
      color: #667eea;
      padding: 10px 14px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      font-family: inherit;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .summary {
      border-top: 1px solid #e5e7eb;
      margin-top: 16px;
      padding-top: 16px;
      color: #333;
      line-height: 1.55;
    }

    .meter {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      margin: 12px 0 0 0;
      color: #333;
      font-weight: 600;
    }

    .range-row {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    input[type="range"] {
      width: min(520px, 100%);
    }

    .pill {
      display: inline-block;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.12);
      color: #3b4cca;
      font-weight: 700;
      min-width: 70px;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="wrap">
    <header>
      <h1>🧩 Maze Mini-Game</h1>
      <p class="subtitle">Make choices to continue through the mini-game.</p>
    </header>

    <main class="card">
      <section class="step show" id="step1" aria-labelledby="step1-title">
        <h2 class="step-title" id="step1-title">1) Coffee stop</h2>
        <p class="step-desc">What’s your favorite type of coffee? Choose one option to continue.</p>

        <div class="options" role="radiogroup" aria-label="Favorite coffee">
          <label class="option">
            <input type="radio" name="coffee" value="Latte" />
            <span>☕ Latte</span>
          </label>
          <label class="option">
            <input type="radio" name="coffee" value="Cappuccino" />
            <span>🥛 Cappuccino</span>
          </label>
          <label class="option">
            <input type="radio" name="coffee" value="Americano" />
            <span>🖤 Americano</span>
          </label>
          <label class="option">
            <input type="radio" name="coffee" value="Espresso" />
            <span>⚡ Espresso</span>
          </label>
        </div>

        <div class="controls">
          <button class="btn" id="next1" disabled>Next →</button>
        </div>
      </section>

      <section class="step" id="step2" aria-labelledby="step2-title">
        <h2 class="step-title" id="step2-title">2) Gas station</h2>
        <p class="step-desc">Pick the type of gas you want.</p>

        <div class="options" role="radiogroup" aria-label="Gas type">
          <label class="option">
            <input type="radio" name="gas" value="Regular" />
            <span>⛽ Regular</span>
          </label>
          <label class="option">
            <input type="radio" name="gas" value="Premium" />
            <span>🚀 Premium</span>
          </label>
        </div>

        <div class="controls">
          <button class="btn" id="back2">← Back</button>
          <button class="btn" id="next2" disabled>Next →</button>
        </div>
      </section>

      <section class="step" id="step3" aria-labelledby="step3-title">
        <h2 class="step-title" id="step3-title">3) How many gallons?</h2>
        <p class="step-desc">Use the slider to choose between 1 and 10 gallons.</p>

        <div class="meter">
          <span>Gallons</span>
          <span class="pill" id="gallonsValue">5</span>
        </div>

        <div class="range-row">
          <input id="gallons" type="range" min="1" max="10" step="1" value="5" aria-label="Gallons slider" />
        </div>

        <div class="summary" id="summary" aria-live="polite"></div>

        <div class="controls">
          <button class="btn" id="back3">← Back</button>
          <button class="btn" id="reset">↺ Reset</button>
        </div>
      </section>
    </main>
  </div>

  <script>
    const steps = {
      step1: document.getElementById('step1'),
      step2: document.getElementById('step2'),
      step3: document.getElementById('step3'),
    };

    const next1 = document.getElementById('next1');
    const next2 = document.getElementById('next2');
    const back2 = document.getElementById('back2');
    const back3 = document.getElementById('back3');
    const reset = document.getElementById('reset');

    const gallons = document.getElementById('gallons');
    const gallonsValue = document.getElementById('gallonsValue');
    const summary = document.getElementById('summary');

    function showStep(stepId) {
      Object.values(steps).forEach(el => el.classList.remove('show'));
      steps[stepId].classList.add('show');
    }

    function getChoice(name) {
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      return checked ? checked.value : null;
    }

    function updateSummary() {
      const coffee = getChoice('coffee');
      const gas = getChoice('gas');
      const g = gallons.value;

      const parts = [];
      if (coffee) parts.push(`<strong>Coffee:</strong> ${coffee}`);
      if (gas) parts.push(`<strong>Gas:</strong> ${gas}`);
      parts.push(`<strong>Gallons:</strong> ${g}`);

      summary.innerHTML = `
        <div><strong>✅ Your choices</strong></div>
        <div style="margin-top: 8px;">${parts.join('<br/>')}</div>
      `;
    }

    document.querySelectorAll('input[name="coffee"]').forEach(r => {
      r.addEventListener('change', () => {
        next1.disabled = !getChoice('coffee');
      });
    });

    document.querySelectorAll('input[name="gas"]').forEach(r => {
      r.addEventListener('change', () => {
        next2.disabled = !getChoice('gas');
      });
    });

    next1.addEventListener('click', () => {
      showStep('step2');
    });

    back2.addEventListener('click', () => {
      showStep('step1');
    });

    next2.addEventListener('click', () => {
      showStep('step3');
      updateSummary();
    });

    back3.addEventListener('click', () => {
      showStep('step2');
    });

    gallons.addEventListener('input', () => {
      gallonsValue.textContent = gallons.value;
      updateSummary();
    });

    reset.addEventListener('click', () => {
      document.querySelectorAll('input[name="coffee"]').forEach(r => (r.checked = false));
      document.querySelectorAll('input[name="gas"]').forEach(r => (r.checked = false));
      gallons.value = '5';
      gallonsValue.textContent = '5';
      summary.innerHTML = '';
      next1.disabled = true;
      next2.disabled = true;
      showStep('step1');
    });
  </script>
</body>
</html>
