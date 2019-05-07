// daysTillGrad
// Countdown until graduation for Maine West High School Class of 2019
//
// dtgDevServer
// Custom development server for daysTillGrad
//
// File Name: dev/server/index.js
// Description: Server entry point
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const http = require("http"),
      fs = require("fs"),
      path = require("path");

const params = require("./params.js"),
      error = require("./error.js"),
      mime = require("./mime.js"),
      stats = require("./stats.js"),
      term = require("./term_colors.js");

console.log(term.foreground.blue + term.bright + "Creating dev server..."
    + term.reset);

http.createServer(function(req, resp)
{
  var uri, uriParts,
      url, query;

  var dPath,
      dStats;

  uri = req.url;
  uriParts = uri.substring(1).split("?");

  url = uriParts[0];
  query = (uriParts.length > 1) ? uriParts[1] : undefined;

  dPath = path.resolve(__dirname, params.root, url);
  dStats = stats.statsPath(dPath);

  if(dStats.hasOwnProperty("errno"))
  {
    console.log(uri + "\t" + term.foreground.red + dStats.http + term.reset
        + "\t" + dStats.path);

    error.generateError(resp, dStats.http);
  }
  else
  {
    console.log(uri + "\t" + term.foreground.green + 200 + term.reset
        + "\t" + dStats.path);

    resp.writeHead(200, { "Content-Type": mime.getMimeType(dStats.path) });
    resp.end(fs.readFileSync(dStats.path));
  }
}).listen(params.listenPort);

console.log(term.foreground.blue + term.bright + "Listening on port "
    + params.listenPort + term.reset);
