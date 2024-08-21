import "../Styles/Register.css"
import React , {useState, useRef, useEffect}from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { InputAdornment,IconButton , Button} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import axios from 'axios';
import SnackbarToast from "../Components/SnackbarToast";
import CustomBox from "../Components/CustomBox";


const titleData = [
  {
    value: 'mr',
    label: 'Mr.',
  },
  {
    value: 'mrs',
    label: 'Mrs',
  },
  {
    value: 'miss',
    label: 'Miss',
  },
  {
    value: 'dr',
    label: 'Dr.',
  },
  {
    value: 'ms',
    label: 'Ms.',
  },
  {
    value: 'prof',
    label: 'Prof.',
  }
];

const countryCodeData = [
  {
    value: '+91',
    label: 'india(+91)',
  },
  {
    value: '+93',
    label: 'afghanistan(+93',
  },
  {
    value: '+358',
    label: 'aland islands(+358)',
  },
  {
    value: '+355',
    label: 'albania(+355)',
  },
  {
    value: '+213',
    label: 'algeria(+213)',
  },
  {
    value: '+244',
    label: 'angolla(+244)',
  },
{
  value: '+297',
  label: 'australia(+297)',
},
{
  value: '+1264',
  label: 'anguilla(+1264)',
},
{
  value: '+374',
  label: 'armenia(+374)',
},
];

function Register() {

  const [getOTPClicked , setGetOTPClicked] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(" ");
  const [countryCode , setCountryCode] = useState(" ");
  const [name , setName] = useState("");
  const [mobileNumber , setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otpText , setOtpText] = useState("");

  // emailOTPService Section
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpirationTime, setOtpExpirationTime] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [OTPLoading , setOTPLoading] = useState(false);
  const [otpSendingError , setOtpSendingError] = useState({
       error : false,
       message : ""
  });
  const [countdown, setCountdown] = useState(60);
  const [maxAttempts , setMaxAttempts] = useState(false);
  const [otpExpired , setOTPExpired] = useState(false);
  const [otpVerified , setOTPVerified] = useState(false);
  const [otpVerifyError , setOTPVerifyError] = useState(false);
  const [otpCheckSent, setOTPCheckSent] = useState(false);

  

  // TextFeildFocus SEction
  const titleRef = useRef(null);
  const countryCodeRef = useRef(null);
  const nameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const emailRef = useRef(null);
  const otpTextRef = useRef(null);

  // Error state
  const [titleError , setTitleError] = useState({
     message : "",
     error: false
   });

   const [nameError , setNameError] = useState({
    message : "",
    error: false
  });

  const [countryCodeError , setCountryCodeError] = useState({
    message : "",
    error: false
  });

  const [mobileNumberError , setMobileNumberError] = useState({
    message : "",
    error: false
  });

  const [emailError , setEmailError] = useState({
    message : "",
    error: false
  });

  const [OTPError , setOTPError] = useState({
    message : "",
    error: false
  });


  function validateTextFeilds(){

    if (selectedTitle.trim() === ""){
      setTitleError({
        message: "This feild is required",
        error: true
      })
    }

    if(name === ""){
      setNameError({
        message: "This feild is required",
        error: true
      })
    }else if(!validateName(name)){
      setNameError({
        message: "Name should start with alphabet",
        error: true
      })
    }

    if(countryCode.trim() === ""){
      setCountryCodeError({
        message: "This feild is required",
        error: true
      })
    }

    if(mobileNumber === ""){
      setMobileNumberError({
        message: "This feild is required",
        error: true
      })
    }else if(!validateMobileNumber(mobileNumber)){
      setMobileNumberError({
        message: "Mobile number should not start with 0 or special characters like + and range (6 to 12)",
        error: true
      })
    }

    if(email === ""){
      setEmailError({
        message: "This feild is required",
        error: true
      })
    }else if(!validateEmail(email)){
      setEmailError({
        message: "Please Enter valid email",
        error: true
      })
    }

    return (selectedTitle.trim() !== "") && (name !== "") && (countryCode.trim() !== "") && 
           (mobileNumber !== "") && (email !== "") && (validateName(name)) && 
           (validateMobileNumber(mobileNumber)) && (validateEmail(email))

  }

  function handleGenerateOTP(){
    setTimeout(() => {
           setOtpExpirationTime(null);
           setOTPExpired(false)
           setOtpSent(false);
           setOtpSendingError({
            error: false,
            message : ""
           });
           setCooldown(false);
           setOTPCheckSent(false);
           setCountdown(60);
           setGetOTPClicked(true)
    } , 1)
           
    const isValid = validateTextFeilds();
   
    if(!isValid){
      if(selectedTitle.trim() === ""){
        titleRef.current.focus()
      }else if(name === "" || !validateName(name)){
        nameRef.current.focus()
      }else if(countryCode.trim() === ""){
        countryCodeRef.current.focus()
      }else if(mobileNumber === "" || !validateMobileNumber(mobileNumber)){
        mobileNumberRef.current.focus()
      }else if(email === "" || !validateEmail(email)){
        emailRef.current.focus();
      }
    }else {
      
    // const newOtp = generateOTP();
    // setGeneratedOtp(newOtp);
    sendOtpEmail();
    }

    if(otpSent){
      handleVerifyOtp()
    }
  }

  function validateName(name) {
    const nameRegex = /^[A-Za-z]/;
    return nameRegex.test(name);
}

  function validateMobileNumber(number) {
    const mobileRegex = /^[1-9][0-9]{5,11}$/;
    return mobileRegex.test(number);
}

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateOTP(otp) {
  const isNumeric = /^\d+$/.test(otp);
  return isNumeric;
}

  function generateOTP(){
     return Math.floor(100000 + Math.random() * 900000).toString();
}  

