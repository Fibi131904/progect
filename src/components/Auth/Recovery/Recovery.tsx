import { Button,Input, Space } from 'antd'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../../styles/Auth.module.css'
import { useAppDispatch } from '../../../store/store'
import { recoverTC } from './RecoveryBLL/recovery-reducer'

export const Recovery = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const emailEnter = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const onEmailSendClick = () => {
    dispatch(recoverTC(email, message))
    setEmail('')
    navigate(`/checkEmail/${email}`)
  }

  const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/setNewPassword/$token$'>link</a></div>`

  return (
    <div className={s.container}>
      <div className={s.form}>
        <div className={s.title}>
          <h2>Forgot your password?</h2>
        </div>

        <Space direction="vertical">
          <Input placeholder="Email" value={email} onChange={emailEnter} />

          <div>
            Enteryour email addres and we will send you further instructions
          </div>

          <div className={s.btn}>
            <Button
              type={'primary'}
              htmlType="submit"
              shape={'default'}
              onClick={onEmailSendClick}>
              Send Instructions
            </Button>
          </div>
          <div>Did you remember yiur password ?</div>
          <Link to="/login">Try logging in</Link>
        </Space>
      </div>
    </div>
  )
}
