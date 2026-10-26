const arena = document.getElementById('arena');
const startScreen = document.getElementById('startScreen');
const heart = document.getElementById('heart');
const scoreLabel = document.getElementById('score');
const timerLabel = document.getElementById('timer');
const finishScreen = document.getElementById('finishScreen');
let score = 0;
let seconds = 25;
let timerId = null;
let isPlaying = false;

function placeHeart() {
  const maxX = Math.max(0, arena.clientWidth - 62);
  const maxY = Math.max(0, arena.clientHeight - 62);
  heart.style.left = `${Math.random() * maxX}px`;
  heart.style.top = `${Math.random() * maxY}px`;
  heart.textContent = ['💗', '💖', '💕', '🩷', '❤️'][Math.floor(Math.random() * 5)];
  heart.style.display = 'block';
}
function startGame() {
  clearInterval(timerId);
  score = 0;
  seconds = 25;
  isPlaying = true;
  scoreLabel.textContent = score;
  timerLabel.textContent = seconds;
  startScreen.style.display = 'none';
  finishScreen.hidden = true;
  placeHeart();
  timerId = setInterval(() => {
    seconds -= 1;
    timerLabel.textContent = seconds;
    if (seconds <= 0) endGame();
  }, 1000);
}
function endGame() {
  clearInterval(timerId);
  isPlaying = false;
  heart.style.display = 'none';
  const message = score >= 18 ? 'Teddy is so proud of you! 🏆' : score >= 9 ? 'You did wonderfully! 🌟' : 'Teddy says: let’s try again! 🧸';
  finishScreen.hidden = false;
  finishScreen.innerHTML = `${message}<small>You collected ${score} hearts.</small><button class="button button-dark" id="playAgain">Play again ↻</button>`;
  document.getElementById('playAgain').addEventListener('click', startGame);
}
document.getElementById('startGame').addEventListener('click', startGame);
heart.addEventListener('click', () => {
  if (!isPlaying) return;
  score += 1;
  scoreLabel.textContent = score;
  placeHeart();
});

document.getElementById('unlockForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('password');
  const message = document.getElementById('passwordMessage');
  if (input.value.trim().toLowerCase() === 'ananya') {
    document.getElementById('secretPhoto').hidden = false;
    document.getElementById('lockIcon').textContent = '🔓';
    message.textContent = 'Unlocked! This memory is yours. ♡';
    input.value = '';
    document.getElementById('secretPhoto').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    message.textContent = 'Not quite. Try the name written at the top.';
    input.select();
  }
});

document.getElementById('blessingBtn').addEventListener('click', () => {
  document.getElementById('blessingMessage').textContent = 'Whenever you need a reminder: you are loved, believed in, and never expected to be perfect. ♡';
  const symbols = ['♡', '✦', '🌷', '✨'];
  for (let i = 0; i < 15; i++) {
    const item = document.createElement('span');
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    Object.assign(item.style, {
      position: 'fixed',
      left: `${8 + Math.random() * 84}vw`,
      top: `${20 + Math.random() * 60}vh`,
      zIndex: '20',
      pointerEvents: 'none',
      fontSize: `${18 + Math.random() * 16}px`,
      color: '#d88bb0',
      transition: 'transform 1.3s ease, opacity 1.3s ease',
      opacity: '1'
    });
    document.body.appendChild(item);
    requestAnimationFrame(() => {
      item.style.transform = `translateY(-${70 + Math.random() * 120}px) rotate(${Math.random() * 70 - 35}deg)`;
      item.style.opacity = '0';
    });
    setTimeout(() => item.remove(), 1400);
  }
});
