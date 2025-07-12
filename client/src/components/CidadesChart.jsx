import React from "react";
import Chart from "react-apexcharts";

const MortesPorCidade = ({ data, cidades }) => {
  const series = cidades.map(cidade => {
    const mortesCidade = data.filter(item => item.codmunocor === cidade);
    const masculino = mortesCidade.filter(item => item.sexo === "Masculino").length;
    const feminino = mortesCidade.filter(item => item.sexo === "Feminino").length;

    return {
      name: cidade,
      data: [masculino, feminino],
    };
  });

  const options = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: ["Masculino", "Feminino"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    title: {
      text: "Quantidade de Mortes por Sexo por Cidade",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default MortesPorCidade;
