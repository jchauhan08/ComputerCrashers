---
layout: base
title: Map
authors: Avantika Chittari
description: "Interactive map"
permalink: /candyland/map
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candyland Quest Map</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow: hidden;
            font-family: 'Comic Sans MS', cursive;
        }

        #mapCanvas {
            cursor: pointer;
            display: block;
        }

        .map-title {
            position: absolute;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 3em;
            color: #FF1493;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2),
                         0 0 20px rgba(255, 255, 255, 0.8);
            z-index: 10;
            font-weight: bold;
            animation: titleFloat 3s ease-in-out infinite;
        }

        @keyframes titleFloat {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
        }

        .progress-indicator {
            position: absolute;
            bottom: 40px;
            right: 40px;
            background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
            padding: 20px 35px;
            border-radius: 25px;
            border: 4px solid #FFD700;
            box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
            z-index: 10;
            font-size: 1.4em;
            color: white;
            font-weight: bold;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 12px 35px rgba(255, 20, 147, 0.6); }
        }
    </style>
</head>
<body>
    <div class="map-title">🍭 Candyland Quest 🍬</div>
    <div class="progress-indicator">Start Your Adventure! →</div>
    <canvas id="mapCanvas"></canvas>

    <script>
        // === Enhanced Candy Land Map ===

        const mapNodes = [
            { id: 0, label: "Good Morning", link: "/candyland/morningroutine", type:"gumdrop", relX:0.1, relY:0.8 },
            { id: 1, label: "Getting to work", link: "/candyland/workmaze", type:"gumdrop", relX:0.28, relY:0.64 },
            { id: 2, label: "At work", link: "/candyland/whack-a-bug", type:"lollipop", relX:0.45, relY:0.52 },
            { id: 3, label: "Hanging with friends", link: "/candyland/hotchocolate", type:"marshmallow", relX:0.62, relY:0.36 },
            { id: 4, label: "Party!!", link: "/candyland/ending", type:"castle", relX:0.78, relY:0.24 }
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

        // Enhanced Background with gradient and clouds
        function drawBackground() {
            // Sky gradient - more vibrant
            const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            skyGrad.addColorStop(0, "#87CEEB");  // Sky blue
            skyGrad.addColorStop(0.5, "#FFB6C1"); // Light pink
            skyGrad.addColorStop(1, "#FFDAB9");   // Peach
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Fluffy clouds
            drawCloud(0.2 * canvas.width, 0.15 * canvas.height, 80);
            drawCloud(0.5 * canvas.width, 0.1 * canvas.height, 100);
            drawCloud(0.75 * canvas.width, 0.18 * canvas.height, 90);

            // Candy hills with better shading
            const hills = [
                {x:0.15*canvas.width, y:0.84*canvas.height, r:0.18*canvas.height, color1:"#FFB6C1", color2:"#FF69B4"},
                {x:0.5*canvas.width, y:0.92*canvas.height, r:0.25*canvas.height, color1:"#DDA0DD", color2:"#9370DB"},
                {x:0.78*canvas.width, y:0.88*canvas.height, r:0.18*canvas.height, color1:"#FFE4B5", color2:"#FFD700"}
            ];
            
            hills.forEach(h=>{
                const grad = ctx.createRadialGradient(h.x, h.y - h.r*0.3, 0, h.x, h.y, h.r);
                grad.addColorStop(0, h.color1);
                grad.addColorStop(1, h.color2);
                
                ctx.beginPath();
                ctx.ellipse(h.x, h.y, h.r, h.r*0.6, 0, 0, Math.PI*2);
                ctx.fillStyle = grad;
                ctx.fill();
                
                // Highlight
                ctx.beginPath();
                ctx.ellipse(h.x - h.r*0.3, h.y - h.r*0.2, h.r*0.3, h.r*0.15, 0, 0, Math.PI*2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.fill();
            });

            // Colorful sprinkles
            for(let i=0; i<150; i++){
                const colors = ["#FF69B4", "#FFD700", "#7FFF00", "#00CED1", "#FF6347"];
                ctx.fillStyle = colors[i % colors.length];
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 4 + 2;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.random() * Math.PI);
                ctx.fillRect(-size/2, -size/2, size, size*2);
                ctx.restore();
            }
        }

        function drawCloud(x, y, size) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.arc(x + size*0.6, y - size*0.2, size*0.8, 0, Math.PI * 2);
            ctx.arc(x + size*1.2, y, size*0.7, 0, Math.PI * 2);
            ctx.fill();
        }

        // Enhanced Rainbow path with glow
        function drawPath() {
            // Shadow/glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(255, 105, 180, 0.5)";
            
            ctx.lineWidth = 16;
            const rainbow = ["#FF1493", "#FF69B4", "#FFB6C1", "#DDA0DD", "#9370DB"];
            
            for(let i=0; i<rainbow.length; i++){
                ctx.strokeStyle = rainbow[i];
                ctx.lineWidth = 16 - i*2;
                ctx.beginPath();
                ctx.moveTo(mapNodes[0].x, mapNodes[0].y);
                
                for(let j=1; j<mapNodes.length; j++){
                    const nx = mapNodes[j].x, ny = mapNodes[j].y;
                    ctx.lineTo(nx, ny);
                }
                ctx.stroke();
            }
            
            ctx.shadowBlur = 0;
        }

        // Enhanced candy nodes with 3D effect
        function drawNode(node) {
            const x = node.x, y = node.y;
            const type = node.type;

            // Hover glow animation
            if(hoveredNode && hoveredNode.id === node.id){
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#FFD700";
                ctx.beginPath();
                ctx.arc(x, y, 35, 0, Math.PI*2);
                ctx.fillStyle = "rgba(255, 215, 0, 0.3)";
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            switch(type){
                case "gumdrop":
                    // 3D gumdrop
                    const gumdropGrad = ctx.createRadialGradient(x-8, y-10, 5, x, y, 20);
                    gumdropGrad.addColorStop(0, "#FF69B4");
                    gumdropGrad.addColorStop(1, "#C71585");
                    
                    ctx.beginPath();
                    ctx.moveTo(x-18, y+12);
                    ctx.quadraticCurveTo(x, y-25, x+18, y+12);
                    ctx.closePath();
                    ctx.fillStyle = gumdropGrad;
                    ctx.fill();
                    ctx.strokeStyle = "#FFF";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    
                    // Shine
                    ctx.beginPath();
                    ctx.ellipse(x-5, y-8, 6, 8, -0.3, 0, Math.PI*2);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                    ctx.fill();
                    break;
                    
                case "lollipop":
                    // Stick
                    ctx.fillStyle = "#FFF";
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                    ctx.fillRect(x-3, y+10, 6, 25);
                    ctx.shadowBlur = 0;
                    
                    // Candy with spiral
                    const lolliGrad = ctx.createRadialGradient(x-5, y-5, 5, x, y, 18);
                    lolliGrad.addColorStop(0, "#FFD700");
                    lolliGrad.addColorStop(1, "#FF69B4");
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 18, 0, Math.PI*2);
                    ctx.fillStyle = lolliGrad;
                    ctx.fill();
                    ctx.strokeStyle = "#FFF";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    
                    // Spiral
                    ctx.strokeStyle = "#FFF";
                    ctx.lineWidth = 2;
                    for(let i=0; i<3; i++){
                        ctx.beginPath();
                        ctx.arc(x, y, 6 + i*4, 0, Math.PI);
                        ctx.stroke();
                    }
                    break;
                    
                case "marshmallow":
                    // Soft marshmallow with gradient
                    const marshGrad = ctx.createLinearGradient(x-15, y-15, x+15, y+15);
                    marshGrad.addColorStop(0, "#FFFACD");
                    marshGrad.addColorStop(1, "#FFE4B5");
                    
                    ctx.fillStyle = marshGrad;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
                    roundRect(ctx, x-15, y-15, 30, 30, 8);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    
                    ctx.strokeStyle = "#FFB6C1";
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    break;
                    
                case "castle":
                    // Castle base
                    const castleGrad = ctx.createLinearGradient(x-20, y-25, x+20, y+25);
                    castleGrad.addColorStop(0, "#FFD700");
                    castleGrad.addColorStop(1, "#FFA500");
                    
                    ctx.fillStyle = castleGrad;
                    ctx.fillRect(x-20, y-25, 40, 50);
                    
                    // Windows
                    ctx.fillStyle = "#8B4513";
                    ctx.fillRect(x-12, y-15, 8, 10);
                    ctx.fillRect(x+4, y-15, 8, 10);
                    
                    // Roof
                    ctx.fillStyle = "#FF69B4";
                    ctx.beginPath();
                    ctx.moveTo(x-25, y-25);
                    ctx.lineTo(x, y-50);
                    ctx.lineTo(x+25, y-25);
                    ctx.closePath();
                    ctx.fill();
                    
                    // Flag
                    ctx.fillStyle = "#FF1493";
                    ctx.beginPath();
                    ctx.moveTo(x, y-50);
                    ctx.lineTo(x+12, y-45);
                    ctx.lineTo(x, y-40);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }

            // Label with better styling
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.fillStyle = "#FFF";
            ctx.font = "bold 16px Comic Sans MS";
            ctx.textAlign = "center";
            ctx.strokeStyle = "#FF1493";
            ctx.lineWidth = 4;
            ctx.strokeText(node.label, x, y-50);
            ctx.fillText(node.label, x, y-50);
            ctx.shadowBlur = 0;
        }

        // Enhanced tooltip
        function drawTooltip(node){
            const text = "Click to start: " + node.label;
            ctx.font = "bold 16px Comic Sans MS";
            const padding = 10;
            const textWidth = ctx.measureText(text).width;
            const x = node.x, y = node.y - 70;
            
            // Tooltip with gradient
            const tooltipGrad = ctx.createLinearGradient(x-textWidth/2, y, x+textWidth/2, y+30);
            tooltipGrad.addColorStop(0, "#FFF");
            tooltipGrad.addColorStop(1, "#FFE4E1");
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            ctx.fillStyle = tooltipGrad;
            ctx.strokeStyle = "#FF69B4";
            ctx.lineWidth = 3;
            
            roundRect(ctx, x-textWidth/2-padding, y-padding, textWidth+2*padding, 30, 10);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.fillStyle = "#FF1493";
            ctx.fillText(text, x, y+14);
        }

        function roundRect(ctx, x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
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
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            mapNodes.forEach(node=>{
                const dx = mx - node.x;
                const dy = my - node.y;
                if(dx*dx + dy*dy <= 25*25){
                    if(node.link) window.location.href = node.link;
                }
            });
        }

        // Hover handler
        function handleMouseMove(e){
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            let found = null;
            for(const node of mapNodes){
                const dx = mx - node.x;
                const dy = my - node.y;
                if(dx*dx + dy*dy <= 25*25){ 
                    found = node; 
                    canvas.style.cursor = "pointer";
                    break; 
                }
            }
            if(!found) canvas.style.cursor = "default";
            hoveredNode = found;
            drawMap();
        }

        // Initialize
        window.onload = function(){
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener("click", handleClick);
        };
    </script>
</body>
</html>