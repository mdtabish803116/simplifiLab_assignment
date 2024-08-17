import "../Styles/Login.css"
import React from 'react'
import TextField from '@mui/material/TextField';
import { InputAdornment,IconButton , Button} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ShadowButton from "../Components/ShadowButton";
import googleIcon from "../Images/googleImage.png";
import { Link } from "react-router-dom";


function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className = "loginContainer">

          <div style = {{display: "flex", justifyContent:"center", marginTop:"10px"}}>
              <img  width="100px" height= "50px" src = "data:image/png;base64,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"/>
          </div>

          <div style = {{display:"flex", justifyContent:"center"}}>
            <form className="formContainer">
             <p style = {{textAlign:"center", marginBottom:"30px", marginTop: "40px", fontSize: "1.1rem"}}>Login to Dashboard</p>
                 
                 <TextField
                    placeholder="Email/UserName" 
                    variant="standard"     
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <MailOutlineIcon
                               sx={{ fontSize: '16px', fontWeight:"bold"}}
                            />
                        </InputAdornment>
                        ),
                        sx: {
                        paddingLeft: '10px',  
                        paddingRight: '10px',
                        backgroundColor: '#f0f0f0', 
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {          
                           backgroundColor: '#f0f0f0', 
                           height: '50px',
                           borderRadius: '25px' ,
                           transition: 'background-color 0.3s',
                         },
                         '&:hover .MuiInputBase-root': {
                            backgroundColor: '#e0e0e0',    
                          },
                          '& .MuiInput-underline:before': {
                            borderBottom: '1px solid #FF9933',      
                            left: '20px',                    
                            right: '20px',
                          },
                          '& .MuiInput-underline:hover:before': {
                            borderBottom: '0.5px solid gray',
                          },
                          '& .MuiInput-underline:after': {
                            borderBottom: '2px solid #FF9933', 
                            left: '20px',                    
                            right: '20px',
                          },
                            width: "100%",
                            marginBottom: "20px"
                    }}
                 />

                  <TextField
                    placeholder="Password" 
                    variant="standard"  
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}   
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon
                               sx={{ fontSize: '16px', fontWeight:"bold"}}
                            />
                        </InputAdornment>
                        ),
                        endAdornment:( 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((show) => !show)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff 
                                     sx={{ fontSize: '16px',
                                     marginRight:"10px"
                                     }}
                                     /> : <Visibility
                                     sx={{ fontSize: '16px',
                                        marginRight:"10px"
                                     }} 
                                     />}
                                    </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                        paddingLeft: '10px',  
                        paddingRight: '10px',
                        backgroundColor: '#f0f0f0', 
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {          
                           backgroundColor: '#f0f0f0', 
                           height: '50px',
                           borderRadius: '25px' ,
                           transition: 'background-color 0.3s',
                         },
                         '&:hover .MuiInputBase-root': {
                            backgroundColor: '#e0e0e0',    
                          },
                          '& .MuiInput-underline:before': {
                            borderBottom: '1px solid #FF9933',      
                            left: '20px',                    
                            right: '20px',
                          },
                          '& .MuiInput-underline:hover:before':{
                            borderBottom: '0.5px solid gray',
                          },
                          '& .MuiInput-underline:after': {
                            borderBottom: '2px solid #FF9933', 
                            left: '20px',                    
                            right: '20px',
                          },
                            width: "100%",
                            marginBottom: "20px"
                    }}
                />

                <p style ={{textAlign:"right",color:"rgba(0, 0, 0, 0.7)" , marginBottom:"20px"}}>Forgot Password?</p>

            <Button 
              variant="contained"
              sx={{
                backgroundColor: "rgb(236, 147, 36)",  
                color: "white",            
                width: "100%",    
                borderRadius: '23px', 
                height:"46px", 
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: "rgb(236, 147, 36)",
                  },  
                  marginBottom: "25px",        
                }}
              >
               Sign in
              </Button>

              <ShadowButton image = {googleIcon} hasImage = {true} title = "Sign in with Google"/>

              <p style = {{textAlign:"center", margin: "20px"}}>OR</p>

              <ShadowButton image = "" hasImage = {false} title = "Login with OTP"/>

            </form>
          </div>

          <p style={{fontSize: "22px", textAlign:"center", marginTop:"30px"}}>
              Don't have an account?
             <Link to = "/register" style = {{fontSize: "22px",marginLeft:"5px",textDecoration:"none",color:"blue"}}>Register as an expert</Link>
          </p>

    </div>
  )
}

export default Login