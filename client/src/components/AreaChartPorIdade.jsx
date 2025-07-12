import React from "react";
import Chart from "react-apexcharts";

const AreaChartPorIdade = ({ data }) => {
  if (data.length === 0) {
    return null; // Retorna null se não houver dados
  }

  // Função para determinar as faixas etárias
  const createAgeRanges = (data) => {
    const minAge = Math.min(...data.map((item) => item.idade));
    const maxAge = Math.max(...data.map((item) => item.idade));

    const step = 10; // Defina o intervalo das faixas etárias
    const ranges = [];

    for (let start = minAge; start <= maxAge; start += step) {
      const end = start + step - 1;
      ranges.push({ range: `${start}-${end}`, min: start, max: end });
    }

    return ranges;
  };

  // Criação das faixas etárias
  const ageRanges = createAgeRanges(data);

  // Contagem de pessoas por faixa etária e sexo
  const maleCounts = ageRanges.map(({ min, max }) => ({
    range: `${min}-${max}`,
    count: data.filter((item) => item.idade >= min && item.idade <= max && item.sexo === "M").length,
  }));

  const femaleCounts = ageRanges.map(({ min, max }) => ({
    range: `${min}-${max}`,
    count: data.filter((item) => item.idade >= min && item.idade <= max && item.sexo === "F").length,
  }));

  // Combina os dados para o gráfico
  const chartData = ageRanges.map(({ range }) => ({
    range,
    male: maleCounts.find((item) => item.range === range)?.count || 0,
    female: femaleCounts.find((item) => item.range === range)?.count || 0,
  }));

  // Configurações do gráfico
  const options = {
    chart: {
      type: "area",
      height: 350,
    },
    xaxis: {
      categories: chartData.map((item) => item.range),
      title: {
        text: "Faixas Etárias",
      },
    },
    yaxis: {
      title: {
        text: "Número de Pessoas",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.6,
    },
    colors: ["#FF5733", "#33AFFF"], // Cores para homens e mulheres
    legend: {
      position: "top",
    },
  };

  const series = [
    {
      name: "Homens",
      data: chartData.map((item) => item.male),
    },
    {
      name: "Mulheres",
      data: chartData.map((item) => item.female),
    },
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default AreaChartPorIdade;
