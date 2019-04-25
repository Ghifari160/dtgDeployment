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
  prerelease: [],
  meta: [],
  changes: [
    "### Added",
    " - New version checker and updater",
    " - Footer link to issue tracker",
    " - New version notice dialog",
    " - Google Analytics tracking of referrals",
    " - Changelog viewer",
    " - Roadmap footer link",
    " - Footer link to feedback Google Form",
    " - UI scaling",
    " - More UI customization parameters (in Sass)",
    " - Build scripts to update package.json and add copyright declaration to app.js",
    " - Countdown mode (calendar / school days) toggle button with the "
        + "appropriate icons",
    " - School days countdown to graduation",
    "",
    "### Changed",
    " - School days countdown now accounts for end of school day (3:20 PM)",
    " - Optimized DOM modifications",
    " - Source code footer link now opens in a new tab",
    " - School days countdown calculation algorithm",
    "",
    "### Fixed",
    " - School days countdown one day too fast on Saturdays with the new "
        + "algorithm"
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
