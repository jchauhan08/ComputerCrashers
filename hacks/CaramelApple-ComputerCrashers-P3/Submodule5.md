---
layout: base
title: Caramel Apple Launch Party (Finale)
authors: Rishabh Jha
description: "Celebrate completing the Caramel Apple Quest with an interactive party"
permalink: /candyland/ending
categories: [Quest, Finale]
tags: [caramel, party, quest, finale]
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caramel Apple Launch Party</title>
    <style>
        /* [ ... ALL EXISTING STYLES UNCHANGED ... ] */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 30px 20px; }
        .party-wrap { max-width: 1000px; margin: 0 auto; }
        header { text-align: center; margin-bottom: 30px; }
        h1 { color: white; font-size: 2.8em; margin-bottom: 10px; text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); font-weight: 700; }
        .subtitle { color: rgba(255, 255, 255, 0.9); font-size: 1.1em; font-weight: 400; }
        .top-bar { display: flex; gap: 12px; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; }
        .controls-left { display: flex; gap: 10px; }
        .btn { border: none; background: white; color: #667eea; padding: 10px 18px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.95em; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: all 0.2s; font-family: inherit; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); }
        .btn.primary { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
        .btn.secondary { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
        .progress-container { display: flex; gap: 15px; align-items: center; }
        .progress-item { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 20px; color: white; font-size: 0.9em; font-weight: 500; border: 1px solid rgba(255, 255, 255, 0.3); }
        .progress-item.complete { background: rgba(76, 217, 100, 0.3); border-color: #4cd964; }
        .party-room { position: relative; height: 500px; border-radius: 20px; background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden; }
        .garland { position: absolute; top: 15px; left: 0; right: 0; height: 60px; pointer-events: none; display: flex; justify-content: space-around; padding: 0 40px; }
        .flag { width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 30px solid #f093fb; animation: sway 3s ease-in-out infinite; }
        .flag:nth-child(2) { border-top-color: #ffd93d; }
        .flag:nth-child(3) { border-top-color: #6bcf7f; }
        .flag:nth-child(4) { border-top-color: #4facfe; }
        .flag:nth-child(5) { border-top-color: #f5576c; }
        .flag:nth-child(6) { border-top-color: #a78bfa; }
        @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .party-entity { position: absolute; width: 110px; height: 110px; border-radius: 16px; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.3s ease; border: 2px solid #f0f0f0; }
        .party-entity:hover { transform: translateY(-8px) scale(1.05); box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); border-color: #667eea; }
        .party-entity .emoji { font-size: 60px; transition: transform 0.3s; }
        .party-entity.interacted { border-color: #4cd964; background: linear-gradient(135deg, #ffffff 0%, #f0fff4 100%); }
        #char-ginger { left: 60px; bottom: 80px; }
        #char-girl { left: 240px; bottom: 150px; }
        #char-gummy { right: 60px; bottom: 110px; }
        #obj-lolli { right: 240px; bottom: 200px; }
        #obj-cane { left: 420px; bottom: 220px; }
        .bubble { position: absolute; bottom: 125px; left: 50%; transform: translateX(-50%) scale(0); padding: 10px 16px; border-radius: 12px; background: #333; color: white; font-size: 13px; white-space: nowrap; opacity: 0; transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); pointer-events: none; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
        .bubble::after { content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid #333; }
        .party-entity.show .bubble { opacity: 1; transform: translateX(-50%) translateY(-5px) scale(1); }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-bounce { animation: bounce 0.5s ease-in-out 1; }
        .animate-spin { animation: spin 1s ease-in-out 1; }
        .overlay { position: fixed; inset: 0; display: none; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(5px); align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s ease; }
        .overlay.show { display: flex; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-card { background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 90%; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4); animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); position: relative; }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-card h2 { margin: 0 0 15px 0; font-size: 2.2em; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .modal-card p { margin: 0 0 20px 0; color: #666; line-height: 1.6; }
        .modal-buttons { display: flex; gap: 12px; justify-content: center; margin-top: 25px; }
        .close-btn { position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #999; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }
        .badges-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin-top: 20px; }
        .badge-item { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 20px; border-radius: 12px; text-align: center; transition: transform 0.2s; position: relative; cursor: help; }
        .badge-item.earned { background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4); }
        .badge-icon { font-size: 50px; margin-bottom: 8px; filter: grayscale(100%); opacity: 0.5; }
        .badge-item.earned .badge-icon { filter: grayscale(0%); opacity: 1; }
        .badge-name { font-size: 0.85em; font-weight: 600; color: #666; }
        .badge-item.earned .badge-name { color: #333; }
        .badge-tooltip { visibility: hidden; background-color: rgba(0, 0, 0, 0.85); color: #fff; text-align: center; padding: 8px 12px; border-radius: 8px; position: absolute; z-index: 1001; bottom: 110%; left: 50%; transform: translateX(-50%); width: max-content; max-width: 220px; font-size: 0.8rem; opacity: 0; transition: opacity 0.2s; box-shadow: 0 5px 15px rgba(0,0,0,0.2); pointer-events: none; }
        .badge-tooltip::after { content: " "; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent; }
        .badge-item:hover .badge-tooltip { visibility: visible; opacity: 1; }
        .confetti { position: fixed; font-size: 24px; animation: fall 3s linear forwards; pointer-events: none; z-index: 999; }
        @keyframes fall { to { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
    </style>
</head>
<body>
    <div class="party-wrap">
        <header>
            <h1>🎉 Caramel Apple Launch Party</h1>
            <p class="subtitle">Interact with all characters and objects to complete your quest!</p>
        </header>

        <div class="top-bar">
            <div class="controls-left">
                <button id="musicToggle" class="btn">🔇 Music</button>
                <button id="resetBtn" class="btn">↺ Reset</button>
                <button id="badgesBtn" class="btn primary">🏆 Achievements</button>
            </div>

            <div class="progress-container">
                <div class="progress-item" id="charProgress">👥 0/3</div>
                <div class="progress-item" id="objProgress">🍭 0/2</div>
            </div>
        </div>

        <div class="party-room" id="partyRoom">
            <div class="garland">
                <div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div><div class="flag"></div>
            </div>
            <!-- Characters & Objects -->
            <div id="char-ginger" class="party-entity" data-type="character" data-id="ginger" tabindex="0"><div class="emoji">🍪</div><div class="bubble">Welcome to the party! 🎈</div></div>
            <div id="char-girl" class="party-entity" data-type="character" data-id="ginger-girl" tabindex="0"><div class="emoji">👧</div><div class="bubble">You did amazing! ✨</div></div>
            <div id="char-gummy" class="party-entity" data-type="character" data-id="gummy" tabindex="0"><div class="emoji">🐻</div><div class="bubble">Let's celebrate! 🎊</div></div>
            <div id="obj-lolli" class="party-entity" data-type="object" data-id="lollipop" tabindex="0"><div class="emoji">🍭</div><div class="bubble">Sweet spin! 🌀</div></div>
            <div id="obj-cane" class="party-entity" data-type="object" data-id="candycane" tabindex="0"><div class="emoji">🍬</div><div class="bubble">Boing boing! 🎯</div></div>
        </div>
    </div>

    <audio id="partyMusic" loop preload="auto"><source src="{{ '/assets/audio/audiocleaner_20251207_231651_file.mp4' | relative_url }}" type="audio/mp4"></audio>
    <audio id="interactionSound" preload="auto"><source src="{{ '/assets/audio/audiocleaner_20251207_234028_file.mp4' | relative_url }}" type="audio/mp4"></audio>

    <!-- Overlays -->
    <div class="overlay" id="completeOverlay">
        <div class="modal-card">
            <h2>🎯 Quest Complete!</h2>
            <p>You've successfully completed the entire Caramel Apple Quest!</p>
            <div class="modal-buttons">
                <button class="btn secondary" id="playAgain">🔄 Play Again</button>
                <button class="btn primary" onclick="document.getElementById('badgesBtn').click()">🏆 View Badges</button>
                <button class="btn primary" onclick="viewScores()">View Scores</button>
            </div>
        </div>
    </div>

    <div class="overlay" id="badgesOverlay">
        <div class="modal-card" style="max-width: 600px;">
            <button class="close-btn" id="closeBadges">×</button>
            <h2>🏆 Achievements & Badges</h2>
            <p>Earn badges by completing quest parts! Hover to see who earned them.</p>
            <div class="badges-grid" id="badgesGrid"><p style="grid-column: 1/-1; text-align: center;">Loading...</p></div>
        </div>
    </div>

    <script type="module">
        // IMPORT UPDATED TO INCLUDE triggerBackup
        import { saveGameScore, viewScores, viewBadges, getBadgeUsernames, triggerMockDataInjection, triggerClearData, triggerBackup } from '{{ '/assets/js/candyland/candyland_api.js' | relative_url }}';
        window.viewScores = viewScores;

        const room = document.getElementById('partyRoom');
        const completeOverlay = document.getElementById('completeOverlay');
        const badgesOverlay = document.getElementById('badgesOverlay');
        const badgesGrid = document.getElementById('badgesGrid');
        const playAgain = document.getElementById('playAgain');
        const musicToggle = document.getElementById('musicToggle');
        const resetBtn = document.getElementById('resetBtn');
        const badgesBtn = document.getElementById('badgesBtn');
        const closeBadges = document.getElementById('closeBadges');
        const charProgress = document.getElementById('charProgress');
        const objProgress = document.getElementById('objProgress');
        const partyMusic = document.getElementById('partyMusic');
        const interactionSound = document.getElementById('interactionSound');

        const seenCharacters = new Set();
        const usedObjects = new Set();
        let musicOn = false;

        async function fetchAndDisplayBadges() {
            badgesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Loading collection...</p>';
            try {
                const response = await fetch('http://localhost:8587/api/candyland/get_badges_with_rarity', { method: 'GET', credentials: 'include' });
                if (response.ok) {
                    const badges = await response.json();
                    badgesGrid.innerHTML = ''; 
                    if (badges.length === 0) {
                        badgesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;"><p>No badges collected yet!</p></div>`;
                        return;
                    }
                    badges.forEach(badge => {
                        const badgeEl = document.createElement('div');
                        badgeEl.className = 'badge-item earned'; 
                        badgeEl.innerHTML = `
                            <div class="badge-icon">${badge.icon}</div>
                            <div class="badge-name">${badge.name}</div>
                            <div class="badge-tooltip">
                                <div style="color: #ffd700; font-weight: bold; margin-bottom: 4px;">${badge.rarity_text}</div>
                                <div class="winner-list-content">Loading...</div>
                            </div>
                        `;
                        getBadgeUsernames(badge.id).then(winners => {
                            const winnerDiv = badgeEl.querySelector('.winner-list-content');
                            if (winners && winners.length > 0) {
                                const maxShown = 4;
                                const displayNames = winners.slice(0, maxShown).join(', ');
                                const ellipsis = winners.length > maxShown ? ', ...' : '';
                                winnerDiv.innerHTML = `<strong>Earned by:</strong><br>${displayNames}${ellipsis}`;
                            } else { winnerDiv.innerHTML = "No winners yet"; }
                        });
                        badgesGrid.appendChild(badgeEl);
                    });
                }
            } catch (e) { console.error("Error fetching badges:", e); }
        }

        // [ ... ALL PARTY INTERACTION LOGIC UNCHANGED ... ]
        function playInteractionSound() { if (!interactionSound) return; interactionSound.currentTime = 0; interactionSound.play().catch(e => {}); }
        function showBubble(el) { el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 1800); }
        function confettiBurst() { const emojis = ['🎉', '🎊', '✨', '⭐', '🎈', '🍬', '🍭']; for (let i = 0; i < 30; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.textContent = emojis[Math.floor(Math.random() * emojis.length)]; c.style.left = Math.random() * 100 + '%'; document.body.appendChild(c); setTimeout(() => c.remove(), 3500); } }
        function updateProgress() { charProgress.textContent = `👥 ${seenCharacters.size}/3`; objProgress.textContent = `🍭 ${usedObjects.size}/2`; if (seenCharacters.size === 3) charProgress.classList.add('complete'); if (usedObjects.size === 2) objProgress.classList.add('complete'); }
        function checkCompletion() { if (seenCharacters.size >= 3 && usedObjects.size >= 2) { saveGameScore('ending_characters_score', seenCharacters.size); saveGameScore('ending_candies_score', usedObjects.size); setTimeout(() => { completeOverlay.classList.add('show'); confettiBurst(); }, 800); } }
        function handleInteraction(entity) { const type = entity.dataset.type; const id = entity.dataset.id; playInteractionSound(); if (type === 'character') { if (!seenCharacters.has(id)) { seenCharacters.add(id); entity.classList.add('interacted'); showBubble(entity); confettiBurst(); updateProgress(); checkCompletion(); } else { showBubble(entity); } } else if (type === 'object') { if (id === 'lollipop') entity.querySelector('.emoji').classList.add('animate-spin'); if (id === 'candycane') entity.querySelector('.emoji').classList.add('animate-bounce'); showBubble(entity); if (!usedObjects.has(id)) { usedObjects.add(id); entity.classList.add('interacted'); updateProgress(); checkCompletion(); } setTimeout(() => { entity.querySelector('.emoji').classList.remove('animate-spin', 'animate-bounce'); }, 1000); } }
        room.addEventListener('click', (e) => { const entity = e.target.closest('.party-entity'); if (entity) handleInteraction(entity); });
        playAgain.addEventListener('click', () => { completeOverlay.classList.remove('show'); resetGame(); });
        musicToggle.addEventListener('click', () => { musicOn = !musicOn; musicToggle.innerHTML = musicOn ? '🔊 Music' : '🔇 Music'; if (musicOn) { partyMusic.currentTime = 0; partyMusic.play(); } else { partyMusic.pause(); } });
        resetBtn.addEventListener('click', resetGame);
        function resetGame() { document.querySelectorAll('.party-entity').forEach(el => el.classList.remove('show', 'animate-spin', 'animate-bounce', 'interacted')); seenCharacters.clear(); usedObjects.clear(); completeOverlay.classList.remove('show'); charProgress.classList.remove('complete'); objProgress.classList.remove('complete'); updateProgress(); }
        badgesBtn.addEventListener('click', () => { badgesOverlay.classList.add('show'); fetchAndDisplayBadges(); });
        closeBadges.addEventListener('click', () => { badgesOverlay.classList.remove('show'); });

        // --- NEW: SECRET ADMIN KEYSTROKES ---
        window.addEventListener('keydown', async (e) => {
            if (e.shiftKey && e.altKey) {
                const key = e.key.toLowerCase();
                
                // SHIFT + ALT + I (Inject Data)
                if (key === 'i') {
                    const confirmed = confirm("ADMIN: Inject mock users for rarity calculation?");
                    if (confirmed) { await triggerMockDataInjection(); if (badgesOverlay.classList.contains('show')) fetchAndDisplayBadges(); }
                }
                
                // SHIFT + ALT + C (Clear Data)
                else if (key === 'c') {
                    const confirmed = confirm("ADMIN: Clear all mock data?");
                    if (confirmed) { await triggerClearData(); if (badgesOverlay.classList.contains('show')) fetchAndDisplayBadges(); }
                }

                // --- NEW PHASE 2: SHIFT + ALT + B (Backup) ---
                else if (key === 'b') {
                    const confirmed = confirm("ADMIN: Capture a rarity snapshot (Backup)?");
                    if (confirmed) { await triggerBackup(); }
                }
            }
        });

        updateProgress();
    </script>
</body>
</html>