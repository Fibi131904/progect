
import React, { useEffect } from 'react';
import { Preloader } from '../common/preloader/Preloader';
import { Header } from '../components/Header/Header';
import { authMe } from '../components/Profile/ProfileBLL/profile-reducer';
import { useAppDispatch, useAppSelector } from '../store/store';
import { RoutesPage } from './RoutesPage';




export const App=()=> {

  const isLoading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(authMe());
  }, [dispatch]);

 
  return(
    <div>
    <Header/>
   
 
    {isLoading && <div ><Preloader/></div>}
    <RoutesPage/>
   
    </div>
  );
}


