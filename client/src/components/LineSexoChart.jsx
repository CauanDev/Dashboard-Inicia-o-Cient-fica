import React from "react";
import Chart from "react-apexcharts";

const AreaChartPorAnoESexo = ({ data }) => {
  const dataGrouped = data.reduce((acc, item) => {
    const ano = item.dtobito.split('-')[0];  // Extrai o ano da data
    const sexo = item.sexo;  // Sexo da pessoa

    if (!acc[sexo]) {
      acc[sexo] = {};  // Cria o objeto para o sexo, se não existir
    }

    if (!acc[sexo][ano]) {
      acc[sexo][ano] = 0;  // Inicializa com 0 se o ano não existir para o sexo
    }

    acc[sexo][ano] += 1;  // Incrementa o contador de mortes para o ano e sexo

    return acc;
  }, {});

  // Extraímos todos os anos únicos e garantimos que eles estejam ordenados corretamente
  const anos = Array.from(new Set(data.map(item => item.dtobito.split('-')[0]))).sort((a, b) => a - b);

  // Organiza os dados para cada sexo, agora criando um array de objetos (x: ano, y: mortes)
  const seriesData = ['Masculino', 'Feminino'].map(sexo => ({
    name: sexo,
    data: anos.map(ano => ({
      x: ano,  // O ano
      y: dataGrouped[sexo]?.[ano] || 0,  // Número de óbitos, 0 se não houver dados
    })),
    color: sexo === 'Masculino' ? '#1E90FF' : '#FF69B4', // Azul para masculino, rosa para feminino
  }));

  const options = {
    chart: {
      type: 'area',
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: anos,  // Certifique-se de que o eixo X mostra todos os anos
      title: {
        text: 'Ano',
      },
      tickAmount: 8,  // Definindo um número fixo de ticks, ajustando o espaçamento
      labels: {
        rotate: -45,  // Rotaciona os labels para não ficarem sobrepostos
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
        color: '#ccc',  // Cor dos ticks no eixo X
      },
    },
    yaxis: {
      title: {
        text: 'Número de óbitos',
      },
    },
    fill: {
      opacity: 0.5,  // Transparência para o preenchimento
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
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

  return <Chart options={options} series={seriesData} type="area" height={350} width={400} />;
};

export default AreaChartPorAnoESexo;
