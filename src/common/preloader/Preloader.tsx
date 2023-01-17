import React from 'react'
import { Progress } from 'antd'

export const Preloader = () => {
  return (
    <>
      <Progress
        percent={99.9}
        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
      />
    </>
  )
}
