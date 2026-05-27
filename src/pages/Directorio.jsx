import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Globe, Landmark, Building2, Briefcase, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Directorio() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".card-item", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const entities = [
    {
      name: "Ayuntamiento de Alcalá",
      icon: <Landmark className="text-[#117C4E] mb-4" size={40} strokeWidth={1} />,
      address: "Calle Rafael Santos, 6",
      phone: "955 796 000",
      email: "oac@alcalaguadaira.org",
      web: "www.alcaladeguadaira.es"
    },
    {
      name: "Consorcio de Transporte (CTMAS)",
      icon: <Building2 className="text-[#117C4E] mb-4" size={40} strokeWidth={1} />,
      address: "Avda. Cristo de la Expiración, 2, Sevilla",
      web: "ctas.es"
    },
    {
      name: "Autocares Casal S.L.",
      icon: <Briefcase className="text-[#117C4E] mb-4" size={40} strokeWidth={1} />,
      address: "C/ Antonio de la Peña y López, 7, Sevilla",
      phone: "954 999 290 / 954 999 385",
      email: "info@autocarescasal.com"
    },
    {
      name: "Junta de Andalucía (Fomento)",
      icon: <Landmark className="text-[#117C4E] mb-4" size={40} strokeWidth={1} />,
      address: "C/ Pablo Picasso, 6, Sevilla",
      phone: "955 92 68 00"
    },
    {
      name: "FACUA Sevilla (Aliado)",
      icon: <Users className="text-[#117C4E] mb-4" size={40} strokeWidth={1} />,
      address: "Calle Resolana, 8, Sevilla",
      phone: "688 954 954",
      web: "facua.org"
    }
  ];

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-8 md:px-24 max-w-[100rem] mx-auto text-[#011B11]">
      <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-6 text-[#117C4E]">
        Directorio
      </h1>
      <p className="text-xl text-[#011B11]/80 font-light max-w-3xl mb-16">
        Información de contacto de las entidades responsables para dirigir quejas formales o solicitar información.
      </p>

      <div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {entities.map((ent, idx) => (
          <div key={idx} className="card-item bg-white border border-[#117C4E]/20 p-8 rounded-2xl shadow-sm hover:border-[#117C4E]/60 hover:shadow-md transition-all">
            {ent.icon}
            <h3 className="text-2xl font-serif text-[#011B11] mb-6">{ent.name}</h3>
            <ul className="flex flex-col gap-3 text-[#011B11]/80 font-light text-sm">
              {ent.address && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#117C4E] shrink-0 mt-0.5" />
                  <span>{ent.address}</span>
                </li>
              )}
              {ent.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#117C4E] shrink-0" />
                  <span>{ent.phone}</span>
                </li>
              )}
              {ent.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#117C4E] shrink-0" />
                  <span>{ent.email}</span>
                </li>
              )}
              {ent.web && (
                <li className="flex items-center gap-3">
                  <Globe size={18} className="text-[#117C4E] shrink-0" />
                  <span>{ent.web}</span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
