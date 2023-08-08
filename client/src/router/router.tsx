import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Welcome from "../components/welcome";
import Health from "../components/health";
import Help from "../components/help";
import Settings from "../components/settings";
import Home from "../components/home";
import Category from "../components/category";
import SubCategory from "../components/subcategory";
import Quiz from "../components/quiz";
import Question from "../components/question";
import Result from "../components/result";
import NotFound from "../components/notfound";

export const QuizAppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Welcome />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="health" element={<Health />} />
      <Route path="help" element={<Help />} />
      <Route path="settings" element={<Settings />} />
      <Route path="home" element={<Home />} />
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="subcategory/:categoryId" element={<SubCategory />} />
      <Route path="quiz/:quizId" element={<Quiz />} />
      <Route path="question/:quizId/:roundId" element={<Question />} />
      <Route path="result/:round" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
