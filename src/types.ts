import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {StateType} from './999_Store/store'

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, any, A>
