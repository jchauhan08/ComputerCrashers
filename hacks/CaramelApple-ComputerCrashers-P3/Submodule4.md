---
layout: post
title: Candyland hot chocolate tub
authors: Shay Mortensen
permalink: /candyland/hot-chocolate
---
<section id="dialogue-minigame" aria-live="polite">
    <style>
        #dialogue-minigame { max-width:640px; margin:1.5rem auto; font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; }
        .card { border:1px solid #ddd; padding:1rem; border-radius:8px; background:#fff; box-shadow:0 6px 18px rgba(0,0,0,0.04); }
        .npc { font-weight:700; margin-bottom:.5rem; }
        .text { margin-bottom:1rem; }
        .choices { display:flex; gap:.5rem; margin-bottom:1rem; }
        .choices button { flex:1; padding:.6rem .8rem; border-radius:6px; border:1px solid #bbb; background:#f7f7f8; cursor:pointer; transition:transform .08s ease; }
        .choices button:hover { transform:translateY(-2px); }
        .choices button[disabled] { opacity:.6; cursor:default; transform:none; }
        .result { margin-top:.6rem; font-weight:600; }
        .footer { display:flex; justify-content:space-between; gap:1rem; align-items:center; margin-top:.8rem; }
        .progress { font-size:.9rem; color:#555; }
        .next { padding:.5rem .8rem; border-radius:6px; border:1px solid #2b7cff; background:#2b7cff; color:#fff; cursor:pointer; }
        .next[disabled] { opacity:.6; cursor:default; background:#94c0ff; border-color:#94c0ff; }
        .score { font-weight:700; }
    </style>

    <div class="card" role="application" aria-label="Dialogue minigame">
        <div class="npc">Counselor Cocoa</div>
        <div class="text" id="prompt">...</div>

        <div class="choices" id="options" role="list"></div>

        <div class="result" id="choice-result" aria-live="polite"></div>

        <div class="footer">
            <div class="progress" id="progress">Interaction 0 / 4</div>
            <div>
                <button class="next" id="next" disabled>Next</button>
                <button class="next" id="retry" style="background:#eee;border-color:#ccc;color:#222;margin-left:.5rem;">Retry</button>
            </div>
        </div>

        <div style="margin-top:.6rem; color:#444;">Score: <span class="score" id="score">0</span> / 4</div>
        <div style="margin-top:.4rem; color:#666; font-size:.9rem;">Select the best responses to reach a passing score (2+).</div>
    </div>

    <script>
        (function(){
            // Values: good = 1, neutral = 0, bad = -1
            const interactions = [
                {
                    prompt: "Question 1: Choose an option.",
                    choices: [
                        { text: "Good option", value: 1, feedback: "Good option — positive outcome." },
                        { text: "Bad option", value: -1, feedback: "Bad option — negative outcome." },
                        { text: "Neutral option", value: 0, feedback: "Neutral option — no significant effect." }
                    ]
                },
                {
                    prompt: "Question 2: Choose an option.",
                    choices: [
                        { text: "Good option", value: 1, feedback: "Good option — positive outcome." },
                        { text: "Bad option", value: -1, feedback: "Bad option — negative outcome." },
                        { text: "Neutral option", value: 0, feedback: "Neutral option — no significant effect." }
                    ]
                },
                {
                    prompt: "Question 3: Choose an option.",
                    choices: [
                        { text: "Good option", value: 1, feedback: "Good option — positive outcome." },
                        { text: "Bad option", value: -1, feedback: "Bad option — negative outcome." },
                        { text: "Neutral option", value: 0, feedback: "Neutral option — no significant effect." }
                    ]
                },
                {
                    prompt: "Question 4: Choose an option.",
                    choices: [
                        { text: "Good option", value: 1, feedback: "Good option — positive outcome." },
                        { text: "Bad option", value: -1, feedback: "Bad option — negative outcome." },
                        { text: "Neutral option", value: 0, feedback: "Neutral option — no significant effect." }
                    ]
                }
            ];

            const maxScore = interactions.length * 1;
            const passThreshold = 2; // passing score (2+)
            let index = 0;
            let score = 0;
            let answered = false;

            const promptEl = document.getElementById('prompt');
            const optionsEl = document.getElementById('options');
            const resultEl = document.getElementById('choice-result');
            const progressEl = document.getElementById('progress');
            const nextBtn = document.getElementById('next');
            const retryBtn = document.getElementById('retry');
            const scoreEl = document.getElementById('score');

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
                    // finished
                    const passed = score >= passThreshold;
                    resultEl.textContent = passed ? `Finished — you passed! Final score: ${Math.max(0, score)} / ${maxScore}` :
                                                   `Finished — you did not pass. Final score: ${Math.max(0, score)} / ${maxScore}`;
                    nextBtn.disabled = true;
                    // disable any leftover buttons
                    optionsEl.innerHTML = '';
                    progressEl.textContent = `Interaction ${interactions.length} / ${interactions.length}`;
                } else {
                    render();
                }
            });

            retryBtn.addEventListener('click', () => {
                index = 0;
                score = 0;
                render();
            });

            // initial render
            render();
        })();
    </script>
</section>