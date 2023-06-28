import { useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Auth/context/Authcontext';
import { Button, Grid, Typography, Container } from "../../materialUIConfig";




export const Navbar = () => {

    const { logout } = useContext(Authcontext);
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate('/',);
    }


    const { user } = useContext(Authcontext);

    return (
        <Container component="main" maxWidth="false">
            <Grid container sx={{ ml: 10 }}>
                <img src="https://www.cindependencia.cl/wp-content//themes/independencia/assets/img/logo-new-independencia.png" width="198.75" height="50" />
            <Typography sx={{ ml: 50 }} component="h1" variant="h3">
                Sistema Calidad Oficial
            </Typography>
            <Button  sx={{ ml: 65, mb: 1, mt:1 }} variant="contained" color='error' onClick={onLogout}>
                    Logout
            </Button>
            </Grid>

        <hr/>
        </Container>
    )
}