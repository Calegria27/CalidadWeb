import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainView from './MainView'
import { Navbar } from './ui/Navbar'
import { Box, Stack } from '@mui/material'


export const NavbarRoute = () => {
  return (
    <Box>
        <Stack direction="row" justifyContent="space-between">
          <Navbar/>
        </Stack>
        <hr/>
        <Routes>
            <Route path ="home" element={<MainView/>}/>
        </Routes>
    </Box>

  )
}
