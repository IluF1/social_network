import styles from "./PostPage.module.css";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { useEffect } from "react";
import { getPostById } from "@/entities/Post/model/post.slice";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@/shared/ui/BackButton";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { Title } from "@/shared";
import { MiniProfile } from "@/entities/MiniProfile/MiniProfile";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useAppSelector((state) => state.post.post);
  useEffect(() => {
    dispatch(getPostById(Number(id)));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <BackButton backEvent={() => navigate(-1)} />
      <div className={styles.content}>
        <MiniProfile
          name={post.author?.name || ""}
          login={post.author?.login || ""}
          avatar={post.author?.avatar || ""}
          className=" w-96"
        />
        {post.title && (
          <Title tag="h1" className={styles.title}>
            {post.title}
          </Title>
        )}
        <Title tag="h2" className={styles.content_text}>
          {post.content}
        </Title>
      </div>
    </div>
  );
};
