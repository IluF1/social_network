import { CustomButton, CustomInput, Title, useTheme } from "@/shared";

import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { useValidation } from "@/shared/Helpers/Hooks/useValidation";
import { BackButton } from "@/shared/ui/backButton";
import { GoogleButton } from "@/shared/ui/GoogleButton/GoogleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { registrationApi } from "./model/registration.slice";
import styles from "./Registration.module.css";
import "react-toastify/dist/ReactToastify.css";
import { authApi } from "../Auth/model/auth.slice";

export function Registration() {
  const navigate = useNavigate();
  const {
    email,
    emailChangeHandler,
    emailError,
    blocked,
    password,
    passwordChangeHandler,
    passwordError,
    loginChangeHandler,
    login,
    loginError,
  } = useValidation();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const notify = (message: string) => {
    toast.error(message);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(
        registrationApi({ login, email, password, name })
      ).unwrap();
      await dispatch(authApi({ email, password })).unwrap();
      navigate("/");
      toast.success("Вы успешно зарегистрировались");
    } catch (error) {
      notify(`Ошибка регистрации: ${error || "Неизвестная ошибка"}`);
      console.error("Registration failed:", error);
    }
  };

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
      <div className={styles.registrationForm}>
        <div className="flex justify-between items-center p-4">
          <BackButton backEvent={() => navigate("/")} />
        </div>
        <div className=" mt-8 text-center">
          <Title tag="h1">Давайте познакомимся!</Title>

          <form
            className=" mt-10"
            onSubmit={(event: React.FormEvent) => onSubmit(event)}
          >
            <CustomInput
              children="Ваше имя"
              className="mt-8"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomInput
              children="Ваша логин"
              className="mt-8"
              value={login}
              onChange={(e) => loginChangeHandler(e)}
              error={loginError.length > 0}
              required
            />
            {loginError && <p className=" text-lightRed mt-2">{loginError}</p>}
            <CustomInput
              children="Ваша почта"
              className="mt-8"
              value={email}
              onChange={(e) => emailChangeHandler(e)}
              error={emailError.length > 0}
              required
            />
            {emailError && <p className=" text-lightRed mt-2 ">{emailError}</p>}
            <CustomInput
              children="Ваш пароль"
              value={password}
              onChange={(e) => passwordChangeHandler(e)}
              className="mt-8"
              type="password"
              error={passwordError.length > 0}
              required
            />
            {passwordError && (
              <p className=" text-lightRed mt-2">{passwordError}</p>
            )}
            <CustomButton
              className={styles.registration_button}
              type="submit"
              disabled={blocked}
            >
              Зарегистрироваться
            </CustomButton>
            <GoogleButton />

            <Title tag="h4" className="mt-12">
              У вас есть аккаунт?
              <a href="/auth" className=" border-b-1 border-foreground">
                ВОЙТИ
              </a>
            </Title>
          </form>
        </div>
      </div>
    </div>
  );
}
