import axios from "axios"
import { API } from "../../../03_API/API"
import { getUsers } from "../usersReducer/usersReducer"
import { BaseThunkType, InferActionTypes } from "../../../types"

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
type ServerError = {
  success: boolean
  message: string
  fails?: SignupFailsType
}

export type SignupFailsType = {
  [key in "name" | "email" | "phone" | "position_id" | "photo"]: string[]
}

export const initialState = {
  loading: false,
  success: false,
  message: "",
  user_id: null as null | number,
  fails: undefined as undefined | SignupFailsType,
}

export const signupReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "SIGNUP/REQUEST":
      return { ...state, loading: true }
    case "SIGNUP/SET-USER_ID":
      return {
        ...state,
        loading: false,
        success: true,
        user_id: action.payload.user_id,
        message: action.payload.message,
      }
    case "SIGNUP/SET-ERROR_MESSAGE":
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload.errorMessage,
        fails: action.payload.fails,
      }

    default:
      return state
  }
}

export const actions = {
  request: () => ({ type: "SIGNUP/REQUEST" as const }),
  setSuccessData: (user_id: number, message: string) => ({
    type: "SIGNUP/SET-USER_ID" as const,
    payload: { user_id, message },
  }),
  setErrorData: (errorMessage: string, fails: SignupFailsType | undefined) => ({
    type: "SIGNUP/SET-ERROR_MESSAGE" as const,
    payload: { errorMessage, fails },
  }),
}

export function signup(formData: FormData): ThunkType {
  return async function (dispatch) {
    try {
      dispatch(actions.request())
      const { token } = await API.getToken()
      const data = await API.signup(formData, token)
      if (data.success && data.user_id) {
        const showOnlyFirstPortion = true
        dispatch(actions.setSuccessData(data.user_id, data.message))
        dispatch(getUsers("", showOnlyFirstPortion))
      }
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          dispatch(actions.setErrorData(err.response.data.message, err.response.data.fails))
        }
      } else {
        console.error(err)
      }
    }
  }
}
