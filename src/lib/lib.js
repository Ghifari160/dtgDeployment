const nsd = require("./nsd.js");

const gradDay = new Date("May 19, 2019");

// Gets today's Date object (without time)
function getToday()
{
  return new Date(new Date().getFullYear(), new Date().getMonth(),
      new Date().getDate());
}

// Gets the day until graduation
function daysTillGrad()
{
  var today = getToday();
  return (gradDay - today) / 86400000;
}

// Gets the number of school days until graduation
function schoolDaysTillGrad()
{
  var today = getToday();
  var ret = 0;

  var iStart = 0;
  for(var i = nsd.length; i > -1; i--)
  {
    if(today > nsd[i])
      iStart = i;
  }

  var boundLower = today;
  for(var i = iStart; i < nsd.length; i++)
  {
    var daysBetween = (nsd[i] - boundLower) / 86400000 - 1;
    boundLower = nsd[i];
    ret += daysBetween;
  }

  return ret;
}

module.exports = {
  daysTillGrad: daysTillGrad,
  schoolDaysTillGrad: schoolDaysTillGrad
};
