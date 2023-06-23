import {useContext,useEffect, useReducer, useState } from "react";
import { Authcontext } from "../../../Auth/context/Authcontext";
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow,Paper } from "../../../materialUIConfig";
import axios from "axios";


const CheckList = (props) => {
    const { user } = useContext(Authcontext)
    const {selectedEmpresa,selectedObra,selectedSector,selectedUnidad,selectedCartilla, selectedTarifado,CheckListfun,reduceValue}= props;
    const [dataChecklist, setdataChecklist] = useState('')
    const url= "http://192.168.49.1:200/user/cartllacontrol/tarifado/list"

    useEffect(()=>{
        CheckListfun([])
        axios.post(url,{CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: selectedSector.toString(), uFisica:selectedUnidad.toString(),
                        Cartilla:selectedCartilla, Tarifado:selectedTarifado })
            .then((response)=>{
                console.log({CtoEmpresa: selectedEmpresa, CtoCodigo: selectedObra, Sector: selectedSector.toString(), uFisica:selectedUnidad.toString(),
                    Cartilla:selectedCartilla, Tarifado:selectedTarifado })
                setdataChecklist(response.data)
            })
    },[selectedTarifado,reduceValue])

    useEffect(()=>{
        const idsArray=[];
        const ids= Object.entries(dataChecklist).map(([key,row])=>{
            if (row.vb1=="PENDIENTE"){
                console.log(row)
                const result = [row.id, user,row.ESTADO];
                idsArray.push(result);
            }else{
                CheckListfun([])
            }
            
        })
        CheckListfun(idsArray)
    },[dataChecklist])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Contratista</StyledTableCell>
                        <StyledTableCell align="right">Tarifado</StyledTableCell>
                        <StyledTableCell align="right">Actividad</StyledTableCell>
                        <StyledTableCell align="right">Estado</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(dataChecklist).map(([key,row]) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Contratista1}</StyledTableCell>
                            <StyledTableCell align="right">{row.TARIFADO}</StyledTableCell>
                            <StyledTableCell align="right">{row.ACTIVIDAD}</StyledTableCell>
                            <StyledTableCell align="right">{row.vb1}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CheckList;