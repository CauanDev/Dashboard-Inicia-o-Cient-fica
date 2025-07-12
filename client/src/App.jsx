import FilterForm from "./components/FilterForm.jsx"
import { Button } from 'primereact/button';
import { useRef, useState } from "react";
import http from "./services/http.js";
import PieChart from "./components/PizzaChart.jsx";
import MortesPorCidade from "./components/CidadesChart.jsx";
import LocalDeMorteChart from "./components/LocalDeMorte.jsx";
import AreaChartPorDiaESexo from "./components/LineSexoChart.jsx";
import LocalDeMortePorSexoBarChart from "./components/LocalDeMortePorSexoBarChart.jsx";
import RadialBarChartPorAno from "./components/RadialBarChartPorAno.jsx";
import RadialChartMortality from "./components/RadialChartMortality.jsx";

function App() {
  const filterFormRef = useRef();
  const [data, setData] = useState([]); 
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true);
    const values = filterFormRef.current.getValues();
    if (values.dataInicio) {
      values.dataInicio = new Date(values.dataInicio).toLocaleDateString('pt-BR'); // Ex: "01/01/2022"
    }
    if (values.dataFim) {
      values.dataFim = new Date(values.dataFim).toLocaleDateString('pt-BR'); // Ex: "31/12/2022"
    }
    try {
      const response = await http.post('/mortalidades', values);
      setData(response.data); 
      setCidades(values.cidades || []);        
    } catch (error) {
      console.error('Erro na requisição:', error.response || error.message);
    }
    setLoading(false);
  };
  

  return (
    <>
      <FilterForm ref={filterFormRef} />
      <div className="centro">
        <Button label="Aplicar Filtro" icon="pi pi-check" iconPos="right" onClick={handleSubmit} loading={loading} disabled={loading}/>
        {data.length > 0 && (
          <>
            <p>Totais de Mortos: {data.length}</p>
            <div className="flex">
              <PieChart data={data} />
              <LocalDeMorteChart data={data}/>
            </div>

            <div className="flex">
              <AreaChartPorDiaESexo data={data}/>
              <LocalDeMortePorSexoBarChart data={data} />
            </div>
            <div className="flex">
            <RadialBarChartPorAno data={data}/>
            <RadialChartMortality data={data}/>
            </div>

            {cidades.length > 1 && <MortesPorCidade data={data} cidades={cidades} />}
          </>
        )}


      </div>
    </>
  );
}

export default App;