function getLastSixDigits(mobileNumber) {
  const mobileString = mobileNumber.toString();
  
  const lastSixDigits = mobileString.slice(-6);
  
  return lastSixDigits;
}

const sendOtpEmail = async (otp) => {
  // const templateParams = {
  //     subject: "OTP Code",
  //     to_email: email,
  //     from_name: "simplifiiLabs",
  //     recipient_name: name,     
  //     sender_name: "simplifiiLabs",  
  //     message_content1: `OTP - ${otp}`
  // };

  // setOTPLoading(true)
//   emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, 
//     process.env.REACT_APP_EMAILJS_TEMPLATE_ID, templateParams, 
//     process.env.REACT_APP_EMAILJS_USER_ID_PUBLIC)
//       .then((response) => {
//            setOtpExpirationTime(Date.now() + 300000);
//            setOtpSent(true);
//            setOtpSendingError(false);
//            setCooldown(true);
//            setOTPLoading(false);
//            setOTPCheckSent(true)
//       })
//       .catch((error) => {
//           setOtpSendingError(true);
//           setOtpSent(false);
//           setCooldown(false);
//        }).finally(() => {
//           setOTPLoading(false);
//       })

const API_URL = `${process.env.REACT_APP_BASE_URL}/self-registration/register`
const userData = {
    email,
    mobile : `${countryCode}${" "+mobileNumber}`,
    name,
    salutation: selectedTitle
}

setOTPLoading(true)
try {
  const response = await axios.post(API_URL, userData, {
    headers: {
      'Content-Type': 'application/json',
      },
    });
     console.log("response",response)
     if(response.data.success){ 
        setOtpExpirationTime(Date.now() + 300000);
        setOtpSent(true);
        setCooldown(true);
        setOTPLoading(false);
        setOTPCheckSent(true);
        setOtpSendingError({error:false , message: ""})
     }

   } catch (error) {

    setOtpSent(false);
    setCooldown(false);
    setOTPLoading(false)
    if(error.response.data.already_registered_user){
      setOtpSendingError({error:true , message:error.response.data.message})
    }else {
      setOtpSendingError({error:true , message: "Error while sending OTP"});
    } 
  }finally{
    setOTPLoading(false)
  }

 };


