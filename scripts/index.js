const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('.action-btn.play');
const prevBtn = document.querySelector('.action-btn.prev');
const nextBtn = document.querySelector('.action-btn.next');

const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('.title');
const musicCover = document.querySelector('.music-cover');

const songs = ['hey', 'summer', 'ukulele'];

// keep track of song
let songIndex = 2;

function loadSong(song) {
  title.textContent = song;
  audio.src = `../assets/music/${song}.mp3`;
  musicCover.src = `../assets/images/${song}.jpg`;
}

function playSong() {
  const playIcon = playBtn.querySelector('.fas');
  musicContainer.classList.add('play');
  playIcon.classList.remove('fa-play');
  playIcon.classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  const playIcon = playBtn.querySelector('.fas');
  musicContainer.classList.remove('play');
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  audio.pause();
}

function playPrevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function playNextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  // console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// load song details into dom
loadSong(songs[songIndex]);

// event listener
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
prevBtn.addEventListener('click', playPrevSong);
nextBtn.addEventListener('click', playNextSong);

// progress bar update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// song end
audio.addEventListener('ended', playNextSong);
