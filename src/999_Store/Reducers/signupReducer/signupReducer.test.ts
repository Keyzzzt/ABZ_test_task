import {actions, initialState, signupReducer} from './signupReducer'

test('should set loading to true', () => {
    const endState = signupReducer(initialState, actions.request())
    expect(endState.loading).toEqual(true)
})
test('should set user_id to proper value, loading to false, success to true', () => {
    const id = 123
    const message = 'all good'
    const endState = signupReducer(initialState, actions.setSuccessData(id, message))
    expect(endState.user_id).toEqual(id)
    expect(endState.message).toEqual(message)
    expect(endState.loading).toEqual(false)
    expect(endState.success).toEqual(true)
    
})
test('should set fail message,loading to false, fails to proper value, success to false', () => {
    const error = 'Error'
    const fails = {
        name: ['a', 'b'],
        email: ['gf'],
        phone: ['wef'],
        position_id: ['rre'],
        photo: ['ewf']
    }
    const endState = signupReducer(initialState, actions.setErrorData(error, fails))
    expect(endState.message).toEqual(error)
    expect(endState.loading).toEqual(false)
    expect(endState.success).toEqual(false)
    expect(endState.fails).toEqual(fails)
})