---
layout: base
title: Fridge
authors: Avantika Chittari
description: To do list
permalink: /candyland/fridge
---
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fridge To‑Do List</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(#dbe9ff, #f7fbff);
      font-family: "Comic Sans MS", "Trebuchet MS", sans-serif;
    }

    /* Fridge shell */
    .fridge {
      width: 340px;
      height: 560px;
      background: linear-gradient(#f9fbff, #dfe9ff);
      border-radius: 28px;
      box-shadow: inset 0 0 0 6px #c7d6ff, 0 14px 30px rgba(0,0,0,0.25);
      position: relative;
      padding: 24px;
    }

    /* Door separation */
    .fridge::before {
      content: "";
      position: absolute;
      left: 0;
      top: 55%;
      width: 100%;
      height: 4px;
      background: #b6c8ff;
    }

    /* Handle */
    .fridge::after {
      content: "";
      position: absolute;
      right: 18px;
      top: 90px;
      width: 12px;
      height: 200px;
      background: linear-gradient(#b0c4ff, #8fa7ff);
      border-radius: 8px;
    }

    /* Freezer handle */
    .handle-top {
      position: absolute;
      right: 18px;
      top: 24px;
      width: 12px;
      height: 90px;
      background: linear-gradient(#b0c4ff, #8fa7ff);
      border-radius: 8px;
    }

    /* Paper */
    .paper {
      background: #fffef5;
      border-radius: 8px;
      padding: 16px;
      margin-top: 70px;
      box-shadow: 0 6px 10px rgba(0,0,0,0.18);
      transform: rotate(-1.5deg);
    }

    .paper h2 {
      margin: 0 0 12px 0;
      text-align: center;
      font-size: 1.25rem;
    }

    .paper ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .paper li {
      margin: 10px 0;
      padding-bottom: 6px;
      border-bottom: 1px dashed #bbb;
    }

    .paper a {
      text-decoration: none;
      color: #4a5fd4;
      font-weight: bold;
    }

    .paper a:hover {
      text-decoration: underline;
    }

    /* Magnets */
    .magnet {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      position: absolute;
      background: radial-gradient(circle at top left, #ffd1dc, #ff6f91);
      box-shadow: 0 3px 5px rgba(0,0,0,0.35);
    }

    .magnet.one { top: 50px; left: 60px; }
    .magnet.two { top: 50px; right: 70px; background: radial-gradient(circle at top left, #fff1a8, #ffc75f); }
  </style>
</head>
<body>
  <div class="fridge">
    <div class="handle-top"></div>
    <div class="magnet one"></div>
    <div class="magnet two"></div>

    <div class="paper">
      <h2>To‑Do List</h2>
      <ul>
        <li><a href="/candyland/morningroutine">1) Complete morning routine </a></li>
        <li><a href="/candyland/workmaze">2) Go to work</a></li>
        <li><a href="/candyland/whack-a-candy">3) Play whack-a-candy</a></li>
        <li><a href="/candyland/hotchocolate">4) Chill in a hot chocolate hot tub w/ friends </a></li>
        <li><a href="/candyland/ending">5) Launch party for Carmel Apple </a></li>
      </ul>
    </div>
  </div>
</body>
</html>
