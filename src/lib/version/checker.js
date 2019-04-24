// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// Version Library
// Unified version-related functions
//
// File Name: src/lib/version/checker.js
// Description: Version library new version checker
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const http = require("http"),
      options = require("./params.js").version_checker;

function get_version_instance()
{
  return new Promise((resolve, reject) =>
  {
    const req_opts =
    {
      host: options.host,
      path: options.path
    };

    var req = http.request(options, function(resp)
    {
      var data = "";

      resp.on("data", function(payload)
      {
        data += payload;
      });

      resp.on("end", function()
      {
        resolve(data);
      });
    });

    req.on("error", function(e)
    {
      reject(e);
    });

    req.end();
  });
}

async function version_check(verCurrent, callback)
{
  try
  {
    const verInstance = await get_version_instance();

    if(verInstance != verCurrent)
      callback(verInstance);
  }
  catch(e)
  {
    console.log("[LIBRARY][VERSION][ERROR]", e);
  }
}

module.exports =
{
  version_check: version_check
};
