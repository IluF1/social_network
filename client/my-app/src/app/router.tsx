import { Auth } from "@/pages/Auth/Auth";
import { CreatePost } from "@/pages/CreatePost/CreatePost";
import { Home } from "@/pages/Home/Home";
import { PostPage } from "@/pages/PostPage/PostPage";
import { Registration } from "@/pages/Registration/Registration";
import { createBrowserRouter, useLocation } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/:login",
  },
  {
    path: "/post/:id",
    element: <PostPage/>
  },
  {
    path: '/createPost',
    element: <CreatePost/>
  }
]);
