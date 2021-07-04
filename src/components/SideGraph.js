import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    console.log("fetched");
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function SideGraph({ casesType, ...props }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log("added");
        });
    };

    fetchData();
  }, [casesType]);
  let Gdatasets;
  if (casesType != "recovered") {
    Gdatasets = [
      {
        fill: true,
        backgroundColor: "rgba(254, 74, 73, 0.5)",
        borderColor: "#fe4a49",
        data: data,
      },
    ];
  } else {
    Gdatasets = [
      {
        fill: true,
        backgroundColor: "rgba(73, 254, 74, 0.5)",
        borderColor: "#49fe4a",
        data: data,
      },
    ];
  }

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: Gdatasets,
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default SideGraph;
