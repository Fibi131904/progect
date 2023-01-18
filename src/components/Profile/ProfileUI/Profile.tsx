import { Button } from "antd"
import { EditableSpan } from "../../../common/super-components/EditableSpan"
import s from '../../../styles/Auth.module.css'
import userPhoto from '../../../assets/images/userPhoto.jpg'
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import {  updateUserDataTC } from "../ProfileBLL/profile-reducer"
import {Navigate} from 'react-router-dom';
import { logoutTC } from "../../Auth/Login/LoginBLL/login-reducer"
import { PATH } from "../../../app/RoutesPage"
import { Header } from "../../Header/Header"



type ProfileType = {
  title?: string
  changeTitle?: (title: string) => void
  disabled?: boolean
  activateEditMode?: () => void
}


export const Profile:React.FC<ProfileType>=({disabled})=>{
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const userName = useAppSelector(state => state.profile.name)
  const userAvatar = useAppSelector(state => state.profile.avatar)
  const userId = useAppSelector(state => state.profile._id)
  const email = useAppSelector(state => state.profile.email)
  const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)



  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()



  const activateEditMode = () => {
    if (disabled) {
      return
    } else {
      setEditMode(true)
    }
  }
  const changeUserName = (name: string) => {
    dispatch(updateUserDataTC({name: name, avatar: userAvatar, _id: userId, publicCardPacksCount, email}))
}


const handleLogout = () => {
  dispatch(logoutTC())
}

if (!isLoggedIn) {
  return <Navigate to={PATH.LOGIN}/>
}

  return (
    <div className={s.container}>
     
     <Header/>

      <div className={s.form}>
        <h3>Personal Information</h3>
        <div >
        <img className={s.imgEmail} src={userPhoto} alt={'Repsonal img'} />
       <div className={s.userNickName}>
        <EditableSpan title={userName}  changeTitle={changeUserName}  setEditMode={setEditMode} editMode={editMode}       
        />
      
          <EditOutlined onClick={activateEditMode} />
      
        </div>
        <div className={s.infoBlock}>
        <div>
          <b>E-mail:</b>{email}
        </div>
        <div>
          <b>Card Packs: </b> {publicCardPacksCount}
        </div>
        </div>
        <Button color={'primary'} onClick={handleLogout} className={s.btn}>
          Logout
        </Button>
      </div>
    </div>
    </div>
  )
}