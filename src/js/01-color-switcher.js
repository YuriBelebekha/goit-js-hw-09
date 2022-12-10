const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onClickStartChangeBodyColor);
refs.stopBtn.setAttribute("disabled", true);
refs.stopBtn.addEventListener('click', onClickStopChangeBodyColor);

function onClickStartChangeBodyColor() {  
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
  refs.startBtn.setAttribute("disabled", true);
  refs.stopBtn.disabled = false;
};

function onClickStopChangeBodyColor() {
  clearInterval(timerId);

  refs.startBtn.disabled = false;
  refs.stopBtn.setAttribute("disabled", true);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};