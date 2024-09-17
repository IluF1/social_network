import { BackButton } from "@/shared/ui/BackButton";
import styles from "./CreatePost.module.css";
import { useEffect, useState } from "react";
import { CustomButton, CustomInput, instance, Title } from "@/shared";
import { Switch } from "@/shared/shadcn/switch";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { createPostApi } from "@/pages/Home/model/home.slice";

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const user = useAppSelector((state) => state.user.user.login);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    dispatch(
      createPostApi({
        title: title,
        content: content,
        author: {
          login: user,
        },
      })
    );
    setTitle("");
    setContent("");
  };

  return (
    <div className={styles.container}>
      <Title tag="h1" children={"Создайте статью"} />
      <div className={styles.content}>
        <form action="" className={styles.article_form}>
          <CustomInput
            children="Заголовок"
            className={styles.title_article}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <CustomInput
            children="Содержание"
            textarea
            className={styles.content_article}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <CustomButton
            children="Создать"
            className=" mt-5"
            onClick={(e) => handleSubmit(e)}
          />
        </form>
      </div>
    </div>
  );
};
