import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainView from './MainView'
import { Navbar } from './ui/Navbar'


export const NavbarRoute = () => {
  return (
    <>
        <Navbar/>
        <Routes>
            <Route path ="home" element={<MainView/>}/>
        </Routes>
    </>

  )
}