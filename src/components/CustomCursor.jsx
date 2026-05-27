import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });
      
      const move = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);

        const target = e.target;
        const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.closest('.interactive-row') || target.closest('.hamburger');
        
        // Detectar si el elemento o sus padres tienen fondo oscuro o verde
        const isDarkZone = !!target.closest('.dark-zone, .bg-\\[\\#117C4E\\], .bg-\\[\\#011B11\\]');

        if (isInteractive) {
          gsap.to(cursorRef.current, { scale: 4, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
        }

        if (isDarkZone) {
          gsap.to(cursorRef.current, { backgroundColor: "rgba(255, 255, 255, 0.9)", duration: 0.2 });
        } else {
          gsap.to(cursorRef.current, { backgroundColor: "rgba(17, 124, 78, 0.6)", duration: 0.2 });
        }
      };
      
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-3 h-3 rounded-full bg-[#117C4E]/60 z-[10000] transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}
