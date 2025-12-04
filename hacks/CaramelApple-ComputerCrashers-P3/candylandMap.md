---
layout: base
title: Candy Land Map
permalink: /candy-map
---

<canvas id="mapCanvas" style="cursor:pointer; display:block;"></canvas>

<script>
// === Candy Land 5-Stop Map — Fullscreen Candy Themed ===

const mapNodes = [
  { id: 0, label: "Cotton Candy Gate", link: "/cotton-candy-gate", type:"gumdrop", relX:0.1, relY:0.8 },
  { id: 1, label: "Gumdrop Grove", link: "/gumdrop-grove", type:"gumdrop", relX:0.28, relY:0.64 },
  { id: 2, label: "Lollipop Lake", link: "/lollipop-lake", type:"lollipop", relX:0.45, relY:0.52 },
  { id: 3, label: "Marshmallow Meadow", link: "/marshmallow-meadow", type:"marshmallow", relX:0.62, relY:0.36 },
  { id: 4, label: "Candy Castle", link: "/candy-castle", type:"castle", relX:0.78, relY:0.24 }
];

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
let hoveredNode = null;

// Resize canvas to fit window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mapNodes.forEach(node=>{
    node.x = node.relX * canvas.width;
    node.y = node.relY * canvas.height;
  });
  drawMap();
}

// Background
function drawBackground() {
  const skyGrad = ctx.createLinearGradient(0,0,0,canvas.height);
  skyGrad.addColorStop(0,"#fff0f8");
  skyGrad.addColorStop(1,"#ffeef7");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // candy hills
  const hills = [
    {x:0.15*canvas.width,y:0.84*canvas.height,r:0.18*canvas.height,color:"#ffd6ee"},
    {x:0.5*canvas.width,y:0.92*canvas.height,r:0.25*canvas.height,color:"#ffeef7"},
    {x:0.78*canvas.width,y:0.88*canvas.height,r:0.18*canvas.height,color:"#fff2ea"}
  ];
  hills.forEach(h=>{
    ctx.beginPath();
    ctx.ellipse(h.x,h.y,h.r,h.r*0.6,0,0,Math.PI*2);
    ctx.fillStyle=h.color;
    ctx.fill();
  });

  // sprinkles
  for(let i=0;i<100;i++){
    ctx.fillStyle = ["#ffd6ee","#ffd460","#b6fff1","#fef9c7","#c7f2ff"][i%5];
    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 3,2);
  }
}

// Rainbow path
function drawPath() {
  ctx.lineWidth = 12;
  const rainbow = ["#ff66cc","#ffb3d9","#ffeb99","#b6fff1","#c7f2ff"];
  for(let i=0;i<rainbow.length;i++){
    ctx.strokeStyle = rainbow[i];
    ctx.beginPath();
    ctx.moveTo(mapNodes[0].x,mapNodes[0].y);
    for(let j=1;j<mapNodes.length;j++){
      const nx = mapNodes[j].x, ny = mapNodes[j].y;
      ctx.lineTo(nx,ny);
    }
    ctx.stroke();
  }
}

// Draw candy node
function drawNode(node) {
  const x = node.x, y = node.y;
  const type = node.type;

  // hover glow
  if(hoveredNode && hoveredNode.id===node.id){
    ctx.beginPath();
    ctx.arc(x,y,28,0,Math.PI*2);
    ctx.fillStyle="rgba(255,182,193,0.3)";
    ctx.fill();
  }

  switch(type){
    case "gumdrop":
      ctx.beginPath();
      ctx.moveTo(x-15,y+10);
      ctx.quadraticCurveTo(x,y-20,x+15,y+10);
      ctx.closePath();
      ctx.fillStyle="#ff66cc";
      ctx.fill();
      ctx.strokeStyle="#fff";
      ctx.lineWidth=2;
      ctx.stroke();
      break;
    case "lollipop":
      ctx.fillStyle="#fff";
      ctx.fillRect(x-2,y+10,4,20);
      ctx.beginPath();
      ctx.arc(x,y,15,0,Math.PI*2);
      ctx.fillStyle="#ffb3d9";
      ctx.fill();
      ctx.strokeStyle="#fff";
      ctx.lineWidth=2;
      ctx.stroke();
      break;
    case "marshmallow":
      ctx.fillStyle="#fff0f0";
      ctx.fillRect(x-12,y-12,24,24);
      ctx.strokeStyle="#ffb3d9";
      ctx.lineWidth=2;
      ctx.strokeRect(x-12,y-12,24,24);
      break;
    case "castle":
      ctx.fillStyle="#ffd460";
      ctx.fillRect(x-15,y-20,30,40);
      ctx.fillStyle="#ff85c8";
      ctx.beginPath();
      ctx.moveTo(x-20,y-20);
      ctx.lineTo(x-10,y-40);
      ctx.lineTo(x,y-20);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      ctx.fillStyle="#ff66cc";
      ctx.beginPath();
      ctx.arc(x,y,20,0,Math.PI*2);
      ctx.fill();
  }

  ctx.fillStyle="#000";
  ctx.font="14px Arial";
  ctx.textAlign="center";
  ctx.fillText(node.label, x, y-40);
}

// Tooltip
function drawTooltip(node){
  const text = node.label;
  ctx.font="14px Arial";
  const padding=6;
  const textWidth = ctx.measureText(text).width;
  const x=node.x, y=node.y-50;
  ctx.fillStyle="rgba(255,255,255,0.9)";
  ctx.strokeStyle="#ff66cc";
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.roundRect(x-textWidth/2-padding,y-padding,textWidth+2*padding,24,6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle="#000";
  ctx.fillText(text,x,y+16-24/2);
}

// Draw everything
function drawMap() {
  drawBackground();
  drawPath();
  mapNodes.forEach(drawNode);
  if(hoveredNode) drawTooltip(hoveredNode);
}

// Click handler
function handleClick(e){
  const rect=canvas.getBoundingClientRect();
  const mx=e.clientX-rect.left;
  const my=e.clientY-rect.top;
  mapNodes.forEach(node=>{
    const dx=mx-node.x;
    const dy=my-node.y;
    if(dx*dx+dy*dy<=20*20){
      if(node.link) window.location.href=node.link;
    }
  });
}

// Hover handler
function handleMouseMove(e){
  const rect=canvas.getBoundingClientRect();
  const mx=e.clientX-rect.left;
  const my=e.clientY-rect.top;
  let found=null;
  for(const node of mapNodes){
    const dx=mx-node.x;
    const dy=my-node.y;
    if(dx*dx+dy*dy<=20*20){ found=node; break; }
  }
  hoveredNode=found;
  drawMap();
}

// Polyfill for roundRect
if(!CanvasRenderingContext2D.prototype.roundRect){
  CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){
    const min=Math.min(w/2,h/2,r);
    this.beginPath();
    this.moveTo(x+min,y);
    this.lineTo(x+w-min,y);
    this.quadraticCurveTo(x+w,y,x+w,y+min);
    this.lineTo(x+w,y+h-min);
    this.quadraticCurveTo(x+w,y+h,x+w-min,y+h);
    this.lineTo(x+min,y+h);
    this.quadraticCurveTo(x,y+h,x,y+h-min);
    this.lineTo(x,y+min);
    this.quadraticCurveTo(x,y,x+min,y);
    this.closePath();
  }
}

// Initialize
window.onload=function(){
  resizeCanvas();
  window.addEventListener("resize",resizeCanvas);
  canvas.addEventListener("mousemove",handleMouseMove);
  canvas.addEventListener("click",handleClick);
};
</script>
