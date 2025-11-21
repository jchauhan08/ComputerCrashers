---
layout: post
title: Chilling in a Hot Chocolate tub with friends
authors: Shay Mortensen
permalink: /candyland/hot-chocolate
---
<section id="dialogue-minigame" aria-live="polite">
    <style>
        #dialogue-minigame { max-width:640px; margin:1.5rem auto; font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; }
        .card { border:1px solid #ddd; padding:1rem; border-radius:8px; background:#F7CBFF; box-shadow:0 6px 18px rgba(0,0,0,0.04); }
        .npc { font-weight:700; margin-bottom:.5rem; }
        .text { margin-bottom:1rem; }
        .choices { display:flex; gap:.5rem; margin-bottom:1rem; }
        .choices button { flex:1; padding:.6rem .8rem; border-radius:6px; border:1px solid #bbbbbb8a; background:#C4F2FF; cursor:pointer; transition:transform .08s ease; }
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
        <div class="npc">Joe Licorice</div>
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