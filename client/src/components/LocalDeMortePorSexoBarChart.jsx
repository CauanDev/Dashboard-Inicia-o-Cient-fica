import React from "react";
import Chart from "react-apexcharts";
import dados from "../assets/dados";

const LocalDeMortePorSexoBarChart = ({ data }) => {
  const locais = Array.isArray(dados.locais) ? dados.locais : [];

  // Conta óbitos por local e sexo
  const countsBySexo = ['Masculino', 'Feminino'].map(sexo =>
    locais.map(local => 
      data.filter(item => String(item.lococor) === String(local) && item.sexo === sexo).length
    )
  );

  // Verifica se há algum dado para exibir
  if (countsBySexo.flat().reduce((acc, count) => acc + count, 0) === 0) {
    return null;
  }

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true, // Ativa barras empilhadas
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
      title: {
        text: 'Locais de Óbito',
      },
    },
    yaxis: {
      title: {
        text: 'Número de Óbitos',
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    colors: ['#1E90FF', '#FF69B4'], // Azul para Masculino, Rosa para Feminino
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
      name: 'Masculino',
      data: countsBySexo[0], // Dados para Masculino
    },
    {
      name: 'Feminino',
      data: countsBySexo[1], // Dados para Feminino
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default LocalDeMortePorSexoBarChart;
