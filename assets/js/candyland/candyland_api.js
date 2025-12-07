// File: static/js/candylandApi.js

const BASE_URL = 'http://localhost:8587';

export async function saveGameScore(gameType, score) {
    if (!gameType || score === undefined || score === null) {
        console.error("Cannot save: Missing gameType or score.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/candyland/save_score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({ 
                score_type: gameType, 
                score_value: score 
            })
        });

        if (response.ok) {
            console.log(`${gameType} score saved successfully!`);
        } else {
            console.warn("Save failed status:", response.status);
        }
    } catch(e) {
        console.error("Server error while saving score:", e);
    }
}

// Function to fetch and alert scores
export async function viewScores() {
    try {
        const response = await fetch('http://localhost:8587/api/candyland/get_scores', {
            method: 'GET',
            credentials: 'include' // Important!
        });

        if (response.ok) {
            const scores = await response.json();
            
            if (scores.length === 0) {
                alert("No scores found yet! Play some games first.");
                return;
            }

            // Map internal names to nice display names
            const displayNames = {
                "morning_routine_score": "Morning Routine",
                "maze_score": "Work Maze",
                "whack_a_mole_score": "Whack-a-Bug",
                "hot_chocolate_score": "Hot Chocolate Hangout",
                "apple_launch_score": "Caramel Apple Launch"
            };

            // Format the output
            let message = "🏆 YOUR SCORES 🏆\n\n";
            scores.forEach(item => {
                const niceName = displayNames[item.score_type] || item.score_type;
                message += `${niceName}: ${item.score_value}\n`;
            });

            alert(message);
        } else {
            console.log("Error fetching scores:", response.status);
            alert("Could not load scores.");
        }
    } catch (e) {
        console.error("Server error:", e);
        alert("Server error while fetching scores.");
    }
}