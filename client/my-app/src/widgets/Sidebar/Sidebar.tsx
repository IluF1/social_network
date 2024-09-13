import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { NavElement } from "@/shared/ui/NavElement/NavElement";
import { AlertCircle, BotIcon, Contact, Home, MessageCircle, Newspaper } from "lucide-react";
import { ResumeIcon } from "@radix-ui/react-icons";
import { MiniProfile } from "@/entities/MiniProfile/MiniProfile";

export const Sidebar = () => {
  const [hideSidebar, setHideSidebar] = useState(
    window.location.pathname === "/auth" ||
      window.location.pathname === "/registration"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setHideSidebar(
        window.location.pathname === "/auth" ||
          window.location.pathname === "/registration"
      );
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <aside>
      {!hideSidebar && (
        <div className={styles.container}>
          <MiniProfile />
          <NavElement
            children="Главная"
            link="/"
            icon={<Home />}
            className=" text-xl mt-6"
          />
          <NavElement
            children="Чаты"
            link="/chats"
            icon={<MessageCircle />}
            className=" text-xl mt-4"
          />
          <NavElement
            children="Друзья"
            link="/friends"
            icon={<Contact />}
            className=" text-xl mt-4"
          />
          <NavElement
            children="Сообщества"
            link="/vacancys"
            icon={<ResumeIcon />}
            className=" text-xl mt-4"
          />
          <NavElement
            children="Новости"
            link="/news"
            icon={<Newspaper />}
            className=" text-xl mt-4"
          />
          <NavElement
            children="Тех.поддержка"
            link="/help"
            icon={<BotIcon />}
            className=" text-xl mt-4"
          />
          <NavElement
            children="О нас"
            link="/about"
            icon={<AlertCircle />}
            className=" text-xl mt-4"
          />
        </div>
      )}
    </aside>
  );
};
