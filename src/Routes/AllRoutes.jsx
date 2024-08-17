import React from 'react'
import Register from '../Pages/Register'
import { Route, Routes, Navigate} from "react-router-dom";
import MainContainer from '../Pages/MainContainer';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';

function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/" element={<MainContainer/>}>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AllRoutes