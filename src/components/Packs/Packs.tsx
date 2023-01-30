import { Header } from '../Header/Header'
import { PacksTable } from './PacksTable/PacksTable'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import s from './Packs.module.css'
import { SearchForm } from '../SearchForm/SearchForm'
import { ChangeEvent, useState } from 'react'
import { packsActions } from './PacksBLL/packs-reducer'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    dispatch(packsActions.setTitleForSearch(e.currentTarget.value))
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
          <SearchForm value={searchValue} onChange={onChangeSearchHandler} />{' '}
        </div>
        <div>-Show packs cards- </div>
        <div>-Number of cards- </div>
        <div>-filter reset </div>
      </div>

      <div className={s.title}>Packs List</div>
      <PacksTable />
    </div>
  )
}
