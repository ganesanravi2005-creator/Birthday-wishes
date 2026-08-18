const loadingScreen = document.getElementById('loading-screen');
const loadingProgress = document.querySelector('.loading-progress');
const loadingPercent = document.querySelector('.loading-percent');

const starsLayer = document.querySelector('.stars-layer');
const firefliesLayer = document.querySelector('.fireflies-layer');
const floatingHearts = document.querySelector('.floating-hearts');
const rosePetals = document.querySelector('.rose-petals');

function createStars() {
  const starsCount = 120;

  for (let i = 0; i < starsCount; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
    starsLayer.appendChild(star);
  }
}

function createFireflies() {
  const firefliesCount = 18;

  for (let i = 0; i < firefliesCount; i += 1) {
    const firefly = document.createElement('span');
    firefly.className = 'firefly';
    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${Math.random() * 100}%`;
    firefly.style.animationDelay = `${Math.random() * 5}s`;
    firefly.style.animationDuration = `${8 + Math.random() * 10}s`;
    firefliesLayer.appendChild(firefly);
  }
}

function createFloatingHearts() {
  const heartSymbols = ['❤', '♥', '♡'];
  const heartCount = 24;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 120}%`;
    heart.style.fontSize = `${0.8 + Math.random() * 1.8}rem`;
    heart.style.animationDuration = `${10 + Math.random() * 16}s`;
    heart.style.animationDelay = `${Math.random() * 6}s`;
    floatingHearts.appendChild(heart);
  }
}

function createRosePetals() {
  const petalsCount = 26;

  for (let i = 0; i < petalsCount; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 10}s`;
    petal.style.animationDuration = `${8 + Math.random() * 10}s`;
    rosePetals.appendChild(petal);
  }
}

function runLoadingScreen() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    loadingProgress.style.width = `${progress}%`;
    loadingPercent.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 500);
    }
  }, 35);
}

const targetDate = new Date('2026-08-29T00:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

const revealElements = document.querySelectorAll('.reveal-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.querySelector('.lightbox-close');

galleryItems.forEach((image) => {
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
  }
});

function addCursorHearts() {
  document.addEventListener('pointermove', (event) => {
    if (Math.random() > 0.94) {
      const heart = document.createElement('span');
      heart.className = 'heart';
      heart.textContent = '❤';
      heart.style.left = `${event.clientX}px`;
      heart.style.top = `${event.clientY}px`;
      heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      heart.style.position = 'fixed';
      heart.style.zIndex = '60';
      heart.style.pointerEvents = 'none';
      heart.style.animation = 'heartFloat 2.7s ease-out forwards';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2000);
    }
  });

  document.addEventListener('click', (event) => {
    for (let i = 0; i < 12; i += 1) {
      const burst = document.createElement('span');
      burst.className = 'heart';
      burst.textContent = '❤';
      burst.style.position = 'fixed';
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      burst.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      burst.style.pointerEvents = 'none';
      burst.style.zIndex = '60';
      burst.style.animation = `heartFloat ${2.2 + Math.random() * 1.8}s ease-out forwards`;
      burst.style.transform = `translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 80}px)`;
      document.body.appendChild(burst);

      setTimeout(() => burst.remove(), 2600);
    }
  });
}

function createConfettiBurst(x, y) {
  const colors = ['#ff5da2', '#d36cff', '#ffd166', '#ffffff'];

  for (let i = 0; i < 30; i += 1) {
    const piece = document.createElement('span');
    piece.style.position = 'fixed';
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.width = '8px';
    piece.style.height = '12px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = '2px';
    piece.style.zIndex = '60';
    piece.style.pointerEvents = 'none';
    piece.style.transform = 'translate(0, 0) rotate(0deg)';
    piece.style.animation = `confettiPop ${1.4 + Math.random() * 1.2}s ease-out forwards`;
    document.body.appendChild(piece);

    const angle = (Math.PI * 2 * i) / 30;
    const distance = 100 + Math.random() * 120;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    piece.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      { duration: 1400 + Math.random() * 500, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
    );

    setTimeout(() => piece.remove(), 1800);
  }
}

const cake = document.getElementById('cakeModel');
const blowCandlesBtn = document.getElementById('blowCandlesBtn');

blowCandlesBtn.addEventListener('click', () => {
  cake.classList.add('blowing');
  blowCandlesBtn.textContent = 'Candles Off';
  blowCandlesBtn.disabled = true;

  createConfettiBurst(window.innerWidth / 2, 220);
  setTimeout(() => {
    const candleCloud = document.createElement('div');
    candleCloud.className = 'smoke';
    candleCloud.style.position = 'absolute';
    candleCloud.style.top = '100px';
    candleCloud.style.left = '50%';
    candleCloud.style.transform = 'translateX(-50%)';
    candleCloud.style.width = '200px';
    candleCloud.style.height = '140px';
    candleCloud.style.borderRadius = '50%';
    candleCloud.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 60%)';
    candleCloud.style.filter = 'blur(12px)';
    candleCloud.style.opacity = '0.6';
    candleCloud.style.animation = 'smokeRise 2s ease-out forwards';
    document.querySelector('.cake-scene').appendChild(candleCloud);

    setTimeout(() => candleCloud.remove(), 2000);
  }, 200);
});

const giftBox = document.getElementById('giftBox');

giftBox.addEventListener('click', () => {
  giftBox.classList.toggle('open');
  const message = document.querySelector('.gift-message');
  message.textContent = giftBox.classList.contains('open') ? 'A little piece of my heart for you, always.' : 'Open it, my sweetest dream.';

  createConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.65);
  for (let i = 0; i < 10; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '❤';
    heart.style.position = 'fixed';
    heart.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 180}px`;
    heart.style.top = `${window.innerHeight * 0.62}px`;
    heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    heart.style.zIndex = '60';
    heart.style.pointerEvents = 'none';
    heart.style.animation = `heartFloat ${2.5 + Math.random() * 2}s ease-out forwards`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
});

const audio = document.getElementById('loveAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const progressBar = document.getElementById('progressBar');
const timeCurrent = document.getElementById('timeCurrent');
const timeTotal = document.getElementById('timeTotal');
const musicToggle = document.getElementById('musicToggle');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function updateAudioUI() {
  const isPlaying = !audio.paused;
  playPauseBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
  const volume = Number(volumeControl.value);
  audio.volume = volume;

  const totalSeconds = Number.isFinite(audio.duration) ? audio.duration : 0;
  timeTotal.textContent = formatTime(totalSeconds);
  timeCurrent.textContent = formatTime(audio.currentTime);
  progressBar.value = totalSeconds ? (audio.currentTime / totalSeconds) * 100 : 0;
}

function toggleMusic() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updateAudioUI();
}

musicToggle.addEventListener('click', toggleMusic);
playPauseBtn.addEventListener('click', toggleMusic);

volumeControl.addEventListener('input', () => {
  audio.volume = Number(volumeControl.value);
});

progressBar.addEventListener('input', () => {
  if (!Number.isFinite(audio.duration)) return;
  audio.currentTime = (Number(progressBar.value) / 100) * audio.duration;
  updateAudioUI();
});

audio.addEventListener('play', updateAudioUI);
audio.addEventListener('pause', updateAudioUI);
audio.addEventListener('timeupdate', updateAudioUI);
audio.addEventListener('loadedmetadata', updateAudioUI);

window.addEventListener('pointerdown', () => {
  if (audio.paused && audio.src) {
    audio.play().catch(() => {});
  }
}, { once: true });

createStars();
createFireflies();
createFloatingHearts();
createRosePetals();
runLoadingScreen();
updateCountdown();
setInterval(updateCountdown, 1000);
addCursorHearts();

const style = document.createElement('style');
style.textContent = `
  @keyframes confettiPop {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes smokeRise {
    0% { transform: translateX(-50%) translateY(0) scale(0.6); opacity: 0.4; }
    100% { transform: translateX(-50%) translateY(-60px) scale(1.8); opacity: 0; }
  }
`;
document.head.appendChild(style);
