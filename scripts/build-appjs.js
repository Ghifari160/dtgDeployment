// daysTillGrad
// A countdown until graduation for Maine West High School Class of 2019
//
// File Name: scripts/build-appjs.js
// Description: Build script for prepending the source code copyright and
// license declaration headers to docs/app.js
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const fs = require("fs"),
      version = require("../src/lib/version.js");

const headers = "// daysTillGrad\n"
              + "// A countdown until graduation for Maine West High School Class of 2019\n"
              + "// (c) 2019 GHIFARI160. All rights reserved.\n"
              + "\n";

console.log("Updating app.js...");

var appStr = fs.readFileSync("docs/js/app.js", "utf8");

fs.writeFileSync("docs/js/app.js", headers + appStr, "utf8");

console.log("Done!");
