import React from 'react'
import {  useAppDispatch, useAppSelector } from '../../store/store'
import s from './Header.module.css'
import { authMe, logoutTC } from '../Auth/Login/LoginBLL/login-reducer'
import myFoto from '../../assets/images/myFoto.webp'
import {NavLink} from 'react-router-dom';

export const Header = () => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector((state) => state.profile.user.name)
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)

  const logOut = () => {
    dispatch(logoutTC())
  
  }
  return (
  <>
    {isLoggedIn &&
      
    <div className={s.wrapper}>
        
      <div className={s.container}>
      
      <div className={s.navContainer}>
      
    
      

        <div className={s.itemForm}>
          <NavLink to={'/packs'}>
            <span>Packs list</span>
          </NavLink>
        </div>
        </div>
        
      
        <div className={s.infoBlock}>
         
        <div className={s.info}>
        <NavLink to={'/profile'}> 
         <img src={myFoto} className={s.userAvatar} alt={'Profile icon'} />
         </NavLink>
         <div>{userName}</div> 
        </div>
       
        <span onClick={logOut} className={s.nav}>
          Log Out
        </span>
        </div>
       
      </div> 

    </div>
  
  }
  </>
  )

}
