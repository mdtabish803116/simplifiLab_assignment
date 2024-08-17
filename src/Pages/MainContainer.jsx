import React from 'react'
import "../Styles/MainContainer.css"
import { Outlet } from 'react-router-dom'
import dashboardImage from "../Images/dashboardImage.svg"

function MainContainer() {
  return (
    <div className = "MainContainer">
        <div className = "imageContainer">
             <img
             src = {dashboardImage}
             />
             
       </div> 
        <Outlet />
        {/* <Register/>
        <Login /> */}

    </div>
  )
}

export default MainContainer
