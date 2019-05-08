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
      v = require("../lib/version"),
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

  function notice_create(text, duration = 1500)
  {
    var aduration = 125,
        keyframes = 30;

    var dom, textNode;

    textNode = document.createTextNode(text);

    dom = document.createElement("div");
    dom.className = "notice";
    dom.append(textNode);

    dom.setAttribute("style", "visibility: visible; opacity: 0.000; "
        + "position: relative; top: -100%;");
    title.getElementsByClassName("actual")[0].setAttribute("style",
        "visibility: visible; opacity: 1.000; position: relative; top: -100%;");
    title.prepend(dom);

    var inPos = 100,
        inOpacity = 0.000;

    // Animate in
    var animation = setInterval(function()
    {
      if(inPos > -1)
      {
        title.getElementsByClassName("notice")[0].setAttribute("style",
            "visibility: visible; opacity: " + inOpacity
            + "; position: relative; top: -" + inPos + "%;");
        title.getElementsByClassName("actual")[0].setAttribute("style",
            "visibility: visible; opacity: " + (1 - inOpacity) + "; "
            + "position: relative; top: -" + inPos + "%;");
        inPos--;
        inOpacity += 0.010;
      }
      else
      {
        title.getElementsByClassName("notice")[0].removeAttribute("style");

        clearInterval(animation);
      }
    }, ((1 / keyframes) * aduration));

    // Animate out
    setTimeout(function()
    {
      var pos = 0,
          opacity = 0.000;
      var animation = setInterval(function()
      {
        if(pos < 101)
        {
          title.getElementsByClassName("notice")[0].setAttribute("style",
              "visibility: visible; opacity: " + (1 - opacity)
              + "; position: relative; top: -" + pos + "%;");
          title.getElementsByClassName("actual")[0].setAttribute("style",
              "visibility: visible; opacity: " + opacity
              + "; position: relative; top: -" + pos + "%;");
          pos++;
          opacity += 0.010;
        }
        else
        {
          title.getElementsByClassName("notice")[0].removeAttribute("style");
          title.getElementsByClassName("actual")[0].removeAttribute("style");

          title.removeChild(title.getElementsByClassName("notice")[0]);

          clearInterval(animation);
        }
      }, ((1 / keyframes) * aduration));
    }, (duration - 2 * aduration));
  }

  function checkForNotice(date)
  {
    var noticeDisplay = false,
        noticeMessage = "";
    if(date.getMonth() == 4)
    {
      switch(date.getDate())
      {
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          noticeDisplay = true;
          noticeMessage = "Last Full School Week!!!";
          break;

        case 13:
          noticeDisplay = true;
          noticeMessage = "Last School Day!!!";
          break;

        case 16:
          noticeDisplay = true;
          noticeMessage = "Senior BBQ Day";
          break;

        case 17:
          noticeDisplay = true;
          noticeMessage = "Prom Day";
          break;

        case 19:
          noticeDisplay = true;
          noticeMessage = "Happy Graduation Day!!!";
          break;

        default:
          noticeDisplay = false;
          break;
      }

      if(noticeDisplay)
        notice_create(noticeMessage, 2500);
    }
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

      dom_remove_child_all(title.getElementsByClassName("actual")[0]);
      title.getElementsByClassName("actual")[0]
          .append(document.createTextNode("School Days Until Graduation"));

      interval = setInterval(function()
      {
        checkForNotice(lib.getToday());

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

      dom_remove_child_all(title.getElementsByClassName("actual")[0]);
      title.getElementsByClassName("actual")[0]
          .append(document.createTextNode("Days Until Graduation"));

      interval = setInterval(function()
      {
        checkForNotice(lib.getToday());

        dom_remove_child_all(countdown);
        countdown.append(document.createTextNode(lib.daysTillGrad()));
      }, 60000);

      this.classList.remove("calendar-days");
      this.classList.add("school-days");
    }
  }

  // If the nvd parameters is set, display the new version notice dialog
  if(get_params()["nvd"] !== undefined)
  {
    var content,
        contentChildNodes;

    var childNode;

    var contentBody,
        contentBodyA,
        contentPre,
        contentFooter;

    contentChildNodes = [];

    contentBodyA = document.createElement("a");
    contentBodyA.setAttribute("href", "#7254d9e7");
    contentBodyA.append(document.createTextNode("changelog"));

    childNode = document.createElement("div");
    childNode.setAttribute("class", "content-body");
    childNode.append(document.createTextNode("Welcome to a new version of "
        + "daysTillGrad! See "));
    childNode.append(contentBodyA);
    childNode.append(document.createTextNode(" for a list of changes."));
    contentChildNodes.push(childNode);

    childNode = document.createElement("pre");
    childNode.setAttribute("class", "pre");
    childNode.append(document.createTextNode(v.changes.join("\n")));
    contentChildNodes.push(childNode);

    childNode = document.createElement("footer");
    childNode.setAttribute("class", "content-footer");
    childNode.append(document.createTextNode("Click anywhere outside of "
        + "this box to close this notice."));
    contentChildNodes.push(childNode);

    content = document.createElement("div");
    content.setAttribute("class", "content");

    for(var i = 0; i < contentChildNodes.length; i++)
      content.append(contentChildNodes[i]);

    modal_ui_create("New Version", [content]);
    modal_ui_show();
  }

  // Version checker callback
  function version_check(e)
  {
    window.location = "/?nvd=true&utm_source=nvu";
  }

  // Disable the New Version Updater (NVU) if nvu_disable parameter is set
  // to true
  if((get_params()["nvu_disable"] !== undefined
      && get_params()["nvu_disable"] == "false")
      || get_params()["nvu_disable"] === undefined)
  {
    setInterval(function()
    {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", v.host + v.path);
      xhr.send();

      xhr.onload = function()
      {
        if(xhr.status != 200)
          console.log(xhr);
        else
        {
          if(xhr.response != v.getVersion())
            version_check(xhr.response);
        }
      };

      xhr.onerror = function()
      {
        console.log(xhr);
      };
      // v.version_check(v.getVersion(), version_check);
    }, 60000);
  }

  replaceExternalURIs();

  for(var i = 0; i < btn.length; i++)
  {
    btn[i].onclick = btnHandler;
  }

  dom_remove_child_all(version);
  version.append(document.createTextNode(v.getVersion()));

  checkForNotice(lib.getToday());

  dom_remove_child_all(countdown);
  countdown.append(document.createTextNode(lib.daysTillGrad()));

  interval = setInterval(function()
  {
    checkForNotice(lib.getToday());

    dom_remove_child_all(countdown);

    countdown.append(document.createTextNode(lib.daysTillGrad()));
  }, 60000);
}

window.onload = onload;
