import "../styles/style.scss";

const lib = require("../lib/lib.js"),
      v = require("../lib/version.js");

function onload()
{
  var wrapper = document.getElementsByClassName("wrapper")[0];
  var countdownBox = wrapper.getElementsByClassName("countdown-box")[0];
  var countdown = countdownBox.getElementsByClassName("countdown")[0];
  var footer = countdownBox.getElementsByClassName("footer")[0];
  var version = footer.getElementsByClassName("version")[0];

  version.innerHTML = v.getVersion();

  countdown.innerHTML = lib.daysTillGrad();
  setInterval(function()
  {
    countdown.innerHTML = lib.daysTillGrad();
  }, 60000);
}

window.onload = onload;
