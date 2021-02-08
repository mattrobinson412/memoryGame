const gameContainer = document.getElementById("game");

let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let noClick = false;

let startButton = document.querySelector('button');
let clicks = 0;

let restartButton = document.querySelectorAll('button')[1];

let scoreCounter = 0;
let scoreButton = document.querySelectorAll('div')[2];

let bestScoreButton = document.querySelectorAll('div')[0];
let bestScore = 46;

let yourBestScoreButton = document.querySelectorAll('div')[1];
let yourBestScore = 100;

localStorage.setItem('scores', scoreCounter.value);
localStorage.setItem('bestscore', bestScoreButton.innerHTML);

let currentBestScore = localStorage.getItem('bestscore');
let yourCurrentBestStore = localStorage.getItem('yourBestScore');

bestScoreButton.innerHTML = currentBestScore;
yourBestScoreButton.innerHTML = yourCurrentBestStore;



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "black",
  "tan",
  "gray",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "black",
  "tan",
  "gray"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  console.log(event.target);

  
  
  scoreCounter++;
  scoreButton.innerHTML = `YOUR SCORE: ${scoreCounter}`;
  

  if (noClick) {
    return;
  } if (event.target.classList.contains('flipped')) {
    return;
  } 

  let specificCard = event.target;
  specificCard.style.backgroundColor = specificCard.classList[0];

if (!firstCard || !secondCard) {
  specificCard.classList.add('flipped');
  firstCard = firstCard || specificCard;
  secondCard = specificCard === firstCard ? null : specificCard;
};

if (firstCard && secondCard) {
  noClick = true;
  
  let gif1 = firstCard.className;
  let gif2 = secondCard.className;

  if (gif1 === gif2) {
    flippedCards += 2;
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard = null;
    secondCard = null;
    noClick = false;
  } else {
    setTimeout(function() {
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      noClick = false;
    }, 1000);
  }
}

if (flippedCards === COLORS.length) {
  
  if (scoreCounter < yourBestScore) {
    yourBestScoreButton.innerHTML = `YOUR BEST SCORE: ${scoreCounter}`;
    localStorage.setItem('yourBestScore', yourBestScoreButton.innerHTML);
  }
  if (scoreCounter < bestScore) {
    bestScoreButton.innerHTML = `BEST SCORE: ${scoreCounter}`;
  };
  localStorage.setItem('scores', scoreCounter.value);
  localStorage.setItem('bestscore', bestScoreButton.innerHTML);
  setTimeout(5000, function() {
    alert("Game Over!");
  })   
  
};


}





// when the DOM loads


startButton.addEventListener('click', function def(e) {
  
  clicks++;
  createDivsForColors(shuffledColors);
  if (clicks >= 1) {
    startButton.removeEventListener('click', def);
  }
})

// postgame stuff


restartButton.addEventListener('click', function def(e) {
  clicks++;
  if (clicks >= 1) {
    restartButton.removeEventListener('click', def);
    location.reload();
  }
})










