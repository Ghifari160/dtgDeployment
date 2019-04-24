// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// Version Library
// Unified version-related functions
//
// File Name: src/lib/version/index.js
// Description: Version library entry
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const params = require("./params.js"),
      string = require("./string.js"),
      checker = require("./checker.js");

var exportsParams = {...params.version, ...params.version_checker};

var exports = {...exportsParams, ...string, ...checker};

module.exports = exports;
