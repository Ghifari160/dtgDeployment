// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// dtgDevServer
// Custom development server for daysTillGrad
//
// File Name: dev/server/mime.js
// Description: MIME type resolver
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const path = require("path");

const params = require("./params.js");

function getMimeType(dPath)
{
  var ret = "text/plain";

  for(var i = 0; i < params.mimeMap.length; i++)
  {
    if(params.mimeMap[i].extension == path.extname(dPath))
      ret = params.mimeMap[i].mime;
  }

  return ret;
}

module.exports =
{
  getMimeType: getMimeType
};
