import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import {Navigate, useParams} from 'react-router-dom';
import { PATH } from '../../../../app/RoutesPage'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import s from '../../../../styles/Auth.module.css'
import { changeRassword } from '../NewPasswordBLL/newPassword-reducer'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useFormik } from 'formik';


export const NewPassword: React.FC = () => {
  const isPassChanged = useAppSelector(
    (state) => state.NewPassword.isPassChanged
  )
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const {token} = useParams()
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
        password: '',
        
    },
    validate: (values) => {
        const errors: FormikErrorType = {};
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <= 7) {
            errors.password = 'Password must be more than 7 characters...'
        }
       
        
        return errors;
    },
    onSubmit: values => {
   token && dispatch(changeRassword({password: values.password, resetPasswordToken: token}))
    }
  })




  if (isPassChanged) {
    return <Navigate to={PATH.LOGIN} />
  }

 
  return (
    <div className={s.wrapper}>
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <h3>Create New Password</h3>
      <Space direction="vertical">
      <Input.Password placeholder="input password" />
      <Input.Password
        placeholder="input password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
     
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <div className={s.text}>
        Create new password and we will send you further instructions to email
        </div>
        <Button  type={'primary'} htmlType="submit" shape={'default'}>
        Create new password
        </Button>
        </Space>
        </form>
    </div>
   
  )
}

type FormikErrorType = {
  password?: string
  confirmPassword?: string
}



