// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// File Name: src/js/index.js
// Description: Web app script
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

import "../styles/style.scss";
import changelog from "../../CHANGELOG";

const util = require("util");

const lib = require("../lib/lib.js"),
      v = require("../lib/version.js"),
      eURIs = require("../lib/external-uris.js");

function replaceExternalURIs()
{
  var body = document.getElementsByTagName("body")[0];
  var wrapper = document.getElementsByClassName("wrapper")[0];
  var countdownBox = wrapper.getElementsByClassName("countdown-box")[0];
  var footer = countdownBox.getElementsByClassName("footer")[0];
  var links = footer.getElementsByClassName("links")[0];
  var aNodes = links.getElementsByTagName("a");

  for(var i = 0; i < aNodes.length; i++)
  {
    var uri,
        id = aNodes[i].getAttribute("href");

    var keys = Object.keys(eURIs.indices);
    for(var j = 0; j < keys.length; j++)
    {
      if(id == "#" + eURIs.indices[keys[j]])
      {
        switch(keys[j])
        {
          case "feedbackID":
            uri = eURIs.feedback_generate_uri();
            break;

          case "roadmapID":
            uri = eURIs.roadmap_generate_uri();
            break;

          case "sourceCodeID":
            uri = eURIs.sourceCode_generate_uri();
            break;
        }

        aNodes[i].setAttribute("href", uri);
      }
      else if(id == "#" + "7254d9e7")
      {
        aNodes[i].onclick = function(e)
        {
          e.preventDefault();

          var modal = document.createElement("div");
          var modalWrapper = document.createElement("div");
          var title = document.createElement("div"),
              titleText = document.createTextNode("Changelog");
          var pre = document.createElement("div"),
              preText = document.createTextNode(changelog);

          pre.className = "pre";
          pre.append(preText);

          title.className = "title";
          title.append(titleText);

          modalWrapper.className = "modal-wrapper";
          modalWrapper.append(title);
          modalWrapper.append(pre);

          modal.className = "modal";

          body.prepend(modal);
          body.prepend(modalWrapper);

          modal.onclick = function(e)
          {
            e.preventDefault();

            modal.style.display = "none";
            modalWrapper.style.display = "none";

            modal.parentNode.removeChild(modal);
            modalWrapper.parentNode.removeChild(modalWrapper);

            return false;
          }

          modal.style.display = "block";
          modalWrapper.style.display = "block";

          return false;
        }
      }
    }
  }
}

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

  replaceExternalURIs();

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
