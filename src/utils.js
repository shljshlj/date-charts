import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import en from "dayjs/locale/en";
dayjs.locale({
  ...en,
  weekStart: 1,
});
dayjs.extend(utc);

const mapAnalyticsToDateRangeGraphModel = (analytics, range) => {
  const data = range.map((date) => {
    if (analytics[date]) return [date, analytics[date]];
    return [date, 0];
  });

  return {
    name: "point-enter",
    data,
  };
};

/**
 *
 * @typedef {'day' | 'week' | 'month'} DisplayBy
 */

export function getBarChartData(displayBy, series, name) {
  return {
    name,
    data: groupBy(displayBy, series),
  };
}

/**
 *
 * @param {DisplayBy} displayBy
 * @param {array} series
 */

// function groupBy(displayBy, series) {
//   const sumByDisplayBy = series.reduce(sumChart(displayBy), {});

//   return;
// }

export function startOf(displayBy, date) {
  return dayjs.utc(date).startOf(displayBy);
}

export function endOf(displayBy, date) {
  return dayjs.utc(date).endOf(displayBy);
}
