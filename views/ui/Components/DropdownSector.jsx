import { useContext, useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "../../../materialUIConfig";
import axios from "axios";


const DropdownSector = (props) => {
    const { selectedEmpresa,selectedObra, sectorfun , unidadfun} = props;
    const [sector, setSector] = useState('')
    const [unidad, setUnidad] = useState('')
    const url = "http://192.168.49.1:200/user/empresas/obras/sector";
    const urlunidad ="http://192.168.49.1:200/user/empresas/obras/sector/ufisica"
    const [dataSector, setDataSector] = useState(null);
    const [dataUnidad, setDataUnidad] = useState(null);


    useEffect(() => {
        
        axios.post(url, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra })
            .then((response) => {

                setDataSector(response.data)

            });
    }, [selectedObra]);

    useEffect(() => {
        
        axios.post(urlunidad, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: sector })
            .then((response) => {
                console.log(response.data)
                setDataUnidad(response.data)

            });
    }, [sector]);


    const handleChange = (event) => {
        setSector(event.target.value);
    };

    const handleOptionClick = (option) => {
        sectorfun(option)
    }


    const sectores = dataSector
        ? Object.entries(dataSector).map(([key, value]) => (
            <MenuItem 
            key={dataSector[key]["Sector"]}
            value={key} onClick={() => handleOptionClick(dataSector[key]["Sector"])} >
            {`${dataSector[key]["Sector"]}`}</MenuItem>
        ))
        : null;


    const unidades  = dataUnidad
    ? Object.entries(dataUnidad).map(([key, value]) => (
        <MenuItem 
        key={dataUnidad[key]["unidadfisica"]}
        value={key} onClick={() => handleOptionClick(dataUnidad[key]["unidadfisica"])} >
        {`${dataUnidad[key]["unidadfisica"]}`}</MenuItem>
    ))
    : null;

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Sector</InputLabel>
                <Select
                    labelId="Dsector"
                    id="Dsector"
                    value={sector}
                    label="sector"
                    onChange={handleChange}
                >
                    {sectores}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Unidad</InputLabel>
                <Select
                    labelId="Dsector"
                    id="Dsector"
                    value={sector}
                    label="sector"
                    onChange={handleChange}
                >
                    {sectores}
                </Select>
            </FormControl>
        </div>
    )

}



export default DropdownSector;