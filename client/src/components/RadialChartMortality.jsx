import React from "react";
import Chart from "react-apexcharts";

const RadialChartMortality = ({ data }) => {
  if (data.length === 0) {
    return null; // Retorna null se não houver dados
  }

  // Calcula o total de mortes no filtro atual
  const totalFilteredDeaths = data.length;

  // Total geral de mortes nos anos
  const totalDeaths = 104529;

  // Calcula a porcentagem que o filtro atual representa
  const percentage = ((totalFilteredDeaths / totalDeaths) * 100).toFixed(2);

  // Configurações do gráfico
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    series: [parseFloat(percentage)], // Porcentagem do filtro atual
    labels: ["Progresso"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
            formatter: (val) => `${val}%`,
          },
          total: {
            show: true,
            label: "TOTAL",
            formatter: () => `${percentage}%`,
          },
        },
      },
    },
  };

  return <Chart options={options} series={options.series} type="radialBar" height={350} />;
};

export default RadialChartMortality;
