document.body.classList.add('enter-locked');

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealItems.forEach((item) => observer.observe(item));

document.addEventListener('mousemove', (e) => {
  const heroLogo = document.querySelector('.hero-logo');
  if (!heroLogo) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroLogo.style.transform = `translate(${x}px, ${y}px)`;
});

const audio = document.getElementById('site-audio');
const hudTitle = document.getElementById('hud-title');
const hudPlay = document.getElementById('hud-play');
const hudPrev = document.getElementById('hud-prev');
const hudNext = document.getElementById('hud-next');
const hudVolume = document.getElementById('hud-volume');
const hudToggle = document.getElementById('hud-toggle');
const hudOpen = document.getElementById('hud-open');
const hud = document.getElementById('music-hud');
const enterScreen = document.getElementById('enter-screen');
const enterBtn = document.getElementById('enter-btn');

const tracks = [
  {
    title: 'BossMan Dlow - Motion Party',
    src: 'assets/music/motion-party.mp3'
  },
  {
    title: 'Zach Bryan - Plastic Cigarette',
    src: 'assets/music/plastic-cigarette.mp3'
  },
  {
    title: 'Don Toliver - Body',
    src: 'assets/music/body.mp3'
  }
];

let currentIndex = 0;

function loadTrack(index, autoplay = false) {
  currentIndex = index;
  audio.src = tracks[currentIndex].src;
  hudTitle.textContent = tracks[currentIndex].title;

  if (autoplay) {
    audio.play().then(() => {
      hudPlay.textContent = '⏸';
    }).catch(() => {
      hudPlay.textContent = '▶';
    });
  }
}

function togglePlay() {
  if (!audio.src) {
    loadTrack(currentIndex, true);
    return;
  }

  if (audio.paused) {
    audio.play().then(() => {
      hudPlay.textContent = '⏸';
    });
  } else {
    audio.pause();
    hudPlay.textContent = '▶';
  }
}

function nextTrack() {
  const nextIndex = (currentIndex + 1) % tracks.length;
  loadTrack(nextIndex, true);
}

function previousTrack() {
  const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(previousIndex, true);
}

hudPlay.addEventListener('click', togglePlay);
hudNext.addEventListener('click', nextTrack);
hudPrev.addEventListener('click', previousTrack);

audio.addEventListener('ended', nextTrack);
audio.addEventListener('play', () => {
  hudPlay.textContent = '⏸';
});
audio.addEventListener('pause', () => {
  hudPlay.textContent = '▶';
});

hudVolume.addEventListener('input', () => {
  audio.volume = Number(hudVolume.value);
});

hudToggle.addEventListener('click', () => {
  hud.classList.add('hidden');
  hudOpen.classList.remove('hidden');
});
hudOpen.addEventListener('click', () => {
  hud.classList.remove('hidden');
  hudOpen.classList.add('hidden');
});

enterBtn.addEventListener('click', () => {
  enterScreen.classList.add('hidden');
  document.body.classList.remove('enter-locked');
  loadTrack(0, true);
});

audio.volume = Number(hudVolume.value);
loadTrack(0, false);
