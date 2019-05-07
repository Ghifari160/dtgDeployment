// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// dtgDevServer
// Custom development server for daysTillGrad
//
// File Name: dev/server/error.js
// Description: Error response generator
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const params = require("./params.js");

function getErrorMessage(code)
{
  var ret = "Invalid Error";

  for(var i = 0; i < params.errorMap.length; i++)
  {
    if(params.errorMap[i].errno == code)
      ret = params.errorMap[i].message;
  }

  return ret;
}

function generateError(resp, code)
{
  if(typeof resp.writeHead != "function"
      || typeof resp.write != "function"
      || typeof resp.end != "function")
  {
    return false;
  }

  resp.writeHead(code, { "Content-Type": "text/plain" });
  resp.write(code + "\n" + getErrorMessage(code));
  resp.end();

  return true;
}

module.exports =
{
  generateError: generateError
};
