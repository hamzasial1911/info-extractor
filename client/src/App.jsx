import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import SignUp from './components/SignUp'
import './App.css'
import Authentication from './components/Authentication'
import ExtractedData from './components/ExtractedData'
import RootLayout from './Layouts/RootLayout'
import PrivateRoute from './utils/privateRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/login' element={<Authentication />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/' element={<ExtractedData />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
