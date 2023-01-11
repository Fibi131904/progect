import React from 'react'
import { Navigate,  Routes, Route } from 'react-router-dom'
import { Login } from "../components/Auth/Login/LoginUI/Login"
import { Registration } from '../components/Auth/Registration/RegistrationUI/Registration'
import { Profile } from '../components/Profile/ProfileUI/Profile'


export enum PATH {
  LOGIN = '/login',
  REGISTRATION= '/registration',
  PROFILE='/profile',
}

export const RoutesPage=()=>{
  return (
    <Routes>
        <Route path={'/'} element={<Navigate to={'/profile'} />} />
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>   
    
    </Routes>
  )
}