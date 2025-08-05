import { useEffect, useState } from "react";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const Main = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <div
          className={`shadow-sm w-full sticky top-0 transition-transform duration-300 bg-secondary text-secondary-foreground ${
            visible ? "translate-y-0" : "-translate-y-full"
          }`}>
          <Navbar />
        </div>
        <div className='flex-1 py-16 max-w-7xl mx-auto w-full'>
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default Main;
