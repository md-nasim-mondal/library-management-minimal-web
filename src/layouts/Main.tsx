import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
