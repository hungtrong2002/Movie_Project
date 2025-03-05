import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout.jsx";
import ModalProvider from "@components/Context/ModalProvider";
import { lazy } from "react";
const MovieDetail = lazy(() => import("@pages/MovieDetail"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const PeopleShowDetail = lazy(() => import("@pages/PeopleShowDetail"));
const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
      {
        path: "/people/:id",
        element: <PeopleShowDetail />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return res;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>,
);
