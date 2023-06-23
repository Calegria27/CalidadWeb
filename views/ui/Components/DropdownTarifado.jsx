import {  useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "../../../materialUIConfig";
import axios from "axios";

const DropdownTarifado = (props) => {
    const { selectedEmpresa, selectedObra, selectedSector, selectedUnidad, selectedCartilla, tarifadofun } = props
    const [tarifado, setTarifado] = useState('')
    const [dataTarifado, setDataTarifado] = useState('')
    const url = "http://192.168.49.1:200/user/cartllacontrol/tarifado"

    useEffect(() => {
        axios.post(url, { CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: selectedSector.toString(), uFisica: selectedUnidad.toString(), Cartilla: selectedCartilla })
            .then((response) => {
                setDataTarifado(response.data)
            })
        tarifadofun(null)
    }, [selectedCartilla])

    const handleChange = (event) => {
        setTarifado(event.target.value);
    };

    const handleOptionClick = (option) => {
        tarifadofun(option)
    }

    const tarifados = dataTarifado
        ? Object.entries(dataTarifado).map(([key, value]) => (
            <MenuItem
                key={dataTarifado[key]["codtarifado"]}
                value={key} onClick={() => handleOptionClick(dataTarifado[key]["codtarifado"])} >
                {`${dataTarifado[key]["TARIFADO"]}`}</MenuItem>
        ))
        : null;

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 240 }}>
                <InputLabel id="demo-simple-select-helper-label">Partida del Tarifado</InputLabel>
                <Select
                    labelId="DControlCArtilla"
                    id="DControlCArtilla"
                    value={tarifado}
                    label="ControlCArtilla"
                    onChange={handleChange}
                >
                    {tarifados}
                </Select>
            </FormControl>
        </div>
    )
}
export default DropdownTarifado;