import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const sexos = ["Masculino", "Feminino"];
  const counts = [5174, 4160]; // valores fixos

  const total = counts.reduce((acc, count) => acc + count, 0);
  if (total === 0) {
    return null;
  }

  const options = {
    chart: {
      type: 'pie',
    },
    labels: sexos,
    colors: ['#1E90FF', '#FF69B4'],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const value = opts.w.globals.series[opts.seriesIndex];
        const percent = val.toFixed(1);
        return `${value} (${percent}%)`;
      },
      style: {
        fontSize: '14px',
        fontWeight: 700, // numérico para garantir que funcione
        colors: ['#000000'], // cor preta
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = counts;

  return (
    <div>
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '10px',
          fontWeight: 700,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Óbitos infantis por sexo
      </h3>
      <Chart options={options} series={series} type="pie" width="380" />
    </div>
  );
};

export default PieChart;
