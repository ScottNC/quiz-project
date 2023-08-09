import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const MainLayout = () => (
  <>
    <div className=" max-w-screen max-h-screen bg-light">
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <div className="p-6">
      
      </div>
      <Footer />
    </div>
  </>
);

export default MainLayout;
