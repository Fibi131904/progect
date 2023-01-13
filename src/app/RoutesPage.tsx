import React from 'react'
import { Navigate,  Routes, Route } from 'react-router-dom'
import { Login } from "../components/Auth/Login/LoginUI/Login"
import { NewPassword } from '../components/Auth/NewPassword/NewPasswordUI/NewPassword'
import { Recovery } from '../components/Auth/Recovery/Recovery'
import { CheckEmail } from '../components/Auth/Recovery/RecoveryUI/CheckEmail'
import { Registration } from '../components/Auth/Registration/RegistrationUI/Registration'
import { Profile } from '../components/Profile/ProfileUI/Profile'


export enum PATH {
  LOGIN = '/login',
  REGISTRATION= '/registration',
  PROFILE='/profile',
  RECOVERY='/recoverPassword'
}

export const RoutesPage=()=>{
  return (
    <Routes>
        <Route path={'/'} element={<Navigate to={'/profile'} />} />
        <Route path={PATH.PROFILE} element={<Profile/>}/> 
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
        <Route path={PATH.RECOVERY} element={<Recovery />} />
        <Route path={'/check-email/:email'} element={<CheckEmail/>}/>
        <Route path={'/set-new-password/'}>
                <Route index element={<NewPassword/>}/>
                <Route path={':token'} element={<NewPassword/>}/>
            </Route>
         
    
    </Routes>
  )
}