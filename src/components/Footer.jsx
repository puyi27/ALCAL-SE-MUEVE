import React from "react";
import { Link } from "react-router-dom";
import { AtSign, Send } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="dark-zone bg-[#011B11] text-[#FBF5E9] py-24 px-8 md:px-24">
      <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <Logo className="w-56 md:w-72 h-auto text-[#FBF5E9] mb-8" />
          <p className="text-[#FBF5E9]/70 font-light max-w-md leading-relaxed mb-12">
            Iniciativa ciudadana independiente por un transporte público digno en Alcalá de Guadaíra.
          </p>
          <div className="flex gap-6">
            <a href="#" className="p-4 bg-[#117C4E]/20 rounded-full hover:bg-[#117C4E] hover:text-[#FBF5E9] transition-colors text-[#117C4E]">
              <AtSign size={24} />
            </a>
            <a href="#" className="p-4 bg-[#117C4E]/20 rounded-full hover:bg-[#117C4E] hover:text-[#FBF5E9] transition-colors text-[#117C4E]">
              <Send size={24} />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col justify-end text-sm text-[#FBF5E9]/50 font-light gap-4">
          <p>
            Esta web es una iniciativa ciudadana independiente. La información sobre direcciones, teléfonos y procedimientos es orientativa; puede haber cambios no actualizados al instante.
          </p>
          <p>
            Recomendamos contrastar los datos en las fuentes oficiales. No nos hacemos responsables del uso que terceros hagan de esta información. Los testimonios y denuncias publicados son responsabilidad de sus autores.
          </p>
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4 text-[#117C4E]">
            <p>
              &copy; {new Date().getFullYear()} Alcalá se Mueve.
            </p>
            <span className="hidden md:inline">•</span>
            <Link to="/aviso-legal" className="hover:text-[#FBF5E9] transition-colors hover:underline">
              Aviso Legal y Condiciones de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
