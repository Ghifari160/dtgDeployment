// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// Version Library
// Unified version-related functions
//
// File Name: src/lib/version/params.js
// Description: Version library parameters
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

// Version and changelog
const version =
{
  major: 0,
  minor: 2,
  patch: 0,
  prerelease: [2019, 4, 23, "62 b1 8e "],
  meta: [],
  changes: [
    "### Added",
    " - New version checker and updater",
    "",
    "### Changed",
    " - Version library is now fragmented for ease of maintenance"
  ]
};

// Version checker parameters
const version_checker =
{
  host: "https://daystillgrad.ghifari160.com", // daysTillGrad instance hostname
  path: "/version.txt"                         // Path to the instance's version
                                               // text file
};

module.exports =
{
  version: version,
  version_checker: version_checker
};
