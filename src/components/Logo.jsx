import React from 'react';

export default function Logo({ className = "w-48 h-48" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      className={className}
    >
      <defs>
        <path id="text-arc-path" d="M 100, 250 a 150, 150 0 1, 1 300, 0" />
      </defs>
      {/* Thick Green Casal-style border and seal circle */}
      <circle cx="250" cy="250" r="230" fill="none" stroke="#117C4E" strokeWidth="20" />
      <circle cx="250" cy="250" r="210" fill="#FBF5E9" />

      {/* Main Text on outer arc */}
      <text 
        fontSize="36" 
        fontWeight="bold" 
        fill="#117C4E" 
        letterSpacing="2"
      >
        <textPath href="#text-arc-path" startOffset="5%">
          TRANSPORTE PÚBLICO
        </textPath>
      </text>

      {/* Casal-style bus (green and cream) */}
      <image 
        href="https://images.unsplash.com/photo-1549410183-a85959954490?q=80&w=600" 
        x="90" y="110" width="320" height="200"
        className="rounded-full shadow-inner"
      />

      {/* Internal Circular Text "PUBLICO DIGNO" */}
      <circle cx="250" cy="250" r="140" fill="none" stroke="#117C4E" strokeWidth="5" />
      <text 
        x="250" cy="285" 
        fontSize="24" 
        fontWeight="bold" 
        fill="#117C4E" 
        textAnchor="middle"
      >
        PÚBLICO DIGNO
      </text>

      {/* Large Protest Fist */}
      <image 
        href="https://images.unsplash.com/photo-1598418080068-12001e8559eb?q=80&w=400"
        x="130" y="270" width="240" height="180" 
        className="rounded-full"
      />

      {/* Small Megaphones with text, one with "PROTEST" */}
      <g transform="translate(160, 420) scale(0.6)">
        <path d="M12 22a7.51 7.51 0 0 0 7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3h-2Z" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10v7" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text 
            x="32" y="10" 
            fontSize="10" 
            fontWeight="bold" 
            fill="#117C4E"
        >
            PROTEST
        </text>
      </g>
      <g transform="translate(340, 420) scale(0.6)">
        <path d="M12 22a7.51 7.51 0 0 0 7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3h-2Z" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 10v7" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 10a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13a7.51 7.51 0 0 1-7.5-7.5" fill="none" stroke="#117C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
}
