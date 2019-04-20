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
  var today = getToday(),
      daysBetween = daysTillGrad(), // Number of calendar days to graduation
      nSaturdays,
      diff;

  // If today is not Sunday, start with -1 difference. Otherwise, start with 0
  // difference.
  if(today.getDay() > 0)
    diff = -1;
  else
    diff = 0;

  // Find the number of Saturdays between today and the graduation day
  nSaturdays = Math.floor((today.getDay() + daysBetween) / 7);
  // Store twice the number of Saturdays between today and the graduation day
  // (Saturday and Sunday = 2 * Saturday)
  diff += nSaturdays * 2;

  // Find the applicable starting position of the non-school days list
  var nsdStart = 0;
  var loopDone = false;
  for(var i = 0; i < nsd.length; i++)
  {
    if(!loopDone && today < nsd[i])
    {
      nsdStart = i;
      loopDone = true;
    }
  }

  // Find the applicable number of non-school days between today and the
  // graduation day
  for(var i = nsdStart; i < nsd.length; i++)
    diff++;

  return daysBetween - diff;
}

module.exports = {
  daysTillGrad: daysTillGrad,
  schoolDaysTillGrad: schoolDaysTillGrad
};
