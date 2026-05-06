import "./App.css";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈 페이지입니다.</h1>,
  },
  {
    path: "/movies",
    element: <MoviePage />,
  },
]);

function App(): Element {
  // console.log(import.meta.env.VITE_TMDB_KEY);
  return <RouterProvider router={router} />;
}

export default App;
