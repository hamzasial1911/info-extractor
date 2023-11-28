import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  isLoggedIn: localStorage.getItem('userInfo') ? true : false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
      state.isLoggedIn = true
    },
    logout: (state, action) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      state.isLoggedIn = false
    }
  }
})
export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer
