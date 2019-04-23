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

  function dom_remove_child_all(dom)
  {
    while(dom.firstChild)
      dom.removeChild(dom.firstChild);
  }

  function get_params()
  {
    var paramsStr = window.location.search.substring(1),
        paramsArr = paramsStr.split("&"),
        params = [];

    for(var i = 0; i < paramsArr.length; i++)
    {
      var paramsKV = paramsArr[i].split("=");

      params[paramsKV[0]] = paramsKV[1];
    }

    return params;
  }

  function modal_ui_show()
  {
    var modal = document.getElementsByClassName("modal")[0],
        modalWrapper = document.getElementsByClassName("modal-wrapper")[0];

    modal.style.display = "block";
    modalWrapper.style.display = "block";
  }

  function modal_ui_hide()
  {
    var modal = document.getElementsByClassName("modal"),
        modalWrapper = document.getElementsByClassName("modal-wrapper");

    if(modal.length > 0)
      modal[0].removeAttribute("style");

    if(modalWrapper.length > 0)
      modalWrapper[0].removeAttribute("style");
  }

  function modal_ui_create(title, contentDomArr)
  {
    var modal = document.getElementsByClassName("modal"),
        modalWrapper = document.getElementsByClassName("modal-wrapper"),
        titleDom = document.createElement("div"),
        titleText = document.createTextNode(title);

    if(modal.length < 1)
    {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.onclick = modal_ui_hide;

      body.prepend(modal);
    }
    else
      modal = modal[0];

    if(modalWrapper.length < 1)
    {
      modalWrapper = document.createElement("div");
      modalWrapper.className = "modal-wrapper";

      body.prepend(modalWrapper);
    }
    else
    {
      modalWrapper = modalWrapper[0];

      dom_remove_child_all(modalWrapper);
    }

    titleDom.className = "title";
    titleDom.append(titleText);

    modalWrapper.append(titleDom);

    for(var i = 0; i < contentDomArr.length; i++)
      modalWrapper.append(contentDomArr[i]);
  }

  function replaceExternalURIs()
  {
    var aNodes = document.getElementsByTagName("a");

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

            case "issueTrackerID":
              uri = eURIs.issueTracker_generate_uri();
              break;

            case "roadmapID":
              uri = eURIs.roadmap_generate_uri();
              break;

            case "sourceCodeID":
              uri = eURIs.sourceCode_generate_uri();
              break;

            default:
              uri = "#" + id;
          }

          aNodes[i].setAttribute("href", uri);
        }
        else if(id == "#" + "7254d9e7")
        {
          aNodes[i].onclick = function(e)
          {
            e.preventDefault();

            var pre = document.createElement("div"),
                preText = document.createTextNode(changelog);

            pre.className = "pre";
            pre.append(preText);

            modal_ui_create("Changelog", [pre]);

            modal_ui_show();

            return false;
          }
        }
      }
    }
  }

  function btnHandler()
  {
    if(this.classList.contains("school-days"))
    {
      clearInterval(interval);

      dom_remove_child_all(countdown);
      countdown.append(document.createTextNode(lib.schoolDaysTillGrad()));

      dom_remove_child_all(title);
      title.append(document.createTextNode("School Days Until Graduation"));

      interval = setInterval(function()
      {
        dom_remove_child_all(countdown);
        countdown.append(document.createTextNode(lib.schoolDaysTillGrad()));
      }, 60000);

      this.classList.remove("school-days");
      this.classList.add("calendar-days");
    }
    else if(this.classList.contains("calendar-days"))
    {
      clearInterval(interval);

      dom_remove_child_all(countdown);
      countdown.append(document.createTextNode(lib.daysTillGrad()));

      dom_remove_child_all(title);
      title.append(document.createTextNode("Days Until Graduation"));

      interval = setInterval(function()
      {
        dom_remove_child_all(countdown);
        countdown.append(document.createTextNode(lib.daysTillGrad()));
      }, 60000);

      this.classList.remove("calendar-days");
      this.classList.add("school-days");
    }
  }

  if(get_params()["nvd"] !== undefined)
  {
    var content,
        contentChildNodes;

    var contentBody,
        contentBodyA,
        contentPre,
        contentFooter;

    contentChildNodes = [];

    contentBodyA = document.createElement("a");
    contentBodyA.setAttribute("href", "#7254d9e7");
    contentBodyA.append(document.createTextNode("changelog"));

    contentBody = document.createElement("div");
    contentBody.setAttribute("class", "content-body");
    contentBody.append(document.createTextNode("Welcome to a new version of "
        + "daysTillGrad! See "));
    contentBody.append(contentBodyA);
    contentBody.append(document.createTextNode(" for a list of changes."));
    contentChildNodes.push(contentBody);

    contentPre = document.createElement("pre");
    contentPre.setAttribute("class", "pre");
    contentPre.append(document.createTextNode(v.changes.join("\n")));
    contentChildNodes.push(contentPre);

    contentFooter = document.createElement("footer");
    contentFooter.setAttribute("class", "content-footer");
    contentFooter.append(document.createTextNode("Click anywhere outside of "
        + "this box to close this notice."));
    contentChildNodes.push(contentFooter);

    content = document.createElement("div");
    content.setAttribute("class", "content");

    for(var i = 0; i < contentChildNodes.length; i++)
      content.append(contentChildNodes[i]);

    modal_ui_create("New Version", [content]);
    modal_ui_show();
  }

  replaceExternalURIs();

  for(var i = 0; i < btn.length; i++)
  {
    btn[i].onclick = btnHandler;
  }

  dom_remove_child_all(version);
  version.append(document.createTextNode(v.getVersion()));

  dom_remove_child_all(countdown);
  countdown.append(document.createTextNode(lib.daysTillGrad()));

  interval = setInterval(function()
  {
    dom_remove_child_all(countdown);

    countdown.append(document.createTextNode(lib.daysTillGrad()));
  }, 60000);
}

window.onload = onload;
