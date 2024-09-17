import { instance } from "@/shared";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  name?: string;
  avatar?: string;
  login?: string;
  id?:number
}

export interface IComment {
  content: string
  user: IUser
  userId: number
  createdAt: string
}

interface IPost {
  postsCount: number;
  content: string;
  author: IUser;
  authorId?: number;
  id?: number;
  createdAt?: string;
  image?: File;
  likesCount?: number;
  likes?: any[];
  comments?: IComment[];
  commentsCount?: number;
  title?: string
}

interface IGetPosts {
  limit: number,
  page: number
  postId?: number
}

interface IInitialState {
  error: string;
  posts: IPost[];
  postsCount?: number
}

export const initialState: IInitialState = {
  error: "",
  posts: [],
  postsCount: 0
};

interface ICreateComment {
  content: string;
  user: {
    id: number;
  };
  post_id: number;
}

export const createCommentApi = createAsyncThunk(
  "comment/createComment",
  async (createComment: ICreateComment) => {
    try {
      const response = await instance.post("/comments/createComment", {
        content: createComment.content,
        user: {
          id: createComment.user.id,
        },
        post_id: createComment.post_id,
      });

      return response.data;
    } catch (err) {
      return err;
    }
  }
);




export const createPostApi = createAsyncThunk(
  "post/create",
  async (post: IPost) => {
    try {
      const response = await instance.post("/post/create", {
        content: post.content,
        userLogin: post.author?.login,
        image: post.image,
        title: post.title
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create post");
    }
  }
);

export const getPosts = createAsyncThunk("post/getPosts", async (posts: IGetPosts) => {
  try {
    const response = await instance.post("/post/getPosts", {
      limit: posts.limit,
      page: posts.page,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts");
  }
});

const posts = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostApi.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsCount = action.payload.postsCount
        state.posts.push(...action.payload.posts);
      })
      .addCase(createPostApi.rejected, (state, action) => {
        state.error = action.error.message || "Error creating post";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching posts";
      });
  },
});

export default posts.reducer;
