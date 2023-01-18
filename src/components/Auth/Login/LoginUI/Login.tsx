import { useFormik } from 'formik'
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
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
  const dispatch = useAppDispatch()
  const onFinish = (values: any) => {
    dispatch(loginTC(values))
    console.log(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
 
  };

  

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
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ rememberMe: false , email: '',
      password: '',}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <div>
        <Link  to={PATH.RECOVERY}>Forgot Password</Link>
      </div>
        <Button type="primary" htmlType="submit"  className={s.btn}>
        Login
        </Button>
       <div>Don’t have an account?</div> 
                <Link to={PATH.REGISTRATION}>Sign Up</Link>
      </Form.Item>
    </Form>

      </div>
    </div>
  )
}
