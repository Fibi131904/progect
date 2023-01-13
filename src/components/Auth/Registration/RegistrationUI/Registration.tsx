import React from 'react';
import { Button,
  Form,
  Input 
} from 'antd';
import s from '../../../../styles/Auth.module.css'
import {Link, Navigate} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { signUpTC } from '../RegistrationBLL/registration-reducer';
import { PATH } from '../../../../app/RoutesPage';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
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
};

export const Registration: React.FC = () => {
  const isRegistered = useAppSelector(state => state.registration.isRegistered)
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  
  const onFinish = (values: any) => {
       dispatch(signUpTC(values))
  };

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN}/>
}

 
  return (
    <div className={s.container}>
      <div className={s.form}>
       
          <h2>Sign Up</h2>
      
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
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
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>   


      

      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        <div>Alredy have an account?</div>
            <Link to="/login">Sign In</Link>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

