// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// File Name: src/lib/external-uris.js
// Description: External URIs generation and replacement library
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const version = require("./version.js");

// Configure these IDs appropriately
const indices =
{
  feedbackID: "f0901632",
  roadmapID: "8bf28652",
  sourceCodeID: "0bfa10cb"
};

// Base URIs and full URIs
const feedbackBaseURI = "https://docs.google.com/forms/d/e/1FAIpQLSc4kPVGTqI6of"
                      + "-RN_nG47DUjBJ2xLNiSUNnEaDA4XfrwyagZQ/viewform",
      roadmapURI = "https://trello.com/b/tuJq1oq0",
      sourceCodeURI = "https://github.com/ghifari160/daystillgrad";

// Base parameters for the feedback Google Form
const feedbackBaseParams = [];
feedbackBaseParams["usp"] = "pp_url";

// Input parameters for the feedback Google Form
var feedbackParams = [],
    temp;

temp = encodeURI(version.getVersion());
temp = temp.replace(/\+/g, "%2B");
feedbackParams["entry.1346003266"] = temp;

function __generate_paramKV(paramsAssoc)
{
  var paramsKVPair,
      keys;

  keys = Object.keys(paramsAssoc);
  for(var i = 0; i < keys.length; i++)
  {
    paramsKVPair = [];
    paramsKVPair.push(keys[i], paramsAssoc[keys[i]]);
  }

  return paramsKVPair;
}

function __feedback_generate_params()
{
  var paramsFull,
      paramsKVPair,
      keys;

  paramsFull = [];

  paramsFull.push(__generate_paramKV(feedbackBaseParams).join("="));
  paramsFull.push(__generate_paramKV(feedbackParams).join("="));

  return paramsFull;
}

function feedback_generate_uri()
{
  return feedbackBaseURI + "?" + __feedback_generate_params().join("&");
}

function roadmap_generate_uri()
{
  return roadmapURI;
}

function sourceCode_generate_uri()
{
  return sourceCodeURI;
}

module.exports = {
  indices: indices,
  feedback_generate_uri: feedback_generate_uri,
  roadmap_generate_uri: roadmap_generate_uri,
  sourceCode_generate_uri: sourceCode_generate_uri
};
