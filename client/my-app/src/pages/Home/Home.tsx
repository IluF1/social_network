import { CustomButton, CustomInput, instance } from "@/shared";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";
import { createPostApi, getPosts } from "./model/home.slice";
import { Post } from "@/entities/Post/Post";
import { CreatePost } from "@/pages/CreatePost/CreatePost";
export const Home = () => {
  const [content, setContent] = useState<string>("");
  const user = useAppSelector((user) => user.user.user);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const postsCount = useAppSelector((state) => state.posts.postsCount);
  const [page, setPage] = useState(1);
  const [createPost, setCreatePost] = useState<boolean>(false);
  const [block, setBlock] = useState<boolean>(false)

  useEffect(() => {
    dispatch(
      getPosts({
        limit: 5,
        page: page,
      })
    );
  }, [dispatch, page]);

  const count = postsCount || 0

  const canLoadMore = posts.length < count;

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <CustomInput children="Что вы хотите найти?" />
        <div className={styles.posts}>
          {Array.isArray(posts) && posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <Post
                  title={post.title || ""}
                  date={post.createdAt || ""}
                  key={post.id}
                  id={Number(post.id)}
                  content={post.content}
                  likes={post.likesCount || 0}
                  login={post.author.login || ""}
                  name={post.author.name || ""}
                  avatar={post.author.avatar || ""}
                  userLiked={post.likes?.find(
                    (like) => like.userId === user.id
                  )}
                  commentsCount={post.commentsCount || 0}
                  comments={post.comments || []}
                />
              ))}
              {canLoadMore ? <CustomButton className={styles.loadMore_button} onClick={() => setPage(page + 1)}>
                Загрузить еще
              </CustomButton> : null}
            </div>
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
    </main>
  );
};
