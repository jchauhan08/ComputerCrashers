---
layout: base
title: Chilling in a Hot Chocolate tub with friends
authors: Shay Mortensen
permalink: /candyland/hotchocolate
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hot Chocolate Tub with Friends</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', cursive;
            background: linear-gradient(to bottom, #8B4513 0%, #D2691E 50%, #CD853F 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        /* Steam animation */
        .steam {
            position: absolute;
            font-size: 40px;
            opacity: 0;
            animation: rise 4s infinite;
        }

        .steam1 { left: 15%; animation-delay: 0s; }
        .steam2 { left: 40%; animation-delay: 1s; }
        .steam3 { left: 60%; animation-delay: 2s; }
        .steam4 { right: 15%; animation-delay: 1.5s; }

        @keyframes rise {
            0% { bottom: 20%; opacity: 0; transform: translateX(0); }
            50% { opacity: 0.6; }
            100% { bottom: 80%; opacity: 0; transform: translateX(20px); }
        }

        /* Floating marshmallows */
        .marshmallow {
            position: absolute;
            font-size: 30px;
            animation: float 6s ease-in-out infinite;
        }

        .marsh1 { top: 10%; left: 10%; animation-delay: 0s; }
        .marsh2 { top: 15%; right: 12%; animation-delay: 2s; }
        .marsh3 { bottom: 15%; left: 8%; animation-delay: 4s; }
        .marsh4 { bottom: 20%; right: 10%; animation-delay: 3s; }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }

        .game-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 30px;
            padding: 40px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
            border: 6px solid #8B4513;
            position: relative;
            z-index: 10;
            max-width: 700px;
            width: 100%;
        }

        h1 {
            text-align: center;
            color: #8B4513;
            font-size: 2.8em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
            text-align: center;
            color: #D2691E;
            font-size: 1.3em;
            margin-bottom: 30px;
        }

        .hot-tub-visual {
            background: linear-gradient(to bottom, #6F4E37 0%, #8B4513 100%);
            border-radius: 50%;
            width: 100%;
            max-width: 350px;
            height: 200px;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: 8px solid #654321;
            box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .chocolate-surface {
            width: 85%;
            height: 65%;
            background: radial-gradient(circle, #5C4033, #3E2723);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            animation: ripple 3s infinite;
        }

        @keyframes ripple {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        .friend-emoji {
            font-size: 40px;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .card {
            background: #FFF8DC;
            border: 4px solid #D2691E;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 20px;
        }

        .npc {
            font-weight: 700;
            font-size: 1.3em;
            margin-bottom: 15px;
            color: #8B4513;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .text {
            margin-bottom: 20px;
            font-size: 1.15em;
            color: #333;
            line-height: 1.6;
        }

        .choices {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }

        .choices button {
            padding: 15px 20px;
            border-radius: 15px;
            border: 2px solid #D2691E;
            background: linear-gradient(to right, #FFE4E1, #FFB6C1);
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 1.05em;
            font-family: 'Comic Sans MS', cursive;
            text-align: left;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .choices button:hover:not([disabled]) {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            background: linear-gradient(to right, #FFB6C1, #FF69B4);
        }

        .choices button[disabled] {
            opacity: 0.6;
            cursor: default;
            transform: none;
        }

        .result {
            margin-top: 15px;
            font-weight: 600;
            font-size: 1.1em;
            padding: 12px;
            border-radius: 10px;
            background: rgba(139, 69, 19, 0.1);
            text-align: center;
            color: #8B4513;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            align-items: center;
            margin-top: 20px;
        }

        .progress {
            font-size: 1em;
            color: #8B4513;
            font-weight: 600;
        }

        .button-group {
            display: flex;
            gap: 10px;
        }

        .next, .retry {
            padding: 10px 20px;
            border-radius: 15px;
            border: none;
            cursor: pointer;
            font-size: 1em;
            font-family: 'Comic Sans MS', cursive;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            transition: all 0.2s;
        }

        .next {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
            color: white;
        }

        .next:hover:not([disabled]) {
            transform: scale(1.05);
        }

        .next[disabled] {
            opacity: 0.6;
            cursor: default;
            background: #94c0ff;
        }

        .retry {
            background: linear-gradient(to bottom, #FFD700, #FFA500);
            color: #333;
        }

        .retry:hover {
            transform: scale(1.05);
        }

        .score-section {
            margin-top: 15px;
            padding: 15px;
            background: rgba(255, 215, 0, 0.2);
            border-radius: 10px;
            text-align: center;
        }

        .score {
            font-weight: 700;
            font-size: 1.3em;
            color: #8B4513;
        }

        .score-note {
            margin-top: 8px;
            color: #666;
            font-size: 0.95em;
        }

        .completion-screen {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .completion-screen.show {
            display: flex;
        }

        .completion-content {
            background: white;
            padding: 50px;
            border-radius: 30px;
            text-align: center;
            border: 8px solid #8B4513;
            box-shadow: 0 0 50px rgba(139, 69, 19, 0.8);
            max-width: 500px;
        }

        .completion-content h2 {
            font-size: 2.5em;
            color: #8B4513;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .completion-content p {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 25px;
        }

        .badges-earned {
            margin: 20px 0;
        }

        .badge-earned {
            display: inline-block;
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            padding: 15px 25px;
            border-radius: 15px;
            margin: 10px;
            font-size: 1.2em;
            box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4);
            font-weight: 600;
        }

        .confetti-emoji {
            font-size: 2em;
            margin: 20px 0;
        }

        button.continue-btn {
            background: linear-gradient(to bottom, #90EE90, #32CD32);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
            font-family: 'Comic Sans MS', cursive;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        button.continue-btn:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <!-- Decorative elements -->
    <div class="steam steam1">☁️</div>
    <div class="steam steam2">☁️</div>
    <div class="steam steam3">☁️</div>
    <div class="steam steam4">☁️</div>

    <div class="marshmallow marsh1">🤍</div>
    <div class="marshmallow marsh2">🤍</div>
    <div class="marshmallow marsh3">🤍</div>
    <div class="marshmallow marsh4">🤍</div>

    <div class="game-container">
        <h1>☕ Hot Chocolate Tub 🍫</h1>
        <p class="subtitle">Chilling with Friends</p>

        <div class="hot-tub-visual">
            <div class="chocolate-surface">
                <span class="friend-emoji">🍪</span>
                <span class="friend-emoji">👧</span>
                <span class="friend-emoji">🐻</span>
                <span class="friend-emoji">🍬</span>
            </div>
        </div>

        <div class="card" role="application" aria-label="Dialogue minigame">
            <div class="npc">
                <span>🍬</span>
                <span>Joe Licorice</span>
            </div>
            <div class="text" id="prompt">...</div>

            <div class="choices" id="options" role="list"></div>

            <div class="result" id="choice-result" aria-live="polite"></div>

            <div class="footer">
                <div class="progress" id="progress">Interaction 0 / 4</div>
                <div class="button-group">
                    <button class="next" id="next" disabled>Next →</button>
                    <button class="retry" id="retry">🔄 Retry</button>
                </div>
            </div>

            <div class="score-section">
                <div>Score: <span class="score" id="score">0</span> / 4</div>
                <div class="score-note">Select the best responses to reach a passing score (2+)</div>
            </div>
        </div>
    </div>

    <!-- Completion Screen -->
    <div class="completion-screen" id="completionScreen">
        <div class="completion-content">
            <h2 id="completionTitle">🎉 Great Chat! 🎉</h2>
            <div class="confetti-emoji">☕ 🍫 🤍 ✨ 🎊</div>
            <p id="completionMessage">You finished chatting with Joe Licorice!</p>
            <p style="font-size: 1.1em;">Final Score: <span id="finalScore">0</span> / 4</p>
            <div class="badges-earned" id="badgesEarned"></div>
            <button class="continue-btn" onclick="nextModule()">Continue to Party →</button>
            <button class="retry" onclick="closeCompletion()">Chat Again</button>
        </div>
    </div>

    <script>
        (function(){
            // Values: good = 1, neutral = 0, bad = -1
            const interactions = [
                {
                    prompt: "Hi Gingerbrella! Did you bring the marshmallows? I'm really looking forward to roasting them!",
                    choices: [
                        { text: "Yes I did! they're right here ", value: 1, feedback: "<Joe Licorice liked that>" },
                        { text: "Oh I forgot... I was in such a hurry when I left ", value: -1, feedback: "<Joe Licorice disliked that>" },
                        { text: "I was only able to get half as many as we need ", value: 0, feedback: "<Joe Licorice was unaffected by that>" }
                    ]
                },
                {
                    prompt: "So, How are you doing today?",
                    choices: [
                        { text: "I'm Doing Good", value: 1, feedback: "<Joe Licorice liked that>" },
                        { text: "I'm Doing bad :(", value: -1, feedback: "<Joe Licorice disliked that>" },
                        { text: "i'm Okay", value: 0, feedback: "<Joe Licorice was unaffected by that>" }
                    ]
                },
                {
                    prompt: "Was the trip over here okay or did you run into the candy alligators again?",
                    choices: [
                        { text: "It was great! I didn't see any candygators", value: 1, feedback: "<Joe Licorice liked that>" },
                        { text: "I ran into a candygator and it almost ran me into the swamp!", value: -1, feedback: "<Joe Licorice disliked that>" },
                        { text: "Candygators? they're back?", value: 0, feedback: "<Joe Licorice was unaffected by that>" }
                    ]
                },
                {
                    prompt: "Are you going to the Caramel Apple launch party later?",
                    choices: [
                        { text: "Yes! I can't wait", value: 1, feedback: "<Joe Licorice liked that>" },
                        { text: "No. I don't wan to", value: -1, feedback: "<Joe Licorice disliked that>" },
                        { text: "I might. It depends", value: 0, feedback: "<Joe Licorice was unaffected by that>" }
                    ]
                }
            ];

            const maxScore = interactions.length * 1;
            const passThreshold = 2; // passing score (2+)
            let index = 0;
            let score = 0;
            let answered = false;
            let earnedBadges = [];

            const promptEl = document.getElementById('prompt');
            const optionsEl = document.getElementById('options');
            const resultEl = document.getElementById('choice-result');
            const progressEl = document.getElementById('progress');
            const nextBtn = document.getElementById('next');
            const retryBtn = document.getElementById('retry');
            const scoreEl = document.getElementById('score');
            const completionScreen = document.getElementById('completionScreen');

            // Badge tracking
            let perfectChoices = 0; // Track perfect (value = 1) choices
            let badChoices = 0; // Track bad (value = -1) choices

            function render() {
                const current = interactions[index];
                promptEl.textContent = current.prompt;
                optionsEl.innerHTML = '';
                resultEl.textContent = '';
                answered = false;
                nextBtn.disabled = true;

                current.choices.forEach((c) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.textContent = c.text;
                    btn.disabled = false;
                    btn.addEventListener('click', () => handleChoice(c));
                    optionsEl.appendChild(btn);
                });

                progressEl.textContent = `Interaction ${index + 1} / ${interactions.length}`;
                scoreEl.textContent = Math.max(0, score) + ' / ' + maxScore;
            }

            function handleChoice(choice) {
                if (answered) return;
                answered = true;

                // Track choice quality for badges
                if (choice.value === 1) perfectChoices++;
                if (choice.value === -1) badChoices++;

                // disable buttons
                Array.from(optionsEl.querySelectorAll('button')).forEach(b => b.disabled = true);

                // update score (allow negatives internally; display clamped to 0)
                score += choice.value;
                scoreEl.textContent = Math.max(0, score) + ' / ' + maxScore;

                // show feedback
                resultEl.textContent = choice.feedback;

                nextBtn.disabled = false;
            }

            nextBtn.addEventListener('click', () => {
                if (!answered) return;
                index++;
                if (index >= interactions.length) {
                    // finished - show completion screen with badges
                    showCompletionScreen();
                } else {
                    render();
                }
            });

            function showCompletionScreen() {
                const passed = score >= passThreshold;
                earnedBadges = [];

                // Determine badges
                if (passed) {
                    earnedBadges.push({ icon: '🎭', name: 'Social Butterfly' });
                }

                if (perfectChoices === 4) {
                    earnedBadges.push({ icon: '💯', name: 'Perfect Conversationalist' });
                }

                if (score >= 3) {
                    earnedBadges.push({ icon: '🌟', name: 'Friend Magnet' });
                }

                if (badChoices >= 2) {
                    earnedBadges.push({ icon: '😅', name: 'Awkward Moments' });
                }

                if (score === 0 || score < 0) {
                    earnedBadges.push({ icon: '💬', name: 'Learning to Socialize' });
                }

                // Update completion screen
                document.getElementById('finalScore').textContent = Math.max(0, score);
                
                if (passed) {
                    document.getElementById('completionTitle').textContent = '🎉 Great Chat! 🎉';
                    document.getElementById('completionMessage').textContent = 'You had a wonderful conversation with Joe Licorice!';
                } else {
                    document.getElementById('completionTitle').textContent = '😊 Nice Try! 😊';
                    document.getElementById('completionMessage').textContent = 'Keep practicing your social skills!';
                }

                // Display badges
                const badgesDiv = document.getElementById('badgesEarned');
                badgesDiv.innerHTML = '';
                
                if (earnedBadges.length > 0) {
                    earnedBadges.forEach(badge => {
                        const badgeEl = document.createElement('div');
                        badgeEl.className = 'badge-earned';
                        badgeEl.textContent = `${badge.icon} ${badge.name}`;
                        badgesDiv.appendChild(badgeEl);
                    });
                }

                completionScreen.classList.add('show');
            }

            function closeCompletion() {
                completionScreen.classList.remove('show');
                index = 0;
                score = 0;
                perfectChoices = 0;
                badChoices = 0;
                earnedBadges = [];
                render();
            }

            window.nextModule = function() {
                window.location.href = '/candyland/ending'; // Navigate to Submodule 5
            };

            retryBtn.addEventListener('click', () => {
                index = 0;
                score = 0;
                perfectChoices = 0;
                badChoices = 0;
                earnedBadges = [];
                render();
            });

            // initial render
            render();
        })();
    </script>
</body>
</html>