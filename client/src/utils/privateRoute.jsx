import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn
  })
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute
