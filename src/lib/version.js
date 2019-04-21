// daysTillGrad
// A countdown until graduation for Maine West High School Class of 2019
//
// File Name: src/lib/version.js
// Description: App versioning library. This library complies with Semantic
// Versioning 2.0.0 (https://semver.org/spec/v2.0.0.html)
//
// (c) 2019 GHIFARI160. All rights reserved.
// Distributed under the terms of the MIT License

const version = {
  major: 0,
  minor: 2,
  patch: 0,
  prerelease: [2019, 4, 20, "d7 7f b6 "],
  meta: [],

  getPreRelease: function()
  {
    var ret = [];

    if(this.prerelease.length < 1)
      return null;

    for(var i = 0; i < this.prerelease.length; i++)
    {
      if(typeof this.prerelease[i] == "string")
        this.prerelease[i] = this.prerelease[i].replace(/\s/g, "");

      if(this.prerelease[i] !== "")
        ret.push(this.prerelease[i]);
    }

    return ret.join(".");
  },

  getMeta: function()
  {
    var ret = [];

    if(this.meta.length < 1)
      return null;

    for(var i = 0; i < this.meta.length; i++)
    {
      if(typeof this.meta[i] == "string")
        this.meta[i] = this.meta[i].replace(/\s/g, "");

      if(this.meta[i] !== "")
        ret.push(this.meta[i]);
    }

    return ret.join(".");
  },

  getVersion: function()
  {
    var ret = "v" + this.major + "." + this.minor + "." + this.patch;
    ret += (this.getPreRelease() != null) ? "-" + this.getPreRelease() : "";
    ret += (this.getMeta() != null) ? "+" + this.getMeta() : "";

    return ret;
  }
};

module.exports = version;
