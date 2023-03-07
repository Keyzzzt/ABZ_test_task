import axios from 'axios'
import { UsersFailsType } from './../999_Store/Reducers/usersReducer/usersReducer';
import {PositionType} from '../999_Store/Reducers/positionsReducer/positionsReducer'
import {LinksType, UserType} from '../999_Store/Reducers/usersReducer/usersReducer'
import {SignupFailsType} from '../999_Store/Reducers/signupReducer/signupReducer'

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/'

export type PositionsResponseType = {
    success: boolean
    message?: string
    positions?: Array<PositionType>
}
export type SignupResponseType = {
    success: boolean
    message: string
    user_id?: number
    fails?: SignupFailsType
}
export type TokenResponseType = {
    success: boolean
    token: string
}
export type UsersResponseType = {
    success: boolean
    page?: number
    total_pages?: number
    total_users?: number
    count: number
    links: LinksType
    users: Array<UserType>
    message?: string
    fails?: UsersFailsType,
}
export const API = {
    getPositions: async () => {
        return axios.get<PositionsResponseType>(`${BASE_URL}positions`)
        .then(res => res.data)

    },
    getToken: async () => {
        return axios.get<TokenResponseType>(`${BASE_URL}token`)
            .then(res => res.data)

    },
    getUsers: async (url: string) => {
        const getUrl = url ? url : `${BASE_URL}users?page=1&count=6`
        return axios.get<UsersResponseType>(getUrl)
            .then(res => res.data)
    },
    signup: async (data: FormData, token: string) => {
        return axios.post<SignupResponseType>(`${BASE_URL}users`, data, {headers: {'Token': token}}).then(res => res.data)
    },
}