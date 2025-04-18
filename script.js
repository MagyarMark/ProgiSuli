/*const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const challengeBox = document.getElementById("challengeBox");
const challengeText = document.getElementById("challengeText");
const challengeAnswer = document.getElementById("challengeAnswer");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const badgesEl = document.getElementById("badges");
const minimap = document.getElementById("minimap");

let score = 0;
let badges = 0;
let currentRoom = 0;
const totalRooms = 5;

// Dummy challenges
const challenges = [
  { question: "Mi a C# kiíró utasítása?", answer: "Console.WriteLine" },
  { question: "Mi a Python változó létrehozás?", answer: "x = 5" },
  { question: "Mi a HTML kezdő tag?", answer: "<html>" },
  { question: "Mi a CSS szín megadás formája?", answer: "color: red;" },
  { question: "Mi a ciklus JavaScriptben?", answer: "for" }
];

// Setup minimap
for (let i = 0; i < totalRooms; i++) {
  const tile = document.createElement("div");
  if (i === 0) tile.classList.add("active");
  minimap.appendChild(tile);
}

// Character
let x = 20, y = 20;
let spriteFrame = 0;
let spriteTimer = 0;

function drawCharacter() {
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(x, y, 20, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCharacter();
}

function checkAnswer() {
  const userAnswer = challengeAnswer.value.trim();
  const correctAnswer = challenges[currentRoom].answer;

  if (userAnswer === correctAnswer) {
    score += 10;
    badges++;
    scoreEl.textContent = score;
    badgesEl.textContent = badges;
    feedback.textContent = "✅ Helyes válasz!";
    setTimeout(nextRoom, 1000);
  } else {
    feedback.textContent = "❌ Hibás válasz!";
  }
}

function nextRoom() {
  currentRoom++;
  if (currentRoom < challenges.length) {
    challengeBox.classList.remove("hidden");
    challengeText.textContent = challenges[currentRoom].question;
    challengeAnswer.value = "";
    feedback.textContent = "";
    updateMinimap();
  } else {
    challengeBox.innerHTML = "<h2>🎉 Gratulálunk!</h2><p>Teljesítetted az összes kihívást!</p>";
  }
}

function updateMinimap() {
  [...minimap.children].forEach((tile, index) => {
    tile.classList.toggle("active", index === currentRoom);
  });
}

canvas.addEventListener("click", () => {
  if (!challengeBox.classList.contains("hidden")) return;
  challengeBox.classList.remove("hidden");
  challengeText.textContent = challenges[currentRoom].question;
});
  
setInterval(() => {
  draw();
}, 100);*/

let score = 0;
let badges = 0;
let currentTile = 0;

function checkAnswer() {
  const input = document.getElementById('answerInput').value.trim();
  const correct = 'Console.WriteLine'; // Példa válasz

  if (input === correct) {
    score += 10;
    document.getElementById('score').textContent = score;

    // új mezőre lépés (következő tile)
    if (currentTile < 29) {
      moveTo(currentTile + 1);
    }

    // Jelvény osztás
    if (score >= 30 && badges === 0) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = '🎖️';
    }
    if (score >= 50 && badges === 1) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = '🎖️ 🎖️';
    }
    if (score >= 70 && badges === 2) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = '🎖️ 🎖️ 🎖️';
    }
    if (score >= 100 && badges === 3) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = '🎖️ 🎖️ 🎖️ 🎖️';
    }
    if (score >= 150 && badges === 4) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = '🎖️ 🎖️ 🎖️ 🎖️ 🎖️';
    }
  } else {
    alert('Próbáld újra!');
  }
}

function moveTo(newTile) {
  document.getElementById(`tile-${currentTile}`).innerHTML = '';
  currentTile = newTile;
  document.getElementById(`tile-${newTile}`).innerHTML = '<img src="png/player.png" id="player" alt="Játékos" />';

  // Minimap frissítés
  const allMiniTiles = document.querySelectorAll('.minimap-tile');
  allMiniTiles.forEach(tile => tile.classList.remove('active'));
  allMiniTiles[newTile].classList.add('active');
}

function updateBadges() {
    document.getElementById('badges-count').textContent = badges.length;
    document.getElementById('badges-list').textContent = badges.join(" ");
  }