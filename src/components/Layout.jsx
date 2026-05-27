import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <div className="bg-[#FBF5E9] text-[#011B11] font-sans selection:bg-[#117C4E] selection:text-white md:cursor-none overflow-x-hidden min-h-screen flex flex-col">
      <ScrollToTop />
      <CustomCursor />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
