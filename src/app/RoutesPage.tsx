import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import { Login } from "../components/Auth/Login/Login"
import { Registration } from '../components/Auth/Registration/Registration'

export enum PATH {
  LOGIN = '/login',
  REGISTRATION= '/registration'
}

export const RoutesPage=()=>{
  return (
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path={PATH.LOGIN} element={<Login/>}/>
     <Route path={PATH.REGISTRATION} element={<Registration/>}/>
    </Routes>
  )
}