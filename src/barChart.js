import ApexCharts from "apexcharts";

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
    type: "datetime", // 'datetime', 'category'
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
