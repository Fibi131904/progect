import { Header } from '../Header/Header'
import { PacksTable } from './PacksTable/PacksTable'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import s from './Packs.module.css'
import { SearchForm } from '../SearchForm/SearchForm'
import { ChangeEvent, useState } from 'react'
import { packsActions } from './PacksBLL/packs-reducer'
import { Button, Radio, Slider } from 'antd'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const isMyPack = useAppSelector((state) => state.packs.isMyPack)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)

  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState<[number, number]>([min, max])

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    dispatch(packsActions.setTitleForSearch(e.currentTarget.value))
  }
  const myPacksHandler = () => {
    dispatch(packsActions.setMyAllPacksAC(true))
  }
  const allPacksHandler = () => {
    dispatch(packsActions.setMyAllPacksAC(false))
  }

  const handleChange = (newValue: [number, number]) => {
    setValue(newValue)
  }

  const onAfterChangeHandler = (value: [number, number]) => {
    dispatch(packsActions.setMinMaxAC(value))
  }
const filterOffHandler=()=>{
  setValue([0, 110]);
  dispatch(packsActions.setMinMaxAC([0, 110]))
}

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.btn}>
          <button>Add new pack</button>
        </div>

        <div>
          <div>Search </div>
          <SearchForm
            value={searchValue}
            onChange={onChangeSearchHandler}
          />{' '}
        </div>
        <div>
          <div>Show packs cards- </div>
          <Radio.Group>
            <Radio.Button
              value={'My'}
              type={isMyPack ? 'primary' : 'default'}
              onClick={myPacksHandler}>
              My
            </Radio.Button>
            <Radio.Button
              value={'All'}
              type={!isMyPack ? 'primary' : 'default'}
              onClick={allPacksHandler}>
              All
            </Radio.Button>
          </Radio.Group>
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
        <div><Button  onClick={filterOffHandler}>filter reset</Button> </div>
      </div>

      <div className={s.title}>Packs List</div>
      <PacksTable />
    </div>
  )
}
