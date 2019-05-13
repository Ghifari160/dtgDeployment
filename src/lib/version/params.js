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
  minor: 3,
  patch: 1,
  prerelease: [],
  meta: [],
  changes: [
    "### Fixed",
    " - School days mode miscalculation due to the end-of-school day algorithm"
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
