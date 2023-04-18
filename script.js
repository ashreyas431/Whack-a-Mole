var holesAfterCreation;
const scoreBoard = document.querySelector(".score");

const button = document.querySelector(".start-game");
let lastHole;
let timeUp = false;
let score = 0;
const overlay = document.querySelector('.game-end-overlay');
const value = document.getElementById('holes-input').valueAsNumber;
//create a function to make a random time for mole to pop from the hole

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  //prevent same hole from getting the same number
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function addHoles(value){
  var mainDiv = document.querySelector('.game')
  
  for(var i = 1;i<=value;i++){
    var holeDiv = document.createElement('div')
    var holeAttr = `hole hole${i}`;
    holeDiv.setAttribute("class",holeAttr);
    var moleDiv = document.createElement("div");
    moleDiv.setAttribute("class","mole");
    holeDiv.appendChild(moleDiv);
    mainDiv.appendChild(holeDiv);
  }
  const holes = document.querySelectorAll(".hole");
  holesAfterCreation = holes;
  const moles = document.querySelectorAll(".mole");
  moles.forEach((mole) => mole.addEventListener("click", wack));
}
function peep() {
  const time = randomTime(500, 1000); 
  const hole = randomHole(holesAfterCreation); 
  hole.classList.add("up"); 
  setTimeout(() => {
    hole.classList.remove("up"); 
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame() {
  var mainDiv = document.querySelector('.game')
  mainDiv.innerHTML='';
  const value = document.getElementById('holes-input').valueAsNumber;
  if(!value||value===0||value<0){
    alert("Please enter a valid number")
    return;
  }
  addHoles(value);
  scoreBoard.textContent = 0;
  button.setAttribute("disabled", true);
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    button.removeAttribute("disabled")
  }, 15000); //show random moles for 15 seconds
}

function wack(e) {
  if (!e.isTrusted) return; //** new thing I learned */
  score++;
  this.parentNode.classList.remove("up"); //this refers to item clicked
  scoreBoard.textContent = score;
}

