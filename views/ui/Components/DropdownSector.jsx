import {  useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, Select, Button } from "../../../materialUIConfig";
import axios from "axios";


const DropdownSector = (props) => {
    const { selectedEmpresa,selectedObra, sectorfun , unidadfun, modelofun} = props;
    const [sector, setSector] = useState('')
    const [unidad, setUnidad] = useState('')
    const url = "http://192.168.1.16:200/user/empresas/obras/sector";
    const urlunidad ="http://192.168.1.16:200/user/empresas/obras/sector/ufisica"
    const urlmodelo ="http://192.168.1.16:200/user/empresas/obras/sector/ufisica/modelo"
    const [dataSector, setDataSector] = useState(null);
    const [dataUnidad, setDataUnidad] = useState(null);
    const [modelo, setModelo] = useState(null);


    useEffect(() => {
        
        axios.post(url, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra })
            .then((response) => {
                setDataSector(response.data)

            });
    }, [selectedObra]);

    useEffect(() => {
        
        axios.post(urlunidad, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: sector })
            .then((response) => {
                setUnidad('')
                setDataUnidad(response.data)

            });
    }, [sector]);

    useEffect(() => {
        
        axios.post(urlmodelo, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: sector, uFisica:unidad })
            .then((response) => {
                const mod=response.data[0]
                setModelo(mod.CodMaeVivienda)
                modelofun(mod.CodMaeVivienda)
            });
    }, [unidad]);


    const handleChange = (event) => {
        setSector(event.target.value.toString());
    };

    const handleChangeUnidad = (event) => {
        setUnidad(event.target.value.toString());
    };

    const handleOptionClick = (option) => {
        sectorfun(option)
    }

    
    const handleOptionClickunidad = (option) => {
        unidadfun(option)
    }
    
    const sectores = dataSector
        ? Object.entries(dataSector).map(([key, value]) => (
            <MenuItem 
            key={dataSector[key]["Sector"]}
            value={value.Sector} onClick={() => handleOptionClick(dataSector[key]["Sector"])} >
            {`${dataSector[key]["Sector"]}`}</MenuItem>
        ))
        : null;


    const unidades  = dataUnidad
    ? Object.entries(dataUnidad).map(([key, value]) => (
        <MenuItem 
        key={dataUnidad[key]["unidadfisica"]}
        value={value.unidadfisica} onClick={() => handleOptionClickunidad(dataUnidad[key]["unidadfisica"])} >
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
                    labelId="Dunidad"
                    id="Dunidad"
                    value={unidad}
                    label="unidad"
                    onChange={handleChangeUnidad}
                >
                    {unidades}
                </Select>
            </FormControl>
            <Button  sx={{ m: 2, minWidth: 120 }} variant="contained" disabled>
                 {modelo}
            </Button>
        </div>
    )

}



export default DropdownSector;