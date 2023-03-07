import { positionsReducer } from './Reducers/positionsReducer/positionsReducer';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {usersReducer} from './Reducers/usersReducer/usersReducer'
import {signupReducer} from './Reducers/signupReducer/signupReducer'

const rootReducer = combineReducers({
    positions: positionsReducer,
    users: usersReducer,
    signup: signupReducer,
})


// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


export type StateType = ReturnType<typeof rootReducer>

export default store
