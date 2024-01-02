"use client";

import getBusPerDayInCurMonth from "@/server-actions/getBusPerDayInCurMonth";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const LineChart = () => {
  const [nbBusArr, setNbBusArr] = useState<number[]>([]);
  const [dateArr, setDateArr] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { nbArr, dateArr } = await getBusPerDayInCurMonth();
      setNbBusArr(nbArr);
      setDateArr(dateArr);
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Business per day in current month",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
        },
      },
    },
  };

  const labels = dateArr;

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Business",
        data: nbBusArr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div className="border-2 border-black w-1/2 p-4 rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">Line Chart</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
