import { instance } from "@/shared";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUser {
  name?: string;
  avatar?: string;
  login?: string;
}

interface IPost {
  content: string;
  user: IUser;
  authorId?: number;
  id?: number;
  createdAt?: string;
  image?: File;
  likesCount?: number;
  likes?: any[]; // Замените на более точный тип, если возможно
  comments?: any[]; // Замените на более точный тип, если возможно
  commentsCount?: number;
}

interface IGetPosts {
  limit: number,
  page: number
  postId?: number
}

interface IInitialState {
  error: string;
  posts: IPost[];
}

export const initialState: IInitialState = {
  error: "",
  posts: [], 
};


export const createPostApi = createAsyncThunk(
  "post/create",
  async (post: IPost) => {
    try {
      const response = await instance.post("/post/create", {
        content: post.content,
        userLogin: post.user?.login,
        image: post.image,
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
      postId: posts.postId
    });
    return response.data.postsWithLikesCount;
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
        state.posts = action.payload;
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
