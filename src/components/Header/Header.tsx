import React from 'react'
import {  useAppDispatch } from '../../store/store'
import s from './Header.module.css'
import { logoutTC } from '../Auth/Login/LoginBLL/login-reducer'
import userPhoto from '../../assets/images/userPhoto.jpg'
import {NavLink} from 'react-router-dom';

export const Header = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(logoutTC())
  }
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.itemForm}>
        <NavLink to={'/packs'} >
                        <img  className={s.packList} alt={'Packs list icon'}/>
                        <span>Packs list</span>
                    </NavLink>
        
        </div>
        
        <NavLink to={'/profile'} >
                        <img src={userPhoto}className={s.profile} alt={'Profile icon'}/>
                        <span>Profile</span>
                    </NavLink>

        <span onClick={logOut} className={s.nav}>
          Log Out
        </span>
      </div>
    </div>
  )
}
