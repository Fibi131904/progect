import { Header } from "../Header/Header"
import { PacksTable } from "./PacksTable/PacksTable"
import {Navigate, useNavigate} from 'react-router-dom';
import { useAppSelector } from "../../store/store";
import s from './Packs.module.css'


export const Packs = () => {

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)


if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
}
  return (
    <div className={s.wrapper}>  
      <div className={s.header}>
        
        </div>  
     
       <div className={s.title}>Packs List</div>
      <PacksTable />
    </div>
  )
}