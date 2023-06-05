const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");
const resetButton = document.querySelector(".reset-button");
const replayButton = document.querySelector(".replay-button");
const goalTime = document.querySelector(".goal-time");
const goalText = document.querySelector(".goal span");
const resultText = document.querySelector(".result span");
const resultDiv = document.querySelector(".result");
const resultWindow = document.querySelector(".window");
const wrapper = document.querySelector(".wrapper");

let goal = 0;
let mili = 0,
  sec = 0;
let result = 0;
let goalSec = 0;

const setGoal = () => {
  goal = Math.floor(Math.random() * (900 - 100) + 100);
  let goalSec = Math.floor(goal / 100);
  let goalMili = goal % 100;

  goalTime.innerText =
    (goalSec < 10 ? "0" + goalSec : goalSec) +
    " : " +
    (goalMili < 10 ? "0" + goalMili : goalMili);
};

const displayTime = () => {
  mili += 10;
  result++;
  if (mili === 1000) {
    mili = 0;
    sec++;
  }

  let m = mili < 100 ? "0" + mili / 10 : mili / 10;
  let s = sec < 10 ? "0" + sec : sec;
  resultText.innerText = s + " : " + m;
};

const displayResult = () => {
  if (goalSec === sec) {
    wrapper.classList.add("blur");
    resultWindow.classList.remove("window-hidden");
    document.querySelector(".window h2").innerText = "YOU WIN";
  } else {
    wrapper.classList.add("blur");
    resultWindow.classList.remove("window-hidden");
    document.querySelector(".window h2").innerText = "YOU LOSE";
    document.querySelector(".window span").innerText =
      "Time Difference : " + (goal - result) + "ms";
  }
};

startButton.addEventListener("click", () => {
  int = setInterval(displayTime, 10);
});

stopButton.addEventListener("click", () => {
  clearInterval(int);
  startButton.classList.add("hidden");
  resetButton.classList.remove("hidden");
  displayResult();
});

resetButton.addEventListener("click", () => {
  mili = 0;
  sec = 0;
  resultText.innerHTML = "00 : 00";
  resetButton.classList.add("hidden");
  startButton.classList.remove("hidden");
  setGoal();
});

replayButton.addEventListener("click", () => {
  wrapper.classList.remove("blur");
  resultWindow.classList.add("window-hidden");
});

window.onload = () => {
  setGoal();
};
