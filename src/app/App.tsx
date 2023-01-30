
import React, { useEffect } from 'react';
import { Preloader } from '../common/preloader/Preloader';
import { authMe } from '../components/Auth/Login/LoginBLL/login-reducer';
import { Header } from '../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../store/store';
import { RoutesPage } from './RoutesPage';




export const App=()=> {

  const isInitialised = useAppSelector((state) => state.login.isInitialized)
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(authMe());
  }, []);

//   if (!isInitialised) {
//     return <div ><Preloader/></div>
// }
  return(
    <div>
    <Header/> 
 
    <RoutesPage/>
   
    </div>
  );
}


