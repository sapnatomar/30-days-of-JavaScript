let countdown;

const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const timerButtons = document.querySelectorAll(".timer__button");
const stopTimerButton = document.querySelector(".stop-timer");

function clearTimer(text = '') {
  clearInterval(countdown);
}

function timer(seconds) {
  clearInterval(countdown);
  stopTimerButton.disabled = false;
  const now = Date.now();
  const then = now + seconds*1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then-Date.now())/1000);
    if (secondsLeft == 0) {
      endTimeDisplay.innerHTML = 'Time Up!';
    }
    if (secondsLeft < 0) {
      clearTimer();
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds/(60*60));
  const minutes = Math.floor((seconds%(60*60))/60);
  seconds = seconds % 60;
  let display = '';
  if (hours) {
    display += `${hours < 10 ? '0' : ''}${hours}:`;
  }
  display += `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.innerHTML = display;
}

function displayEndTime(seconds) {
  const t = new Date(seconds);
  const hours = t.getHours();
  const xhours = (hours > 12) ? hours - 12 : hours;
  const minutes = t.getMinutes();
  const display = `${xhours}:${minutes < 10 ? '0' : ''}${minutes}`;
  endTimeDisplay.innerHTML = `Be back by ${display}`;
}

function startTimer(e) {
  timer(e.target.dataset.time);
}

timerButtons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes*60);
  this.reset();
})

stopTimerButton.addEventListener('click', function(e) {
  stopTimerButton.disabled = true;
  clearTimer();
  timerDisplay.innerHTML = '00:00';
  endTimeDisplay.innerHTML = '';
});
