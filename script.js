function updateFlip(id, newValue) {
  const element = document.getElementById(id);
  const front = element.querySelector(".flip-front");
  const back = element.querySelector(".flip-back");

  // If the value hasn't changed, do nothing
  if (front.innerText === newValue.toString()) return;

  // Update the back value
  back.innerText = newValue;

  // Trigger the flip animation
  element.classList.remove("flip-active"); // Reset the animation
  void element.offsetWidth; // Trigger reflow to restart the animation
  element.classList.add("flip-active");

  // After animation, set the front value
  setTimeout(() => {
    front.innerText = newValue;
  }, 700); // Match animation duration
}
