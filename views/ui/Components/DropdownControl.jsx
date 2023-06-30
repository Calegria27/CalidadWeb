import {  useEffect, useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "../../../materialUIConfig";
import axios from "axios";


const DropdownControl = (props) => {
    const {selectedEmpresa,selectedObra,selectedSector,selectedUnidad,selectedModelo,controlfun}= props;
    const [control, setControl] = useState('')
    const [datacontrol, setDataControl] = useState('')
    const url= "http://190.82.118.130:200/user/cartillacontrol"
    
                
    useEffect(()=>{
        axios.post(url,{CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: selectedSector.toString(), uFisica:selectedUnidad.toString()})
            .then((response)=>{
                setDataControl(response.data)
            })
    },[selectedModelo])

    const handleChange = (event) => {
        setControl(event.target.value);
    };

    const handleOptionClick = (option) => {
        controlfun(option)
    }

  const cartillas = datacontrol
    ? Object.entries(datacontrol).map(([key, value]) => (
        <MenuItem 
        key={datacontrol[key]["codigo_cartilla"]}
        value={key} onClick={() => handleOptionClick(datacontrol[key]["codigo_cartilla"])} >
        {`${datacontrol[key]["Expr1"]}`}</MenuItem>
    ))
    : null;
  

     return (
         <div>
             <FormControl sx={{ m: 1, minWidth: 240 }}>
                 <InputLabel id="demo-simple-select-helper-label">Cartilla Control Calidad</InputLabel>
                 <Select
                     labelId="DControlCArtilla"
                     id="DControlCArtilla"
                     value={control}
                     label="ControlCArtilla"
                     onChange={handleChange}
                 >
                         {cartillas}
                 </Select>
             </FormControl>
         </div>
     )

 }



export default DropdownControl;