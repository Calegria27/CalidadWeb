import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Auth/context/Authcontext';
import { Box, Button, Typography } from "../../materialUIConfig";
import { Stack } from '@mui/material';




export const Navbar = () => {

    const { logout } = useContext(Authcontext);
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate('/',);
    }



    return (
        <>
            <div>
                <img src="https://www.cindependencia.cl/wp-content//themes/independencia/assets/img/logo-new-independencia.png" width="198.75" height="50" />
            </div>
            <div>
                <Typography component="h1" variant="h3">
                    Sistema Calidad Oficial
                </Typography>
            </div>
            <div>
                <Button variant="contained" color='error' onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </>

    )
}