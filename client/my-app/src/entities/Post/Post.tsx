import { useCallback, useEffect, useState } from "react";
import styles from "./Post.module.css";
import { CustomButton, CustomInput, instance, Title } from "@/shared";
import { MiniProfile } from "../MiniProfile/MiniProfile";

import { Bookmark, Heart, MessageSquare, Send } from "lucide-react";
import { formattedDate, token } from "@/shared/Helpers/constansts";
import { useAppSelector } from "@/shared/Helpers/Hooks/useAppSelector";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "@/shared/Helpers/Hooks/useAppDispatch";

import { createCommentApi, IComment } from "@/pages/Home/model/home.slice";
import { Comment } from "../Comment/Comment";

interface Props {
  content: string;
  id: number;
  date: string;
  likes: number;
  login: string;
  name: string;
  avatar: string;
  userLiked: boolean;
  title: string;
  commentsCount: number;
  comments: IComment[];
}

export const Post = ({
  content,
  id,
  date,
  login,
  likes,
  name,
  userLiked,
  avatar,
  title,
  commentsCount,
  comments,
}: Props) => {
  const [isLiked, setIsLiked] = useState(userLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const user = useAppSelector((state) => state.user.user);
  const [comment, setComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const dispatch = useAppDispatch();

  const createComment = useCallback(() => {
    dispatch(
      createCommentApi({
        content: commentContent,
        user: { id: user.id },
        post_id: id,
      })
    );
  }, [commentContent, user.id, id, dispatch]);


  const toggleLike = async () => {
    try {
      await instance.post("/post/setLike", {
        user: { id: user.id },
        post: { id },
      });

      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
    } catch (error) {
      toast.error("Не удалось изменить лайк. Попробуйте еще раз.");
    }
  };


  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
        className="absolute w-96"
      />
      <div className={styles.head}>
        <MiniProfile
          name={name}
          avatar={avatar}
          login={login}
          className=" w-80"
        />
        <Title tag="h3" className={styles.date}>
          {formattedDate(date || "")}
        </Title>
      </div>
      <a href={`/post/${login}/${id}`}>
        <Title tag="h1" className={styles.title}>
          {title}
        </Title>
      </a>
      <Title tag="h2" className={styles.content}>
        {content}
      </Title>
      <div className={styles.interface}>
        <button
          className={styles.interfaceItemOne}
          onClick={() => toggleLike()}
        >
          <Heart
            width={23}
            height={23}
            className={styles.icon}
            fill={isLiked ? "orange" : "transparent"}
            color={isLiked ? "orange" : "white"}
          />
          <Title tag="h3" className={styles.count_likes}>
            {likeCount}
          </Title>
        </button>

        <button
          className={styles.interfaceItemTwo}
          onClick={() => setComment(!comment)}
        >
          <MessageSquare width={23} height={23} className="" />
          <Title tag="h3" className={styles.count_comments}>
            {commentsCount}
          </Title>
        </button>
        <button className={styles.interfaceItemThree}>
          <Bookmark width={25} height={25} className={styles.icon} />
        </button>
        <button></button>
      </div>
      <div>
        {comment && (
          <div className={styles.comments}>
            {comments.map((comment) => (
              <Comment
                key={comment.createdAt}
                avatar={comment.user.avatar || ""}
                userId={comment.userId}
                createdAt={comment.createdAt}
                content={comment.content}
                name={comment.user.name || ""}
                login={comment.user.login || ""}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.createComment_block}>
        <CustomInput
          className={styles.comment_input}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        >
          Напишите впечатления о прочитанном
        </CustomInput>
        <CustomButton
          className={styles.send_button}
          onClick={() => createComment()}
        >
          <Send className={styles.send_img} />
        </CustomButton>
      </div>
    </div>
  );
};
