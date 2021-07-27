const playerEl = document.getElementById('player');
const videoEl = document.getElementById('video');
const progressRangeEl = document.getElementById('progress-range');
const progressBarEl = document.getElementById('progress-bar');
const playBtnEl = document.getElementById('play-btn');
const volumeBtnEl = document.getElementById('volume-btn');
const volumeRangeEl = document.getElementById('volume-range');
const volumeBarEl = document.getElementById('volume-bar');
const playbackRateEl = document.getElementById('playback-rate');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const fullscreenBtnEl = document.getElementById('fullscreen-btn');

const showPlayIcon = () => {
  playBtnEl.classList.replace('fa-pause', 'fa-play');
  playBtnEl.setAttribute('title', 'Play');
};

const togglePlay = () => {
  if (videoEl.paused) {
    videoEl.play();
    playBtnEl.classList.replace('fa-play', 'fa-pause');
    playBtnEl.setAttribute('title', 'Pause');
  } else {
    videoEl.pause();
    showPlayIcon();
  }
};

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, 0);
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  const { currentTime, duration } = videoEl;
  progressBarEl.style.width = `${(currentTime / duration) * 100}%`;
  currentTimeEl.textContent = displayTime(currentTime) + ' /';
  durationTimeEl.textContent = displayTime(duration);
};

const setProgress = (e) => {
  const newTime = e.offsetX / progressRangeEl.offsetWidth;
  progressBarEl.style.width = `${newTime * 100}%`;
  videoEl.currentTime = newTime * videoEl.duration;
};

const volumeControls = () => {
  let lastVolume = 1;

  const changeVolume = (e) => {
    let volume = e.offsetX / volumeRangeEl.offsetWidth;
    if (volume < 0.1) volume = 0;
    if (volume > 0.9) volume = 1;
    volumeBarEl.style.width = `${volume * 100}%`;
    videoEl.volume = volume;
    volumeBtnEl.className = '';
    if (volume > 0.7) {
      volumeBtnEl.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
      volumeBtnEl.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
      volumeBtnEl.classList.add('fas', 'fa-volume-off');
    }
    lastVolume = volume;
  };

  const toggleMute = () => {
    volumeBtnEl.className = '';
    if (videoEl.volume) {
      lastVolume = videoEl.volume;
      video.volume = 0;
      volumeBarEl.style.width = 0;
      volumeBtnEl.classList.add('fas', 'fa-volume-mute');
      volumeBtnEl.setAttribute('title', 'Umnute');
    } else {
      video.volume = lastVolume;
      volumeBarEl.style.width = `${lastVolume * 100}%`;
      if (lastVolume > 0.7) {
        volumeBtnEl.classList.add('fas', 'fa-volume-up');
      } else {
        volumeBtnEl.classList.add('fas', 'fa-volume-down');
      }
      volumeBtnEl.setAttribute('title', 'Mute');
    }
  };

  return { changeVolume, toggleMute };
};

const { changeVolume, toggleMute } = volumeControls();

const changeSpeed = () => {
  videoEl.playbackRate = playbackRateEl.value;
};

const fullscreenControls = (elem) => {
  let fullscreen = false;

  const openFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      openFullscreen(elem);
    } else {
      closeFullscreen();
    }
    fullscreen = !fullscreen;
  };

  return { toggleFullscreen };
};

const { toggleFullscreen } = fullscreenControls(playerEl);

playBtnEl.addEventListener('click', togglePlay);
videoEl.addEventListener('click', togglePlay);
videoEl.addEventListener('ended', showPlayIcon);
videoEl.addEventListener('timeupdate', updateProgress);
videoEl.addEventListener('canplay', updateProgress);
progressRangeEl.addEventListener('click', setProgress);
volumeRangeEl.addEventListener('click', changeVolume);
volumeBtnEl.addEventListener('click', toggleMute);
playbackRateEl.addEventListener('change', changeSpeed);
fullscreenBtnEl.addEventListener('click', toggleFullscreen);
