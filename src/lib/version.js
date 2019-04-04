const version = {
  major: 0,
  minor: 2,
  patch: 0,
  prerelease: [2019, 4, 4, "00e62f"],
  meta: [],

  getPreRelease: function()
  {
    var ret = [];

    if(this.prerelease.length < 1)
      return null;

    for(var i = 0; i < this.prerelease.length; i++)
    {
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
