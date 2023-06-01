//Random Quotes API

const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
const userInputBox = document.querySelector("#quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//display random quotes

const renderNewQuote = async () => {
  //fetch content fron quote api
  // fetches then adds to the quote

  const response = await fetch(quoteApiUrl);

  let data = await response.json();

  quote = data.content;

  //array of chars in quote

  let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "</span>";
  });

  quoteSection.innerHTML += arr.join("");
};

//logic to compare input words with quote

userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);

  //array of use input chars

  let userInputChars = userInput.value.split("");
  //loop through each char in quote

  quoteChars.forEach((char, index) => {
    //check chars with quote chars
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    } else if (userInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    //if user entered wrong char
    else {
      if (!char.classList.contains("fail")) {
        //increment and displaying mistakes
        mistakes++;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }

    //Return true if all chars are correct
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });

    //end test if all chars are correct
    if (check) {
      displayResult();
    }
  });
});

//update timer
const updateTimer = () => {
  if (time === 0) {
    displayResult();
  } else {
    if (time < 21 && time > 0) {
      document.querySelector("#timer").classList.add("hurry");
      document.getElementById("timer").innerText = --time;
    } else {
      document.getElementById("timer").innerText = --time;
    }
  }
};

//set timer

const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
  //display result div
  document.getElementById("reload").style.display = "none";
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = "true";
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + "%";
  //when the games ends and shows the result, it will show reload button
  document.getElementById("reload").style.display = "block";
};

const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  //as user clicks the 'start' button it will give focus to the textarea
  userInput.focus();
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("reload").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  userInputBox.classList.remove("success-box");
  userInputBox.classList.remove("fail-box");
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  document.getElementById("reload").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};

const reload = () => {
  userInput.value = "";
  //quotes need to be deleted
  quoteSection.innerHTML = "<span></span>";
  document.querySelector("#timer").classList.remove("hurry");
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  document.getElementById("reload").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
