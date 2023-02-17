import { PacksTable } from './PacksTable/PacksTable'
import { Link, Navigate } from 'react-router-dom'
import { PATH } from '../../../app/RoutesPage'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import s from './Packs.module.css'
import { SearchForm } from '../../SearchForm/SearchForm'
import { ChangeEvent, useState } from 'react'
import { packsActions } from '../PacksBLL/packs-reducer'
import { Button, Radio, RadioChangeEvent, Slider } from 'antd'



export const Packs = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const user_id = useAppSelector((state) => state.packs.params.user_id)
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount)
  const min = useAppSelector((state) => state.packs.params.min)
  const max = useAppSelector((state) => state.packs.params.max)
 
 
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState<[number, number]>([min, max])
  const [value1, setValue1] = useState('All')
  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    dispatch(packsActions.setTitleForSearch(e.currentTarget.value))
  }
  const onChange = (e: RadioChangeEvent) => {
    console.log( e.target.value);
   
    if ( e.target.value === 'My') {
      setValue1(e.target.value);
      dispatch(packsActions.setPacksForUser(user_id))
     
  } else {
    dispatch(packsActions.setPacksForUser(''))   
  }
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
        <div>
          Packs List
        </div>
        <Link to={PATH.ADDNEWPACK} className={s.linkAddPack}>Add new pack</Link>
         </div>

      <div className={s.settings}>
        <div>
          <div>Search </div>
          <SearchForm value={searchValue} onChange={onChangeSearchHandler} />
        </div>
        <div>
          <div>Show packs cards- </div>
          <Radio.Group onChange={onChange}>
            <Radio.Button value={'My'} >
              My
            </Radio.Button>
            <Radio.Button value={'All'}>
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

        <div className={s.btnFilterReset}>
          <Button onClick={filterOffHandler}>filter reset</Button>
        </div>
      </div>
      <PacksTable />
    </div>
   
  )
}
