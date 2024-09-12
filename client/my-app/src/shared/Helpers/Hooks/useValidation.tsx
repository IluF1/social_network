import { useState } from 'react'

export function useValidation() {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [blocked, setBlocked] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  const validatePassword = (password: string) => {
    if (password.length < 16) {
      setPasswordError('Пароль должен содержать не менее 16 символов')
      setBlocked(true)
    }
    else {
      setPasswordError('')
      setBlocked(emailError !== '' || loginError !== '') // проверка всех ошибок
    }
  }

  const validateEmail = (email: string) => {
    const re
      = /^(([^<>()[\]\\.,;:\s@"]+(?:\.[^<>()[\]\\.,;:\s@"]+)*)|.".+")@(\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]|(?:[a-z\-0-9]+\.)+[a-z]{2,})$/i

    if (re.test(String(email).toLowerCase())) {
      setEmailError('')
      setBlocked(passwordError !== '' || loginError !== '') // проверка всех ошибок
    }
    else {
      setEmailError('Некорректная почта!')
      setBlocked(true)
    }
  }

  const validateLogin = (login: string) => {
    let error = ''

    if (login.length <= 5) {
      error = 'Ваш логин должен содержать не менее 5 символов'
    }

    if (/^\d/.test(login)) {
      error = 'Ваш логин не должен начинаться с цифры'
    }

    setLoginError(error)

    if (error === '') {
      setBlocked(passwordError !== '' || emailError !== '') // проверка всех ошибок
    }
    else {
      setBlocked(true)
    }
  }

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
  }

  const loginChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLogin(value)
    validateLogin(value)
  }

  return {
    email,
    emailChangeHandler,
    emailError,
    blocked,
    password,
    passwordChangeHandler,
    passwordError,
    login,
    loginChangeHandler,
    loginError,
  }
}
