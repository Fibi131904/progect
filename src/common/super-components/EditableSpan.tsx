import { Input } from 'antd'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { useAppSelector } from '../../store/store'


type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
  setEditMode: (editMode: boolean) => void
  editMode: boolean
}

export const EditableSpan = React.memo(
  ({ title, changeTitle, editMode, setEditMode }: EditableSpanPropsType) => {
   const userName = useAppSelector((state) => state.profile.name)

    let [localTitle, setLocalTitle] = useState<string>(userName)   
    

    const onChangeTitleClick = (e: ChangeEvent<HTMLInputElement>) => {
      setLocalTitle(e.currentTarget.value)
    }
    const onKeyPressClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }
     const activateViewMode = useCallback(() => {
        changeTitle(localTitle)
        setEditMode(false)
    }, [changeTitle, localTitle])

    return editMode ? (
      <Input
        onKeyDown={onKeyPressClick}
        value={localTitle}
        onChange={onChangeTitleClick}
        autoFocus
        onBlur={activateViewMode}
      />
    ) : (
      <span>{title}</span>
    )
  }
)