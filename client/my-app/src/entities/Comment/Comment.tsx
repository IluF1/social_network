import { Title } from "@/shared";
import styles from "./Comment.module.css";
import { MiniProfile } from "../MiniProfile/MiniProfile";
import { formattedDate } from "@/shared/Helpers/constansts";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { Heart, MessageSquareReply } from "lucide-react";

interface IComment {
  userId: number;
  content: string;
  createdAt: string;
  avatar: string;
  name: string;
  login: string;
}

export const Comment = ({
  userId,
  content,
  createdAt,
  avatar,
  name,
  login,
}: IComment) => {
  const user = useAppSelector((state) => state.user.user.id);
  console.log({
    userId,
    content,
    createdAt,
    avatar,
    name,
    login
  })
  return (
    <div className={userId === user ? styles.userComment : styles.container}>
      <a href={`/${login}`}>
        <img src={avatar} alt={name} className={styles.avatar} />
      </a>
      <div className={styles.content}>
        <Title tag="h3" className={styles.name}>
          {name}
        </Title>
        <Title tag="h2" className={styles.content_text}>
          {content}
        </Title>
        <div className={styles.commentInterface}>
          <button className={styles.interfaceItemOne}>
            <Heart color="gray" />
          </button>
          <button className={styles.interfaceItemTwo}>
            <MessageSquareReply color="gray" />
          </button>
        </div>
      </div>
      <Title tag="h3" className={styles.date}>
        {formattedDate(createdAt || "")}
      </Title>
    </div>
  );
};
