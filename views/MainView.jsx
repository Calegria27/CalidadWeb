import { useContext, useState } from "react";
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, Container } from "../materialUIConfig";
import { Authcontext } from "../Auth/context/Authcontext";
import DropdownEmpresa from  "../views/ui/Components/DropdownEmpresa"
import DropdownObra from "../views/ui/Components/DropdownObra"
import DropdownSector from "../views/ui/Components/DropdownSector"

const MainView=()=>{

    const {user}= useContext(Authcontext)
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedObra, setSelectedObra] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedUnidad, setSelectedUnidad] = useState(null);
 
    const handleEmpresaSelection = (empresa) => {
        setSelectedEmpresa(empresa);
        setSelectedObra(null); 
      };

    const handleObraSelection = (obra) => {
        setSelectedObra(obra);
     };

    const handleSectorSelection=(sector)=>{
        setSelectedSector(sector)
    }

    const handleUnidadSelection=(sector)=>{
        setSelectedUnidad(sector)
    }
    
    
    return(
       <Container component="main" maxWidth="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2>Usuario: {user}</h2>
            <DropdownEmpresa onEmpresaSelected={handleEmpresaSelection}/>
            {selectedEmpresa && 
                <DropdownObra selectedEmpresa={selectedEmpresa} obrafun={handleObraSelection}/>
            }
            {selectedObra &&
                <DropdownSector selectedEmpresa={selectedEmpresa} selectedObra={selectedObra} sectorfun={handleSectorSelection} unidadfun={handleUnidadSelection}/>
            }
       </Container>
    )
}

export default MainView;