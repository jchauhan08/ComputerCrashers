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

// --- BADGES ---
export async function saveBadge(badgeName, badgeIcon) {
    try {
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

export async function getBadgeUsernames(badgeId) {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/badge_owners?badge_id=${badgeId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
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

// --- ADMIN ---
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

export async function triggerClearData() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/admin/clear_data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        }
    } catch (e) {
        console.error("Error clearing data:", e);
    }
}

// --- PHASE 2: TRIGGER BACKUP ---
export async function triggerBackup() {
    try {
        const response = await fetch(`${BASE_URL}/api/candyland/admin/backup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message + "\nCheck backend folder for rarity_snapshot.json");
        }
    } catch (e) {
        console.error("Error triggering backup:", e);
    }
}

// ============================================
// ANALYTICS ENDPOINTS (Phase 4 - Gas Game)
// ============================================

/**
 * Fetches player performance analytics for a specific user
 * @param {number} userId - The user ID to fetch analytics for
 * @param {number} limit - Optional limit for number of sessions (default: 25, max: 200)
 * @returns {Promise<Object>} Player analytics including summary and recent sessions
 */
export async function getPlayerAnalytics(userId, limit = 25) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/player/${userId}?limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            console.error(`Failed to fetch player analytics: ${error.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching player analytics:", error);
        return null;
    }
}

/**
 * Fetches question difficulty and success rate analytics
 * @param {Object} options - Query parameters
 * @param {number} options.limit - Number of questions to return (default: 50, max: 500)
 * @param {string} options.category - Filter by category (optional)
 * @param {number} options.difficulty_level - Filter by difficulty level (optional)
 * @returns {Promise<Object>} Question analytics with attempt counts and success rates
 */
export async function getQuestionAnalytics(options = {}) {
    try {
        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit);
        if (options.category) params.append('category', options.category);
        if (options.difficulty_level !== undefined) params.append('difficulty_level', options.difficulty_level);

        const response = await fetch(`${BASE_URL}/api/analytics/questions?${params.toString()}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch question analytics');
            return null;
        }
    } catch (error) {
        console.error("Error fetching question analytics:", error);
        return null;
    }
}

/**
 * Fetches session-level analytics (completion rates, retry rates)
 * @param {number} limit - Number of sessions to analyze (default: 500, max: 5000)
 * @returns {Promise<Object>} Session summary statistics
 */
export async function getSessionAnalytics(limit = 500) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/sessions?limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch session analytics');
            return null;
        }
    } catch (error) {
        console.error("Error fetching session analytics:", error);
        return null;
    }
}

// ============================================
// GITHUB ANALYTICS ENDPOINTS
// ============================================

/**
 * Fetches GitHub user information for the current user
 * @returns {Promise<Object>} GitHub user data
 */
export async function getGitHubUser() {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch GitHub user');
            return null;
        }
    } catch (error) {
        console.error("Error fetching GitHub user:", error);
        return null;
    }
}

/**
 * Fetches profile links for the current user
 * @returns {Promise<Object>} User profile links
 */
export async function getUserProfileLinks() {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/profile_links`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch profile links');
            return null;
        }
    } catch (error) {
        console.error("Error fetching profile links:", error);
        return null;
    }
}

/**
 * Fetches commit statistics for the current user
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} Commit statistics
 */
export async function getUserCommits(dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/commits`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch commits');
            return null;
        }
    } catch (error) {
        console.error("Error fetching commits:", error);
        return null;
    }
}

/**
 * Fetches pull request statistics for the current user
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} PR statistics
 */
export async function getUserPRs(dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/prs`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch PRs');
            return null;
        }
    } catch (error) {
        console.error("Error fetching PRs:", error);
        return null;
    }
}

/**
 * Fetches issue statistics for the current user
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} Issue statistics
 */
export async function getUserIssues(dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/issues`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch issues');
            return null;
        }
    } catch (error) {
        console.error("Error fetching issues:", error);
        return null;
    }
}

/**
 * Fetches issue comment statistics for the current user
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} Issue comment statistics
 */
export async function getUserIssueComments(dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/issue_comments`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch issue comments');
            return null;
        }
    } catch (error) {
        console.error("Error fetching issue comments:", error);
        return null;
    }
}

/**
 * Fetches received issue comment statistics for the current user
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} Received issue comment statistics
 */
