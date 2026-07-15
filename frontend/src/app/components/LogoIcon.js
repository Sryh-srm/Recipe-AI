export default function LogoIcon({ className = "w-5 h-5", ...props }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <filter id="smoke-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id="glow-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>

        <linearGradient id="pan-body" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="pan-inner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>

        <linearGradient id="handle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <linearGradient id="flame-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Smoke */}
      <path
        className="logo-smoke wisp-1"
        d="M 21 28 Q 15 18, 22 10 T 20 2"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#smoke-blur)"
      />
      <path
        className="logo-smoke wisp-2"
        d="M 28 29 Q 34 19, 26 12 T 29 3"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        filter="url(#smoke-blur)"
      />
      <path
        className="logo-smoke wisp-3"
        d="M 33 26 Q 38 18, 32 10 T 34 4"
        stroke="#ffffff"
        strokeWidth="1"
        strokeLinecap="round"
        filter="url(#smoke-blur)"
      />

      {/* Flame Glow */}
      <ellipse
        className="flame-glow"
        cx="25"
        cy="50"
        rx="12"
        ry="6"
        fill="#7C3AED"
        filter="url(#glow-blur)"
      />

      {/* Flames */}
      <path
        className="flame-main"
        d="M 25 56 C 21 56, 18 52, 18 48 C 18 44, 25 39, 25 39 C 25 39, 32 44, 32 48 C 32 52, 29 56, 25 56 Z"
        fill="url(#flame-grad)"
      />
      <path
        className="flame-sub left"
        d="M 18 54 C 15 54, 13.5 51, 13.5 48 C 13.5 45, 18 41, 18 41 C 18 41, 21.5 45, 21.5 48 C 21.5 51, 21 54, 18 54 Z"
        fill="url(#flame-grad)"
      />
      <path
        className="flame-sub right"
        d="M 32 55 C 29.5 55, 28 52.5, 28 49.5 C 28 46.5, 32 42.5, 32 42.5 C 32 42.5, 35.5 46.5, 35.5 49.5 C 35.5 52.5, 34.5 55, 32 55 Z"
        fill="url(#flame-grad)"
      />

      {/* Pan Body (Sloping Sides) */}
      <path
        d="M 9 32 L 14 44 A 11 4 0 0 0 36 44 L 41 32 Z"
        fill="url(#pan-body)"
      />

      {/* Pan Outer Rim */}
      <ellipse cx="25" cy="32" rx="16" ry="6" fill="#f8fafc" />

      {/* Pan Inner Surface */}
      <ellipse cx="25" cy="32" rx="15" ry="5.2" fill="url(#pan-inner)" />

      {/* Handle */}
      <path
        d="M 38 33.5 L 55 30.5 C 56.5 30.2, 57.5 32, 56 33 L 39 36 Z"
        fill="url(#handle-grad)"
      />
      {/* Handle Highlight */}
      <path
        d="M 38.5 33.5 L 55 30.5 C 55.5 30.4, 56 31, 55.5 31.5 L 39 34.5 Z"
        fill="#ffffff"
        opacity="0.4"
      />
    </svg>
  );
}
