import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AvisoLegal() {
  return (
    <div className="pt-32 pb-24 px-8 min-h-screen bg-[#FBF5E9]">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#117C4E] font-medium hover:underline mb-12">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-serif text-[#011B11] mb-8">
          Aviso Legal y Condiciones de Uso
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#117C4E]/10 shadow-lg prose prose-lg prose-green max-w-none text-[#011B11]/80 leading-relaxed font-light">
          <p className="mb-6">
            Los datos, gráficos y testimonios recogidos en esta web son propiedad de la iniciativa vecinal <strong>'Alcalá se Mueve'</strong>.
          </p>
          <p className="mb-6">
            La difusión de los datos tendrá que solicitarse expresamente a través de la cuenta <a href="https://www.instagram.com/alcalasemueve" target="_blank" rel="noopener noreferrer" className="text-[#117C4E] font-medium hover:underline">@alcalasemueve</a>, que podrá aceptar o no la solicitud. Además se debe citar la fuente (@alcalasemueve) y su enlace a esta web.
          </p>
          <p>
            Para cualquier consulta contacte con nosotros a través de la cuenta de Instagram oficial.
          </p>
        </div>
      </div>
    </div>
  );
}
