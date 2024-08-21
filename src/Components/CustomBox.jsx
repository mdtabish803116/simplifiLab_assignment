import React from 'react'
import { Link } from 'react-router-dom'

function CustomBox({title , email , buttonText ,text}) {
  return (
    <div className = "customBoxContainer"
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