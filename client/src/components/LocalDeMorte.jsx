import React from "react";
import Chart from "react-apexcharts";
import dados from "../assets/dados";

const LocalDeMorteBarChart = ({ data }) => {
  const locais = Array.isArray(dados.locais) ? dados.locais : [];

  const counts = locais.map(local => {
    return data.filter(item => String(item.lococor) === String(local)).length;
  });

  if (counts.reduce((acc, count) => acc + count, 0) === 0) {
    return null;
  }

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFD700', '#8A2BE2', '#FF6347'];

  // Garantindo que a quantidade de cores seja suficiente
  const colorSet = counts.length > colors.length ? colors.concat(colors.slice(0, counts.length - colors.length)) : colors;

  // Preparando os dados para o gráfico
  const seriesData = locais.map((local, index) => ({
    x: local,
    y: counts[index],
    fillColor: colorSet[index], // Definindo a cor para cada barra
    strokeColor: '#FFFFFF' // Definindo a cor da borda (opcional)
  }));

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: locais,
    },
    yaxis: {
      title: {
        text: 'Número de óbitos',
      },
    },
    fill: {
      opacity: 1,
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

  const series = [
    {
      name: 'Óbitos',
      data: seriesData, // Agora passando os dados com cores para o gráfico
    },
  ];

  return (
      <Chart options={options} series={series} type="bar" height={350} />
  );
};

export default LocalDeMorteBarChart;
