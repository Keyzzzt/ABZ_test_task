import {StateType} from '../store'

export const selectPositions = (state: StateType) => state.positions
export const selectUsers = (state: StateType) => state.users
export const selectSignup = (state: StateType) => state.signup