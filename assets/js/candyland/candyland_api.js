const BASE_URL = 'http://localhost:8587';

// --- SCORES ---
export async function saveGameScore(gameType, score) {
    if (!gameType || score === undefined || score === null) return;
    try {
        await fetch(`${BASE_URL}/api/candyland/save_score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({ score_type: gameType, score_value: score })
        });
    } catch(e) { console.error("Error saving score:", e); }
}

export async function viewScores() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/get_scores`, { method: 'GET', credentials: 'include' });
        if (response.ok) {
            const scores = await response.json();
            if (scores.length === 0) { alert("No scores found yet!"); return; }
            let message = "🏆 YOUR SCORES 🏆\n\n";
            scores.forEach(item => { message += `${item.score_type}: ${item.score_value}\n`; });
            alert(message);
        }
    } catch (e) { console.error("Error fetching scores:", e); }
}

// --- NEW: BADGES ---
export async function saveBadge(badgeName, badgeIcon) {
    try {
        // We send the data exactly as your frontend generates it
        const response = await fetch(`${BASE_URL}/api/candyland/save_badge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ 
                badge_name: badgeName, 
                badge_icon: badgeIcon 
            })
        });
        if (response.ok) console.log(`Badge saved: ${badgeName}`);
    } catch(e) {
        console.error("Error saving badge:", e);
    }
}

// Helper function to view all badges (can be used on a dashboard)
export async function viewBadges() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/get_badges`, { method: 'GET', credentials: 'include' });
        if (response.ok) {
            const badges = await response.json();
            if (badges.length === 0) { alert("No badges yet!"); return; }
            
            let message = "✨ YOUR BADGE COLLECTION ✨\n\n";
            badges.forEach(b => { message += `${b.icon} ${b.name}\n`; });
            alert(message);
        }
    } catch(e) { console.error("Error fetching badges:", e); }
}

// ... existing imports and code ...

export async function getBadgeUsernames(badgeId) {
    try {
        // Adjust the URL if your backend endpoint is different
        // Passing badge_id as a query parameter
        const response = await fetch(`http://localhost:8587/api/candyland/badge_owners?badge_id=${badgeId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Returns an array of strings, e.g., ["Rishabh", "John"]
            const usernames = await response.json();
            return usernames;
        } else {
            console.error(`Failed to fetch owners for badge ${badgeId}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching badge owners:", error);
        return [];
    }
}

// ... existing imports and code ...

/**
 * NEW: Fetches badges for the current user including rarity statistics.
 * This should be used instead of viewBadges when you want to show 
 * "Only 3% have earned this" in the UI.
 */
export async function viewBadgesWithRarity() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/get_badges_with_rarity`, { 
            method: 'GET', 
            credentials: 'include' 
        });
        
        if (response.ok) {
            const badges = await response.json();
            if (badges.length === 0) {
                console.log("No badges found.");
                return [];
            }
            
            // You can return this data to a React/Vue component 
            // or alert it for a quick test as done in your existing code
            let message = "✨ BADGE RARITY REPORT ✨\n\n";
            badges.forEach(b => { 
                message += `${b.icon} ${b.name}: ${b.rarity_text}\n`; 
            });
            alert(message);
            
            return badges;
        }
    } catch (e) { 
        console.error("Error fetching badges with rarity:", e); 
        return [];
    }
}

/**
 * ADMIN: Triggers the backend to inject 50 mock users and random badges.
 * Use this to quickly populate your "Administration Table" for the professor.
 */
export async function triggerMockDataInjection() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/admin/inject_data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        }
    } catch (e) {
        console.error("Error injecting mock data:", e);
    }
}