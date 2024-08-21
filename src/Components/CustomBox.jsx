import React from 'react'
import { Link } from 'react-router-dom'

function CustomBox({title , email , buttonText ,text}) {
  return (
    <div style = {{position:"absolute" , textAlign: "center", color: "black", 
     top: "70px",width:"30vw", border: "1px solid rgb(236, 147, 36)", 
     boxShadow:"rgba(0, 0, 0, 0.3) 0px 4px 8px",
     borderRadius:"12px",fontSize:"0.9rem", padding:"10px", background:"white"}} 
     onClick = {(e) => e.stopPropagation()}>
          <p>{title}</p>
          <p style = {{color: "rgba(0 , 0 , 0, 0.6)"}} >{email}</p>
          <p style = {{marginTop:"20px"}}>
            <Link to = "/login" style = {{marginRight:"5px",textDecoration:"none",color:"blue"}}>{buttonText}</Link>{text}
          </p>
    </div>
  )
}

export default CustomBox