import axios from 'axios'
import { API } from "../../../03_API/API"
import { BaseThunkType, InferActionTypes } from "../../../types"


type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>

export type PositionType = {
  id: number
  name: string
}
type ServerError = {
  success: boolean
  message: string
}

export const initialState = {
  loading: false,
  success: false,
  message: "",
  positions: null as null | Array<PositionType>,
}

export const positionsReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case "POSITIONS/REQUEST":
      return { ...state, loading: true }
    case "POSITIONS/SET-POSITIONS":
      return { ...state, positions: action.payload.positions, loading: false, success: true }
    case "POSITIONS/SET-ERROR_MESSAGE":
      return { ...state, message: action.payload.message, loading: false, success: false }

    default:
      return state
  }
}

export const actions = {
  request: () => ({ type: "POSITIONS/REQUEST" as const }),
  setSuccessData: (positions: Array<PositionType>) => ({
    type: "POSITIONS/SET-POSITIONS" as const,
    payload: { positions },
  }),
  setErrorData: (message: string) => ({
    type: "POSITIONS/SET-ERROR_MESSAGE" as const,
    payload: { message },
  }),
}

export function getPositions(): ThunkType {
  return async function (dispatch) {
    try {
      dispatch(actions.request())
      const data = await API.getPositions()
      if (data.success && data.positions) {
        dispatch(actions.setSuccessData(data.positions))
      }
    } catch (err) {
      if (axios.isAxiosError<ServerError>(err)) {
        if (err && err.response) {
          dispatch(actions.setErrorData(err.response.data.message))
        }
      } else {
        console.error(err)
      }
    }
  }
}
