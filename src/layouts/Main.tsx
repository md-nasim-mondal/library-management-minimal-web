import Navbar from "@/components/layouts/Navbar";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

export default Main;
