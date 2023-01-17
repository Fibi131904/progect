import { Header } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import { Preloader } from '../common/preloader/Preloader';
import { authMe } from '../components/Profile/ProfileBLL/profile-reducer';
import { Profile } from '../components/Profile/ProfileUI/Profile';
import { useAppDispatch, useAppSelector } from '../store/store';
import { RoutesPage } from './RoutesPage';




export const App=()=> {
  const isInitialized = useAppSelector((state) => state.app.isInitialized)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(authMe());
  }, [dispatch]);

  if (isInitialized) {
    return <div >
        <Preloader/>
    </div>
}
  return(
    <div>
    <Header/>
 
    {isLoading && <div ><Preloader/></div>}
    <RoutesPage/>
   
    </div>
  );
}


