const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
function flipCard() {
  //prevent any card flipping before the cards are hidden or match
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}
function checkForMatch() {
  let isMatch = firstCard.dataset.type === secondCard.dataset.type;
  isMatch ? disableCards() : unFlipCards();
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
function unFlipCards() {
  //When the player clicks the second card, lockBoard will be set to true
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}
function resetBoard() {
  //The firstCard and secondCard variables need to be reset after each round
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function shuffle() {
  cards.forEach((card) => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos;
  });
})();
cards.forEach((card) => card.addEventListener("click", flipCard));
