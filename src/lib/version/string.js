// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// Version Library
// Unified version-related functions
//
// File Name: src/lib/version/string.js
// Description: Version library string functions
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const version = require("./params.js").version;

function __cleanupArray(array)
{
  var ret = [];

  if(array.length < 1)
    return null;

  for(var i = 0; i < array.length; i++)
  {
    if(array[i] !== "" && typeof array[i] == "string")
      ret.push(array[i].replace(/\s/g, ""));
    else if(array[i] !== "")
      ret.push(array[i]);
  }

  return ret;
}

function getPreRelease()
{
  var ret = __cleanupArray(version.prerelease);

  if(ret != null)
    return ret.join(".");

  return null;
}

function getMeta()
{
  var ret = __cleanupArray(version.meta);

  if(ret != null)
    return ret.join(".");

  return null;
}

function getVersion()
{
  var ret = "v" + version.major + "." + version.minor + "." + version.patch;
  ret += (getPreRelease() != null) ? "-" + getPreRelease() : "";
  ret += (getMeta() != null) ? "+" + getMeta() : "";

  return ret;
}

module.exports =
{
  getPreRelease: getPreRelease,
  getMeta: getMeta,
  getVersion: getVersion
};
