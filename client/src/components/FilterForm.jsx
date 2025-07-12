import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { locale, addLocale } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import dados from '../assets/dados';
addLocale('br', {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
        'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
        'jul', 'ago', 'set', 'out', 'nov', 'dez'
    ],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sm'
});

locale('br');


const FilterForm = forwardRef((_, ref) => {
    const [selectedCity, setSelectedCity] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [beginDate, setBeginDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [selectedSexo, setSelectedSexo] = useState([])
    const [filteredRaca, setFilteredRaca] = useState([])
    const [selectedRaca, setSelectedRaca] = useState([])
    const [filteredSexos, setFilteredSexos] = useState([])
    const [beginIdade, setBeginIdade] = useState()
    const [endIdade, setEndIdade] = useState()
    const [beginIdadeMae, setBeginIdadeMae] = useState()
    const [endIdadeMae, setEndIdadeMae] = useState()
    const [selectedLocal, setSelectedLocal] = useState([])
    const [filteredLocal, setFilteredLocal] = useState([])
    const [beginTime, setBeginTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const formatTime = (time) => {
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        return `${hours}${minutes}`;
    };

    useImperativeHandle(ref, () => ({
        getValues: () => {
            const values = {};

            if (selectedCity.length > 0) values.cidades = selectedCity;
            if (selectedLocal.length > 0) values.locais = selectedLocal;
            if (beginDate) values.dataInicio = beginDate;
            if (endDate) values.dataFinal = endDate;
            if (selectedSexo.length > 0) values.sexos = selectedSexo;
            if (selectedRaca.length > 0) values.racas = selectedRaca;
            if (beginIdade) values.idadeInicio = beginIdade;
            if (endIdade) values.idadeFinal = endIdade;
            if (beginIdadeMae) values.idadeMaeInicio = beginIdadeMae;
            if (endIdadeMae) values.idadeMaeFinal = endIdadeMae;

            if (beginTime) {
                values.horaInicio = formatTime(beginTime);
            }
            
            if (endTime) {
                values.horaFinal = formatTime(endTime);
            }
            return values;
        }
    }));


    const searchFilter = (query, list, setFilteredList) => {
        const normalizedQuery = query.toLowerCase();
        setFilteredList(
            list.filter(item => item.toLowerCase().includes(normalizedQuery))
        );
    };

    const searchCity = (event) => searchFilter(event.query, dados.cidades, setFilteredCountries);
    const searchSexo = (event) => searchFilter(event.query, dados.sexos, setFilteredSexos);
    const searchRaca = (event) => searchFilter(event.query, dados.racas, setFilteredRaca);
    const searchLocal = (event) => searchFilter(event.query, dados.locais, setFilteredLocal);

    return (
        <div className="form">
            <div className='espaco col'>
                <div className='espaco'>
                    <AutoComplete
                        value={selectedCity}
                        suggestions={filteredCountries}
                        completeMethod={searchCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        placeholder="Selecione uma cidade"
                        multiple
                        dropdown
                    />

                    <AutoComplete
                        value={selectedLocal}
                        suggestions={filteredLocal}
                        completeMethod={searchLocal}
                        onChange={(e) => setSelectedLocal(e.value)}
                        placeholder="Selecione o Local"
                        multiple
                        dropdown
                    />
                </div>

                <div className='espaco'>
                    <AutoComplete
                        value={selectedSexo}
                        suggestions={filteredSexos}
                        completeMethod={searchSexo}
                        onChange={(e) => setSelectedSexo(e.value)}
                        placeholder="Selecione o Sexo"
                        multiple
                        dropdown
                    />

                    <AutoComplete
                        value={selectedRaca}
                        suggestions={filteredRaca}
                        completeMethod={searchRaca}
                        onChange={(e) => setSelectedRaca(e.value)}
                        placeholder="Selecione a Raça"
                        multiple
                        dropdown
                    />
                </div>

            </div>
            <div className='espaco'>
                <InputNumber
                    value={beginIdade}
                    onValueChange={(e) => setBeginIdade(e.value)}
                    suffix=" anos"
                    showButtons
                    placeholder="Idade Inicial"
                    min={0} />

                <InputNumber
                    value={endIdade}
                    onValueChange={(e) => setEndIdade(e.value)}
                    suffix=" anos"
                    showButtons
                    placeholder="Idade Final"
                    min={0} />
            </div>

            <div className='espaco'>
                <InputNumber
                    value={beginIdadeMae}
                    onValueChange={(e) => setBeginIdadeMae(e.value)}
                    suffix=" anos"
                    showButtons
                    placeholder="Idade Inicial Mãe"
                    min={0} />

                <InputNumber
                    value={endIdadeMae}
                    onValueChange={(e) => setEndIdadeMae(e.value)}
                    suffix=" anos"
                    showButtons
                    placeholder="Idade Final Mãe"
                    min={0} />
            </div>


            <div className='espaco'>
                <Calendar
                    value={beginDate}
                    onChange={(e) => setBeginDate(e.value)}
                    locale="br"
                    placeholder="Data Inicial"
                    showIcon />

                <Calendar
                    value={endDate}
                    onChange={(e) => setEndDate(e.value)}
                    locale="br"
                    placeholder="Data Final"
                    showIcon />
            </div>

            <div className='espaco'>
                <Calendar
                    value={beginTime}
                    onChange={(e) => setBeginTime(e.value)}
                    locale="br"
                    placeholder="Hora Inicial"
                    showIcon
                    timeOnly />

                <Calendar
                    value={endTime}
                    onChange={(e) => setEndTime(e.value)}
                    locale="br"
                    placeholder="Hora Final"
                    showIcon
                    timeOnly />
            </div>

        </div>
    );
});

export default FilterForm;
