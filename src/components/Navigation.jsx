import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import Logo from "./Logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "El Problema", path: "/el-problema" },
    { name: "Actúa", path: "/actua" },
    { name: "Directorio", path: "/directorio" },
    { name: "Actualidad", path: "/actualidad" },
    { name: "Sobre Nosotros", path: "/nosotros" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(".menu-link", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR ESCRITORIO */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-[8000] px-8 py-6 items-center justify-between bg-gradient-to-b from-[#FBF5E9] to-transparent backdrop-blur-sm pointer-events-auto">
        <Link to="/" className="hover:scale-105 transition-transform text-[#011B11]">
          <Logo className="w-40 h-auto" />
        </Link>
        <nav className="flex gap-8 bg-[#FBF5E9]/90 px-8 py-4 rounded-full border border-[#117C4E]/20 backdrop-blur-md shadow-sm">
          {links.map((link, idx) => (
            <Link 
              key={idx}
              to={link.path}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-[#117C4E] ${
                location.pathname === link.path ? "text-[#117C4E]" : "text-[#011B11]/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* BOTON HAMBURGUESA MOVIL */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden hamburger fixed top-6 right-6 z-[9000] p-4 bg-[#117C4E] text-[#FBF5E9] rounded-full hover:scale-105 transition-transform"
      >
        <Menu size={24} />
      </button>

      {/* MENU FULLSCREEN MOVIL */}
      {isOpen && (
        <div className="fixed inset-0 z-[9500] bg-[#117C4E] text-[#FBF5E9] flex flex-col justify-center items-center dark-zone">
          <button 
            onClick={() => setIsOpen(false)}
            className="hamburger absolute top-6 right-6 p-4 bg-[#FBF5E9] text-[#117C4E] rounded-full hover:scale-105 transition-transform"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map((link, idx) => (
              <div key={idx} className="overflow-hidden">
                <Link 
                  to={link.path}
                  className="menu-link block text-5xl font-serif tracking-tighter hover:text-[#011B11] transition-colors"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
