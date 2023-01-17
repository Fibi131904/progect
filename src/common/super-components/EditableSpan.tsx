import { Input } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { useAppSelector } from '../../store/store'


type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
  setEditMode: (editMode: boolean) => void
  editMode: boolean
}

export const EditableSpan = React.memo(
  ({ title, changeTitle, editMode, setEditMode }: EditableSpanPropsType) => {
   const userName = useAppSelector((state) => state.profile.user.name)

    let [localTitle, setLocalTitle] = useState(userName)

    const activateEditMode = () => {
      changeTitle(localTitle)
      setEditMode(false)
    }
    const activateViewMode = () => {
      changeTitle(localTitle)
      setEditMode(false)
    }

    const onChangeTitleClick = (e: ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(e.currentTarget.value)
    }
    const onKeyPressClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode ? (
      <Input
        onKeyDown={onKeyPressClick}
        value={localTitle}
        onChange={onChangeTitleClick}
        autoFocus
        onBlur={activateViewMode}
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{title}</span>
    )
  }
)