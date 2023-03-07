import {actions, initialState, positionsReducer} from './positionsReducer'

test('should set loading to true', () => {
    const endState = positionsReducer(initialState, actions.request())
    expect(endState.loading).toEqual(true)
})
test('should set positions to array of positions, loading to false, succes to true', () => {
    const positions = [
        {id: 1,name: 'Doctor'},
        {id: 2,name: 'Driver'},
    ]
    const endState = positionsReducer(initialState, actions.setSuccessData(positions))
    expect(endState.positions).toEqual(positions)
    expect(endState.loading).toEqual(false)
    expect(endState.success).toEqual(true)
})
test('should set fail message to proper value, loading to false', () => {
    const error = 'Error'
    const endState = positionsReducer(initialState, actions.setErrorData(error))
    expect(endState.message).toEqual(error)
    expect(endState.loading).toEqual(false)
    expect(endState.success).toEqual(false)
})