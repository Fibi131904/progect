
import {  InferActionTypes } from '../store/store';


const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isLoading: false,
    isInitialized: false
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType =>
{
    switch (action.type)
    {
        case 'APP/SET_STATUS':
        case 'APP/SET_ERROR':
        case 'APP/SET_IS_LOADING':
        case 'APP/SET_IS_INITIALIZED':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export const appActions = {
    setAppStatus: (status: RequestStatusType) => ({ type: 'APP/SET_STATUS', payload: { status } } as const),
    setAppError: (error: null |string) => ({ type: 'APP/SET_ERROR', payload: { error } } as const),
    setAppIsLoading: (isLoading: boolean) => ({ type: 'APP/SET_IS_LOADING', payload: { isLoading } } as const),
    setInitialized: (value: boolean) => ({ type: 'APP/SET_IS_INITIALIZED', payload: { value } } as const),
}


//types
export type AppInitialStateType = typeof appInitialState
export type AppActionTypes = InferActionTypes<typeof appActions>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
