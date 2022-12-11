import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
const INTERVAL_DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {    
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
      return;
    };
    
    if (Date.now() < selectedDates[0]) {
      Notiflix.Notify.success('Correct date');
      console.log(selectedDates[0]);
      refs.startBtn.disabled = false;
    };

    refs.startBtn.addEventListener('click', onClickStartBtn);

    function onClickStartBtn() {
      intervalId = setInterval(() => {
        const deltaTime = selectedDates[0] - Date.now();
        
        if (deltaTime < INTERVAL_DELAY) {
          Notiflix.Notify.info('Time is up :)');
          clearInterval(intervalId);                    
        };
      
        const convertedTime = convertMs(deltaTime);
        
        displayTimer(convertedTime);

        refs.startBtn.disabled = true;
      }, INTERVAL_DELAY);
    }    
  },
};

refs.startBtn.setAttribute('disabled', true);

flatpickr("#datetime-picker", options);

function displayTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));  
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
