import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Authcontext } from '../Auth/context/Authcontext';

export const PublicRouter = ({children}) => {

    const {logged}=useContext(Authcontext);
    return (!logged)
        ?children
        :<Navigate to ="/home"/>
}