export async function getUserReceivedIssueComments(dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/user/received_issue_comments`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch received issue comments');
            return null;
        }
    } catch (error) {
        console.error("Error fetching received issue comments:", error);
        return null;
    }
}

/**
 * Fetches users in a GitHub organization
 * @param {string} orgName - Organization name
 * @returns {Promise<Object>} List of organization users
 */
export async function getGitHubOrgUsers(orgName) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/org/${orgName}/users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch organization users');
            return null;
        }
    } catch (error) {
        console.error("Error fetching organization users:", error);
        return null;
    }
}

/**
 * Fetches repositories in a GitHub organization
 * @param {string} orgName - Organization name
 * @returns {Promise<Object>} List of organization repositories
 */
export async function getGitHubOrgRepos(orgName) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/github/org/${orgName}/repos`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch organization repos');
            return null;
        }
    } catch (error) {
        console.error("Error fetching organization repos:", error);
        return null;
    }
}

// ============================================
// ADMIN ENDPOINTS
// ============================================

/**
 * ADMIN: Fetches issue statistics for a specific user by UID
 * @param {string} uid - User's unique identifier
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} User's issue statistics
 */
export async function getAdminUserIssues(uid, dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/issues/${uid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            console.error(`Failed to fetch admin user issues: ${error.message}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin user issues:", error);
        return null;
    }
}

/**
 * ADMIN: Fetches commit statistics for a specific user by UID
 * @param {string} uid - User's unique identifier
 * @param {Object} dateRange - Optional date range {start_date, end_date}
 * @returns {Promise<Object>} User's commit statistics
 */
export async function getAdminUserCommits(uid, dateRange = {}) {
    try {
        const response = await fetch(`${BASE_URL}/api/analytics/commits/${uid}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Object.keys(dateRange).length > 0 ? JSON.stringify(dateRange) : undefined
        });

        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.json();
            console.error(`Failed to fetch admin user commits: ${error.message}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin user commits:", error);
        return null;
    }
}

// ============================================
// GAME API ENDPOINTS (Gas Game)
// ============================================

/**
 * Starts a new game session or resumes an active one
 * Creates a new game session with NPCs and a gas holder
 * If user already has an active session, resumes that instead
 * @param {number} userId - Optional user ID (if not logged in)
 * @returns {Promise<Object>} Session data with session_id, NPCs, and start_time
 */
export async function startGame(userId = null) {
    try {
        const body = userId ? { user_id: userId } : {};
        
        const response = await fetch(`${BASE_URL}/api/game/start`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.error(`Failed to start game: ${error.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error starting game:", error);
        return null;
    }
}

/**
 * Fetches detailed information about a specific game session
 * Includes session data, interacted NPCs, and answered questions
 * @param {string} sessionId - The unique session identifier
 * @returns {Promise<Object>} Session details with interactions and answered questions
 */
export async function getGameSession(sessionId) {
    try {
        const response = await fetch(`${BASE_URL}/api/game/session/${sessionId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.error(`Failed to fetch game session: ${error.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching game session:", error);
        return null;
    }
}

// ============================================
// NPC API ENDPOINTS
// ============================================

/**
 * Interacts with an NPC in the game
 * If the NPC is the gas holder, returns a question
 * Otherwise, records the interaction without a question
 * @param {string} sessionId - The current game session ID
 * @param {number} npcId - The ID of the NPC to interact with
 * @returns {Promise<Object>} Interaction result with NPC details and optional question
 */
export async function interactWithNPC(sessionId, npcId) {
    try {
        const response = await fetch(`${BASE_URL}/api/npc/interact`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_id: sessionId,
                npc_id: npcId
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.error(`Failed to interact with NPC: ${error.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error interacting with NPC:", error);
        return null;
    }
}

// ============================================
// QUIZ API ENDPOINTS
// ============================================

/**
 * Submits an answer to a quiz question
 * Updates the session based on correctness
 * If correct, completes the session; if incorrect, increments attempts
 * @param {string} sessionId - The current game session ID
 * @param {number} questionId - The ID of the question being answered
 * @param {string} userAnswer - The user's answer
 * @param {number} responseTimeMs - Optional response time in milliseconds
 * @returns {Promise<Object>} Answer result with correctness and session status
 */
export async function submitQuizAnswer(sessionId, questionId, userAnswer, responseTimeMs = null) {
    try {
        const body = {
            session_id: sessionId,
            question_id: questionId,
            user_answer: userAnswer
        };

        if (responseTimeMs !== null) {
            body.response_time_ms = responseTimeMs;
        }

        const response = await fetch(`${BASE_URL}/api/quiz/answer`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.error(`Failed to submit answer: ${error.error}`);
            return null;
        }
    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        return null;
    }
}