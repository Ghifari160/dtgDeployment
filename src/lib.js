const gradDay = new Date("May 19, 2019");

// Gets the day until graduation
function daysTillGrad()
{
  var today = new Date(new Date().getFullYear(), new Date().getMonth(),
      new Date().getDate());
  return (gradDay - today) / 86400000;
}

module.exports = {
  daysTillGrad: daysTillGrad
};
