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
* { margin:0; padding:0; box-sizing:border-box; }
body {
    font-family:'Comic Sans MS', cursive;
    background:linear-gradient(to bottom,#87CEEB,#98D8C8);
    min-height:100vh;
    display:flex;
    justify-content:center;
    padding:20px;
}
.game-container {
    background:white;
    padding:30px;
    border-radius:30px;
    max-width:700px;
    width:100%;
    border:5px solid hotpink;
}
h1 { text-align:center; color:hotpink; }
.maze-grid {
    display:grid;
    grid-template-columns:repeat(10,50px);
    grid-template-rows:repeat(10,50px);
    gap:2px;
    margin:20px auto;
}
.cell {
    width:50px;
    height:50px;
    font-size:1.8em;
    display:flex;
    align-items:center;
    justify-content:center;
}
.wall { background:#8B4513; }
.path { background:#FFF8DC; }
.player { background:pink; }
.checkpoint { background:peachpuff; }
</style>
</head>

<body>
<div class="game-container">
<h1>🍭 Candyland Maze ☕</h1>
<p style="text-align:center;">Use arrow keys</p>
<div class="maze-grid" id="maze"></div>
</div>

<script>
/*
0 = wall
1 = path
2 = gas
3 = coffee (redirects to mini-game)
4 = friend
5 = work
*/

const mazeLayout = [
 [1,1,1,0,1,1,1,0,1,1],
 [0,0,1,0,1,0,1,0,1,0],
 [1,1,1,1,1,0,1,1,1,1],
 [1,0,0,0,0,0,1,0,0,1],
 [1,1,1,2,1,1,1,1,0,1],
 [0,0,1,0,0,0,0,1,0,1],
 [1,1,1,1,1,3,1,1,1,1],
 [1,0,0,0,1,0,0,0,0,1],
 [1,1,4,1,1,1,1,1,0,1],
 [0,1,1,1,0,0,0,1,5,1]
];

const icons = {
 2:'⛽',
 3:'☕',
 4:'👥',
 5:'🏢'
};

let player = { x:0, y:0 };
const mazeEl = document.getElementById('maze');

function drawMaze() {
 mazeEl.innerHTML='';
 for(let y=0;y<10;y++){
  for(let x=0;x<10;x++){
   const cell=document.createElement('div');
   cell.className='cell';
   const v=mazeLayout[y][x];

   if(v===0){
    cell.classList.add('wall');
    cell.textContent='🍫';
   } else {
    cell.classList.add('path');
    if(icons[v]){
     cell.classList.add('checkpoint');
     cell.textContent=icons[v];
    }
   }

   if(player.x===x && player.y===y){
    cell.classList.add('player');
    cell.textContent='🙂';
   }
   mazeEl.appendChild(cell);
  }
 }
}

function move(dx,dy){
 const nx=player.x+dx;
 const ny=player.y+dy;

 if(nx<0||ny<0||nx>9||ny>9) return;
 if(mazeLayout[ny][nx]===0) return;

 player.x=nx;
 player.y=ny;

 // ☕ COFFEE REDIRECT
 if(mazeLayout[ny][nx]===3){
   window.location.href = "/candyland/coffee-mini-game";
   return;
 }

 drawMaze();
}

document.addEventListener('keydown',e=>{
 if(e.key==='ArrowUp') move(0,-1);
 if(e.key==='ArrowDown') move(0,1);
 if(e.key==='ArrowLeft') move(-1,0);
 if(e.key==='ArrowRight') move(1,0);
});

drawMaze();
</script>
</body>
</html>
