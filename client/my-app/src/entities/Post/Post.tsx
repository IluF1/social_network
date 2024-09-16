import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { instance, Title } from "@/shared";
import { MiniProfile } from "../MiniProfile/MiniProfile";

import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { formattedDate } from "@/shared/Helpers/constansts";

interface Props {
  content: string;
  id: number;
  userId: number;
  date: string;
  likes: number
}

export const Post = ({ content, id, date, userId, likes }: Props) => {
  const [user, setUser] = useState({
    name: "name",
    avatar: "avatar",
    login: "login",
  });

  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    instance
      .post(`/user/getById`, { id: userId })
      .then((res) => setUser(res.data));
  }, [id]);

  
  useEffect(() => {
    if (isLiked) {
      instance.post("/post/setLike", {
        user: { id: userId },
        post: { id: id },
      });
    }
  }, [isLiked]);
  


  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <MiniProfile
          name={user.name}
          avatar={user.avatar}
          login={user.login}
          className=" w-80"
        />
        <Title tag="h3" className={styles.date}>
          {formattedDate(date || "")}
        </Title>
      </div>
      <a href={`/post/${user.login}/${id}`}>
        <Title tag="h1" className={styles.content}>
          {content}
        </Title>
      </a>
      <div className={styles.interface}>
        <button
          className={styles.interfaceItemOne}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart width={25} height={25} className={styles.icon} />
          <Title tag="h3" className={styles.count_likes}>
            {likes + (isLiked ? 1 : 0)}
          </Title>
        </button>

        <button className={styles.interfaceItemTwo}>
          <MessageSquare width={25} height={25} />
          <Title tag="h3" className={styles.count_comments}>
            0
          </Title>
        </button>
        <button className={styles.interfaceItemThree}>
          <Bookmark width={25} height={25} className={styles.icon} />
        </button>
        <button></button>
      </div>
    </div>
  );
};
