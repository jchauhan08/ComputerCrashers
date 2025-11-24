---
layout: post
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



/* Add Poppins font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: "Poppins", sans-serif;
  background-color: #B07950; /* Rich Caramel */
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden; /* Allows vertical scroll, prevents horizontal */
  position: relative; /* Needed for positioning the candy elements */
}

/* --- Floating Candy Background Elements --- */
.candy {
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  opacity: 0.8;
  animation: float 15s infinite ease-in-out;
}

/* --- S-Shape Candy Positioning --- */

/* Left Side Candies (Lollipop, Pink Candy, Candy Cane, Gummy) */

/* c1: Top-Left (Inner position) */
.candy.c1 {
  background-image: url('/images/lolli.png');
  top: 30%;
  left: 15%; /* Closer to the center */
  animation-duration: 20s;
}

/* c2: Mid-Left (Outer position) */
.candy.c2 {
  background-image: url('/images/pink-candy.png');
  width: 70px;
  height: 70px;
  top: 35%;
  left: 5%; /* Further from the center */
  animation-duration: 20s;
}

/* c3: Mid-Left (Inner position) */
.candy.c3 {
  background-image: url('/images/peppermint.png');
  width: 60px;
  height: 60px;
  top: 50%;
  left: 10%; /* Closer to the center */
  animation-duration: 20s;
}

/* c4: Bottom-Left (Outer position) */
.candy.c4 {
  background-image: url('/images/bear.png');
  top: 60%;
  left: 15%; /* Further from the center */
  animation-duration: 20s;
}


/* Right Side Candies (Duplicates of the same four) */

/* c5: Top-Right (Inner position) */
.candy.c5 {
  background-image: url('/images/pink-candy.png');
  top: 30%;
  right: 15%; /* Closer to the center */
  animation-duration: 28s;
}

/* c6: Mid-Right (Outer position) */
.candy.c6 {
  background-image: url('/images/lolli.png');
  width: 70px;
  height: 70px;
  top: 35%;
  right: 5%; /* Further from the center */
  animation-duration: 19s;
}

/* c7: Mid-Right (Inner position) */
.candy.c7 {
  background-image: url('/images/bear.png');
  width: 60px;
  height: 60px;
  top: 50%;
  right: 10%; /* Closer to the center */
  animation-duration: 23s;
}

/* c8: Bottom-Right (Outer position) */
.candy.c8 {
  background-image: url('/images/peppermint.png');
  top: 60%;
  right: 15%; /* Further from the center */
  animation-duration: 16s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
}


/* Main content container */
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
  position: relative; /* Keep it above the candies */
  z-index: 10;
}

/* Page Title */
.ca-title {
  text-align: center;
  font-size: 1.8rem;
  color: var(--dark-chocolate); /* Changed from white */
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(250, 218, 221, 0.7); /* Adds a "pop" effect */
}

/* Section Sub-titles */
.ca-subtitle {
  color: var(--dark-chocolate);
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 25px;
}

/* Input & Label Styling */
label {
  display: block;
  text-align: left;
  color: var(--caramel);
  font-weight: 600;
  margin-bottom: 5px;
  /*margin-left: auto; /* Center the block */
  /*margin-right: auto; /* Center the block */
  width: 90%; /* Set width */
}

input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid var(--light-gray);
  font-size: 1rem;
  background-color: var(--cream);
  transition: border-color 0.3s, box-shadow 0.3s;
  color: var(--dark-chocolate);
}

input:focus {
  outline: none;
  border-color: var(--caramel);
  box-shadow: 0 0 8px rgba(198, 139, 89, 0.3);
}

/* Button Styling */
.ca-button {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ca-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.primary { background: var(--mint-green); color: var(--dark-chocolate); }
.secondary { background: var(--mint-green); color: var(--dark-chocolate); }
.back-link { color: var(--caramel); cursor: pointer; display: inline-block; margin-top: 10px; font-weight: 600; }

/* Character Selection Styling */
.character-options {
  display: flex;
  gap: 25px;
  justify-content: center;
  margin-top: 20px;
}

.character-box {
  width: 140px;
  height: 160px;
  border-radius: 20px;
  border: 3px dashed var(--light-gray);
  background: var(--cream);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--dark-chocolate);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  padding: 10px;
}

/* Use IMG tag for actual gingerbread images */
.character-box img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  object-fit: contain;
}

.character-box:hover {
  border-color: var(--caramel);
  transform: scale(1.05);
}

.character-box.selected {
  background: var(--mint-green);
  border: 3px solid var(--dark-chocolate);
  transform: scale(1.1);
}

/* Name Selector Styling */
#name-selector {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 15px;
}

.name-tag {
  background-color: var(--soft-pink); padding: 8px 15px; border-radius: 20px; cursor: pointer;
  transition: all 0.3s; font-weight: 600; color: var(--dark-chocolate);
}
.name-tag:hover { transform: translateY(-2px); background-color: var(--caramel); color: var(--white); }
.name-tag.selected { background-color: var(--dark-chocolate); color: var(--white); transform: scale(1.1); }

/* Hide sections by default */
#character-section, #signup-section { display: none; }
</style>

