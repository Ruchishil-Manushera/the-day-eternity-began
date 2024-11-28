const firstMeetDate = new Date("2021-11-28");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month];
}

function updateTimeSpent() {
  const now = new Date();

  let years = now.getFullYear() - firstMeetDate.getFullYear();
  let months = now.getMonth() - firstMeetDate.getMonth();
  let days = now.getDate() - firstMeetDate.getDate();
  let hours = now.getHours() - firstMeetDate.getHours();
  let minutes = now.getMinutes() - firstMeetDate.getMinutes();
  let seconds = now.getSeconds() - firstMeetDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    months--;
    const prevMonth = (now.getMonth() - 1 + 12) % 12;
    days += getDaysInMonth(prevMonth, now.getFullYear());
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  updateFlip("years", years);
  updateFlip("months", months);
  updateFlip("days", days);
  updateFlip("hours", hours);
  updateFlip("minutes", minutes);
  updateFlip("seconds", seconds);
}

function updateFlip(id, newValue) {
  const element = document.getElementById(id);
  const front = element.querySelector(".flip-front");
  const back = element.querySelector(".flip-back");

  const newValueString = newValue.toString().padStart(2, "0");

  if (front.innerText !== newValueString) {
    back.innerText = newValueString;
    element.classList.remove("flip-active");
    void element.offsetWidth;
    element.classList.add("flip-active");

    setTimeout(() => {
      front.innerText = newValueString;
    }, 350);
  }
}

// Function to check if the element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Function to handle the scroll event
function revealCardsOnScroll() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (isElementInViewport(card)) {
      card.classList.add('fade-in');
    }
  });
}

// Event listener for scroll
window.addEventListener('scroll', revealCardsOnScroll);

// Call the function once on load in case some cards are already in view
revealCardsOnScroll();


document.addEventListener('DOMContentLoaded', () => {
    let currentPaper = 0;
    const papers = document.querySelectorAll('.paper');
    const totalPapers = papers.length;

    function showNextPaper() {
        papers[currentPaper].style.display = 'none'; // Hide current paper
        currentPaper = (currentPaper + 1) % totalPapers; // Go to next paper
        papers[currentPaper].style.display = 'block'; // Show next paper
    }

    function showPreviousPaper() {
        papers[currentPaper].style.display = 'none'; // Hide current paper
        currentPaper = (currentPaper - 1 + totalPapers) % totalPapers; // Go to previous paper
        papers[currentPaper].style.display = 'block'; // Show previous paper
    }

    document.getElementById('next-btn').addEventListener('click', showNextPaper);
    document.getElementById('prev-btn').addEventListener('click', showPreviousPaper);
});

document.addEventListener('DOMContentLoaded', function() {
document.getElementById("reveal-message").addEventListener("click", function () {
  const decodedMessage = document.getElementById("decoded-message");
  if (decodedMessage.style.display === "none" || !decodedMessage.style.display) {
    decodedMessage.style.display = "block"; // Show decoded message
    this.textContent = "Hide Message"; // Change button text to 'Hide Message'
  } else {
    decodedMessage.style.display = "none"; // Hide decoded message
    this.textContent = "Reveal Message"; // Change button text back to 'Reveal Message'
  }
});
});

setInterval(updateTimeSpent, 1000);