const handleVerifyOtp = async() => {
    setMaxAttempts(false)
    setOTPExpired(false)
    setOTPVerified(false)
    setOTPVerifyError(false)
    setOTPCheckSent(false)
    setOtpSendingError({error:false , message: ""});


    const API_URL = `${process.env.REACT_APP_BASE_URL}/self-registration/verify-otp`
    const userData = {
        action: "SelfRegister",
        email,
        otp : getLastSixDigits(mobileNumber)
    }

    if (attempts >= 5) {
         setTimeout(()=> {setMaxAttempts(true)} , 1)
     }else if (Date.now() > otpExpirationTime) 
         {setTimeout(()=> {setOTPExpired(true)} , 1)
         return
    }
 setOTPLoading(true)
   try {
     const response = await axios.post(API_URL, userData, {
    headers: {
      'Content-Type': 'application/json',
      },
    });
     console.log("responseOTP",response)
     setOTPLoading(false)
     if(response.status === 200 && otpText === getLastSixDigits(mobileNumber)){
       setOTPVerified(true)
     }else {
      setOTPVerifyError(true)
     }
    
   } catch (error) {
    setOTPLoading(false)
    setOTPVerifyError(true)

  }finally{
    setAttempts(attempts + 1);
    setOTPLoading(false)
  }

 };
    

//   if (attempts >= 5) {
//      setTimeout(()=> {setMaxAttempts(true)} , 1)
//   }else {
//     if (Date.now() > otpExpirationTime) 
//       {setTimeout(()=> {setOTPExpired(true)} , 1)
//       return;
//   }

//   if (otpText === getLastSixDigits(mobileNumber)) {
//     setTimeout(()=> {setOTPVerified(true)} , 1)
//   } else {
//     setTimeout(()=> {setOTPVerifyError(true)} , 1)
//   }
//   }

 
// };

useEffect(() => {

   if(getOTPClicked){
      if(selectedTitle.trim() === ""){
         setTitleError({
            message: "This feild is required",
            error: true
         })
      }else{
         setTitleError({
           message: "",
           error: false
      })
      }

    if(name === "" || !validateName(name)){
        setNameError({
            message: (name === "")? "This feild is required":"Please start with alphabet and remove extra spaces",
            error: true
         })
       }else{
        setNameError({
         message: "",
         error: false
        })
      }

      if(countryCode.trim() === ""){
      setCountryCodeError({
         message: "This feild is required",
         error: true
      })
      }else{
      setCountryCodeError({
      message: "",
      error: false
      })
     }

     if(mobileNumber === "" || !validateMobileNumber(mobileNumber)){
      setMobileNumberError({
         message: (mobileNumber === "")? "This feild is required":
         "Mobile number should not start with 0 or special characters like + and range (6 to 12)",
         error: true
      })
     }else{
      setMobileNumberError({
      message: "",
      error: false
     })
    }

    if(email === "" || !validateEmail(email)){
      setEmailError({
         message: (email === "")? "This feild is required":
         "Please enter valid email id",
         error: true
      })
     }else{
      setEmailError({
      message: "",
      error: false
     })
    }

    if(otpSent){
      if(otpText === "" || otpText.length > 6 || !validateOTP(otpText)){
        let mssg = ""
        if(otpText === ""){
          mssg = "This feild is required"
        }else if(otpText.length > 6){
          mssg = "OTP should be up to 6 characters."
        }else {
          mssg = "Please enter correct OTP"
        }
        setOTPError({
           message: mssg,
           error: true
        })
       }else{
          setOTPError({
            message: "",
            error: false
       })
      }
    }
  }
    
}, [getOTPClicked,selectedTitle , name , countryCode, 
  mobileNumber , email, otpText, otpSent])
  
// EmailOTP Section

useEffect(() => {
  if (cooldown) {
      const cooldownTimer = setTimeout(() => {
          setCooldown(false);
      }, 60000); 
      return () => clearTimeout(cooldownTimer);
  }
}, [cooldown]);

useEffect(() => {
  if (otpExpirationTime) {
      const expirationTimer = setTimeout(() => {
          setGeneratedOtp(""); 
      }, 300000); 
      return () => clearTimeout(expirationTimer);
  }
}, [otpExpirationTime]);

