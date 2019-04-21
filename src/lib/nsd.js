// daysTillGrad
// A countdown until graduation for Maine West High School Class of 2019
//
// File Name: src/lib/nsd.js
// Description: Non-school days index library
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

var dateStr = [
  "4/9/2019",
  "4/10/2019",
  "4/19/2019",
  "5/14/2019",
  "5/15/2019",
  "5/16/2019",
  "5/17/2019"
];

var date = [];

for(var i = 0; i < dateStr.length; i++)
  date.push(new Date(dateStr[i]));

module.exports = date;
