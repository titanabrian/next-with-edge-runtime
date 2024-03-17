'use client'

import { SignIn, useClerk, useSignIn } from '@clerk/nextjs'
import { useState } from 'react'

interface AuthProps {
  onSuccess?: Function
  onError?: Function
  onSuccessLogout?: Function
  onErrorLogout?: Function
}

const Auth = function ({onSuccess, onError,onSuccessLogout,onErrorLogout}:AuthProps) {
  const { signIn, isLoaded, setActive } = useSignIn()
  const { signOut } = useClerk()
  const [loading, setLoading] = useState(false)


  const [ formData, setFormData ] = useState({
    username:"",
    password:""
  })

  const handleSubmit = async function(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn?.create({
      identifier:formData.username,
      password:formData.password,
    }).then(async d => {
      await setActive({session: d.createdSessionId})
      onSuccess && onSuccess()
    }).catch(e => {
      onError && onError(e)
    }).finally(()=> {
      setLoading(false)
    })
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOut()
      onSuccessLogout && onSuccessLogout()
    } catch (e) {
      onErrorLogout && onErrorLogout()
    } finally {
      setLoading(false)
    }
  }

  const handleOnChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  } 

  return <>
    <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Auth!</h1>

        <p className="mt-4 text-gray-500">
          Please authenticate, so you can access many resources
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <div className="relative">
            <input
              required
              name="username"
              type="text"
              onChange={handleOnChange}
              value={formData.username}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter username"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>

          <div className="relative">
            <input
              required
              name="password"
              type="password"
              onChange={handleOnChange}
              value={formData.password}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={!isLoaded}
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            {loading? 'Loading': 'Sign In'}
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white"
          >
            {loading? 'Loading': 'Sign Out'}
          </button>
        </div>
      </form>
  </>
}

export default Auth
