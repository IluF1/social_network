import { CustomButton, CustomInput, Title } from "@/shared";
import styles from "./Header.module.css";
import logo from "@/app/assets/images/logo.jpg";
import { Bell, Settings } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { getUserBySessionToken } from "./model/user.slice";
import { token } from "@/shared/Helpers/constansts";

export const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserBySessionToken({ session: token || "" }));
  }, [dispatch, token]);

  return (
    <>
        <header className={styles.container}>
          <div className={styles.rightBar}>
            <a href="/" className={styles.logoBlock}>
              <img src={logo} alt="logo" className={styles.logo} />
              <Title className={styles.name} tag="h1">
                Сеть
              </Title>
            </a>
            <CustomInput children="Поиск" className={styles.searchInput} />
          </div>
          {token ? (
            <div className={styles.authUser}>
              <button className=" mr-6">
                <Bell width={30} height={30} className=" text-foreground" />
              </button>
              <a href="/settings">
                <Settings />
              </a>
            </div>
          ) : (
            <div className={styles.leftBar}>
              <>
                <a href="/auth">
                  <CustomButton style="outline" className="w-48 text-sm">
                    Войти в аккаунт
                  </CustomButton>
                </a>
                <a href="/registration">
                  <CustomButton style="ghost" className="w-48 text-sm">
                    Зарегистрироваться
                  </CustomButton>
                </a>
              </>
            </div>
          )}
        </header>
    </>
  );
};
