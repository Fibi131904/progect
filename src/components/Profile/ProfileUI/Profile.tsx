import { EditableSpan } from '../../../common/super-components/EditableSpan'
import s from '../../../styles/Auth.module.css'
import myFoto from '../../../assets/images/myFoto.webp'
import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { updateProfile } from '../ProfileBLL/profile-reducer'
import { Navigate } from 'react-router-dom'
import { logoutTC } from '../../Auth/Login/LoginBLL/login-reducer'
import { PATH } from '../../../app/RoutesPage'
import { Header } from '../../Header/Header'
import { useCallback } from 'react'
import { Button } from 'antd'


type ProfileType = {
  title?: string
  onChangeTitle?: (title: string) => void
  disabled?: boolean
  activateEditMode?: () => void
}

export const Profile: React.FC<ProfileType> = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const userName = useAppSelector((state) => state.profile.user.name)
  const userAvatar = useAppSelector((state) => state.profile.user.avatar)
  const userId = useAppSelector((state) => state.profile.user._id)
  const email = useAppSelector((state) => state.profile.user.email)
  const publicCardPacksCount = useAppSelector(
    (state) => state.profile.user.publicCardPacksCount
  )

  const dispatch = useAppDispatch()

  const changeUserName = useCallback((name: string) => {
    dispatch(updateProfile(name))
  }, [])

  const handleLogout = () => {
    dispatch(logoutTC())
   }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.container}>
      <Header />

      <div className={s.form}>
        <h3>Personal Information</h3>
        <div>
          <img className={s.imgUser} src={myFoto} alt={'Repsonal img'} />
          
          <div className={s.infoBlock}>
          <div className={s.userNickName}>
            <EditableSpan value={userName} callBack={changeUserName} />

            <EditOutlined />
          </div>
            <div>
              <b>E-mail: </b>
              {email}
            </div>
            <div>
              <b>Card Packs: </b> {publicCardPacksCount}
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
       
        </div>
      </div>
    </div>
  )
}
