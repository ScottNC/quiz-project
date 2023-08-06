import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../components/home";
import Category from "../components/category";
import Health from "../components/health";
import Help from "../components/help";
import Settings from "../components/settings";
import Start from "../components/start";
import Result from "../components/result";
import Question from "../components/question";
import Quiz from "../components/quiz";
import SubCategory from "../components/subcategory";
import NotFound from "../components/notfound";

export const QuizAppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="health" element={<Health />} />
      <Route path="help" element={<Help />} />
      <Route path="settings" element={<Settings />} />
      <Route path="start" element={<Start />} />
      <Route path="result" element={<Result />} />
      <Route path="question" element={<Question />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="subcategory" element={<SubCategory />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
