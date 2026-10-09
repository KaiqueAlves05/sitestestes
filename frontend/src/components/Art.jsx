export function Bow({ className = "", style }) {
  return (
    <svg viewBox="0 0 100 80" className={className} style={style} aria-hidden="true">
      <path d="M50 46 C28 14 4 24 8 46 C11 63 34 63 50 48" fill="#EC4899" />
      <path d="M50 46 C72 14 96 24 92 46 C89 63 66 63 50 48" fill="#DB2777" />
      <path d="M42 54 L32 80 L48 66 Z" fill="#F472B6" />
      <path d="M58 54 L68 80 L52 66 Z" fill="#F472B6" />
      <circle cx="50" cy="47" r="10" fill="#DB2777" />
    </svg>
  );
}

export function HeartShape({ className = "", style, fill = "#EC4899" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M50 88 C20 62 4 44 4 28 C4 12 16 4 28 4 C38 4 46 10 50 18 C54 10 62 4 72 4 C84 4 96 12 96 28 C96 44 80 62 50 88 Z"
        fill={fill}
      />
    </svg>
  );
}

export function Sparkle({ className = "", style, fill = "#FBBF24" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path
        d="M50 0 C55 35 65 45 100 50 C65 55 55 65 50 100 C45 65 35 55 0 50 C35 45 45 35 50 0 Z"
        fill={fill}
      />
    </svg>
  );
}

export function KittyFace({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 112" className={className} style={style} aria-hidden="true">
      <path d="M28 34 L34 8 L52 26 Z" fill="#fff" stroke="#3A2533" strokeWidth="3" strokeLinejoin="round" />
      <path d="M92 34 L86 8 L68 26 Z" fill="#fff" stroke="#3A2533" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="60" cy="60" rx="46" ry="42" fill="#fff" stroke="#3A2533" strokeWidth="3" />
      <ellipse cx="43" cy="56" rx="3.6" ry="5" fill="#3A2533" />
      <ellipse cx="77" cy="56" rx="3.6" ry="5" fill="#3A2533" />
      <ellipse cx="60" cy="68" rx="4.5" ry="3.2" fill="#F9C80E" />
      <path d="M60 71 q-3 6 -7 3 M60 71 q3 6 7 3" stroke="#3A2533" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g stroke="#3A2533" strokeWidth="2.2" strokeLinecap="round">
        <path d="M8 52 L26 56" /><path d="M6 64 L26 62" /><path d="M10 76 L28 68" />
        <path d="M112 52 L94 56" /><path d="M114 64 L94 62" /><path d="M110 76 L92 68" />
      </g>
      <g transform="translate(78 6) scale(0.5)">
        <path d="M50 46 C28 14 4 24 8 46 C11 63 34 63 50 48" fill="#EC4899" />
        <path d="M50 46 C72 14 96 24 92 46 C89 63 66 63 50 48" fill="#DB2777" />
        <circle cx="50" cy="47" r="10" fill="#DB2777" />
      </g>
    </svg>
  );
}

export function CatAvatar({ body = "#F8DC9E", dark = "#E9B85C", inner = "#F9A8C9", bow = false, happy = false, className = "", style }) {
  return (
    <svg viewBox="0 0 130 135" className={className} style={style} aria-hidden="true">
      <path d="M100 108 C122 104 122 76 103 72" stroke={dark} strokeWidth="11" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="100" rx="36" ry="30" fill={body} />
      <path d="M38 38 L44 10 L60 30 Z" fill={body} />
      <path d="M90 38 L84 10 L68 30 Z" fill={body} />
      <path d="M43 34 L46 20 L54 30 Z" fill={inner} />
      <path d="M85 34 L82 20 L74 30 Z" fill={inner} />
      <circle cx="64" cy="52" r="33" fill={body} />
      {happy ? (
        <g stroke="#3A2533" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M44 50 q5 -7 10 0" />
          <path d="M76 50 q5 -7 10 0" />
        </g>
      ) : (
        <g fill="#3A2533">
          <circle cx="49" cy="50" r="3.6" />
          <circle cx="79" cy="50" r="3.6" />
        </g>
      )}
      <path d="M64 60 q-2 4 -5 1 M64 60 q2 4 5 1" stroke="#3A2533" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="58" rx="3" ry="2.2" fill="#F472B6" />
      <circle cx="38" cy="60" r="5" fill={inner} opacity="0.55" />
      <circle cx="90" cy="60" r="5" fill={inner} opacity="0.55" />
      <g stroke="#3A2533" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M14 50 L32 54" /><path d="M12 62 L32 60" />
        <path d="M114 50 L96 54" /><path d="M116 62 L96 60" />
      </g>
      {bow && (
        <g transform="translate(84 6) scale(0.42)">
          <path d="M50 46 C28 14 4 24 8 46 C11 63 34 63 50 48" fill="#EC4899" />
          <path d="M50 46 C72 14 96 24 92 46 C89 63 66 63 50 48" fill="#DB2777" />
          <circle cx="50" cy="47" r="10" fill="#DB2777" />
        </g>
      )}
    </svg>
  );
}
