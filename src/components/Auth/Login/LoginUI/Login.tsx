import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { PATH } from '../../../../app/RoutesPage'
import { AppStateType, useAppDispatch } from '../../../../store/store'
import s from '../../../../styles/Auth.module.css'
import { loginTC } from '../LoginBLL/login-reducer'



export const Login = () => {
  const isLoggedIn = useSelector<AppStateType, boolean>(
    (state) => state.login.isLoggedIn
  )
  const error = useSelector<AppStateType, null|string>(
    (state) => state.app.error
  )

  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    dispatch(loginTC(values))
    
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <div className={s.container}>
         <div className={s.form}>
        <div className={s.title}>
          <h2>Login</h2>
        </div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          initialValues={{ rememberMe: false, email: '', password: '' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email' },
              { whitespace: true },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }, { min: 6 }]}
            hasFeedback>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <div className={s.item}>
              <Link to={PATH.RECOVERY}>Forgot Password</Link>
            </div>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
            <div className={s.item}>Don’t have an account?</div>
            <Link to={PATH.REGISTRATION}> Sign Up</Link>
            <div  className={s.error} >{error}</div>
          </Form.Item>
          
        </Form>
       
      </div>
    
    </div>
  )
}
