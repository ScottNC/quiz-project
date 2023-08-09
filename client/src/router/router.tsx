import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Welcome from "../components/welcome";
import Health from "../components/health";
import Help from "../components/help";
import Settings from "../components/settings";
import Home from "../components/home";
import Category from "../components/category";
import SubCategory from "../components/subcategory";
import Questions from "../components/question";
import Results from "../components/results";
import NotFound from "../components/notfound";
import { SeeResult } from "../components/seeResult";
import StatsPage from "../components/stats";
import QuizStart from "../components/quiz";

export const QuizAppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Welcome />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="health" element={<Health />} />
      <Route path="stats" element={<StatsPage />} />
      <Route path="help" element={<Help />} />
      <Route path="settings" element={<Settings />} />
      <Route path="home" element={<Home />} />
      <Route path="category/:categoryId" element={<Category />} />
      <Route path="subcategory/:categoryId" element={<SubCategory />} />
      <Route path="quiz/:quizId" element={<QuizStart />} />
      <Route path="question/:quizId/:roundId" element={<Questions />} />
      <Route path="seeresult/:roundId" element={<SeeResult />} />
      <Route path="results/:roundId" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
