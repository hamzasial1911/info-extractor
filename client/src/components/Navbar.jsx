import React from 'react'
import { useNavigate } from 'react-router-dom'
import Image from '../assets/clipboard.png'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logout } from '../store/Slice/authSlice'
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const handleClick = () => {
    toast.success('Successfully Logout', {
      position: toast.POSITION.TOP_RIGHT
    })
    dispatch(logout())
    navigate('/login')
  }
  return (
    <>
      <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600'>
        <div className='flex flex-wrap items-center justify-between p-4'>
          <div className='flex items-center'>
            <img className='w-8 h-8 mr-2' src={Image} alt='logo' />
            <span className='self-center font-semibold whitespace-nowrap dark:text-white text-xl'>
              Hy, {userInfo.first_name + ' ' + userInfo.last_name}
            </span>
          </div>
          <div className='flex md:order-2'>
            <button
              type='button'
              onClick={handleClick}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 sm:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
