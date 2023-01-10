import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoginActionsType, loginReducer } from './../components/Auth/Login/LoginBLL/login-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  login: loginReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown, AnyAction>

export type InferActionTypes<T> = T extends { [ keys: string ]: (...args: any[]) => infer U } ? U : never

export type AppActionsType = LoginActionsType
// |


export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type TypedDispatch = ThunkDispatch<AppStateType, any, AppActionsType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector