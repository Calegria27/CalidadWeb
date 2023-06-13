import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import Login from '../Auth/pages/Login';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { NavbarRoute } from '../views/NavbarRoute';

export const AppRouter = () => {
  return (
    <div >
        <Routes>
            <Route path ="Login/*" element={
            <PublicRouter>
              <Routes>
                <Route path ="/*" element={<Login/>}/>
              </Routes>       
            </PublicRouter>}/>

          
            
            /* <Route path ="/*" element={
            <PrivateRouter>
              <NavbarRoute/> 
            </PrivateRouter>}/> */


        </Routes>
    </div>
    
  )
}