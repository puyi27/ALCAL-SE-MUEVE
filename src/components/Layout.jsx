import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";

export default function Layout() {
  return (
    <div className="bg-[#011B11] text-[#FBF5E9] font-sans selection:bg-[#117C4E] selection:text-white md:cursor-none overflow-x-hidden min-h-screen flex flex-col">
      <CustomCursor />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