useEffect(() => {
  if(cooldown){
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
              clearInterval(intervalId); 
              return prevCountdown; 
          }
          return prevCountdown - 1; 
      });
  }, 1000);

  return () => clearInterval(intervalId);
  }
  
}, [cooldown])



  return (
    <div className = "registerContainer">
         <div style = {{display: "flex", justifyContent:"center", marginTop:"10px"}}>
              <img  width="100px" height= "50px" src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAMAAAD0WI85AAAA2FBMVEVHcEztmCfslSLslSLslSKbf2LslSKPembtmCfslSJ9eHZ4cnFvaWp0bm5vaWqCfXqEf3zslSKEf3xvaWpvaWpvaWqEf3x9eHZvaWqEf3zslSJvaWpvaWrsliNvaWrslSKEf3xvaWqEf3yEf3xvaWpvaWqEf3zsliJvaWpvaWpvaWrslSKEf3yEf3zslSKEf3zslSKEf3yEf3xvaWrslSLslSLslSKEf3yEf3zslSKEf3xvaWqEf3zslSLslSJvaWpvaWrslSLslSLslSLsfwBvaWrslSKEf3wnlXcMAAAARHRSTlMADZpR+wn2AxfYERoqIac5jc6bUN5zRzKhyD7lXiI/42/7WqvqkNjEsoHQ7Cj5SuOM6vz3RakS9n838vK4ti7twntjcEQBplMAAAsQSURBVHja7JoLd6I8E4DxglEQpShSKiJKpdZLEVxF8dbao/z/f/QlAeQitrRrv/f1PZ09e9YlYTJPJpeZBIL4lV/5lV/5lV+5gpDFYuY/gFF835RKT2+tW+fYPh2xlP7cuD88juOxvbxpkLfjSWbkDXPM7wKQ4faWZ8gwAMnnbhhkWQiB7G8YpNUOQAq3vG6RswCkVLzlVeslGFvvN738gjefJHvjYQrY3+XRdvh2++FWMff2tv8HQq3t/m2/vfneIzJvbTwQyFsHmXib19uNcyyH/47ACFCphwQoy2Xg/mIY8jxYvd6qn8lNsm9f6heG7w9eeSpVXer5cfrYQ3WZ+3qzL3uPsyeQydU29wlefh/Se0OqH5A8p6ot4boSbOce/RjQkSkC5WqT5MHdEWcg7Qv8FNt2eE01urD5h3vokCb60am5j//4+3Dh4Vog3mi9m6esLzy6HIcK+BJIeef7JhLkZckrr4OpQXiPoy4TfwFCFGfIJ4Xs9SLV7BdBnpE5O75WTle9cgEErTGzycsV98NvgQyotOovglxdvgXy+p8BIW8JhCzLNakmhDofAOCB0NTZ3j5vbbetOUgNkln+WcZzB0AzDH3B22S5xvO8JDPgayC01G9OO4fOavAseCGGVOlXKgNkzmowgHt7CGWey961h8P2XTZXTAfS2hQKhU04fSDl5/6g2ay/3kv0mZllvt/sIAXTeqVGpQcB0uBwksceg57Jq+DRASqdhlagp/xpq37KgUSQxwgIcDeSbNCi3D/p7wz4KArda4bb7stpQaje9BCWAdqQe4eY9PzOnQUYaHOYzD8HmZfcZjOnFlcR3a9hW+VBrOUdD1KB0P24zU3Jm+Zh4b1Uzz0/Hj7NZk/u8VJ2fgmkI0UPovxm6cpZi7XAV8144WF6TpIAQvlaV/VB03PNY40oDzqHiINd97cwR+l9mwEgs30rRQOPSx7xQTLRFjurlT8Wmr5PynXPDa+V+37ds2FVSwHidf2AF2iaqfVcCwYMwdRqkoSd9chLkjflSKxgdpq1LTT4836WAT7xyFMm3GK9V5MFmX/t+C3iBlwVu55AAbis1fqR0o9AZLfJeyY6Qr0ZgWdKnY6ejIXGEpFBGtvbZJBDLQnEbxGHPYCgvETBbbGGXVQ/eYDkd+GB/QGIG+f1yCDHwyTNchIIDmM38OWHyZIgclkYlc83CA2kBwG4xc5zsJzL9VOLZD8yznDcin3SJz8BoevhDMjtlFXQBTEQdJ4/hNbn2jDXAxucoT3AZ+1WepAynswV8qxFlLsJu7Pup16xDcwnIPI0PJZD5vTBaTgHIHvkEJJolVyE0vFp7u4R+/QgOIt8FM5a7KBISDo3GuBUYid8AiLFJgHuoM4p5I2BTNzzg/djAV+v5ArommV/2upSgfSCboq2iOx/vlS4kj8B4RMGILYCWw+iIKjz8y/onw1+Y36HknCUyLr/P1u1EkDcOrEjAFx9JXiUlWghHjQpQaJdgEex698oCLnBaTecHG7Sn7lDxyLoHMBdj1KB9BMWITxTka29hLQaB0vfB2kmgICNe0OU9a5X4Nz3PPJ3IACfVQQeiZojrK7uEfw6nNe5PN5LirPjcIlmDBxaIC1Ioq1490Bdd10Q5iLI3j1KQnvH02RyhzcQvGpNiNQekULblO+Rnp+IJoKgJXl6XZClt4/4X1Bsiu4+4t1IpvKIe8LUCzfp7vXPF9xV/i4IuAyCZju2Hn/Tstmj8YUePc3jIM2LIG6laWiWuLHETr4E8nh9j8Cdw7+3I4tFEp9Yhe66U4F4Kdvq2dMKam50dw9+EoSPgeBgKx/cQGJ/HGeZL4AA0PPjbZlhylLFzbHqZeJnQJqJIETrLkzScjmKxFc8QtCvfgbUrO+iGceVQeoxkHDss8UkE3DyRz6I6gMQ5iMQovwazwFXEvEDIHT9skc8LwzRMgUmmCmTkLPHQLyvYHwQgrnvxE8JwLdA2q1I0NiLXVAN/MjeXfRjJ43zrPeZFL5Ri9zYP/t3KTSewI/l6G3GCYQgpVAm3ewxEQW9WPyCdO3KiSDBJzU0zCUH1fj54uqw4r3iaaceT5jnT25XoO3xLnKwhRPuV8a7V+k8g+glQDt0sEXV7gfN1WpX7/Nl4uQCBia+g/iJOb86THvJiVW+tAwU1pizYz5Zkj3dlJxwEg/tGrbC8XuQXvYqPOMuqvf3kt/4QzvxwooqC3KZjlpI12pn53VA5mtkcqp7PJZeUl9and9DbtyPcoL4/ZNL3dMHb8OrfSUWXEsOZ7ltcT6fF78sy2ze9UTxDp3PbT+u3dq+h76uGk4eit+VyElzNnRGmB+WviXD07nJO7bt49rt4TEihdK3ZUImg/yFeEMkMzv+P2XYugiS/5YMN/7l7HzSLsAHqVUV/kpmmUSQ4Wayz31HXrYhha0/kaIP5M/Ln0vykCxL/Hd5kkzSHClkl9e7mgT4z49pAB+sWsM9ON1L/eRnLORoRP2I4mz0mxCqwaprThldqD1ikSgN+tvtVXWD9ZAU1pVG2ncphVXAJyBDd2OvrseOYzqOviATvdh1sJiaQp4Vg6g7Q44NPSSqY4fzAjjNVeawZyMnSQl8l9Ydkbw0uLLhj2VHmjNWuw0FNrEAQOFYhVNZIQoiKgqnO+YCxUGwmFOgd0Ycp7AqV2UUFdcHI1iislVAkAuoRFUXyMVkF1ZnfRACghgLBUqVUDiuSwgctyCRpoWqKiiqAVX4i21A07uwnF3QrO0YsA5BQUVqfNSEw3jAOg5HYv87xgisYdcbpqNXIyCo/xqGozNEQ3NMG5KNsKNMWBP2g4PqU2vHMizHaKBOdMYGrkRxY2cMy0Me0RuCIIwAbk8RHatLNOBwMC1Yv0qAheFYtjPmKIJFw0QciUjXmgKcaeq2w4GLICTU5Q5Y1TG7EMRcjBQTNkwt0FheUMhiZAYssqqUCHu0y6Fy2LzW7UKb2SqLURvcQsEltObY3RHnOAqhOM660Vg7IY84lmWNNRr3jOnYCvwxdvSuAN22Bg0ber8Lje8iEE2pAkF3tBGNdOpKV/ngNB6Z3iVconED/s8YEYLtqMTIQGPZQF1vIjMggy1UYW8ZBuptEoKw6CVYo2rB+jSn2xbsVxXARkXMvyA4qBNbGnjEEtfrNYdWMcWbK24x1K/TC8exdcNGz1nHVFAg7M4R5CpTVxsfZIhd2LMNEtCwR0QqAAFkFwuJPUJSI9RjJKQzOBbNEuCD6BAEgaPO78JKJxATgiBrAIE97HtEH1EU/vSAho5yNAGDrCkCdT0FlWgs1A9XNRb3AQahKECMGopqOxp9GYSEjdviGvpcqxIhkNM6AUEMUdRxOQm7eM2qaIELgyCPoDWBFWMeEeAoU6EBIY+MRSQLglLhTwtNJAjiiJyGFhMGelhlRQ2OEQ8EDYS12BA0kV1oH4LAhWVtjE1bY+GSAFRLgyC6FZpVXdu2LdsQUTmcOZplWhoCsa0FQa4tjSGqhgXnFKuPxxr6RYsWAkHlcG23TVs0LG+5pUSoC00SlWRtm6UWtqVSaI7o5hgv7yNON+ELCMQy8EBqiJapK/9r14xRGIZhKBoIQuBgtElrDqChW7vn/neqZItSOhQS2u2/wcH2d+QQpAhHMX6f498OH8hFZT6ri9FCJm9xrklgr2/zVtpmeQk9p75n/I0Jj5UcDeeylJGptTE/XonLxNnKklD6SK8NcNxFRy3MJlUSEwY9/+2G3c/8YL0Njt+XRPMpQXV0utCFLIlHdvbX9OoMfX/oAgAAAAAAAAAAXOEJDmnRJd24gzwAAAAASUVORK5CYII="/>
         </div>

         <div style = {{display:"flex", justifyContent:"center"}}>
           <form className="formContainer">
            <p style = {{textAlign:"center", marginBottom:"30px", marginTop: "40px", fontSize: "1.1rem"}}>Register as an expert</p>
            <div style = {{display:"flex" ,gap: "20px", marginBottom:"20px"}}>
                <TextField
                        required
                        select
                        label="Mr/Mrs"
                        inputRef={titleRef}
                        defaultValue=" "
                        error = {titleError.error}
                        helperText={titleError.error && titleError.message}
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                        disabled={otpSent}

                     InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          {selectedTitle.trim() && (
                            <IconButton onClick={() => setSelectedTitle(" ")}
                              sx = {{marginRight:"10px"}}>
                            <ClearIcon  sx={{fontSize: '14px'}}/>
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}

                  sx={{
                  '& .MuiOutlinedInput-root': {
                   '&.Mui-focused fieldset': {
                    borderColor: "rgb(236, 147, 36)", 
                  },
                  '&.Mui-error fieldset': {
                    borderColor: 'red', 
                    cursor: "text"
                  },
                  '&.Mui-error.Mui-focused fieldset': {
                    borderColor: "red", 
                    fontWeight: "bold",
                    cursor: "text"
                  },
                  },
                  '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: "rgb(236, 147, 36)", 
                  },
                  '&.Mui-error': {
                    color: 'red',
                  },
                  '&.Mui-error.Mui-focused': {
                    color: 'red',
                    fontWeight: "bold"
                  },
                  },
                  '& .MuiSelect-select': {
                  color: "rgb(0, 0, 0, 0.5)", 
                  fontSize: "14px",
                  },
                  '& .MuiInputBase-root': {
                  height: '35px'
                  },
                  width: "30%",

                  }}
                  SelectProps={{
                  MenuProps: {
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: "rgb(0, 0, 0, 0.5)"
                         },
                      },
                     },
                    },
                }}
                >
                {titleData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                  ))}
           </TextField>

              <TextField
               error = {nameError.error}
               required
               label="Name"
               inputRef = {nameRef}
               onChange = {(e) => setName(e.target.value)}
               helperText={nameError.error && nameError.message}
               disabled={otpSent}
               backgroundcolor="#E8FOFE"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error fieldset': {
                      borderColor: 'red', 
                    },
                    '&.Mui-error.Mui-focused fieldset': {
                      borderColor: "red", 
                      fontWeight: "bold"
                    },
                    
                  },
                  '& .MuiInputBase-root': {
                    height: '35px'
                  },
                  '& .MuiInputLabel-root': {
                    top: '-8px',
                    fontSize: "14px",
                    '&.Mui-focused': {
                      color: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error': {
                      color: 'red',
                    },
                    '&.Mui-error.Mui-focused': {
                      color: 'red',
                      fontWeight: "bold"
                    },
                    color:"rgb(0, 0, 0, 0.5)"
                  },
                  '& .MuiInputLabel-shrink': {
                   
                    transform: 'translate(30%, -5%) scale(0.8)', 
                  },
                  width: "70%"
                }}
               />

            </div>

            <div style = {{display:"flex" ,gap: "20px", marginBottom:"20px"}}>
                <TextField
                        error = {countryCodeError.error}
                        required
                        select
                        label="ISD"
                        inputRef = {countryCodeRef}
                        defaultValue=" "
                        helperText={countryCodeError.error && countryCodeError.message}
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={otpSent}

                  InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          {countryCode.trim() && (
                            <IconButton onClick={() => setCountryCode(" ")}
                            sx = {{marginRight:"10px"}}>
                            <ClearIcon  sx={{fontSize: '14px'}}/>
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}

                  sx={{
                  '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: "rgb(236, 147, 36)", 
                  },
                  '&.Mui-error fieldset': {
                    borderColor: 'red', 
                  },
                  '&.Mui-error.Mui-focused fieldset': {
                    borderColor: "red", 
                    fontWeight: "bold",
                  },
                  },

                  '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: "rgb(236, 147, 36)", 
                  },
                  '&.Mui-error': {
                    color: 'red',
                  },
                  '&.Mui-error.Mui-focused': {
                    color: 'red',
                    fontWeight: "bold"
                  },
                  },
                  '& .MuiSelect-select': {
                  color: "rgb(0, 0, 0, 0.5)", 
                  fontSize: "14px"
                  },
                  '& .MuiInputBase-root': {
                  height: '35px'
                  },
                  width: "30%",

                  }}
                  SelectProps={{
                    renderValue: (value) => {
                      const selectedOption = countryCodeData.find(code => code.value === value);
                      return selectedOption ? selectedOption.value : " ";
                    },
                  MenuProps: {
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root': {
                        color: "rgb(0, 0, 0, 0.5)", 
                         },
                       '&::-webkit-scrollbar': {
                          width: '8px', 
                         
                        },
                       '&::-webkit-scrollbar-thumb': {
                          backgroundcolor: "rgb(236, 147, 36)", 
                          borderRadius: '10px', 
                          height: "4px",  
                        },
                        cursor: "text"
                      },
                       style: {
                        maxHeight: '400px', 
                        overflowY: 'scroll', 
                        cursor: "text"
                       },
                      },
                     },
                 }}
                >
                {countryCodeData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                  ))}
           </TextField>

              <TextField
                error = {mobileNumberError.error}
                required
                label="Mobile Number"
                inputRef = {mobileNumberRef}
                onChange = {(e) => setMobileNumber(e.target.value)}
                helperText={mobileNumberError.error && mobileNumberError.message}
                disabled={otpSent}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error fieldset': {
                      borderColor: 'red', 
                    },
                    '&.Mui-error.Mui-focused fieldset': {
                      borderColor: "red", 
                      fontWeight: "bold"
                    },
                  },
                  '& .MuiInputBase-root': {
                    height: '35px'
                  },
                  '& .MuiInputLabel-root': {
                    top: '-8px',
                    fontSize: "14px",
                    '&.Mui-focused': {
                      color: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error': {
                      color: 'red',
                    },
                    '&.Mui-error.Mui-focused': {
                      color: 'red',
                      fontWeight: "bold"
                    },
                    color:"rgb(0, 0, 0, 0.5)"
                  },
                  '& .MuiInputLabel-shrink': {
                     transform: 'translate(15%, -5%) scale(0.8)', 
                  },
                  width: "70%"
                }}
               />
            </div>

            <TextField
                error = {emailError.error}
                required
                label="Email ID"
                inputRef = {emailRef}
                onChange = {(e) => setEmail(e.target.value)}
                helperText={emailError.error && emailError.message}
                disabled={otpSent}
                backgroundcolor="#E8FOFE"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error fieldset': {
                      borderColor: 'red', 
                    },
                    '&.Mui-error.Mui-focused fieldset': {
                      borderColor: "red", 
                      fontWeight: "bold"
                    },
                  },
                  '& .MuiInputBase-root': {
                    height: '35px'
                  },
                  '& .MuiInputLabel-root': {
                    top: '-8px',
                    fontSize: "14px",
                    '&.Mui-focused': {
                      color: "rgb(236, 147, 36)", 
                    },
                    '&.Mui-error': {
                      color: 'red',
                    },
                    '&.Mui-error.Mui-focused': {
                      color: 'red',
                      fontWeight: "bold"
                    },
                    color:"rgb(0, 0, 0, 0.5)"
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(20%, -5%) scale(0.8)',
                  },
                  width: "100%",
                  marginBottom: "20px"
                }}
               />

             {
              (otpSent && !maxAttempts) && (
                <div style = {{marginBottom: "20px"}}>
                 <TextField
                   error = {OTPError.error}
                   required
                   label="OTP"
                   inputRef = {otpTextRef}
                   onChange = {(e) => setOtpText(e.target.value)}
                   helperText={OTPError.error && OTPError.message}
                   focused
                   sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: "rgb(236, 147, 36)",
                    },
                    '&.Mui-error fieldset': {
                      borderColor: 'red', 
                    },
                    '&.Mui-error.Mui-focused fieldset': {
                      borderColor: "red", 
                      fontWeight: "bold"
                    },
                  },
                  '& .MuiInputBase-root': {
                    height: '35px'
                  },
                  '& .MuiInputLabel-root': {
                    top: '-8px',
                    fontSize: "14px",
                    '&.Mui-focused': {
                      color: "rgb(236, 147, 36)",
                    },
                    '&.Mui-error': {
                      color: 'red',
                    },
                    '&.Mui-error.Mui-focused': {
                      color: 'red',
                      fontWeight: "bold"
                    },
                    color:"rgb(0, 0, 0, 0.5)"
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(35%, -5%) scale(0.8)',
                  },
                  width: "100%",
                  marginBottom: "10px"
                }}
               />
               <div style = {{display: "flex", justifyContent: "right"}}>
                   <p onClick = {handleGenerateOTP} style = {{fontSize:"14px" , color: "rgb(0, 0, 0, 0.6)", cursor:"pointer"}}>
                    {(countdown !== 0)?`Resend OTP in ${countdown} seconds..`: "Resend OTP"}</p>
               </div>
            </div>
                )
               }

              <Button 
              variant="contained"
              sx={{
                backgroundColor: "rgb(236, 147, 36)",  
                color: "white",            
                width: "100%",    
                borderRadius: '20px',  
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: "rgb(236, 147, 36)",
                  },          
                }}
                onClick={otpSent ? handleVerifyOtp: handleGenerateOTP }
              >
                {OTPLoading ? ("Loading Response..."): (otpSent ? "Submit OTP":"Get OTP on email")}
                
              {otpSendingError.error && (<CustomBox 
               title = {"An account already exists with this email ID "}
               email = {email}
               buttonText = {"Click here to Sign-in"}
               text = {"if this account belongs to you"}
                />)}
              </Button>
             
           </form>
         </div>
       
           <div style = {{textAlign:"center", marginTop:"40px"}}>
                 <p style={{fontSize: "16px"}}>Already have an Account?
                  <Link to = "/login" style = {{marginLeft:"5px",textDecoration:"none",color:"blue"}}>Sign In</Link>
                 </p>
           </div>

           

           <SnackbarToast
                triggerOpen = {otpCheckSent}
                message= "OTP Generated and sent Succesfully"
                severity="success"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: '#4caf50',
                    iconColor: '#fff'
                }}
            />
            
             <SnackbarToast
                triggerOpen = {otpVerified}
                message= "OTP Verfied succesfully"
                severity="success"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: '#4caf50',
                    iconColor: '#fff'
                }}
            />

            <SnackbarToast
                triggerOpen = {otpVerifyError}
                message= "Error while verifying OTP"
                severity="error"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: 'red',
                    iconColor: '#fff'
                }}
            />

            <SnackbarToast
                triggerOpen = {otpSendingError.error}
                message= {otpSendingError.message}
                severity="error"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: 'red',
                    iconColor: '#fff'
                }}
            />

            <SnackbarToast
                triggerOpen = {maxAttempts}
                message= "Cross the limits , Please try after some time"
                severity="error"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: 'red',
                    iconColor: '#fff'
                }}
            />

             <SnackbarToast
                triggerOpen = {otpExpired}
                message= "OTP Expired , Please resend the OTP"
                severity="error"
                customStyles={{
                    textColor: '#fff',
                    backgroundcolor: 'red',
                    iconColor: '#fff'
                }}
            />
    </div>
  )
}

export default Register