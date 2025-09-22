import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.monthlySales.map((item) => item._id); // ví dụ: "2025-01"
        const values = data.monthlySales.map((item) => item.totalSales);

        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue (VNĐ)",
              data: values,
              backgroundColor: "rgba(34, 197, 94, 0.7)",
              borderColor: "rgba(34, 197, 94, 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Revenue" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!chartData) return <p className="text-center">Đang tải biểu đồ...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Monthly Revenue
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
