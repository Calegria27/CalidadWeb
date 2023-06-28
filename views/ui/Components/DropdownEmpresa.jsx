import { useContext, useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "../../../materialUIConfig";
import axios from "axios";
import { Authcontext } from "../../../Auth/context/Authcontext";


const DropdownEmpresa = (props) => {
    const { onEmpresaSelected } = props;
    const {user}= useContext(Authcontext)
    const [empresa, setEmpresa] = useState('')
    const url = "http://192.168.1.16:200/user/empresas";
    const [dataempresas, setDataempresas] = useState(null);

    useEffect(() => {
        axios.post(url, {}, { params: { item: user, } })
            .then((response) => {
                setDataempresas(response.data)
            });
    }, []);

    const handleChange = (event) => {
        setEmpresa(event.target.value);
    };

    const handleOptionClick = (option, name) => {
        onEmpresaSelected(option);
    };

    const empresas = dataempresas
        ? Object.entries(dataempresas).map(([key, value]) => (
            <MenuItem
            key={dataempresas[key]["empCodigo"]}
            value={key}
                onClick={() => handleOptionClick(dataempresas[key]["empCodigo"], dataempresas[key]["empNombre"])}
            >{`${dataempresas[key]["empCodigo"]}: ${dataempresas[key]["empNombre"]}`}</MenuItem>
        ))
        : null;

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Empresa</InputLabel>
                <Select
                    labelId="Dempresa"
                    id="Dempresa"
                    value={empresa}
                    label="Empresa"
                    onChange={handleChange}
                >
                        {empresas}
                </Select>
            </FormControl>
        </div>
    )

}



export default DropdownEmpresa;