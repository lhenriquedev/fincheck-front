import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { LaunchScreen } from '../../ui/components/LaunchScreen'
import { localStorageKeys } from '../config/localStorageKeys'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { usersService } from '../services/usersService'

interface AuthContextProps {
  signedIn: boolean
  signin(accessToken: string): void
  signout(): void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storedAccessToken
  })

  const { isError, isSuccess, isLoading } = useQuery({
    queryKey: ['loggedUser'],
    enabled: signedIn,
    staleTime: Infinity,
    queryFn: () => usersService.me(),
  })

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)

    setSignedIn(false)
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')
      signout()
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
      }}>
      <LaunchScreen isLoading={isLoading} />
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
