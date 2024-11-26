

const firstMeet = new Date("2023-01-01"); // Replace with your date
setInterval(() => {
  const now = new Date();
  const diff = Math.floor((now - firstMeet) / (1000 * 60 * 60 * 24));
  document.getElementById("daysCounter").innerText = `Days Together: ${diff}`;
}, 1000);