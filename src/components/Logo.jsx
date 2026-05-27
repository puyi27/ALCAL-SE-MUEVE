import React from 'react';

export default function Logo({ className = "w-48 h-auto" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 450 120" 
      fill="none" 
      className={className}
    >
      {/* MONOGRAMA A M - Estilo Brutalista/Industrial */}
      <g transform="translate(10, 15)">
        {/* Letra A */}
        <path 
          d="M30 90 L55 20 L80 90 M40 65 L70 65" 
          stroke="#117C4E" 
          strokeWidth="10" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        {/* Letra M */}
        <path 
          d="M95 90 L95 20 L125 65 L155 20 L155 90" 
          stroke="#117C4E" 
          strokeWidth="10" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        {/* Acento geométrico (Punto de parada/movimiento) */}
        <rect x="170" y="78" width="12" height="12" fill="#117C4E" />
      </g>

      {/* TEXTO TIPOGRÁFICO PREMIUM */}
      {/* 'Alcalá' en Serif clásica usando currentColor para adaptarse al tema claro/oscuro */}
      <text 
        x="210" 
        y="65" 
        fontFamily="ui-serif, Georgia, serif" 
        fontSize="48" 
        fontWeight="bold" 
        fill="currentColor" 
        letterSpacing="-0.02em"
      >
        Alcalá
      </text>
      
      {/* 'SE MUEVE' en Sans-Serif técnica y espaciada */}
      <text 
        x="212" 
        y="100" 
        fontFamily="ui-sans-serif, system-ui, sans-serif" 
        fontSize="22" 
        fontWeight="900" 
        fill="#117C4E" 
        letterSpacing="0.35em" 
        textTransform="uppercase"
      >
        Se Mueve
      </text>
    </svg>
  );
}
