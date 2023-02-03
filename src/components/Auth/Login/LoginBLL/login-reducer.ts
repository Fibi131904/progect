import { appActions } from "../../../../app/app-reducer"
import { AppThunk, InferActionTypes } from "../../../../store/store"
import { errorUtils } from "../../../../utils/error-utils"
import { profileActions } from "../../../Profile/ProfileBLL/profile-reducer"
import { loginAPI, LoginType } from "../LoginAPI/loginAPI"
import { AxiosError } from "axios"
import { packsActions } from "../../../Packs/PacksBLL/packs-reducer"



const loginInitialState = {
    isLoggedIn: false,
    isInitialized: false,
}

export const loginReducer = (state: LoginInitialStateType = loginInitialState, action: LoginActionsType): LoginInitialStateType =>
{
    switch (action.type)
    {
        case 'LOGIN/SET-IS-LOGGED-IN':
        case 'LOGIN/SET-IS-INITIALIZED':
            return { ...state, ...action.payload }
        default:
            return state
    }
}
export const loginActions = {
    setIsLoggedIn: (isLoggedIn: boolean) =>
        ({ type: 'LOGIN/SET-IS-LOGGED-IN', payload: { isLoggedIn } } as const),
    setAppInitializedAC: (value: boolean) => ({ type: 'LOGIN/SET-IS-INITIALIZED', payload: { value } } as const),
}


export const loginTC = (login: LoginType): AppThunk => async (dispatch) =>
{
    dispatch(appActions.setAppStatus('loading'))
    try
    {
        const res = await loginAPI.login(login)
        dispatch(loginActions.setIsLoggedIn(true))
        //@ts-ignore
        dispatch(profileActions.setUserData(res))
    }
    catch (error: any | AxiosError<{ error: string }, any>)
    {
        errorUtils(error, dispatch)
    }
    finally
    {
        dispatch(appActions.setAppStatus('succeeded'))
    }
}

export const logoutTC = (): AppThunk => async dispatch =>
{
    try
    {
        await loginAPI.logout()
        dispatch(loginActions.setIsLoggedIn(false))
        dispatch(packsActions.setPacks([]))
    } catch (error: any | AxiosError<{ error: string }, any>)
    {
        errorUtils(error, dispatch)
    }
}
export const authMe = (): AppThunk => (dispatch) =>
{

    loginAPI.me()
        .then((res) =>
        {
            dispatch(loginActions.setIsLoggedIn(true))
            dispatch(profileActions.setUserData(res.data))

        })
        .finally(() =>
        {

            dispatch(appActions.setInitialized(true))
        })
}




export type LoginInitialStateType = typeof loginInitialState
export type LoginActionsType = InferActionTypes<typeof loginActions>
