import Home from "@/pages/Home";
import QuizBuilder from "@/pages/QuizBuilder";
import QuizPlayerPage from "@/pages/QuizPlayerPage";
import ResultsPage from "@/pages/ResultsPage";
import NotFound from "@/pages/NotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
  { path: "/builder", element: <QuizBuilder /> },
  { path: "/play", element: <QuizPlayerPage /> },
  { path: "/play/:quizId", element: <QuizPlayerPage /> },
  { path: "/results/:quizId", element: <ResultsPage /> },
];

export default routes;
