import { Button, Checkbox, Input, Space } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { PATH } from '../../../../app/RoutesPage'
import { AppStateType, useAppDispatch } from '../../../../store/store'
import s from '../../../../styles/Auth.module.css'
import { loginTC } from '../LoginBLL/login-reducer'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const isLoggedIn  = useSelector<AppStateType, boolean>(
    (state) => state.login.isLoggedIn
  )
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        // проверка email
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password'
      }
      return errors
    },

    onSubmit: (values) => {
      dispatch(loginTC(values))
     
    },
  })
  

     if (isLoggedIn ) {
       return <Navigate to={PATH.PROFILE} />
   }
  return (
    <div className={s.container}>
      <div className={s.form}>
        <div className={s.title}>
          <h2>Login</h2>
        </div>

        <form onSubmit={formik.handleSubmit} >
          <Space direction="vertical">
            <Input placeholder="Login" {...formik.getFieldProps('email')} />

            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
            <Input.Password
              placeholder="password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
            <div>
              <Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />
              Remember me
            </div>
            <div>Forgot Password?</div>

            <div className={s.loginButton}>
              <Button type={'primary'} htmlType="submit" shape={'default'}>
                Login
              </Button>
            </div>
            <div>Alredy have an account?</div>
            <Link to="/registration">Sign Up</Link>
          </Space>
        </form>
      </div>
    </div>
  )
}
