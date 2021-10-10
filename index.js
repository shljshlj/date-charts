// import ApexCharts from 'apexcharts';
import obj from './pointEntriesOverTime.js';
// import { getDates } from './getDates';

function getDates(startDate, endDate) {
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

const pointEntriesWithZeros = { ...obj['point-enter'] };

const pointEntries = Object.keys(pointEntriesWithZeros).reduce((acc, cur) => {
  if (pointEntriesWithZeros[cur]) acc[cur] = pointEntriesWithZeros[cur];
  return acc;
}, {});

// console.log(pointEntries);

const dates = getDates('2021-08-11', '2021-08-30');

// console.log(dates);

const mapAnalyticsToDateRangeGraphModel = (analytics, range) => {
  const data = range.map((date) => {
    if (analytics[date]) return [date, analytics[date]];
    return [date, 0];
  });

  return {
    name: 'point-enter',
    data,
  };
};

const series = mapAnalyticsToDateRangeGraphModel(pointEntries, dates);

var options = {
  series: [series],
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    title: {
      text: 'Number of entries',
    },
  },
  fill: {
    opacity: 1,
  },
};

var chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();
