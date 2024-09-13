import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import styles from "./NavElement.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  link: string;
}

export const NavElement = ({ children, className, icon, link }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setActive(window.location.pathname === link);
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [link]);

  return (
    <a
      className={cn(className, active ? styles.active : styles.default)}
      href={link}
    >
      <span className={styles.icon}>{icon}</span>
      {children}
    </a>
  );
};
