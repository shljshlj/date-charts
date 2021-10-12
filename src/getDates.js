// https://gist.github.com/miguelmota/7905510

// Returns an array of dates between the two dates
// export function getDates(startDate, endDate) {
//   const dates = [];
//   let currentDate = startDate;
//   const addDays = function (days) {
//     const date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
//   };
//   while (currentDate <= endDate) {
//     dates.push(currentDate);
//     currentDate = addDays.call(currentDate, 1);
//   }
//   return dates;
// }

// https://stackoverflow.com/questions/57882475/generating-series-of-dates-between-two-given-date-with-simplified-method?noredirect=1&lq=1

// startDate, endDate in format YYYY-MM-DD
export function getDates(startDate, endDate) {
  const toISODate = (date) => date.toISOString().substr(0, 10);
  const dates = [];
  let currentDate = new Date(startDate);

  while (startDate <= endDate) {
    dates.push(currentDate.getTime());
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    startDate = toISODate(currentDate);
  }
  return dates;
}
