// DOM elements
let timerEl = document.getElementById("timer");
let homeScoreEl = document.getElementById("homeScore");
let guestScoreEl = document.getElementById("guestScore");
let pointsButtons = document.querySelectorAll(".controlButtons button");
let resetButton = document.getElementById("resetBtn");
let homeName = document.getElementById('homeName');
let guestName = document.getElementById('guestName');

homeScoreEl.textContent = "000";
guestScoreEl.textContent = "000";

// variables
let homeScore = 0;
let guestScore = 0;

let minutesLeft = 45;
let secondsLeft = 0;

// add points function
function addpoints(points, team) {
  if (team == "home") {
    homeScore += points;
    homeScoreEl.textContent = homeScore.toString().padStart(3, "0");
  } else if (team == "guest") {
    guestScore += points;
    guestScoreEl.textContent = guestScore.toString().padStart(3, "0");
  }
  highlightLeadingTeam();
}
// highlightLeadingTeam
function highlightLeadingTeam(){
  if (homeScore>guestScore){
    homeName.style.setProperty('color','yellow');
    guestName.style.setProperty('color','inherit');
  }else if(guestScore>homeScore){
    guestName.style.setProperty('color','yellow');
    homeName.style.setProperty('color','inherit');
  }else{
    homeName.style.setProperty('color','inherit');
    guestName.style.setProperty('color','inherit');
  }
}
// reset the game
resetButton.addEventListener("click", () => {
  homeScore = 0;
  guestScore = 0;
  homeScoreEl.textContent = "000";
  guestScoreEl.textContent = "000";
  homeName.style.setProperty('color','inherit');
  guestName.style.setProperty('color','inherit');
  pointsButtons.forEach((button) => {
        button.disabled = false;
      });
resetTimer();
});

// start timer function
let timer;
function startTimer() {
  if (timer) {
    return;
  }
  timer = setInterval(() => {
    if (minutesLeft == 0 && secondsLeft == 0) {
      clearInterval(timer);
      timer = null;
      pointsButtons.forEach((button) => {
        button.disabled = true;
      });
    } else if (secondsLeft <= 0) {
      minutesLeft--;
      secondsLeft = 59;
    } else {
      secondsLeft--;
    }
    timerEl.textContent =
      minutesLeft.toString().padStart(2, "0") +
      ":" +
      secondsLeft.toString().padStart(2, "0");
  }, 1000);
}
// stop timer
function stopTimer() {
  clearInterval(timer);
  timer = null;
}
// reset interval
function resetTimer() {
  stopTimer();
  minutesLeft = 45;
  secondsLeft = 0;
  startTimer();
}

startTimer();