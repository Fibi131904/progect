import { Button, Checkbox, Input, Space } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, useAppDispatch } from '../../../store/store';
import s from './Login.module.css';
import { login } from './LoginBLL/login-reducer';



type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
 
}

export const Login = () => {

  const isAuth = useSelector<AppStateType, boolean>((state) => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
      initialValues: {
          email: '',
          password: '',
          rememberMe: false,
        
      },
      validate: (values) => {
          const errors: FormikErrorType = {};
          if (!values.email) {
              errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {// проверка email
              errors.email = 'Invalid email address';
          } if (!values.password) {
              errors.password = 'Required';
          } else if (values.password.length < 3) {
              errors.password = 'Invalid password';
          }
          return errors;
      },

      onSubmit: (values) => {
          dispatch(login(values))

      },
  })

  if (isAuth) {
      return <Redirect to={'/profile'} />
  }
  return (
      <div className={s.loginContainer} >
          <div className={s.loginWelcom} >

              <div>
                  <img src={charcter} className={s.img} alt='' />
                  <h1>Welcome back!</h1>
              </div>
          </div>

              <div className={s.loginForm}>
                  
                      <div className={s.loginDiscription}>
                         <div className={s.loginTitle} >
                          <h2 >Login</h2>
                          </div> 
                          <p>To log in get registered
                              <a href={'https://social-network.samuraijs.com/'}
                                  target={'_blank'} rel="noopener noreferrer"> here
                              </a>
                          </p>
                          <p>or use common test account credentials:</p>
                          <p>Email: free@samuraijs.com</p>
                          <p>Password: free</p>
                      </div>


                      <form onSubmit={formik.handleSubmit} className={s.loginFormik}>
                          <Space direction="vertical">
                         
                              <Input placeholder='Login'
                                  {...formik.getFieldProps('email')}
                              />
                               
                              {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                              <Input.Password placeholder="password"
                                  {...formik.getFieldProps('password')}
                              />
                              {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                            <div>
                                  <Checkbox
                                      checked={formik.values.rememberMe}
                                      {...formik.getFieldProps('rememberMe')}
                                  />Remember me
                             </div>

                            
                              />
                              
                              <div className={s.loginButton}>
                                  <Button type={'primary'} htmlType='submit' shape={'default'}>
                                      Login
                                  </Button>
                              </div>
                          </Space>
                      </form>



                 
              </div>
          
      </div>
  )

}