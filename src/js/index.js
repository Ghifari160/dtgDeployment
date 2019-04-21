// daysTillGrad
// A countdown until graduation for Maine West High School Class of 2019
//
// File Name: src/js/index.js
// Description: Web app script
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

import "../styles/style.scss";

const util = require("util");

const lib = require("../lib/lib.js"),
      v = require("../lib/version.js");

function onload()
{
  var body = document.getElementsByTagName("body")[0];
  var wrapper = document.getElementsByClassName("wrapper")[0];
  var countdownBox = wrapper.getElementsByClassName("countdown-box")[0];
  var title = countdownBox.getElementsByClassName("title")[0];
  var countdown = countdownBox.getElementsByClassName("countdown")[0];
  var footer = countdownBox.getElementsByClassName("footer")[0];
  var buttons = countdownBox.getElementsByClassName("buttons")[0];
  var btn = countdownBox.getElementsByClassName("btn");
  var version = footer.getElementsByClassName("version")[0];

  var interval;

  function btnHandler()
  {
    if(this.classList.contains("school-days"))
    {
      clearInterval(interval);

      countdown.innerHTML = lib.schoolDaysTillGrad();
      title.innerHTML = "School Days Until Graduation";

      interval = setInterval(function()
      {
        countdown.innerHTML = lib.schoolDaysTillGrad();
      }, 60000);

      this.classList.remove("school-days");
      this.classList.add("calendar-days");
    }
    else if(this.classList.contains("calendar-days"))
    {
      clearInterval(interval);

      countdown.innerHTML = lib.daysTillGrad();
      title.innerHTML = "Days Until Graduation";

      interval = setInterval(function()
      {
        countdown.innerHTML = lib.daysTillGrad();
      }, 60000);

      this.classList.remove("calendar-days");
      this.classList.add("school-days");
    }
  }

  for(var i = 0; i < btn.length; i++)
  {
    btn[i].onclick = btnHandler;
  }

  version.innerHTML = v.getVersion();

  countdown.innerHTML = lib.daysTillGrad();
  interval = setInterval(function()
  {
    countdown.innerHTML = lib.daysTillGrad();
  }, 60000);
}

window.onload = onload;
