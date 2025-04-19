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

const challenges = [
  { question: 'Mi a C# kiíró utasítása?', answer: 'Console.WriteLine' },
  { question: 'Mi a HTML dokumentum kezdő tage?', answer: '<!DOCTYPE html>' },
  { question: 'Hogyan adsz meg egy színt CSS-ben hexadecimálisan (pl. fekete)?', answer: '#000000' },
  { question: 'Mi a JavaScript változó deklarálása?', answer: 'let' },
  { question: 'Mi a HTML címsor tagje?', answer: '<h1>' },
  { question: 'Hogyan írsz megjegyzést HTML-ben?', answer: '<!-- -->' },
  { question: 'Mi a CSS kulcsszó a piros színre?', answer: 'red' },
  { question: 'Mi a Python kiíró utasítása?', answer: 'print()' },
  { question: 'Hogyan deklarálsz változót Pythonban?', answer: 'x = 5' },
  { question: 'Hogyan zársz le sort C#-ban?', answer: ';' },
  { question: 'Mi az alapvető HTML struktúra kezdő tagje?', answer: '<html>' },
  { question: 'Hogyan linkelsz be CSS fájlt HTML-ben?', answer: '<link>' },
  { question: 'Hogyan állítasz be háttérszínt CSS-ben?', answer: 'background-color' },
  { question: 'Hogyan adsz meg egy ID-t HTML elemnek?', answer: 'id=""' },
  { question: 'Melyik JavaScript kulcsszó új értéket ad változónak?', answer: '=' },
];

let freeSteps = Array(30).fill(false);
let challengeSteps = Array(30).fill(false);

// Véletlenszerűen 15 mezőre helyezünk kihívásokat (kivéve 0-át és 29-et)
let challengeIndices = [];
while (challengeIndices.length < 15) {
  let rand = Math.floor(Math.random() * 28) + 1; // 1 - 28 között
  if (!challengeIndices.includes(rand)) challengeIndices.push(rand);
}

challengeIndices.forEach(index => challengeSteps[index] = true);
freeSteps = freeSteps.map((_, idx) => !challengeSteps[idx]);

function checkAnswer() {
  const input = document.getElementById('answerInput');
  const button = document.getElementById('checkButton');

  if (currentTile === 29) {
    document.querySelector('.challenge-box p').textContent = '🎉 Gratulálunk ügyesen kivitted a Dungeon Of Code játékunkat!';
    input.style.display = 'none';
    button.style.display = 'none';
    return;
  }

  // Kihívásos mező
  if (challengeSteps[currentTile]) {
    const answer = input.value.trim();
    const correct = challenges.shift().answer;

    if (answer === correct) {
      score += 10;
      updateScoreAndBadges();
      moveTo(currentTile + 1);
      loadChallenge();
    } else {
      alert('Próbáld újra!');
    }
  } else {
    // Ingyenes mező
    moveTo(currentTile + 1);
    loadChallenge();
  }
}

function loadChallenge() {
  const input = document.getElementById('answerInput');
  const button = document.getElementById('checkButton');
  const text = document.querySelector('.challenge-box p');

  if (currentTile === 29) {
    text.textContent = '🎉 Gratulálunk ügyesen kivitted a Dungeon Of Code játékunkat!';
    input.style.display = 'none';
    button.style.display = 'none';
    return;
  }

  if (challengeSteps[currentTile]) {
    const q = challenges[0].question;
    text.textContent = q;
    input.value = '';
    input.placeholder = "Írd be a választ...";
    input.style.display = 'inline-block';
    button.textContent = 'Ellenőrzés';
  } else {
    text.textContent = 'Ez most egy könnyű szoba, továbbmehetsz ingyen!';
    input.style.display = 'none';
    button.textContent = 'Tovább';
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

function updateScoreAndBadges() {
  document.getElementById('score').textContent = score;

  const badgeList = ['🎖️', '🎖️ 🎖️', '🎖️ 🎖️ 🎖️', '🎖️ 🎖️ 🎖️ 🎖️', '🎖️ 🎖️ 🎖️ 🎖️ 🎖️'];
  const badgeThresholds = [30, 50, 70, 100, 150];

  for (let i = 0; i < badgeThresholds.length; i++) {
    if (score >= badgeThresholds[i] && badges === i) {
      badges++;
      document.getElementById('badges').textContent = badges;
      document.getElementById('badges-list').textContent = badgeList[i];
    }
  }
}

// Betöltéskor első kérdés
window.onload = () => {
  loadChallenge();
};
