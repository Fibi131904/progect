
import React, { useEffect } from 'react';
import { Preloader } from '../common/preloader/Preloader';
import { authMe } from '../components/Auth/Login/LoginBLL/login-reducer';
import { Header } from '../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../store/store';
import { RoutesPage } from './RoutesPage';




export const App=()=> {
  const status = useAppSelector((state) => state.app.status)

  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(authMe());
  }, [dispatch]);
 

  return (
    <div>  
    <Header/> 
    {status=== 'loading' && <Preloader/>}
    <RoutesPage/>
      </div>
  );
}


