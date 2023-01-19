import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import s from '../../../../styles/Auth.module.css'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { changeRassword } from '../NewPasswordBLL/newPassword-reducer'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const NewPassword: React.FC = () => {
  const isPassChanged = useAppSelector(
    (state) => state.newPassword.isPassChanged
  )
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { token } = useParams()

  const onFinish = (values: any) => {
    token &&
      dispatch(
        changeRassword({ password: values.password, resetPasswordToken: token })
      )
  }

  if (isPassChanged) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.wrapper}>
      <Form
        className={s.form}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError>
        <div className={s.title}>
          <h2>Create new password</h2>
        </div>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                )
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div>
            Create new password and we will send you further instructions to
            email
          </div>
          <Button type="primary" htmlType="submit">
            Create new password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
