const timerButton = document.querySelector("#timer-button");
const timerModal = document.querySelector("#timer-modal");
const timerDisplay = document.querySelector("#timer-display");
const startButton = document.querySelector("#start-timer");
const resetButton = document.querySelector("#reset-timer");
const timerOptions = document.querySelector("#timer-options");
const volumeSlider = document.querySelector("#volume-slider");
const volumeValue = document.querySelector("#volume-value");
const volumeIcon = document.querySelector("#volume-control i");

// 오디오 객체들
const minuteSound = new Audio('sound/timer-minute.mp3');
const endSound = new Audio('sound/timer-end.mp3');

let timeLeft = 2.5 * 60 * 60; // 2시간 30분 (150분)
let timerId = null;
let isRunning = false;
let lastMinute = null;

// 시간을 mm:ss 형식으로 변환
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// 볼륨 조절 함수
function updateVolume() {
  const volume = volumeSlider.value / 100;
  volumeValue.textContent = `${volumeSlider.value}%`;
  
  [minuteSound, endSound].forEach(sound => {
    sound.volume = volume;
  });

  if (volume === 0) {
    volumeIcon.className = 'fas fa-volume-mute';
  } else if (volume < 0.5) {
    volumeIcon.className = 'fas fa-volume-down';
  } else {
    volumeIcon.className = 'fas fa-volume-up';
  }
}

// 타이머 시작/일시정지
function toggleTimer() {
  console.log('Timer toggled', { isRunning, timeLeft });

  if (!isRunning) {
    // 타이머 시작
    isRunning = true;
    startButton.textContent = "일시정지";
    lastMinute = Math.floor(timeLeft / 60);
    
    timerId = setInterval(() => {
      timeLeft--;
      console.log('Timer tick:', timeLeft);
      
      const currentMinute = Math.floor(timeLeft / 60);
      if (currentMinute !== lastMinute) {
        lastMinute = currentMinute;
        if (timeLeft > 0) {
          minuteSound.play().catch(e => console.log('Minute sound error:', e));
        }
      }
      
      timerDisplay.textContent = formatTime(timeLeft);
      
      if (timeLeft <= 0) {
        console.log('Timer ended');
        clearInterval(timerId);
        isRunning = false;
        startButton.textContent = "시작";
        endSound.play().catch(e => console.log('End sound error:', e));
      }
    }, 1000);
  } else {
    // 타이머 일시정지
    console.log('Timer paused');
    clearInterval(timerId);
    isRunning = false;
    startButton.textContent = "시작";
  }
}

// 타이머 리셋
function resetTimer() {
  console.log('Timer reset');
  clearInterval(timerId);
  isRunning = false;
  startButton.textContent = "시작";
  timeLeft = 2.5 * 60 * 60; // 2시간 30분으로 리셋
  timerDisplay.textContent = formatTime(timeLeft);
}

// 타이머 시간 설정
function setTimer(minutes) {
  console.log('Timer set to:', minutes, 'minutes'); // 디버깅
  clearInterval(timerId);
  isRunning = false;
  startButton.textContent = "시작";
  timeLeft = minutes * 60;
  timerDisplay.textContent = formatTime(timeLeft);
}

// 이벤트 리스너들
startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

timerOptions.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const minutes = parseInt(e.target.dataset.time);
    setTimer(minutes);
  }
});

volumeSlider.addEventListener("input", updateVolume);

volumeIcon.addEventListener("click", () => {
  if (volumeSlider.value > 0) {
    volumeSlider.value = 0;
  } else {
    volumeSlider.value = 50;
  }
  updateVolume();
});

// 모달 토글
function toggleTimerModal() {
  timerModal.classList.toggle("show");
  timerButton.classList.toggle("active");
}

timerButton.addEventListener("click", toggleTimerModal);

// 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  if (!timerModal.contains(e.target) && 
      !timerButton.contains(e.target) && 
      timerModal.classList.contains("show")) {
    toggleTimerModal();
  }
});

// 초기화
updateVolume();
timerDisplay.textContent = formatTime(timeLeft);

console.log('Timer script loaded'); // 디버깅 

document.addEventListener('DOMContentLoaded', () => {
  // 볼륨 슬라이더 기본값 설정
  volumeSlider.value = 100;
  volumeValue.textContent = '100%';
  
  // 초기 타이머 표시 수정
  timerDisplay.textContent = formatTime(timeLeft);
  
  // 초기 볼륨 설정
  updateVolume();
}); 