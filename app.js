// Create a list that holds all of your cards
let cards = [
  'Blue',
  'Yellow',
  'Green',
  'Orange',
  'Indigo',
  'Violet',
  'Red',
  'Hi!',
];
const matches = {
  0: 'Peace',
  1: 'Happiness',
  2: 'Love',
  3: 'Purity',
  4: 'Knowledge',
  5: 'Bliss',
  6: 'Power',
  7: '👋🏻',
};

cards = cards.concat(cards);

//creating an array to check the opneing of cards
let opened = [];

let counter = 0;

let moves = 0;

let stars = document.getElementsByClassName('fa fa-star');
console.log(stars);
let rating = 3;

let shuffledCards;

let hasTheTimerStarted = false;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Creation of cards dyanamically
function createCards() {
  //Storing the function in a var
  let shuffledCards = shuffle(cards);

  /*Accessing each card using for each loop $ item is the array element i.e its the classname*/
  shuffledCards.forEach(function (item) {
    /*Here we are creating li element and appending it to the ul and assiging the card name as a class name to the icon tag*/
    $('ul.deck').append(
      `<li class='card ${item}'><small class="${item}">${item}</small></li>`
    );
  });
}

//Calling creating cards fuction will create cards dyanamically
createCards();

//Selecting every ele with card class nd binding a click event to each card
$('.card').click(function () {
  //Selcting current ele being clicked
  openCards($(this));
  console.log(this);
});

// Creating a function to open cards
function openCards(card) {
  /*checking if any card is opened or not if nothing is opened*/
  if (opened.length === 0) {
    //push a card into array
    opened.push(card);

    //open the card
    card.toggleClass('open show animated headShake');

    //Calling timer
    if (!hasTheTimerStarted) {
      timer();
      hasTheTimerStarted = true;
    }
  }
  //if one card has already been pushed
  else if (opened.length === 1 && opened[0][0] !== card[0]) {
    //push that card in array
    opened.push(card);

    //open that card
    card.toggleClass('open show animated headShake');

    //a card will open
    timeOut = setTimeout(checkMatch, 500);
  }
}

/*creating a function to check whether the cards matched or not
when we have two opened cards in an array
*/
function checkMatch() {
  //an array to keep the track of opened cards
  let open = opened;

  open[0].toggleClass('disable');
  moveCounter();

  /*will check the matching of cards using same class name
  open[0][0]means first opned card at index 0
  open[1][0]means second opned card at index 0 
  we are seleting classname of icon tag
  */
  if (
    open[0][0].firstChild.className === open[1][0].firstChild.className &&
    open[0][0] !== open[1][0]
  ) {
    //matching cards
    open[0].toggleClass('match tada');
    open[1].toggleClass('match tada');

    //to stop click event on the opened cards
    open[0].css('pointer-events', 'none');
    open[1].css('pointer-events', 'none');

    //clear the array for next two cards
    opened = [];
    timeOut2 = setTimeout(matchCounter, 1000);
  } else if (opened.length === 1 && opened[0][0] !== card[0]) {
    opened.toggleClass('disable');
  } else {
    open[0].toggleClass('notMatch');
    open[1].toggleClass('notMatch');
    opened = [];
    setTimeout(function () {
      open[0].toggleClass('open show animated notMatch headShake');
      open[1].toggleClass('open show animated notMatch headShake');
    }, 300);
  }
}

/*creating a counter to check all for all the opened cards
if all the 8 pair matches then create an alert  
*/
function matchCounter() {
  counter++;
  if (counter === 8) {
    shouldTimerTick = false;
    openWinModal();
  }
}

//counting the no of moves
function moveCounter() {
  moves++;

  //accessing moves from span ele n changing the content means counting the moves
  $('.moves').html(moves);
  checkStars();
}

function checkStars() {
  if (moves > 10 && moves < 19) {
    stars[2].style.display = 'none';
    rating = 2;
  } else if (moves >= 20) {
    stars[1].style.display = 'none';
    rating = 1;
  }
}

function openWinModal() {
  const move = document.querySelector('.moves').innerText;

  if (move > 10 && move < 19) {
    stars[2].style.display = 'none';
    rating = 2;
  } else if (moves >= 20) {
    stars[1].style.display = 'none';
    rating = 1;
  }
  const times = document.querySelector('#timer').innerText;
  $('.modal-body').html(
    `You completed the game in ${times} . <br></br> You used ${move} moves. <br></br> You get ${rating} stars.`
  );

  document.querySelector('.reset').addEventListener('click', reset);
  $('#myModal').modal('show');
}

function reset() {
  $('.deck').html('');
  opened = [];
  counter = 0;
  moves = -1;
  rating = 3;
  moveCounter();
  shuffledCards = [];
  createCards();
  hasTheTimerStarted = false;
  shouldTimerTick = false;
  t.textContent = '00 mins : 00 secs';
  seconds = 0;
  minutes = 0;
  $('.card').click(function () {
    openCards($(this));
  });
  stars[1].style.display = 'block';
  stars[2].style.display = 'block';
  $('#myModal').css('display', 'none');
}

$('.restart').click(function () {
  reset();
});

//Timer
let shouldTimerTick;
let t = document.getElementById('timer'),
  seconds = 0,
  minutes = 0;

function timer() {
  let time;
  shouldTimerTick = true;

  time = setInterval(function () {
    if (shouldTimerTick) {
      (function add() {
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }

        t.textContent =
          (minutes
            ? minutes > 9
              ? minutes + ' mins'
              : '0' + minutes + ' mins'
            : '00 mins') +
          ' : ' +
          (seconds > 9 ? seconds + ' secs' : '0' + seconds + ' secs');
      })();
    } else {
      clearInterval(time);
    }
  }, 1000);
}

reset();

// Replace second occurrence of letters with numbers
function replaceSecondOccurrence() {
  const cards = document.querySelectorAll('.card');
  const cardArray = Array.from(cards);
  console.log(cardArray);
  const cardA = cardArray.filter((card) => {
    return card.classList.contains('Blue');
  });
  const cardB = cardArray.filter((card) => {
    return card.classList.contains('Yellow');
  });
  const cardC = cardArray.filter((card) => {
    return card.classList.contains('Green');
  });
  const cardD = cardArray.filter((card) => {
    return card.classList.contains('Orange');
  });
  const cardE = cardArray.filter((card) => {
    return card.classList.contains('Indigo');
  });
  const cardF = cardArray.filter((card) => {
    return card.classList.contains('Violet');
  });
  const cardG = cardArray.filter((card) => {
    return card.classList.contains('Red');
  });
  const cardH = cardArray.filter((card) => {
    return card.classList.contains('Hi!');
  });

  const newCards = [cardA, cardB, cardC, cardD, cardE, cardF, cardG, cardH];

  newCards.forEach((arr, index) => {
    arr[1].innerHTML = `<small class=${arr[0].classList[1]}>${matches[index]}</small>`;
  });
}

replaceSecondOccurrence();

// close game on click of close button
$('.close-game').click(function () {
  $('#myModal').css('display', 'none');
});
