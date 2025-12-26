// Timer Configuration
const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 30); // 30 days from now

// Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressFill = document.querySelector('.progress-fill');
const progressPercent = document.querySelector('.progress-percent');

function updateTimer() {
    const now = new Date();
    const diff = TARGET_DATE - now;
    
    if (diff <= 0) {
        // Timer expired
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        progressFill.style.width = '100%';
        progressPercent.textContent = '100%';
        return;
    }
    
    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update display
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    
    // Update progress (0-30 days -> 0-100%)
    const totalDuration = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const elapsed = totalDuration - diff;
    const progress = Math.min((elapsed / totalDuration) * 100, 100);
    
    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.round(progress)}%`;
}

// Initialize timer
updateTimer();
setInterval(updateTimer, 1000);

// Back to Top button
const backTopBtn = document.querySelector('.back-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backTopBtn.classList.add('visible');
    } else {
        backTopBtn.classList.remove('visible');
    }
});

backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
