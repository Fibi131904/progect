import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoginActionsType, loginReducer } from './../components/Auth/Login/LoginBLL/login-reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RegistrationActionTypes, registrationReducer } from '../components/Auth/Registration/RegistrationBLL/registration-reducer';
import { ProfileActionTypes, profileReducer } from '../components/Profile/ProfileBLL/profile-reducer';
import { RecoveryActionTypes, recoveryReducer } from '../components/Auth/Recovery/RecoveryBLL/recovery-reducer';


export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  recoverPassword: recoveryReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown, AnyAction>

export type InferActionTypes<T> = T extends { [ keys: string ]: (...args: any[]) => infer U } ? U : never

export type AppActionsType = LoginActionsType
 | RegistrationActionTypes
 | ProfileActionTypes
 | RecoveryActionTypes


export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type TypedDispatch = ThunkDispatch<AppStateType, any, AppActionsType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector