// Set the date of your first meeting (e.g., YYYY-MM-DD)
const firstMeetDate = new Date("2021-11-28"); // Replace with your actual date

// Function to check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Update the countdown timer
function updateTimeSpent() {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Days in each month
  const daysInMonth = [31, isLeapYear(currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Calculate the difference
  let years = now.getFullYear() - firstMeetDate.getFullYear();
  let months = now.getMonth() - firstMeetDate.getMonth();
  let days = now.getDate() - firstMeetDate.getDate();
  let hours = now.getHours() - firstMeetDate.getHours();
  let minutes = now.getMinutes() - firstMeetDate.getMinutes();
  let seconds = now.getSeconds() - firstMeetDate.getSeconds();

  // Adjust for negative values
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
    days += daysInMonth[(now.getMonth() - 1 + 12) % 12];
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Update the flip elements
  updateFlip("years", years);
  updateFlip("months", months);
  updateFlip("days", days);
  updateFlip("hours", hours);
  updateFlip("minutes", minutes);
  updateFlip("seconds", seconds);
}

// Update flip animation for each element
function updateFlip(id, newValue) {
  const element = document.getElementById(id);
  const front = element.querySelector(".flip-front");
  const back = element.querySelector(".flip-back");

  if (front.innerText !== newValue.toString()) {
    back.innerText = newValue;
    element.classList.remove("flip-active");
    setTimeout(() => {
      element.classList.add("flip-active");
    }, 0);
  }
}

// Update the timer every second
setInterval(updateTimeSpent, 1000);
