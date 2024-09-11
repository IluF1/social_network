/* eslint-disable style/multiline-ternary */
import { CustomButton, CustomInput, Title, useTheme } from '@/shared'
import { useAppDispatch } from '@/shared/Helpers/Hooks/useAppDispatch'
import { useAppSelector } from '@/shared/Helpers/Hooks/useAppSelector'
import { useValidation } from '@/shared/Helpers/Hooks/useValidation'

import { BackButton } from '@/shared/ui/backButton'
import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton'
import { Otp } from '@/shared/ui/OTP/OTP'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import type { FormEvent } from 'react'
import styles from './Auth.module.css'
import { authApi } from './model/auth.slice'
import 'react-toastify/dist/ReactToastify.css'

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [auth, setAuth] = useState<boolean>(false)
  const { email, emailChangeHandler, emailError, blocked, login }
    = useValidation()
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.auth)
  const { theme } = useTheme()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      await dispatch(authApi({ password, login, endpoint: '/auth' }))
    }
    else {
      await dispatch(authApi({ password, email, endpoint: '/auth' }))
    }

    if (error) {
      toast.error(error)
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        className="absolute w-72"
      />
      <div className={styles.authForm}>
        <BackButton
          className={styles.backButton}
          backEvent={() => setAuth(false)}
        />
        <div className="mt-20 text-center">
          <Title tag="h1">
            {auth ? 'Вам на почту пришел код' : 'Войдите в свой аккаунт'}
          </Title>

          {auth ? (
            <Otp />
          ) : (
            <form className="mt-28" onSubmit={handleSubmit}>
              {isLogin ? (
                <div>
                  <CustomInput children="Ваш логин" />
                </div>
              ) : (
                <div>
                  <CustomInput
                    children="Ваша почта"
                    value={email}
                    onChange={emailChangeHandler}
                    error={emailError.length > 0}
                  />
                  {emailError && (
                    <div className="text-lightRed mt-2">{emailError}</div>
                  )}
                </div>
              )}
              <CustomInput
                children="Ваш пароль"
                className="mt-12"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {error && <div className="text-lightRed mt-2">{error}</div>}
              <a className={styles.reset_data} href="/reset">
                НЕ ПОМНЮ ЛОГИН ИЛИ ПАРОЛЬ
              </a>
              <CustomButton
                className={styles.enter_button}
                type="submit"
                disable={blocked}
              >
                Войти
              </CustomButton>
              <CustomButton
                type="button"
                className={styles.login_button}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Войти через почту' : 'Войти через логин'}
              </CustomButton>
              <GoogleButton />
              <Title tag="h4" className="mt-12">
                У вас нет аккаунта?
                <a href="/registration" className=" border-b-1 border-foreground">
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </a>
              </Title>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
