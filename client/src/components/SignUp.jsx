import React from 'react'
import Image from '../assets/clipboard.png'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/Slice/authSlice'
import { toast } from 'react-toastify'

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const clientId =
    '983403015607-ob8852cqt2m61jh8puq07p56bqc06tdf.apps.googleusercontent.com'

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const tokens = await axios.post('http://127.0.0.1:8080/auth/google/', {
        token: tokenResponse.access_token
      })

      dispatch(setCredentials(tokens.data))
      toast.success('Successfully logged In', {
        position: toast.POSITION.TOP_RIGHT
      })
      navigate('/')
    },
    onError: async () =>
      toast.error('Invalid login', {
        position: toast.POSITION.TOP_RIGHT
      }),
    clientId: clientId,
    flow: 'implicit'
  })
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:8080/signup/', formData);
          console.log('Signup successful', response.data);
          navigate('/login');
          toast.success('Successfully created account', {
            position: toast.POSITION.TOP_RIGHT
          })
        } catch (error) {
          console.error('Signup failed', error);
          toast.error('Invalid provided information', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      };
    
  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <img className='w-8 h-8 mr-2' src={Image} alt='logo' />
            Benny Task
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create a new account
              </h1>
              <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6' action='#'>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='first_name'
                    id='first_name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='First Name'
                    required=''
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='last_name'
                    id='last_name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Last Name'
                    required=''
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        required=''
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='remember'
                        className='text-gray-500 dark:text-gray-300'
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign up
                </button>
                <button type='button' className='w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500' onClick={login}>
                  <svg
                    class='h-6 w-6 mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlns:xlink='http://www.w3.org/1999/xlink'
                    viewBox='-0.5 0 48 48'
                    version='1.1'
                  >
                    {' '}
                    <title>Google-color</title>{' '}
                    <desc>Created with Sketch.</desc> <defs> </defs>{' '}
                    <g
                      id='Icons'
                      stroke='none'
                      stroke-width='1'
                      fill='none'
                      fill-rule='evenodd'
                    >
                      {' '}
                      <g
                        id='Color-'
                        transform='translate(-401.000000, -860.000000)'
                      >
                        {' '}
                        <g
                          id='Google'
                          transform='translate(401.000000, 860.000000)'
                        >
                          {' '}
                          <path
                            d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
                            id='Fill-1'
                            fill='#FBBC05'
                          >
                            {' '}
                          </path>{' '}
                          <path
                            d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
                            id='Fill-2'
                            fill='#EB4335'
                          >
                            {' '}
                          </path>{' '}
                          <path
                            d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
                            id='Fill-3'
                            fill='#34A853'
                          >
                            {' '}
                          </path>{' '}
                          <path
                            d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
                            id='Fill-4'
                            fill='#4285F4'
                          >
                            {' '}
                          </path>{' '}
                        </g>{' '}
                      </g>{' '}
                    </g>{' '}
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
