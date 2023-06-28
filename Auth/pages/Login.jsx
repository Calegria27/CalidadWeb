import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Authcontext } from "../context/Authcontext"
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, Container } from "../../materialUIConfig";
import inped from "../../../calidad-ReactJS/src/assets/img/inped.jpg";
import axios from "axios";



export default function Login() {

  const { login } = useContext(Authcontext)
  const navigate = useNavigate();


  const baseUrl = "http://192.168.1.16:200";



  const onlogin = (user) => {
    login(user);
    navigate('/home', {
      replace: true
    });
  }


  const iniciarSesion = (e) => {
    e.preventDefault();
    const dataform = new FormData(e.currentTarget);
    const data = { Usu_Cuenta: dataform.get("usuario"), Usu_Password: dataform.get("password") }

    axios.post(baseUrl, data)
      .then((response) => {
        if (response.data.length == 0) {
          window.alert("Usuario o contraseña equivocado");
        } else {
          onlogin(response.data[0]["Usu_Cuenta"])
        }
      })
  }

  return (
    <Container component="main" maxWidth="lg" sx={{backgroundColor:"aliceblue"}}
    >
      <Box
        sx={{
          marginTop: 25,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${inped})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src="https://www.cindependencia.cl/wp-content//themes/independencia/assets/img/logo-new-independencia.png" width="198.75" height="50" />
              <Box
                component="form"
                noValidate
                onSubmit={iniciarSesion}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  name="usuario"
                  autoComplete="usuario"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

