const decks = {
  java: [
    { question: "What is a class in Java?", answer: "A blueprint for creating objects, defining properties and methods." },
    { question: "What is inheritance?", answer: "Mechanism where one class acquires properties of another." },
    { question: "What is polymorphism?", answer: "Ability of an object to take many forms." },
    { question: "What is encapsulation?", answer: "Wrapping data and methods into a single unit (class)." },
    { question: "What is abstraction?", answer: "Hiding internal details and showing only essential features." },
    { question: "What is method overloading?", answer: "Defining multiple methods with the same name but different parameters." }

  ],
  dsa: [
    { question: "What is a stack?", answer: "A linear data structure following LIFO (Last In First Out)." },
    { question: "What is a queue?", answer: "A linear data structure following FIFO (First In First Out)." },
    { question: "What is binary search?", answer: "Searching algorithm that divides array in halves to find target." },
    { question: "What is a linked list?", answer: "A linear data structure where elements point to the next node." },
    { question: "What is a tree?", answer: "A non-linear data structure with a root node and child nodes." },
    { question: "What is a graph?", answer: "A collection of nodes connected by edges representing relationships." }
  ],
  DBMS: [
    { question: "What is normalization?", answer: "Process to reduce data redundancy in databases." },
    { question: "Define primary key.", answer: "Unique identifier for a database record." },
    { question: "What is SQL?", answer: "Structured Query Language for managing databases." },
    { question: "What is a foreign key?", answer: "A key used to link two tables together." },
    { question: "What is ACID property?", answer: "Atomicity, Consistency, Isolation, Durability – properties of transactions." },
    { question: "What is a join in SQL?", answer: "A way to combine rows from two or more tables." }
  ],
  SE: [
    { question: "What is Agile methodology?", answer: "Iterative approach to software development." },
    { question: "What is a use case?", answer: "Description of system behavior from user's perspective." },
    { question: "What is version control?", answer: "System for managing changes to code and documents." },
    { question: "What is software testing?", answer: "Process to check software functionality and detect bugs." },
    { question: "What is the SDLC?", answer: "Software Development Life Cycle — the process of building software." },
    { question: "What is a requirement specification?", answer: "Detailed documentation of system functionality and constraints." }
  ]
};

const flashcardsContainer = document.getElementById('flashcards-container');
const deckSelector = document.getElementById('deckSelector');
const resultsDiv = document.getElementById('results');

let knowCount = 0;
let dontKnowCount = 0;

deckSelector.addEventListener('change', () => {
  knowCount = 0;
  dontKnowCount = 0;
  resultsDiv.textContent = '';
  loadDeck(deckSelector.value);
});

function loadDeck(deckName) {
  flashcardsContainer.innerHTML = '';

  if (!decks[deckName]) {
    flashcardsContainer.innerHTML = '<p>Please select a valid deck.</p>';
    return;
  }

  decks[deckName].forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('flashcard');
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${card.question}</div>
        <div class="card-back">
          <div class="answer-text">${card.answer}</div>
          <div class="card-buttons">
            <button class="btn-know">Know</button>
            <button class="btn-dontknow">Don't Know</button>
          </div>
        </div>
      </div>
    `;

    cardElement.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        cardElement.classList.toggle('flipped');
      }
    });

    cardElement.querySelector('.btn-know').addEventListener('click', (e) => {
      e.stopPropagation();
      knowCount++;
      cardElement.style.opacity = '0.5';
      cardElement.style.pointerEvents = 'none';
      checkIfDone(deckName);
    });

    cardElement.querySelector('.btn-dontknow').addEventListener('click', (e) => {
      e.stopPropagation();
      dontKnowCount++;
      cardElement.style.opacity = '0.5';
      cardElement.style.pointerEvents = 'none';
      checkIfDone(deckName);
    });

    flashcardsContainer.appendChild(cardElement);
  });
}

function checkIfDone(deckName) {
  const cards = flashcardsContainer.querySelectorAll('.flashcard');
  const answeredCards = [...cards].filter(c => c.style.pointerEvents === 'none');

  if (answeredCards.length === decks[deckName].length) {
    resultsDiv.textContent = `Results: Know = ${knowCount}, Don't Know = ${dontKnowCount}`;
  }
}

const changingPart = document.getElementById("changing-part");
const loader = document.getElementById("loader-screen");

const words = ["Snap", "Boost", "Hive", "Nest", "Hub", "Core", "Pod", "Zone", "Stack"];
let shuffleInterval;
let currentIndex = 0;

function shuffleWords() {
  changingPart.textContent = words[currentIndex];
  currentIndex = (currentIndex + 1) % words.length;
}

window.addEventListener("load", () => {
  let totalDuration = 2500;
  let intervalSpeed = 100;

  shuffleInterval = setInterval(shuffleWords, intervalSpeed);

  setTimeout(() => {
    clearInterval(shuffleInterval);
    changingPart.textContent = "Stack";

    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 1000);
  }, totalDuration);
});
