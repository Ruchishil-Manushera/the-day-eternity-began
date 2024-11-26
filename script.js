// Set the date of your first meeting (e.g., YYYY-MM-DD)
const firstMeetDate = new Date("2021-11-28"); // Replace with your actual date

function updateTimeSpent() {
  const now = new Date();
  const diff = now - firstMeetDate;

  // Calculate the difference in days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Days
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
  const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Seconds

  // Update the display and trigger flip animation
  updateFlip("days", days);
  updateFlip("hours", hours);
  updateFlip("minutes", minutes);
  updateFlip("seconds", seconds);
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

// Update the time every second
setInterval(updateTimeSpent, 1000);
