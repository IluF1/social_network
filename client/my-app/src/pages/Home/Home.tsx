import { CustomButton, CustomInput, instance } from "@/shared";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { createPostApi, getPosts } from "./model/post.slice";
import { Post } from "@/entities/Post/Post";
import { ImageIcon, SendHorizontal, Smile } from "lucide-react";
import { token } from "@/shared/Helpers/constansts";
import { CreatePost } from "@/features/CreatePost/CreatePost";
export const Home = () => {
  const [content, setContent] = useState<string>("");
  const user = useAppSelector((user) => user.user.user);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const [page, setPage] = useState(1);
  const [createPost, setCreatePost] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch(
      createPostApi({
        content,
        user: {
          login: user.login,
        },
      })
    );
    setContent("");
  };
  useEffect(() => {
    dispatch(
      getPosts({
        limit: 5,
        page: page,
        postId: Number(posts.find((post) => post.id)) || 1,
      })
    );
  }, [dispatch]);

  console.log(posts)

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {createPost ? (
          <CreatePost backEvent={() => setCreatePost(false)} />
        ) : (
          <>
            <CustomInput
              children="Что у вас сегодня нового?"
              onClick={() => setCreatePost(true)}
            />
            <div className={styles.posts}>
              {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    date={post.createdAt || ""}
                    key={post.id}
                    id={Number(post.id)}
                    userId={Number(post.authorId)}
                    content={post.content}
                    likes={post.likesCount || 0}
                  />
                ))
              ) : (
                <div>No posts available</div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
