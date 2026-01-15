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

  export var pythonURI;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1:4500") {
      pythonURI = "http://localhost:8305";  // Same URI for localhost or 127.0.0.1
  } else {
      pythonURI = "https://candyland.opencodingsociety.com";
  }
