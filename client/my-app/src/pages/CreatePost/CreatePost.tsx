import styles from "./CreatePost.module.css";
import { useState } from "react";
import { CustomButton, CustomInput, Title } from "@/shared";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { File, ImageIcon } from "lucide-react";
import { createPostApi } from "@/entities/Post/model/post.slice";

export const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user.user.login);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={styles.container}>
      <Title
        tag="h1"
        children={post ? "Расскажите что у вас сегодня нового" : "Создайте статью"}
      />
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.article_form}>
          {!post && (
            <CustomInput
              children="Заголовок"
              className={styles.title_article}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <CustomInput
            children="Содержание"
            textarea
            className={styles.content_article}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className={styles.interfaceCreatePost}>
            <CustomButton
              type="submit"
              children="Создать"
              className={styles.create_button}
            />
            <CustomButton
              style="outline"
              children={post ? "Создать статью" : "Создать пост"}
              onClick={() => setPost(!post)}
            />
            <CustomButton className={styles.uploadImage_button}>
              <ImageIcon className={styles.uploadImage_icon} />
            </CustomButton>
            <CustomButton className={styles.uploadFile_button}>
              <File className={styles.uploadFile_icon} />
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};
