// Set the date of your first meeting (e.g., YYYY-MM-DD)
const firstMeetDate = new Date("2021-11-28"); // Replace with your actual date

function updateTimeSpent() {
  const now = new Date();
  
  // Calculate the difference between today and the first meeting date
  let years = now.getFullYear() - firstMeetDate.getFullYear();
  let months = now.getMonth() - firstMeetDate.getMonth();
  let days = now.getDate() - firstMeetDate.getDate();

  // Handle negative days calculation by adjusting months and days
  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
    days += prevMonth.getDate(); // Get the correct number of days in the previous month
  }

  // Handle negative months calculation by adjusting years and months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Update the flip timer
  updateFlip("years", years);
  updateFlip("months", months);
  updateFlip("days", days);
}

function updateFlip(id, newValue) {
  const element = document.getElementById(id);
  const front = element.querySelector(".flip-front");
  const back = element.querySelector(".flip-back");

  // Only update if the value is different
  if (front.innerText !== newValue.toString()) {
    back.innerText = newValue;
    // Trigger the flip animation by adding/removing the class
    element.classList.remove("flip");
    setTimeout(() => {
      element.classList.add("flip");
    }, 0);
  }
}

// Update the time every day, but for animation, we are updating every second
setInterval(updateTimeSpent, 1000);
