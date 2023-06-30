import { useContext, useReducer, useState } from "react";
import { Button, Container } from "../materialUIConfig";
import { Authcontext } from "../Auth/context/Authcontext";
import DropdownEmpresa from "../views/ui/Components/DropdownEmpresa"
import DropdownObra from "../views/ui/Components/DropdownObra"
import DropdownSector from "../views/ui/Components/DropdownSector"
import DropdownControl from "./ui/Components/DropdownControl";
import DropdownTarifado from "./ui/Components/DropdownTarifado";
import CheckList from "./ui/Components/CheckList";
import axios from "axios";

const MainView = () => {
    const { user } = useContext(Authcontext)
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [selectedObra, setSelectedObra] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedUnidad, setSelectedUnidad] = useState(null);
    const [selectedModelo, setSelectedModelo] = useState(null);
    const [selectedCartilla, setSelectedCartilla] = useState(null);
    const [selectedTarifado, setSelectedTarifado] = useState(null);
    const [dataApprove, setDataApprove] = useState([]);
    const [reduceValue, forceUpdate] = useReducer(x => x + 1, 0);
    const url = "http://190.82.118.130:200/user/exec";
   

    const handleEmpresaSelection = (empresa) => {
        setSelectedEmpresa(empresa);
        setSelectedObra(null);
        setSelectedSector(null)
        setSelectedUnidad(null)
        setSelectedModelo(null)
        setSelectedCartilla(null)
        setSelectedTarifado(null)
        setDataApprove([])
    };

    const handleObraSelection = (obra) => {
        setSelectedObra(obra);
        setSelectedSector(null)
        setSelectedUnidad(null)
        setSelectedModelo(null)
        setSelectedCartilla(null)
        setSelectedTarifado(null)
        setDataApprove([])
    };

    const handleSectorSelection = (sector) => {
        setSelectedSector(sector)
        setSelectedUnidad(null)
        setSelectedModelo(null)
        setSelectedCartilla(null)
        setSelectedTarifado(null)
        setDataApprove([])
    }

    const handleUnidadSelection = (unidad) => {
        setSelectedUnidad(unidad)
        setSelectedModelo(null)
        setSelectedCartilla(null)
        setSelectedTarifado(null)
        setDataApprove([])
    }

    const handleModeloSelection = (modelo) => {
        setSelectedModelo(modelo)
        setSelectedCartilla(null)
        setSelectedTarifado(null)
        setDataApprove([])
    }

    const updateData = (data) => {
        for (const aprobacion of data){
            console.log( {Id: aprobacion[0].toString(), User: aprobacion[1], Estado: aprobacion[2].toString()})
            axios.post(url, { Id: aprobacion[0].toString(), User: aprobacion[1], Estado: aprobacion[2].toString()})
            forceUpdate();
        }
    }

    return (
        <Container component="main" maxWidth="lg"  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <h2>Usuario: {user}</h2>
            <DropdownEmpresa onEmpresaSelected={handleEmpresaSelection} />
            {selectedEmpresa &&
                <DropdownObra selectedEmpresa={selectedEmpresa} obrafun={handleObraSelection} />
            }
            {selectedObra &&
                <DropdownSector selectedEmpresa={selectedEmpresa} selectedObra={selectedObra} sectorfun={handleSectorSelection} unidadfun={handleUnidadSelection} modelofun={handleModeloSelection} />
            }
            {selectedUnidad &&
                <Container component="main" maxWidth="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1>Seleccione Cartillas Control de Calidad</h1>
                    <DropdownControl selectedEmpresa={selectedEmpresa} selectedObra={selectedObra} selectedSector={selectedSector}
                        selectedUnidad={selectedUnidad} selectedModelo={selectedModelo} controlfun={setSelectedCartilla} />
                </Container>

            }
            {selectedCartilla &&
                <DropdownTarifado selectedEmpresa={selectedEmpresa} selectedObra={selectedObra} selectedSector={selectedSector}
                    selectedUnidad={selectedUnidad} selectedCartilla={selectedCartilla}  tarifadofun={setSelectedTarifado} />
            }
            {selectedTarifado &&
                <Container component="main" maxWidth="lg" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h1>Detalle Checklist Control Calidad</h1>
                    <CheckList selectedEmpresa={selectedEmpresa} selectedObra={selectedObra} selectedSector={selectedSector}
                        selectedUnidad={selectedUnidad} selectedCartilla={selectedCartilla} selectedTarifado={selectedTarifado} CheckListfun={setDataApprove}
                        reduceValue={reduceValue} />
                    {dataApprove.length>0 &&
                        <Button sx={{ ml: 65, m: "auto", mt: 3 }} variant="contained" color='success' onClick={() => updateData(dataApprove)}>
                            Aprobar Partida
                        </Button>}
                </Container>
            }
        </Container>
    )
}

export default MainView;