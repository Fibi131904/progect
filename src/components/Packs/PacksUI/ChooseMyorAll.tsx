import { memo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector} from "../../../store/store";
import { ReactElement } from 'react';
import { packsActions, PacksType } from "../PacksBLL/packs-reducer";

import { SuperRadio } from "../../../common/super-components/SuperRadio/SuperRadio";

export type Nullable<T> = T | null;
export type ReturnComponentType = Nullable<ReactElement>;

export const ChooseMyOrAll = memo((): ReturnComponentType => {
  const userId = useAppSelector(state => state.profile.user._id);
  const type = useAppSelector(state => state.packs.packsType);


  const dispatch = useAppDispatch();
  const arr: PacksType[] = ['All', 'My']

  {type === "All" ? dispatch(packsActions.setPacksForUser(""))
  : dispatch(packsActions.setPacksForUser(userId))}

  const [valueFromArray, setValueFromArray] = useState(arr[0])

  const onChangeOption = useCallback((value: string) => {
        setValueFromArray(value as PacksType)
        dispatch(packsActions.setPacksType(value as PacksType))
        if (value === 'All') {
            dispatch(packsActions.setPacksForUser(''))
        } else {
            dispatch(packsActions.setPacksForUser(userId))
        }
    }, [dispatch, userId])


  return (
    <div><SuperRadio name={'radio'} options={arr} value={valueFromArray}
    onChangeOption={onChangeOption}/></div>
  );
});