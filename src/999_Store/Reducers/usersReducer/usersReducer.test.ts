import { actions, initialState, usersReducer } from "./usersReducer"

test("should set loading to true", () => {
  const endState = usersReducer(initialState, actions.request())
  expect(endState.loading).toEqual(true)
})
test("should set all data and loading to false", () => {
  const users = [
    {
      id: "string",
      name: "string",
      email: "string",
      phone: "string",
      position: "string",
      position_id: "string",
      registration_timestamp: 987359,
      photo: "string",
    },
  ]
  const data = {
    users,
    links: {
      next_url: "ok",
      prev_url: "dqwd",
    },
    total_pages: 3,
    total_users: 10,
    page: 3,
    success: true,
    count: 10,
  }

  const endState = usersReducer(initialState, actions.setUsers(data))
  expect(endState.loading).toEqual(false)
  expect(endState.success).toEqual(true)
  expect(endState.page).toEqual(data.page)
  expect(endState.links?.next_url).toEqual(data.links.next_url)
  expect(endState.links?.prev_url).toEqual(data.links.prev_url)
  expect(endState.total_pages).toEqual(data.total_pages)
  expect(endState.total_users).toEqual(data.total_users)
  expect(endState.users).toEqual(users)
  expect(endState.users.length).toEqual(1)
  expect(endState.message).toEqual('')

})
test("should proper data + users shouldn't be added to previous array", () => {
    const users = [
      {
        id: "string",
        name: "string",
        email: "string",
        phone: "string",
        position: "string",
        position_id: "string",
        registration_timestamp: 987359,
        photo: "string",
      },
    ]
    const data = {
      users,
      links: {
        next_url: "ok",
        prev_url: "dqwd",
      },
      total_pages: 3,
      total_users: 10,
      page: 3,
      success: true,
      count: 10,
      
    }
    const iState = {
        ...data, 
        loading: false,
        fails: undefined,
        message: '',
    }
  
    const endState = usersReducer(iState, actions.setUsersAfterSignup(data))
    expect(endState.loading).toEqual(false)
    expect(endState.success).toEqual(true)
    expect(endState.page).toEqual(data.page)
    expect(endState.links?.next_url).toEqual(data.links.next_url)
    expect(endState.links?.prev_url).toEqual(data.links.prev_url)
    expect(endState.total_pages).toEqual(data.total_pages)
    expect(endState.total_users).toEqual(data.total_users)
    expect(endState.users).toEqual(users)
    expect(endState.users.length).toEqual(1)
    expect(endState.message).toEqual('')
  
  })

test("should set fail message, and loading to false", () => {
  const error = "Error"
  const endState = usersReducer(
    initialState,
    actions.setErrorData(error, undefined)
  )
  expect(endState.message).toEqual(error)
  expect(endState.loading).toEqual(false)
})
