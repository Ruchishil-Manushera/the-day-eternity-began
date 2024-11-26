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

  // Display the results
  document.getElementById("days").innerText = "Days: " + days;
  document.getElementById("hours").innerText = "Hours: " + hours;
  document.getElementById("minutes").innerText = "Minutes: " + minutes;
  document.getElementById("seconds").innerText = "Seconds: " + seconds;
}

// Update the time every second
setInterval(updateTimeSpent, 1000);
