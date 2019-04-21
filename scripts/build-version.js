// daysTillGrad
// A countdown until graduation for Maine West High School Class of 2019
//
// File Name: scripts/build-version.js
// Description: Build script for updating the version in package.json to match
// the specified values in the app versioning library (src/lib/version.js)
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const fs = require("fs"),
      version = require("../src/lib/version.js");

console.log("Updating package.json...");

var packageStr,
    packageJSON;

packageStr = fs.readFileSync("package.json", "utf8");
packageJSON = JSON.parse(packageStr);

packageJSON.version = version.getVersion();

fs.writeFileSync("package.json", JSON.stringify(packageJSON, null, 2) + "\n",
    "utf8");

console.log("Done!");
