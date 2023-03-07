import axios from "axios"
import {API, UsersResponseType} from '../../../03_API/API'
import {BaseThunkType, InferActionTypes} from '../../../types'

type ThunkType = BaseThunkType<ActionType>
type InitialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
export type LinksType = {
    next_url: string
    prev_url: string
}

export type UsersFailsType = {
    [key in 'count' | 'page']: string[]
}
type ServerError = {
    success: boolean
    message: string
    fails: UsersFailsType
}
export type UserType = {
    id: string
    name: string
    email: string
    phone: string
    position: string
    position_id: string
    registration_timestamp: number
    photo: string
}

export const initialState = {
    loading: false,
    success: false,
    page: undefined as undefined | number,
    total_pages: undefined as undefined | number,
    total_users: undefined as undefined | number,
    users: [] as Array<UserType>,
    links: undefined as undefined | LinksType,
    message: '',
    fails: undefined as undefined | UsersFailsType,
    count: undefined as undefined | number
}

export const usersReducer = (
    state = initialState,
    action: ActionType
): InitialStateType => {
    switch (action.type) {
        case 'USERS/REQUEST':
            return {...state, loading: true}
        case 'USERS/SET-USERS':
            return {
                ...state,
                loading: false,
                success: true,
                users: [...state.users, ...action.payload.data.users],
                links: action.payload.data.links,
                total_pages: action.payload.data.total_pages,
                total_users: action.payload.data.total_users,
                page: action.payload.data.page,
                count: undefined as undefined | number
            }
        case 'USERS/SET_SIGNUP-USERS':
            return {
                ...state,
                loading: false,
                success: true,
                users: action.payload.data.users,
                links: action.payload.data.links,
                total_pages: action.payload.data.total_pages,
                page: action.payload.data.page,
                count: undefined as undefined | number

            }

        case 'USERS/SET-ERROR_MESSAGE':
            return {
                ...state, 
                loading: false,
                success: false,
                message: action.payload.message, 
                fails: action.payload.fails,
            }

        default:
            return state
    }
}

export const actions = {
    request: () => ({type: 'USERS/REQUEST' as const}),
    setUsers: (data: UsersResponseType) => ({
        type: 'USERS/SET-USERS' as const,
        payload: {data},
    }),
    setUsersAfterSignup: (data: UsersResponseType) => ({
        type: 'USERS/SET_SIGNUP-USERS' as const,
        payload: {data},
    }),
    setErrorData: (message: string, fails: UsersFailsType | undefined) => ({
        type: 'USERS/SET-ERROR_MESSAGE' as const,
        payload: {message, fails},
    })
}

export function getUsers(url: string = '', afterSignUp: boolean = false): ThunkType {
    return async function (dispatch) {
        try {
            dispatch(actions.request())
            const data = await API.getUsers(url)
            if (data.success && data.users) {
                afterSignUp ? dispatch(actions.setUsersAfterSignup(data)) : dispatch(actions.setUsers(data))
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
