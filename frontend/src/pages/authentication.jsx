import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{textDecoration:"none"}} color="inherit" href="https://portfolio-five-jade-11.vercel.app/">
       Veemsen.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//cc Section^



const defaultTheme = createTheme();

export default function Authentication() {

  const[username,setUsername]=React.useState();
  const[password,setPassword]=React.useState();
  const[name,setName]=React.useState();
  const[error,setError]=React.useState();
  const[message,setMessage]=React.useState();

  const[formState,setFormState]=React.useState(0);
  const[open,setOpen]=React.useState(false);
   
  const {handleRegister,handleLogin}=React.useContext(AuthContext);
  const navigate = useNavigate();
 

  let handleAuth=async()=>{
    try{
      if(formState===0){
            let result=await handleLogin(username,password)
            setUsername("");  // Clear after login
            setPassword("");
            setError("");
            navigate("/home");
      }
      if(formState===1){
          let result =await handleRegister(name,username,password);
          console.log(result);
          setUsername("")
          setMessage(result);
          setOpen(true);
          setError("")
          setFormState(0);
          setPassword("")
      }
    }catch(err){
      // let message=(err.response.data.message);
      let message = err.response?.data?.message || "An error occurred";
      setError(message);
    }
  }
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          sx={{
            backgroundImage: 'url(https://picsum.photos/1920/1080)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:'#f5f5f5',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',        
            minWidth: '69.7%',      // 
      
          }}
        />
        <Grid 
       
        component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 400,   // 
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
              <div> 
               
                <Button variant={formState===0?"contained":""} onClick={()=>{setFormState(0)}}> 
                  Sign In
                </Button>
                <Button variant={formState===1?"contained":""}onClick={()=>{setFormState(1)}}>
                  Sign Up
                </Button>
              </div>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              {formState===1?
              <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Full Name"
              name="username"
              value={name}
              autoFocus
              onChange={(e)=>setName(e.target.value)}
            />:<></>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                onChange={(e)=>setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <p style={{color:"red"}}>{error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}

              >
                {formState ===0?"Login":"Register"}
              </Button>
            </Box>
          </Box>
        <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>

              <Snackbar
              
              open={open}
              autoHideDuration={4000}
              message={message}

              />

           

    </ThemeProvider>
  );
}
