---
layout: base
title: Welcome To Caramel Apple
authors: Anika Marathe
permalink: /candyland/login
---

<style>
/* Caramel Apple Candyland Aesthetic - Revamped */
:root {
  --cream: #FFF7F0;
  --soft-pink: #FADADD;
  --caramel: #C68B59;
  --mint-green: #A8D8B9;
  --dark-chocolate: #5D4037;
  --white: #FFFFFF;
  --light-gray: #E0E0E0;
}

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: "Poppins", sans-serif;
  background-color: #B07950;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  position: relative;
}

/* Floating Candy CSS (Same as before) */
.candy { position: absolute; background-size: contain; background-repeat: no-repeat; width: 80px; height: 80px; opacity: 0.8; animation: float 15s infinite ease-in-out; }
.candy.c1 { background-image: url('/images/lolli.png'); top: 30%; left: 15%; animation-duration: 20s; }
.candy.c2 { background-image: url('/images/pink-candy.png'); width: 70px; height: 70px; top: 35%; left: 5%; animation-duration: 20s; }
.candy.c3 { background-image: url('/images/peppermint.png'); width: 60px; height: 60px; top: 50%; left: 10%; animation-duration: 20s; }
.candy.c4 { background-image: url('/images/bear.png'); top: 60%; left: 15%; animation-duration: 20s; }
.candy.c5 { background-image: url('/images/pink-candy.png'); top: 30%; right: 15%; animation-duration: 28s; }
.candy.c6 { background-image: url('/images/lolli.png'); width: 70px; height: 70px; top: 35%; right: 5%; animation-duration: 19s; }
.candy.c7 { background-image: url('/images/bear.png'); width: 60px; height: 60px; top: 50%; right: 10%; animation-duration: 23s; }
.candy.c8 { background-image: url('/images/peppermint.png'); top: 60%; right: 15%; animation-duration: 16s; }

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}

.ca-container {
  max-width: 450px;
  width: 100%;
  margin: auto;
  background: var(--white);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 2px solid var(--soft-pink);
  text-align: center;
  position: relative;
  z-index: 10;
}

.ca-title { text-align: center; font-size: 1.8rem; color: var(--dark-chocolate); font-weight: 700; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(250, 218, 221, 0.7); }
.ca-subtitle { color: var(--dark-chocolate); font-weight: 600; font-size: 1.5rem; margin-bottom: 25px; }

label { display: block; text-align: left; color: var(--caramel); font-weight: 600; margin-bottom: 5px; width: 90%; }

input[type="text"], input[type="password"], input[type="email"] {
  width: 100%; padding: 12px 15px; margin-bottom: 20px; border-radius: 10px; border: 2px solid var(--light-gray); font-size: 1rem; background-color: var(--cream); color: var(--dark-chocolate);
}
input:focus { outline: none; border-color: var(--caramel); box-shadow: 0 0 8px rgba(198, 139, 89, 0.3); background-color: var(--cream) !important; }

