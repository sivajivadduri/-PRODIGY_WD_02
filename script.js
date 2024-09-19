let startTime, updatedTime, difference;
let interval;
let running = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Format time into HH:MM:SS
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds)
    );
}

// Start the stopwatch
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1000);
        running = true;
    }
}

// Update time display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.innerHTML = formatTime(difference);
}

// Stop the stopwatch
function stopStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCounter = 1;
}

// Log a lap time
function logLap() {
    if (running) {
        const lapTime = formatTime(difference);
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', logLap);
