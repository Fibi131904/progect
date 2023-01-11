import axios, { AxiosError } from "axios"
import { Dispatch } from "redux"
import { appActions } from "../app/app-reducer"

export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(appActions.setAppError(error))
  } else {
      dispatch(appActions.setAppError(`Native error ${err.message}`))
  }
}