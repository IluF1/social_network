/* eslint-disable style/multiline-ternary */
import { CustomButton, CustomInput, Title } from '@/shared'
import { useAppDispatch } from '@/shared/Helpers/Hooks/useAppDispatch'
import { useAppSelector } from '@/shared/Helpers/Hooks/useAppSelector'
import { useValidation } from '@/shared/Helpers/Hooks/useValidation'

import { BackButton } from '@/shared/ui/BackButton'
import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import type { FormEvent } from 'react'
import styles from './Auth.module.css'
import { authApi } from './model/auth.slice'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { token } from '@/shared/Helpers/constansts'

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const { email, emailChangeHandler, emailError, blocked, login, loginChangeHandler }
    = useValidation()
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.error)
  const navigate = useNavigate()

   useEffect(() => {
     if (token?.length) {
       navigate("/");
     }
   }, [token]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await dispatch(authApi({ password, login })).unwrap()
      }
      else {
        await dispatch(authApi({ password, email })).unwrap()
      }
      navigate('/')
    }
    catch(err: any) {
      toast.error(err)
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
        theme={'dark'}
        className="absolute w-72"
      />
      <div className={styles.authForm}>
        <div className="flex justify-between items-center p-4">
          <BackButton
            backEvent={() => navigate('/')}
          />
        </div>
        <div className="mt-20 text-center">
          <Title tag="h1">
           Войдите в свой аккаунт
          </Title>

          
            <form className="mt-28" onSubmit={handleSubmit}>
              {isLogin ? (
                <div>
                  <CustomInput
                    children="Ваш логин"
                    value={login}
                    onChange={loginChangeHandler}
                  />
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="text-lightRed mt-2">{error}</div>}
              <a className={styles.reset_data} href="/reset">
                НЕ ПОМНЮ ЛОГИН ИЛИ ПАРОЛЬ
              </a>
              <CustomButton
                className={styles.enter_button}
                type="submit"
                disabled={blocked}
              >
                Войти
              </CustomButton>
              <CustomButton
                type="button"
                className={styles.login_button}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Войти через почту" : "Войти через логин"}
              </CustomButton>
              <GoogleButton />
              <Title tag="h4" className="mt-12">
                У вас нет аккаунта?
                <a
                  href="/registration"
                  className=" border-b-1 border-foreground"
                >
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </a>
              </Title>
            </form>
        </div>
      </div>
    </div>
  );
}
