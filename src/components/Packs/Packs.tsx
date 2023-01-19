import { Header } from "../Header/Header"
import { PacksTable } from "./PacksTable/PacksTable"
import {Navigate, useNavigate} from 'react-router-dom';
import { useAppSelector } from "../../store/store";


export const Packs = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  
  

if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
}
  return (
    <div>
      <Header />
      <h1>Packs List</h1>
      <PacksTable />
    </div>
  )
}