<!-- Floating Candy Elements - S-Shape Formation -->
<div class="candy c1"></div> <!-- Left 1 -->
<div class="candy c2"></div> <!-- Left 2 -->
<div class="candy c3"></div> <!-- Left 3 -->
<div class="candy c4"></div> <!-- Left 4 -->
<div class="candy c5"></div> <!-- Right 1 -->
<div class="candy c6"></div> <!-- Right 2 -->
<div class="candy c7"></div> <!-- Right 3 -->
<div class="candy c8"></div> <!-- Right 4 -->

<!-- Main Container -->
<div class="ca-container">

<!-- NEW BUTTON: Hidden by default -->
  <button id="start-routine-btn" 
          onclick="goToRoutine()" 
          class="ca-button primary" 
          style="display: none; position: absolute; top: 20px; right: 20px; width: auto; padding: 8px 15px; font-size: 0.8rem; z-index: 100;">
      Start Morning Routine ➜
  </button>

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

  <!-- CHARACTER SELECTOR SCREEN -->
  <div id="character-section">
    <h2 class="ca-subtitle">Choose Your Character</h2>
    <div class="character-options">
      <!-- Girl Gingerbread -->
      <div class="character-box" id="girl" onclick="selectCharacter('girl')">
        <!-- REPLACE THIS with your actual image URL -->
        <img src="/images/ginger-girl.png" alt="Gingerbread Girl">
        <span>Ginger-Girl</span>
      </div>
      <!-- Boy Gingerbread -->
      <div class="character-box" id="boy" onclick="selectCharacter('boy')">
        <!-- REPLACE THIS with your actual image URL -->
        <img src="/images/gb2.png" alt="Gingerbread Boy">
        <span>Ginger-Boy</span>
      </div>
    </div>
    <label style="margin-top: 30px; font-weight: bold;">Pick a Sweet Name:</label>
    <div id="name-selector">
      <p style="color: var(--light-gray);">Please select a character first</p>
    </div>
    <!-- NEW LOGOUT BUTTON -->
    <button class="ca-button secondary" onclick="logout()" style="margin-top: 20px; background-color: #f479cfff; color: white;">
    Logout
</button>
  </div>

</div>


<script>
const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");
const characterSection = document.getElementById("character-section");

function showLogin() {
  loginSection.style.display = "block";
  signupSection.style.display = "none";
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

  // Reset error message
  error.textContent = "";

  if (user === "" || pass === "") {
    error.textContent = "Please fill out both fields.";
    return;
  }

  try {
    // Make sure this port matches your Python terminal (likely 8086)
    const response = await fetch('http://127.0.0.1:8086/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });

    const data = await response.json();

    if (response.ok) {
      // SUCCESS: Switch screens
      console.log("Login Successful");
      loginSection.style.display = "none";
      characterSection.style.display = "block";
    } else {
      // FAILURE: Display the error message
      // This catches the 401 error from the backend
      error.style.color = "red";
      error.textContent = "Check your username or password"; 
    }
  } catch (e) {
    console.error(e);
    error.textContent = "Server connection failed. Is Python running?";
  }
}

// --- NEW LOGOUT LOGIC ---
function logout() {
    // 1. (Optional) Clear any stored data if you had any
    // 2. Redirect to the login page (this refreshes the page and resets state)
    window.location.href = '/candyland/login';
}

// --- NEW SIGNUP LOGIC ---
// Note: You need to add onclick="attemptSignup()" to your "Create Account" button in HTML
async function attemptSignup() {
    const user = document.getElementById("new-username").value.trim();
    const email = document.getElementById("new-email").value.trim();
    const pass = document.getElementById("new-password").value.trim();
    
    // Quick alert for validation (you can make this prettier later)
    if (!user || !email || !pass) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8086/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, email: email, password: pass })
        });
        
        const data = await response.json();

        if (response.ok) {
            alert("Account created successfully! Switching to Login.");
            showLogin();
        } else {
            alert("Error: " + data.error);
        }
    } catch (e) {
        alert("Server connection failed.");
    }
}

// --- REDIRECT FUNCTION ---
function goToRoutine() {
    window.location.href = '/candyland/morningroutine';
}

// --- UPDATED CHARACTER SELECTION ---
function selectCharacter(type) {
  // 1. Reset visual selection
  document.getElementById("girl").classList.remove("selected");
  document.getElementById("boy").classList.remove("selected");
  document.getElementById(type).classList.add("selected");

  // 2. HIDE the start button (because name selection is reset)
  document.getElementById("start-routine-btn").style.display = "none";

  // 3. Generate Names
  const nameSelector = document.getElementById("name-selector");
  nameSelector.innerHTML = "";
  
  let names = (type === "girl")
    ? ["Ginger Snaps", "Molly Molasses", "Candy Cane"]
    : ["Graham Cracker", "Chip Cinnamon", "Captain Cookie"];

  names.forEach(name => {
    const nameTag = document.createElement("div");
    nameTag.className = "name-tag";
    nameTag.textContent = name;
    // Pass the nameTag element to the selectName function
    nameTag.onclick = () => selectName(nameTag);
    nameSelector.appendChild(nameTag);
  });
}

// --- UPDATED NAME SELECTION ---
function selectName(selectedTag) {
    // 1. handle visual selection
    document.querySelectorAll('.name-tag').forEach(tag => tag.classList.remove('selected'));
    selectedTag.classList.add('selected');

    // 2. SHOW the start button (Now both Character and Name are picked!)
    document.getElementById("start-routine-btn").style.display = "block";
}