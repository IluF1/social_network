import { CustomButton, CustomInput, ModeToggle, Title } from "@/shared";
import styles from "./Header.module.css";
import logo from "@/app/assets/images/logo.jpg";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { getUserByRefresh } from "./model/user.slice";
import { Bell, ChevronUp, Divide, Settings } from "lucide-react";
import { ChevronDown } from "lucide-react";

export const Header = () => {
  const hideHeader =
    window.location.pathname === "/auth" ||
    window.location.pathname === "/registration";

  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (refreshToken) {
      dispatch(getUserByRefresh({ refreshToken }));
    }
  }, [refreshToken, dispatch]);

  return (
    <>
      {!hideHeader && (
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
          {isAuthenticated ? (
            <div className={styles.authUser}>
              <button className=" mr-6">
                <Bell width={30} height={30} className=" text-foreground" />
              </button>
              <ModeToggle className=" mr-6" />
              <a href="/settings">
                <Settings width={30} height={30} className=" text-foreground" />
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
      )}
    </>
  );
};
