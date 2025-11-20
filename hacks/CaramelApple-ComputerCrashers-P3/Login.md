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
  background-color: var(--cream);
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide scrollbars caused by floating candies */
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

.candy.c1 {
  background-image: url('/images/lolli.png'); /* Swirly Lollipop */
  width: 100px;
  height: 100px;
  top: 10%;
  left: 5%;
  animation-duration: 20s;
}

.candy.c2 {
  background-image: url('/images/pink-candy.png'); /* Pink Candy */
  top: 20%;
  right: 10%;
  animation-duration: 25s;
  animation-delay: 2s;
}

.candy.c3 {
  background-image: url('/images/candy-cane.png'); /* Candy Cane */
  width: 60px;
  height: 60px;
  bottom: 15%;
  left: 15%;
  animation-duration: 18s;
}

.candy.c4 {
  background-image: url('/images/gummy.png'); /* Green Gummy */
  bottom: 10%;
  right: 5%;
  animation-duration: 22s;
  animation-delay: 3s;
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
.secondary { background: var(--soft-pink); color: var(--dark-chocolate); }
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

<!-- Floating Candy Elements -->
<div class="candy c1"></div>
<div class="candy c2"></div>
<div class="candy c3"></div>
<div class="candy c4"></div>

<!-- Main Container -->
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
    <button class="ca-button secondary" onclick="showSignup()">Sign Up</button>
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
      <button class="ca-button primary">Create Account</button>
      <a class="back-link" onclick="showLogin()">← Back to Login</a>
  </div>

  <!-- CHARACTER SELECTOR SCREEN -->
  <div id="character-section">
    <h2 class="ca-subtitle">Choose Your Character</h2>
    <div class="character-options">
      <!-- Girl Gingerbread -->
      <div class="character-box" id="girl" onclick="selectCharacter('girl')">
        <!-- REPLACE THIS with your actual image URL -->
        <img src="/images/gingerbread-girl.png" alt="Gingerbread Girl">
        <span>Ginger-Girl</span>
      </div>
      <!-- Boy Gingerbread -->
      <div class="character-box" id="boy" onclick="selectCharacter('boy')">
        <!-- REPLACE THIS with your actual image URL -->
        <img src="/images/gingerbread.png" alt="Gingerbread Boy">
        <span>Ginger-Boy</span>
      </div>
    </div>
    <label style="margin-top: 30px; font-weight: bold;">Pick a Sweet Name:</label>
    <div id="name-selector">
      <p style="color: var(--light-gray);">Please select a character first</p>
    </div>
  </div>

</div>


<!-- JavaScript Logic -->
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

function attemptLogin() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");
  if (user === "" || pass === "") {
    error.textContent = "Please fill out both fields.";
    return;
  }
  error.textContent = "";
  loginSection.style.display = "none";
  characterSection.style.display = "block";
}

function selectCharacter(type) {
  document.getElementById("girl").classList.remove("selected");
  document.getElementById("boy").classList.remove("selected");
  document.getElementById(type).classList.add("selected");

  const nameSelector = document.getElementById("name-selector");
  nameSelector.innerHTML = "";
  let names = (type === "girl")
    ? ["Ginger Snaps", "Molly Molasses", "Candy Cane"]
    : ["Graham Cracker", "Chip Cinnamon", "Captain Cookie"];

  names.forEach(name => {
    const nameTag = document.createElement("div");
    nameTag.className = "name-tag";
    nameTag.textContent = name;
    nameTag.onclick = () => selectName(nameTag);
    nameSelector.appendChild(nameTag);
  });
}

function selectName(selectedTag) {
    document.querySelectorAll('.name-tag').forEach(tag => tag.classList.remove('selected'));
    selectedTag.classList.add('selected');
}
</script>