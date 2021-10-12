import ApexCharts from "apexcharts";
import { days, weeks, months } from "./pointEntriesOverTime.js";
import { getDates } from "./getDates";
import { endOf, startOf } from "./utils";

// console.log(endOf("week", 1628121600000));

const dates = getDates("2021-07-11", "2021-10-11");

const removeZerosFromAnalytics = (analytics) => {
  return Object.keys(analytics).reduce((acc, cur) => {
    if (analytics[cur]) acc[cur] = analytics[cur];
    return acc;
  }, {});
};

const dayPointEntries = removeZerosFromAnalytics(days["point-enter"]);
const weekPointEntries = removeZerosFromAnalytics(weeks["point-enter"]);
const monthPointEntries = removeZerosFromAnalytics(months["point-enter"]);

console.log(monthPointEntries);

const daysAnalytics = dates.map((date) => {
  if (dayPointEntries[date]) return [date, dayPointEntries[date]];
  return [date, 0];
});

const groupAnalyticsInRange = (analytics, displayBy) => {
  return (acc, currentTime) => {
    const date = startOf(displayBy, currentTime).valueOf();
    const defaultValue = 0;
    const currentValue = analytics[currentTime] || defaultValue;
    if (!acc[date]) acc[date] = currentValue;
    else acc[date] += currentValue;
    return acc;
  };
};

const mapAnalyticsToDateRangeGraphModel = (analytics, range, displayBy) => {
  const groupedData = range.reduce(
    groupAnalyticsInRange(analytics, displayBy),
    {}
  );
  const data = Object.keys(groupedData).map((key) => [+key, groupedData[key]]);

  return {
    name: "point-enter",
    data,
  };
};

mapAnalyticsToDateRangeGraphModel(dayPointEntries, dates, "day");

const serieDays = mapAnalyticsToDateRangeGraphModel(
  dayPointEntries,
  dates,
  "day"
);
const serieWeeks = mapAnalyticsToDateRangeGraphModel(
  dayPointEntries,
  dates,
  "week"
);
const serieMonths = mapAnalyticsToDateRangeGraphModel(
  dayPointEntries,
  dates,
  "month"
);

console.log(mapAnalyticsToDateRangeGraphModel(dayPointEntries, dates, "month"));

const chartOptions = {
  chart: {
    type: "bar",
    height: 300,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "70%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    title: {
      text: "Number of entries",
    },
  },
  fill: {
    opacity: 1,
  },
};

const optionsDays = {
  ...chartOptions,
  series: [serieDays],
};
const optionsWeeks = {
  ...chartOptions,
  series: [serieWeeks],
};
const optionsMonths = {
  ...chartOptions,
  series: [serieMonths],
};

const chartDays = new ApexCharts(
  document.querySelector("#chart-days"),
  optionsDays
);
const chartWeeks = new ApexCharts(
  document.querySelector("#chart-weeks"),
  optionsWeeks
);
const chartMonths = new ApexCharts(
  document.querySelector("#chart-months"),
  optionsMonths
);
chartDays.render();
chartWeeks.render();
chartMonths.render();

// Event Method Example
const monthButton = document.querySelector("#month");
const weekButton = document.querySelector("#week");

function updateChartOptions(chart, newOptions) {
  chart.updateOptions(newOptions);
}

const newOptions = (data, range, displayBy, formatter = null) => ({
  series: [mapAnalyticsToDateRangeGraphModel(data, range, displayBy)],
  ...(formatter && {
    labels: {
      formatter,
    },
  }),
});

const weekOptions = {
  series: [mapAnalyticsToDateRangeGraphModel(dayPointEntries, dates, "week")],
  xaxis: {
    labels: {
      formatter: function (value, timestamp) {
        const start = startOf("week", timestamp).format("DD MMM");
        const end = endOf("week", timestamp).format("DD MMM");
        return `${start} - ${end}`;
      },
    },
  },
};

const monthOptions = {
  series: [mapAnalyticsToDateRangeGraphModel(dayPointEntries, dates, "month")],
  xaxis: {
    labels: {
      formatter: function (value, timestamp) {
        const start = startOf("month", timestamp).format("MMM 'YY");
        return `${start}`;
      },
    },
  },
};

weekButton.addEventListener("click", (e) => {
  updateChartOptions(chartDays, weekOptions);
});

monthButton.addEventListener("click", (e) => {
  updateChartOptions(chartDays, monthOptions);
});
