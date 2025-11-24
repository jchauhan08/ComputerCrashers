---
layout: base
title: Caramel Apple Launch Party (Finale)
authors: Rishabh Jha
description: "Celebrate completing the Caramel Apple Quest with an interactive party"
permalink: /candyland/party
categories: [Quest, Finale]
tags: [caramel, party, quest, finale]
---

<style>
/* Layout */
.party-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.party-room {
  position: relative;
  height: 520px;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffe8f3 0%, #fff6e6 40%, #ffffff 100%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  overflow: hidden;
}

/* Decorative Garland */
.garland {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  height: 70px;
  pointer-events: none;
}
.garland .flag {
  position: absolute;
  width: 0; height: 0;
  border-right: 18px solid transparent;
  border-top: 30px solid #f58fb7;
  transform-origin: top center;
  animation: sway 3.5s ease-in-out infinite;
}
.garland .flag:nth-child(2){ left: 120px; border-top-color:#ffc94a; animation-delay:.4s }
.garland .flag:nth-child(3){ left: 240px; border-top-color:#9b59b6; animation-delay:.8s }
.garland .flag:nth-child(5){ left: 480px; border-top-color:#7ed957; animation-delay:1.6s }
.garland .flag:nth-child(6){ left: 600px; border-top-color:#ff7f50; animation-delay:2.0s }
.garland .flag:nth-child(7){ left: 720px; border-top-color:#f58fb7; animation-delay:2.4s }
.garland .flag:nth-child(8){ left: 840px; border-top-color:#9b59b6; animation-delay:2.8s }
.garland .flag:nth-child(9){ left: 960px; border-top-color:#ffc94a; animation-delay:3.2s }

@keyframes sway { 0%,100%{ transform: rotate(-4deg)} 50%{ transform: rotate(4deg)} }

/* Characters & Objects */
.party-entity {
  position: absolute;
  width: 120px; height: 120px;
  border-radius: 14px;
  background: #fff;
  display: grid; place-items:center;
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
}
.party-entity:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.12); }
.party-entity img { max-width: 90px; max-height: 90px; user-select: none; }

/* Positions */
#char-ginger { left: 60px; bottom: 80px; }
#char-girl  { left: 220px; bottom: 160px; }
#char-gummy { right: 60px; bottom: 120px; }

#obj-lolli  { right: 260px; bottom: 200px; }
#obj-cane   { left: 430px; bottom: 220px; }

/* Speech bubble */
.bubble {
  position: absolute;
  bottom: 112px; left: 0; right: 0;
  margin: 0 auto; width: fit-content;
  max-width: 220px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #333; color: #fff; font-size: 14px;
  opacity: 0; transform: translateY(8px);
  transition: all .25s ease;
  pointer-events: none;
}
.party-entity.show .bubble { opacity: 1; transform: translateY(0); }

/* Animations for objects */
@keyframes bounce { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } }
@keyframes spin { from{ transform: rotate(0) } to{ transform: rotate(360deg) } }
.animate-bounce { animation: bounce .6s ease-in-out 1; }
.animate-spin   { animation: spin 1.2s linear 1; }

/* Top controls */
.party-controls { display:flex; gap: 10px; align-items:center; margin: 14px 0; }
.btn {
  border: 0; background:#9b59b6; color:#fff;
  padding: 10px 14px; border-radius:10px; cursor:pointer; font-weight:600;
}
.btn.alt { background:#ffc94a; color:#111; }

/* Completion Overlay */
.overlay {
  position: absolute; inset: 0; display: none;
  background: rgba(0,0,0,.55);
  align-items:center; justify-content:center;
}
.overlay.show { display:flex; }
.overlay-card {
  background:#ffffff; border-radius:16px; padding:28px; text-align:center;
  box-shadow: 0 16px 40px rgba(0,0,0,.3);
}
.overlay h2 { margin: 0 0 8px 0; }
.overlay p { margin: 0 0 16px 0; }

/* Confetti (emoji-based) */
.confetti { position:absolute; top:-10px; font-size:24px; animation: fall 3s linear forwards; }
@keyframes fall { to { transform: translateY(560px) rotate(360deg); opacity:.9 } }
</style>

<div class="party-wrap">
  <h1 aria-label="Caramel Apple Launch Party">Caramel Apple Launch Party 🎉</h1>
  <p>Final stop! Meet the characters, tap a few party objects, and celebrate your completed quest.</p>

  <div class="party-controls">
    <button id="musicToggle" class="btn">🔇 Music: Off</button>
    <button id="resetBtn" class="btn alt">↺ Reset</button>
  </div>

  <div class="party-room" id="partyRoom" role="region" aria-label="Party room interactive area">
    <div class="garland">
      <div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div>
      <div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div>
    </div>

    <!-- Characters -->
    <div id="char-ginger" class="party-entity" data-type="character" data-id="ginger" tabindex="0" aria-label="Gingerbread buddy character">
      <img src="{{site.baseurl}}/images/gingerbread.png" alt="Gingerbread Buddy" />
      <div class="bubble">Welcome to the party! 🍎</div>
    </div>
    <div id="char-girl" class="party-entity" data-type="character" data-id="ginger-girl" tabindex="0" aria-label="Gingerbread friend character">
      <img src="{{site.baseurl}}/images/gingerbread-girl.png" alt="Gingerbread Friend" />
      <div class="bubble">You did it — great job! ✨</div>
    </div>
    <div id="char-gummy" class="party-entity" data-type="character" data-id="gummy" tabindex="0" aria-label="Gummy character">
      <img src="{{site.baseurl}}/images/gummy.png" alt="Gummy Pal" />
      <div class="bubble">Grab a treat and dance! 🕺</div>
    </div>

    <!-- Objects -->
    <div id="obj-lolli" class="party-entity" data-type="object" data-id="lollipop" tabindex="0" aria-label="Lollipop object">
      <img src="{{site.baseurl}}/images/lolli.png" alt="Lollipop" />
      <div class="bubble">Sweet spin! 🍭</div>
    </div>
    <div id="obj-cane" class="party-entity" data-type="object" data-id="candycane" tabindex="0" aria-label="Candy cane object">
      <img src="{{site.baseurl}}/images/candy-cane.png" alt="Candy Cane" />
      <div class="bubble">Boing! 🍬</div>
    </div>

    <!-- Completion Overlay -->
    <div class="overlay" id="completeOverlay" aria-hidden="true" role="dialog" aria-label="Quest completion overlay">
      <div class="overlay-card">
        <h2>Quest Completed 🎯</h2>
        <p>Thanks for playing Caramel Apple Quest!</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <a class="btn" href="{{site.baseurl}}/">🏠 Home</a>
          <button id="playAgain" class="btn alt">Play Again</button>
        </div>
      </div>
    </div>
  </div>

  <audio id="bgm" loop preload="none" aria-label="Background party music">
    <source src="{{site.baseurl}}/media/party.mp3" type="audio/mpeg" />
  </audio>
</div>

<script>
(function(){
  const room = document.getElementById('partyRoom');
  const overlay = document.getElementById('completeOverlay');
  const playAgain = document.getElementById('playAgain');
  const musicToggle = document.getElementById('musicToggle');
  const bgm = document.getElementById('bgm');
  const resetBtn = document.getElementById('resetBtn');

  const requiredCharacters = new Set(['ginger','ginger-girl','gummy']);
  const requiredObjects = new Set(['lollipop','candycane']);
  const seenCharacters = new Set();
  const usedObjects = new Set();

  function showBubble(el){ el.classList.add('show'); setTimeout(()=> el.classList.remove('show'), 1200); }

  function confettiBurst(){
    const emojis = ['🍬','🍭','🍎','✨','🎉'];
    for(let i=0;i<20;i++){
      const c = document.createElement('div');
      c.className = 'confetti';
      c.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      c.style.left = Math.random()*100+'%';
      c.style.animationDelay = (Math.random()*0.8)+'s';
      room.appendChild(c);
      setTimeout(()=> c.remove(), 3500);
    }
  }

  function checkCompletion(){
    if (seenCharacters.size >= requiredCharacters.size && usedObjects.size >= requiredObjects.size) {
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
      confettiBurst();
      // Removed POST fetch to avoid 404/network errors on static site builds.
    }
  }

  function handleInteraction(entity){
    const type = entity.dataset.type;
    const id = entity.dataset.id;
    if (type === 'character') {
      entity.classList.add('show');
      showBubble(entity);
      seenCharacters.add(id);
      confettiBurst();
    } else {
      if (id === 'lollipop') entity.classList.add('animate-spin');
      if (id === 'candycane') entity.classList.add('animate-bounce');
      showBubble(entity);
      usedObjects.add(id);
      setTimeout(()=>{ entity.classList.remove('animate-spin','animate-bounce'); }, 1300);
    }
    checkCompletion();
  }

  // click handling
  room.addEventListener('click', (e)=>{
    const entity = e.target.closest('.party-entity');
    if (!entity) return;
    handleInteraction(entity);
  });

  // keyboard accessibility
  room.addEventListener('keydown', (e)=>{
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('party-entity')) {
      e.preventDefault();
      handleInteraction(document.activeElement);
    }
  });

  // overlay controls
  playAgain.addEventListener('click', ()=>{
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
    seenCharacters.clear(); usedObjects.clear();
  });

  // music toggle
  let musicOn = false;
  musicToggle.addEventListener('click', async ()=>{
    try {
      if (!musicOn) { await bgm.play(); musicOn = true; musicToggle.textContent = '🔊 Music: On'; }
      else { bgm.pause(); musicOn = false; musicToggle.textContent = '🔇 Music: Off'; }
    } catch(e) { alert('Add a party track to media/party.mp3 to enable music.'); }
  });

  // reset
  resetBtn.addEventListener('click', ()=>{
    document.querySelectorAll('.party-entity').forEach(el=> el.classList.remove('show','animate-spin','animate-bounce'));
    seenCharacters.clear(); usedObjects.clear();
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
  });
})();
</script>
