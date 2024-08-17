import React from 'react'

function ShadowButton({image , hasImage, title}) {
  return (
    <div style={{display: "flex" , gap:"5px", 
         justifyContent:"center", 
         alignItems:"center", 
         height: "46px", 
         borderRadius:"23px", width:"100%",
         cursor:"pointer",
         boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          {hasImage && (<img width= "25px" height="25px" src = {image}/>)}
          <p>{title}</p>
    </div>
  )
}

export default ShadowButton