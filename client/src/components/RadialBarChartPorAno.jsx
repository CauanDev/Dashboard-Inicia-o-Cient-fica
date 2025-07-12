import React from "react";
import Chart from "react-apexcharts";

const PieChartPorAno = ({ data }) => {
  if (data.length === 0) {
    return null; // Retorna null se não houver dados
  }

  // Agrupando os dados por ano
  const deathsByYear = data.reduce((acc, item) => {
    const year = item.dtobito.split("-")[0]; // Extrai o ano da data
    acc[year] = (acc[year] || 0) + 1; // Incrementa o contador de mortes para o ano
    return acc;
  }, {});

  // Obtém o total de mortes
  const totalDeaths = Object.values(deathsByYear).reduce((sum, count) => sum + count, 0);

  // Transforma os dados em porcentagens para o gráfico de pizza
  const series = Object.values(deathsByYear); // Quantidade de mortes por ano
  const labels = Object.keys(deathsByYear); // Anos como rótulos

  // Configurações do gráfico
  const options = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels, // Rótulos com os anos
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} mortes`,
      },
    },
    fill: {
      colors: ["#1E90FF", "#FF69B4", "#FFD700", "#32CD32", "#FF4500"], // Paleta de cores
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default PieChartPorAno;
