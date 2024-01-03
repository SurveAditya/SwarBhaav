import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData, position }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: position,
            },
            title: {
                display: false,
                text: "Chart.js Line Chart",
            },
        },
    };
    return <Pie options={options} data={chartData} />;
};

export default PieChart;
