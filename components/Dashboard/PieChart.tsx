"use client";

import getAmountUsers from "@/server-actions/getAmountUsers";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = ({...props}) => {
  const [nbAdmin, setNbAdmin] = useState<number>(0);
  const [nbSuperAdmin, setNbSuperAdmin] = useState<number>(0);
  ChartJS.register(ArcElement, Tooltip, Legend);
  useEffect(() => {
    const fetchData = async () => {
      const { nb_admin, nb_super_admin } = await getAmountUsers();
      setNbAdmin(nb_admin);
      setNbSuperAdmin(nb_super_admin);
    };
    fetchData();
  }, []);
  const data = {
    labels: ["ADMINS", "SUPER ADMINS"],
    datasets: [
      {
        label: "Users",
        data: [nbAdmin, nbSuperAdmin],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
  };
  return (
    <div {...props}>
    <div className="border-2 border-black w-[30rem] p-4 rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Amount Of Users</h1>
      <Pie data={data} options={chartOptions} />
    </div>
    </div>
  );
};

export default PieChart;
