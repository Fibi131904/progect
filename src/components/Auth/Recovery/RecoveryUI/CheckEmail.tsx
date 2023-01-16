import React from 'react'
import { Link, useParams } from 'react-router-dom'
import s from '../../../../styles/Auth.module.css'
import Email from '../../../../assets/images/174528.png'
import { PATH } from '../../../../app/RoutesPage'

export const CheckEmail = () => {
  const { email } = useParams()

  return (
    <div className={s.container}>
      <div className={s.form}>
        <div className={s.title}>
          <h2>Check Email </h2>
        </div>
        <img src={Email} alt={'Email img'} className={s.img}/>

        <div>
          {' '}
          We've sent an Email with instructions to <b>{email}</b>
        </div>

        <div className={s.login}>
          <Link to={PATH.LOGIN}>Sign In</Link>
        </div>
      </div>
    </div>
  )
}