.ca-button { width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 10px; border: none; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.ca-button:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.primary { background: var(--mint-green); color: var(--dark-chocolate); }
.secondary { background: #f479cfff; color: white; }
.back-link { color: var(--caramel); cursor: pointer; display: inline-block; margin-top: 10px; font-weight: 600; }

.character-options { display: flex; gap: 25px; justify-content: center; margin-top: 20px; }
.character-box { width: 140px; height: 160px; border-radius: 20px; border: 3px dashed var(--light-gray); background: var(--cream); display: flex; flex-direction: column; justify-content: center; align-items: center; color: var(--dark-chocolate); font-weight: bold; cursor: pointer; transition: all 0.3s; padding: 10px; }
.character-box img { width: 80px; height: 80px; margin-bottom: 10px; object-fit: contain; }
.character-box:hover { border-color: var(--caramel); transform: scale(1.05); }
.character-box.selected { background: var(--mint-green); border: 3px solid var(--dark-chocolate); transform: scale(1.1); }

#name-selector { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 15px; }
.name-tag { background-color: var(--soft-pink); padding: 8px 15px; border-radius: 20px; cursor: pointer; transition: all 0.3s; font-weight: 600; color: var(--dark-chocolate); }
.name-tag:hover { transform: translateY(-2px); background-color: var(--caramel); color: var(--white); }
.name-tag.selected { background-color: var(--dark-chocolate); color: var(--white); transform: scale(1.1); }

/* Welcome Screen Specifics */
#welcome-img { width: 100px; height: 100px; margin: 20px auto; display: block; }
#welcome-msg { font-size: 1.2rem; margin-bottom: 30px; color: var(--caramel); }

/* Hide sections by default */
#character-section, #signup-section, #welcome-section { display: none; }
</style>

<!-- Floating Candy Elements -->
<div class="candy c1"></div><div class="candy c2"></div><div class="candy c3"></div><div class="candy c4"></div>
<div class="candy c5"></div><div class="candy c6"></div><div class="candy c7"></div><div class="candy c8"></div>

<div class="ca-container">

  <!-- LOGIN SCREEN -->
  <div id="login-section">
    <h1 class="ca-title">Welcome to Caramel Apple!</h1>
    <h2 class="ca-subtitle">Login to Your Account</h2>
    <label for="username">Username</label>
    <input id="username" type="text" placeholder="e.g., CandyKing123">
    <label for="password">Password</label>
    <input id="password" type="password" placeholder="Enter your password">
    <button class="ca-button primary" onclick="attemptLogin()">Login</button>
    <button class="ca-button primary" onclick="showSignup()">Sign Up</button>
    <p id="error" style="color: red; font-weight: bold; height: 20px;"></p>
  </div>

  <!-- SIGN UP SCREEN -->
  <div id="signup-section">
      <h1 class="ca-title">Create a New Account</h1>
      <h2 class="ca-subtitle">Join the Fun!</h2>
      <label for="new-username">Username</label>
      <input id="new-username" type="text" placeholder="Choose a fun username">
      <label for="new-email">Email</label>
      <input id="new-email" type="email" placeholder="Enter your email">
      <label for="new-password">Password</label>
      <input id="new-password" type="password" placeholder="Create a strong password">
      <button class="ca-button primary" onclick="attemptSignup()">Create Account</button>
      <a class="back-link" onclick="showLogin()">← Back to Login</a>
  </div>

  <!-- CHARACTER SELECTOR SCREEN (For first time users) -->
  <div id="character-section">
    <h2 class="ca-subtitle">Choose Your Character</h2>
    <div class="character-options">
      <div class="character-box" id="girl" onclick="selectCharacter('girl')">
        <img src="/images/ginger-girl.png" alt="Gingerbread Girl">
        <span>Ginger-Girl</span>
      </div>
      <div class="character-box" id="boy" onclick="selectCharacter('boy')">
        <img src="/images/gb2.png" alt="Gingerbread Boy">
        <span>Ginger-Boy</span>
      </div>
    </div>
    <label style="margin-top: 30px; font-weight: bold;">Pick a Sweet Name:</label>
    <div id="name-selector">
      <p style="color: var(--light-gray);">Please select a character first</p>
    </div>
    
    <!-- SAVE BUTTON: Initially Hidden -->
    <button id="save-start-btn" 
            onclick="saveAndStart()" 
            class="ca-button primary" 
            style="display: none; margin-top: 20px;">
        Start Morning Routine ➜
    </button>
  </div>

  <!-- WELCOME BACK SCREEN (For returning users) -->
  <div id="welcome-section">
    <h1 class="ca-title" id="welcome-title">Welcome Back!</h1>
    <img id="welcome-img" src="" alt="Character Icon">
    <p id="welcome-msg">Your character is ready.</p>
    
    <button class="ca-button primary" onclick="goToRoutine()">Go To Routine ➜</button>
    <button class="ca-button secondary" onclick="logout()">Logout</button>
  </div>

</div>


<script>
// --- GLOBAL VARIABLES ---
let selectedType = "";
let selectedName = "";

const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");
const characterSection = document.getElementById("character-section");
const welcomeSection = document.getElementById("welcome-section");

function showLogin() {
  loginSection.style.display = "block";
  signupSection.style.display = "none";
  characterSection.style.display = "none";
  welcomeSection.style.display = "none";
}

function showSignup() {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
}

// --- UPDATED LOGIN LOGIC ---
async function attemptLogin() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.textContent = "";

  if (user === "" || pass === "") {
    error.textContent = "Please fill out both fields.";
    return;
  }

  try {
    const response = await fetch('http://localhost:8086/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // <--- THIS LINE IS CRITICAL
      body: JSON.stringify({ username: user, password: pass })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Login Successful", data);
      
      if (data.character_name && data.character_type) {
          showWelcomeScreen(data.character_name, data.character_type);
      } else {
          loginSection.style.display = "none";
          characterSection.style.display = "block";
      }

    } else {
      error.style.color = "red";
      error.textContent = "Check your username or password"; 
    }
  } catch (e) {
    console.error(e);
    error.textContent = "Server connection failed.";
  }
}
// --- DISPLAY WELCOME SCREEN ---
function showWelcomeScreen(name, type) {
    loginSection.style.display = "none";
    welcomeSection.style.display = "block";

    // Update text
    document.getElementById("welcome-title").innerText = `Welcome, ${name}!`;
    document.getElementById("welcome-msg").innerText = `${name} is ready for the day.`;

    // Update Image based on type
    const imgElement = document.getElementById("welcome-img");
    if (type === "girl") {
        imgElement.src = "/images/ginger-girl.png";
    } else {
        imgElement.src = "/images/gb2.png";
    }
}

// --- SIGNUP LOGIC ---
async function attemptSignup() {
    const user = document.getElementById("new-username").value.trim();
    const email = document.getElementById("new-email").value.trim();
    const pass = document.getElementById("new-password").value.trim();
    
    if (!user || !email || !pass) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch('http://localhost:8086/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email: email, password: pass })
        });
        
        if (response.ok) {
            alert("Account created! Please log in.");
            showLogin();
        } else {
            const data = await response.json();
            alert("Error: " + data.error);
        }
    } catch (e) {
        alert("Server connection failed.");
    }
}

