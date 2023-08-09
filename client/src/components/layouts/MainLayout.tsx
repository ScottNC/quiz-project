import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const MainLayout = () => (
  <>
    <div className=" max-w-screen max-w-screen bg-light">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
);

export default MainLayout;
