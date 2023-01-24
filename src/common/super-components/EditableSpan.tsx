import { Input } from 'antd'
import React, { ChangeEvent, useState } from 'react'


type EditableSpanPropsType = {
  value: string
  callBack: (newValue: string) => void
}

export const EditableSpan = ({
  callBack,
  value,
}: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(value)
  

  const onKeyPressClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      activateViewMode()
    }
  }

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value);
  }

  const activateViewMode = () => {
    callBack(title)
    setEditMode(false)
  
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
     editMode ?
    <Input
      onKeyDown={onKeyPressClick}
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
    />
   : <span onDoubleClick={activateEditMode}>{value}</span>
  )  
}
