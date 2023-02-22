import { PacksTable } from './PacksTable/PacksTable'
import { Link, Navigate } from 'react-router-dom'
import { PATH } from '../../../app/RoutesPage'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import s from './Packs.module.css'
import { SearchForm } from '../../SearchForm/SearchForm'
import { ChangeEvent, useState } from 'react'
import { packsActions } from '../PacksBLL/packs-reducer'
import { Button, Slider } from 'antd'
import { ChooseMyOrAll } from './ChooseMyorAll'
import { AddPackModal } from '../../Modals/AddPackModal'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)

  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState<[number, number]>([min, max])
  const [isOpenModalAddNewPack, setIsOpenModalAddNewPack] = useState(false)

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    dispatch(packsActions.setTitleForSearch(e.currentTarget.value))
  }

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue)
  }

  const onAfterChangeHandler = (value: [number, number]) => {
    dispatch(packsActions.setMinMaxAC(value))
  }
  const filterOffHandler = () => {
    setValue([0, 110])
    dispatch(packsActions.setMinMaxAC([0, 110]))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={s.wrapper}>
      <div className={s.titleBlock}>
        <div>Packs List</div>
        <AddPackModal isOpenModal={isOpenModalAddNewPack}
                    setIsOpenModal={setIsOpenModalAddNewPack} />
      </div>

      <div className={s.settings}>
        <div>
          <div>Search </div>
          <SearchForm value={searchValue} onChange={onChangeSearchHandler} />
        </div>
        <div>
          <div>Show packs cards </div>
          <ChooseMyOrAll />
        </div>
        <div>
          <div>Number of cards </div>
          <Slider
            min={minCardsCount}
            max={maxCardsCount}
            onChange={handleChange}
            value={value}
            onAfterChange={onAfterChangeHandler}
            range={true}
          />
        </div>

        <div className={s.btnFilterReset}>
          <Button onClick={filterOffHandler}>filter reset</Button>
        </div>
      </div>
      <PacksTable />
    </div>
  )
}