// --- LOGOUT LOGIC ---
// --- LOGOUT LOGIC ---
async function logout() {
    try {
        // Updated to use localhost AND include credentials
        await fetch('http://localhost:8086/api/logout', { 
            method: 'POST',
            credentials: 'include' 
        });
        console.log("Logout successful");
    } catch(e) { 
        console.log("Logout error", e); 
    }
    
    // Redirect back to login page
    window.location.href = '/candyland/login';
}
function goToRoutine() {
    window.location.href = '/candyland/morningroutine';
}

// --- CHARACTER SELECTION LOGIC ---
function selectCharacter(type) {
  selectedType = type; // Save to global var

  // Visuals
  document.getElementById("girl").classList.remove("selected");
  document.getElementById("boy").classList.remove("selected");
  document.getElementById(type).classList.add("selected");

  // Hide button until name is picked
  document.getElementById("save-start-btn").style.display = "none";

  // Generate Names
  const nameSelector = document.getElementById("name-selector");
  nameSelector.innerHTML = "";
  
  let names = (type === "girl")
    ? ["Ginger Snaps", "Molly Molasses", "Candy Cane"]
    : ["Graham Cracker", "Chip Cinnamon", "Captain Cookie"];

  names.forEach(name => {
    const nameTag = document.createElement("div");
    nameTag.className = "name-tag";
    nameTag.textContent = name;
    nameTag.onclick = () => selectName(nameTag, name);
    nameSelector.appendChild(nameTag);
  });
}

function selectName(tagElement, nameStr) {
    selectedName = nameStr; // Save to global var

    document.querySelectorAll('.name-tag').forEach(tag => tag.classList.remove('selected'));
    tagElement.classList.add('selected');

    // Show the SAVE button
    document.getElementById("save-start-btn").style.display = "block";
}

// --- UPDATED SAVE FUNCTION ---
async function saveAndStart() {
    if (!selectedType || !selectedName) {
        alert("Please select both a character and a name.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8086/api/save_character' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // <--- THIS LINE IS CRITICAL
            body: JSON.stringify({ 
                character_type: selectedType, 
                character_name: selectedName 
            })
        });

        if (response.ok) {
            console.log("Character Saved!");
            goToRoutine();
        } else {
            console.log("Save failed status:", response.status);
            alert("Failed to save character. Try again.");
        }
    } catch(e) {
        console.error(e);
        alert("Server error.");
    }
}
</script>