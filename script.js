// Set the date of your first meeting (e.g., YYYY-MM-DD)
const firstMeetDate = new Date("2021-11-28");

// Check if the year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Days in each month (index corresponds to month number - 1)
function getDaysInMonth(month, year) {
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month];
}

function updateTimeSpent() {
  const now = new Date();

  // Calculate the elapsed time
  let years = now.getFullYear() - firstMeetDate.getFullYear();
  let months = now.getMonth() - firstMeetDate.getMonth();
  let days = now.getDate() - firstMeetDate.getDate();
  let hours = now.getHours() - firstMeetDate.getHours();
  let minutes = now.getMinutes() - firstMeetDate.getMinutes();
  let seconds = now.getSeconds() - firstMeetDate.getSeconds();

  // Adjust for negative values by borrowing from higher units
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

  // Update the flip elements
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

  // Ensure 2-digit format for values like "03" instead of "3"
  const newValueString = newValue.toString().padStart(2, "0");

  // Only update if the value has changed
  if (front.innerText !== newValueString) {
    // Set the back value first
    back.innerText = newValueString;

    // Remove the flip class to reset the animation
    element.classList.remove("flip-active");

    // Trigger the flip animation
    setTimeout(() => {
      element.classList.add("flip-active");
    }, 0);

    // Midway change (halfway through the flip)
    setTimeout(() => {
      front.innerText = newValueString; // Change the front value midway
    }, 350); // 350ms is halfway through the flip animation (0.7s total)
  }
}

// Update the timer every second
setInterval(updateTimeSpent, 1000);