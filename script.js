const btn = document.getElementById("btn");
const rmBtn = document.getElementById("rmBtn");
const date = document.getElementById("date");
const para = document.getElementById("para");
let audioTimeOut;
let countDownDate;
let interval;
const audio = new Audio("alarm.mp3");

date.addEventListener("change", (e) => {
  countDownDate = new Date(e.target.value).getTime();
});
rmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearTimeout(audioTimeOut);
  audio.pause();
  audio.currentTime = 0;
  clearInterval(interval);
  para.innerHTML = "Timer Stopped";
});

btn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting
  if (countDownDate == null) {
    return (para.innerHTML = "Please Select Date & Time");
  }
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    para.innerHTML =
      days +
      " Days " +
      hours +
      " Hours " +
      minutes +
      " Minutes " +
      seconds +
      " seconds ";

    if (distance < 0) {
      audio.play();
      audioTimeOut = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 8000);
      clearInterval(interval);
      para.innerHTML = "Timer Stopped";
    }
  }, 1000);
});
