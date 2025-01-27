const timerDisplay = document.getElementById('timer-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const startSound = document.getElementById('start-sound');
const oneMinuteSound = document.getElementById('one-minute-sound');
const thirtyMinuteSound = document.getElementById('thirty-minute-sound');
const endSound = document.getElementById('end-sound');

let totalSeconds = 2 * 3600 + 30 * 60; // 2 hours 30 minutes
let timerInterval = null;

const updateDisplay = () => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    increaseButton.disabled = totalSeconds >= 9 * 3600 + 30 * 60;
    decreaseButton.disabled = totalSeconds <= 30 * 60;
};

const toggleTimer = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startStopButton.textContent = 'Start';
    } else {
        startSound.play() ;
        startStopButton.textContent = 'Stop';
        let minutesPassed = 0;
        let thirtyMinutesPassed = 0;

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();

                if (totalSeconds % 60 === 0) {
                    minutesPassed++;
                    oneMinuteSound.play();
                }

                if (minutesPassed % 30 === 0 && minutesPassed !== thirtyMinutesPassed) {
                    thirtyMinuteSound.play();
                    thirtyMinutesPassed = minutesPassed;
                }
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                startStopButton.textContent = 'Start';
                endSound.play();
            }
        }, 1000);
    }
};

const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 2 * 3600 + 30 * 60;
    updateDisplay();
    startStopButton.textContent = 'Start';
};

const adjustTime = (amount) => {
    totalSeconds = Math.max(30 * 60, Math.min(9 * 3600 + 30 * 60, totalSeconds + amount));
    updateDisplay();
};

startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
decreaseButton.addEventListener('click', () => adjustTime(-30 * 60));
increaseButton.addEventListener('click', () => adjustTime(30 * 60));

updateDisplay();