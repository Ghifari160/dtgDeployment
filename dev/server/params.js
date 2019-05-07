// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// dtgDevServer
// Custom development server for daysTillGrad
//
// File Name: dev/server/mime.js
// Description: Server parameters
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const config =
{
  root: "../../docs",
  listenPort: 80,
  indices: [ "index.html" ],
  errorMap:
  [
    {
      errno: 200,
      message: "OK"
    },
    {
      errno: 404,
      message: "Not Found"
    },
    {
      errno: 500,
      message: "Internal Server Error"
    }
  ],
  mimeMap:
  [
    {
      extension: ".css",
      mime: "text/css"
    },
    {
      extension: ".html",
      mime: "text/html"
    },
    {
      extension: ".ico",
      mime: "image/vnd.microsoft.icon"
    },
    {
      extension: ".js",
      mime: "application/javascript"
    },
    {
      extension: ".svg",
      mime: "image/svg+xml"
    },
    {
      extension: ".txt",
      mime: "text/plain"
    }
  ]
};

module.exports = config;
