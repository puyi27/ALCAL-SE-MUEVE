import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

  const links = [
    { name: "Inicio", path: "/" },
    { name: "El Problema", path: "/el-problema" },
    { name: "Actúa", path: "/actua" },
    { name: "Directorio", path: "/directorio" },
    { name: "Actualidad", path: "/actualidad" },
    { name: "Sobre Nosotros", path: "/nosotros" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="hamburger fixed top-8 right-8 z-[9000] p-4 bg-[#117C4E] text-[#011B11] rounded-full hover:scale-105 transition-transform"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9500] bg-[#011B11] text-[#FBF5E9] flex flex-col justify-center items-center">
          <button 
            onClick={() => setIsOpen(false)}
            className="hamburger absolute top-8 right-8 p-4 bg-[#FBF5E9] text-[#011B11] rounded-full hover:scale-105 transition-transform"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {links.map((link, idx) => (
              <div key={idx} className="overflow-hidden">
                <Link 
                  to={link.path}
                  className="menu-link block text-5xl md:text-7xl font-serif tracking-tighter hover:text-[#117C4E] transition-colors"
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
