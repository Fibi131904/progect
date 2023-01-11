import React from 'react'
import { useSelector } from "react-redux"
import { AppStateType, useAppDispatch} from "../../store/store"
import {NavLink} from 'react-router-dom';
import { PATH } from '../../app/RoutesPage';
import s from './Header.module.css';
import { logoutTC } from '../Auth/Login/LoginBLL/login-reducer';




export const Header = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn  = useSelector<AppStateType, boolean>(
    (state) => state.login.isLoggedIn
  )
const logOut=()=>{
dispatch(logoutTC())
}
  return (
    <nav className={s.links}>
        <NavLink to={PATH.PROFILE}
               >
            Profile
        </NavLink>
        {
            isLoggedIn &&
            <>
              {/* <NavLink to={PATH.PACKS}
                       className={({isActive}) => isActive ? s.active : s.nav}>
                Packs List
              </NavLink> */}
              <span onClick={logOut} className={s.nav}>
                Log Out
              </span>
            </>
        }
        {
            !isLoggedIn &&
            <>
              <NavLink to={PATH.REGISTRATION}
                     >
                Registration
              </NavLink>
              {/* <NavLink to={PATH.PASSWORD_RECOVERY}
                       className={({isActive}) => isActive ? s.active : s.nav}>
                Password recovery
              </NavLink> */}
              <NavLink to={PATH.LOGIN}
                      >
                Log In
              </NavLink>
            </>
        }
       
    </nav>
)
}