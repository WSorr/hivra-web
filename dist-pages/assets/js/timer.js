// Timer configuration
const LAUNCH_DATE = new Date('2024-12-31T23:59:59').getTime();
const TOTAL_DAYS = 30; // Total duration in days
const START_DATE = new Date('2024-12-01T00:00:00').getTime();

// DOM Elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const timeRemainingElement = document.getElementById('time-remaining');

// Format number with leading zero
function formatNumber(num) {
    return num < 10 ? '0' + num : num.toString();
}

// Calculate progress percentage
function calculateProgress() {
    const now = new Date().getTime();
    const totalDuration = LAUNCH_DATE - START_DATE;
    const elapsed = now - START_DATE;
    const percentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
    return percentage;
}

// Update progress bar
function updateProgress() {
    const percentage = calculateProgress();
    progressFill.style.width = percentage + '%';
    progressPercentage.textContent = Math.round(percentage) + '%';
    
    // Calculate remaining time
    const now = new Date().getTime();
    const remaining = LAUNCH_DATE - now;
    const remainingDays = Math.max(Math.ceil(remaining / (1000 * 60 * 60 * 24)), 0);
    timeRemainingElement.textContent = remainingDays + ' days remaining';
}

// Update timer
function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = LAUNCH_DATE - now;
    
    if (timeLeft < 0) {
        // Launch time reached
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }
    
    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Update display
    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);
    
    // Update progress
    updateProgress();
}

// Initialize
updateTimer();
setInterval(updateTimer, 1000);
