// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// dtgDevServer
// Custom development server for daysTillGrad
//
// File Name: dev/server/stats.js
// Description: Recursive file and directory statistics resolver
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const fs = require("fs"),
      path = require("path");

const params = require("./params.js");

function statsPath(dPath)
{
  try
  {
    var stats = fs.statSync(dPath);
    if(stats.isDirectory())
    {
      var tempStats;
      for(var i = 0; i < params.indices.length; i++)
      {
        tempStats = statsPath(path.resolve(dPath, params.indices[i]));
        if(!tempStats.hasOwnProperty("errno"))
          return tempStats;
      }
    }
    else if(stats.isFile())
    {
      return { "path": dPath, "stats": stats};
    }
  }
  catch(e)
  {
    return { "http": 404, "errno": e.errno, "path": dPath };
  }
}

module.exports =
{
  statsPath: statsPath
};
