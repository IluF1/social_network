import { instance } from "@/shared";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io } from 'socket.io-client';
interface IInitialState {
  post: IPost;
}

interface IUser {
  name?: string;
  avatar?: string;
  login?: string;
  id?: number;
}

export interface IComment {
  content: string;
  user: IUser;
  userId: number;
  createdAt: string;
}

export interface IPost {
  postsCount?: number;
  content?: string;
  author?: IUser;
  authorId?: number;
  id?: number;
  createdAt?: string;
  image?: File;
  likesCount?: number;
  likes?: any[];
  comments?: IComment[];
  commentsCount?: number;
  title?: string;
}

interface IGetPosts {
  limit: number;
  page: number;
  postId?: number;
}

interface IInitialState {
  posts: IPost[];
  postsCount?: number;
}

interface ICreateComment {
  content: string;
  user: IUser;
  post_id: number;
}
interface ISetLikePost {
    userId: number
    id: number
}

const initialState: IInitialState = {
  post: {
    id: 0,
    title: "",
    content: "",
    author: {
      name: "",
    },
  },
  posts: [],
  postsCount: 0,
};


export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id: number) => {
    try {
      const response = await instance.post("/post/getPostById", {
        id: id,
      });

      return response.data.find;
    } catch (err) {
      return err;
    }
  }
);
// export const createCommentApi = createAsyncThunk(
//     "comment/createComment",
//     async (createComment: ICreateComment) => {
//       try {
//         const response = await instance.post("/comments/createComment", {
//           content: createComment.content,
//           user: {
//             id:  createComment.user.id
//           },
//           post_id: createComment.post_id,
//         });
  
//         const newComment = response.data;
  
//         socket.emit('newComment', newComment);
//         console.log(newComment)
//         return newComment;
//       } catch (err) {
//         console.error(err);
//         throw new Error("Ошибка при создании комментария");
//       }
//     }
//   );
  

export const createPostApi = createAsyncThunk(
  "post/create",
  async (post: IPost) => {
    try {
      const response = await instance.post("/post/create", {
        content: post.content,
        userLogin: post.author?.login,
        image: post.image,
        title: post.title,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка создания поста");
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (posts: IGetPosts) => {
    try {
      const response = await instance.post("/post/getPosts", {
        limit: posts.limit,
        page: posts.page,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Ошибка получение постов");
    }
  }
);

export const setLikePost = createAsyncThunk(
  "post/like",
  async (post: ISetLikePost) => {
    try {
      const response = await instance.post("/post/setLike", {
        user: { id: post.userId },
        post: { id: post.id },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const postIdSlice = createSlice({
  name: "getPostById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPostById.fulfilled,
      (state, action: PayloadAction<IPost>) => {
        state.post = action.payload;
      }
    );
    builder
      .addCase(createPostApi.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsCount = action.payload.postsCount;
        state.posts.push(...action.payload.posts);
      });
  },
});

export const postId = postIdSlice.reducer;
