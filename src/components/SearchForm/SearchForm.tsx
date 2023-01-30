import React, { ChangeEvent, useState } from 'react'
import { Button, Input } from 'antd'

type SearchFormType = {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchForm: React.FC<SearchFormType> = ({ value, onChange }) => {
  return (
    <div>
      <Input.Search
        placeholder={'Search...'}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
