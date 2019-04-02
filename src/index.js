import "./styles/style.scss";

const lib = require("./lib.js");

function onload()
{
  var wrapper = document.getElementsByClassName("wrapper")[0];
  var countdownBox = wrapper.getElementsByClassName("countdown-box")[0];
  var countdown = countdownBox.getElementsByClassName("countdown")[0];

  countdown.innerHTML = lib.daysTillGrad();
  setInterval(function()
  {
    countdown.innerHTML = lib.daysTillGrad();
  }, 60000);
}

window.onload = onload;
