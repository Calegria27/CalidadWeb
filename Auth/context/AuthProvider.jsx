import React, { useReducer } from 'react'
import { types } from '../types/types'
import { Authcontext } from './Authcontext'
import { authReducer } from './authReducer'

//const initialState={
//    logged:false,
//}

const init=()=>{
  const user= JSON.parse(localStorage.getItem('user'));

  return{
    logged:!!user,
    user:user
  }
}

export const AuthProvider = ({children}) => {

    const [authstate,dispatch]=useReducer(authReducer, {}, init)
    
    //const user=user

    const login=(usuario)=>{
      const action={
        type:types.login,
        payload: usuario
      }

      localStorage.setItem('user',JSON.stringify(usuario ))
      dispatch(action)
    }

    const logout=()=>{
      localStorage.removeItem('user');
      const action={type:types.logout};
      dispatch(action)
    }
  return (
    <Authcontext.Provider value={{ ...authstate, login,logout}}>
        {children}
    </Authcontext.Provider>
  )
}