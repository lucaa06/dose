// shared.jsx — D.O.S.E. shared primitives, icons, sample data

// ─── Logo ────────────────────────────────────────────────────
function DoseLogo({ size = 22, color = "var(--ink)", showText = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
        <defs>
          <radialGradient id={`dl-${size}`} cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffd562" />
            <stop offset="55%" stopColor="#ff7a4e" />
            <stop offset="100%" stopColor="#e54b2a" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill={`url(#dl-${size})`} />
        <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        <circle cx="11" cy="11" r="2.6" fill="rgba(255,255,255,0.55)" />
      </svg>
      {showText && (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: size * 0.85,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color,
          fontFeatureSettings: '"ss01"',
        }}>the Dose</span>
      )}
    </div>
  );
}

// ─── Avatar with optional frame ──────────────────────────────
function Avatar({ name = "A", size = 40, frame = null, hue = 22, src = null, ring = null }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const innerSize = frame ? size - 6 : size;
  const frameClass = frame ? `frame-base frame-${frame}` : '';
  return (
    <div className={frameClass} style={{ width: size, height: size, ...(ring ? { boxShadow: `0 0 0 2px ${ring}` } : {}) }}>
      <div style={{
        width: innerSize, height: innerSize, borderRadius: '50%',
        background: `oklch(0.72 0.14 ${hue})`,
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 600, fontSize: innerSize * 0.38,
        letterSpacing: '0.02em',
        overflow: 'hidden',
        border: frame ? `2px solid var(--paper)` : 'none',
      }}>
        {src ? <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : initials}
      </div>
    </div>
  );
}

// ─── Verified tick ───────────────────────────────────────────
function VerifiedBadge({ size = 14 }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: '50%',
      background: 'var(--verified)', color: '#fff', flexShrink: 0,
    }}>
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 12 12">
        <path d="M2.5 6.2l2.3 2.3 4.7-4.7" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

// ─── Tier badge ──────────────────────────────────────────────
function TierBadge({ tier, size = "sm" }) {
  const map = {
    PRO: { bg: 'linear-gradient(135deg, #b96bd9, #6b46c1)', label: 'PRO', color: '#fff' },
    PREMIUM: { bg: 'linear-gradient(135deg, #f5d062, #d97a2c)', label: 'PREMIUM', color: '#3a2308' },
    DONOR: { bg: 'linear-gradient(135deg, #ff8a6c, #c53d3d)', label: 'DONOR', color: '#fff' },
    CREATOR: { bg: 'var(--ink)', label: 'CREATOR', color: 'var(--paper)' },
  };
  const m = map[tier] || map.PREMIUM;
  const s = size === 'lg' ? { h: 22, fs: 10, px: 8 } : { h: 16, fs: 8.5, px: 6 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', height: s.h, padding: `0 ${s.px}px`,
      background: m.bg, color: m.color, borderRadius: 4, fontSize: s.fs,
      fontWeight: 700, letterSpacing: '0.08em',
    }}>{m.label}</span>
  );
}

// ─── Icon set (tabler-style line icons) ──────────────────────
const I = {
  home: <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V11z" />,
  search: <><circle cx="10" cy="10" r="6.5" /><path d="M15 15l4 4" /></>,
  bell: <path d="M6 8a6 6 0 1112 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5zM10 20a2 2 0 004 0" />,
  msg: <path d="M21 12a8 8 0 01-12 6.9L3 21l2.1-6A8 8 0 1121 12z" />,
  heart: <path d="M12 20s-8-5-8-11a4 4 0 018-2 4 4 0 018 2c0 6-8 11-8 11z" />,
  comment: <path d="M21 11a8 8 0 01-13 6L3 18l1-4.5A8 8 0 1121 11z" />,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 11l7.6-3.5M8.2 13l7.6 3.5" /></>,
  bookmark: <path d="M6 4h12v17l-6-4-6 4V4z" />,
  flag: <path d="M5 21V4h11l-1.5 4 1.5 4H5" />,
  verify: <path d="M12 2l2.4 1.7 2.9-.4 1 2.7 2.4 1.6-.5 2.9 1.5 2.5-2 2.1-.4 2.9-2.7 1-1.6 2.4-2.9-.5-2.4 1.7-2.4-1.7-2.9.5-1.6-2.4-2.7-1-.4-2.9-2-2.1 1.5-2.5L2 8.6l2.4-1.6 1-2.7 2.9.4L12 2z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  more: <><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  ai: <path d="M12 2l1.5 4 4 1.5-4 1.5L12 13l-1.5-4-4-1.5 4-1.5L12 2zM5 14l1 2.5 2.5 1-2.5 1L5 21l-1-2.5L1.5 17.5l2.5-1L5 14zM18 14l1 2.5 2.5 1-2.5 1L18 21l-1-2.5-2.5-1 2.5-1L18 14z" />,
  spark: <path d="M12 3l1.8 5.4 5.7.4-4.3 3.7L16.6 18 12 14.8 7.4 18l1.4-5.5L4.5 8.8l5.7-.4L12 3z" />,
  trend: <path d="M3 17l6-6 4 4 8-8M21 7v6h-6" />,
  globe2: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  events: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
  groups: <><circle cx="9" cy="10" r="3.5" /><path d="M3 20a6 6 0 0112 0M16 8a3 3 0 010 6M21 20a5 5 0 00-4-4.9" /></>,
  trophy: <path d="M7 4h10v3a5 5 0 01-10 0V4zM5 6H3v2a3 3 0 003 3M19 6h2v2a3 3 0 01-3 3M9 14h6l1 6H8l1-6z" />,
  donate: <path d="M12 21l-7-7a4.5 4.5 0 016.4-6.4L12 8.6l.6-1A4.5 4.5 0 0119 14l-7 7z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 00-.1-1.4l2-1.5-2-3.5-2.4.9a7 7 0 00-2.4-1.4L13.5 2h-3l-.6 2.6A7 7 0 007.5 6L5.1 5l-2 3.5 2 1.5a7 7 0 000 2.8l-2 1.5 2 3.5 2.4-.9a7 7 0 002.4 1.4l.6 2.6h3l.6-2.6a7 7 0 002.4-1.4l2.4.9 2-3.5-2-1.5c.1-.5.1-.9.1-1.4z" /></>,
  send: <path d="M22 2L2 11l8 3 3 8 9-20z" />,
  edit: <path d="M4 20h4l11-11-4-4L4 16v4zM14 6l4 4" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  check: <path d="M5 12l4 4L19 6" />,
  shield: <path d="M12 2l9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V6l9-4z" />,
  chart: <path d="M3 21V8m6 13V3m6 18v-9m6 9V11" />,
  users: <><circle cx="9" cy="9" r="3.5" /><path d="M3 19a6 6 0 0112 0M16 8a3 3 0 010 6M21 19a5 5 0 00-4-4.9" /></>,
};
function Ic({ name, size = 20, stroke = 1.7, color = "currentColor", style = {} }) {
  const path = I[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}>
      {path}
    </svg>
  );
}

// ─── Sample data ─────────────────────────────────────────────
const PEOPLE = [
  { id: 'maya',   name: 'Maya Okafor',     handle: 'mayao',     hue: 22,  tier: 'PRO',     frame: 'galaxy',     verified: true },
  { id: 'lin',    name: 'Lin Park',        handle: 'linpark',   hue: 350, tier: 'PREMIUM', frame: 'rosegold',   verified: false },
  { id: 'jonas',  name: 'Jonas Reuter',    handle: 'jreuter',   hue: 200, tier: null,      frame: null,         verified: false },
  { id: 'priya',  name: 'Priya Anand',     handle: 'priya.a',   hue: 60,  tier: 'PRO',     frame: 'aurora',     verified: true },
  { id: 'noah',   name: 'Noah Bell',       handle: 'nbell',     hue: 130, tier: 'PREMIUM', frame: 'emerald',    verified: false },
  { id: 'sade',   name: 'Sade Adeyemi',    handle: 'sade',      hue: 295, tier: 'DONOR',   frame: 'celestial',  verified: true },
  { id: 'kenji',  name: 'Kenji Watanabe',  handle: 'kenji.w',   hue: 220, tier: 'PRO',     frame: 'holographic',verified: true },
  { id: 'ana',    name: 'Ana Beltrán',     handle: 'anab',      hue: 12,  tier: 'PREMIUM', frame: 'coral',      verified: false },
];

const POSTS = [
  {
    id: 'p1',
    author: 'maya',
    time: '2h',
    category: 'Environment',
    location: 'Jakarta, ID',
    title: "Coral nurseries off Sulawesi report 38% recovery in three years — locals lead the program",
    body: "Marine biologists working with three coastal villages have logged a measurable rebound at six monitoring sites. The program pays fishers a stipend to plant fragments and patrol against blast fishing.",
    photo: 'warm', caption: 'reef nursery — wide',
    likes: 4823, comments: 412, shares: 891, saves: 1240,
    verified: true, factScore: 96, sources: 4,
  },
  {
    id: 'p2',
    author: 'priya',
    time: '5h',
    category: 'Health',
    location: 'Cape Town, ZA',
    title: "TB vaccine candidate clears Phase III with 54% efficacy — first new shot in a century",
    body: "Trial run across 11 sites in South Africa, Zambia, and Indonesia. Results are pending peer review but the lead researcher has open-sourced the analysis pipeline.",
    photo: 'cool', caption: 'lab portrait',
    likes: 9120, comments: 880, shares: 2410, saves: 3100,
    verified: true, factScore: 91, sources: 6,
  },
  {
    id: 'p3',
    author: 'noah',
    time: '8h',
    category: 'Tech',
    location: 'Lagos, NG',
    title: "Solar mini-grids now serve 14M Nigerians — government doubles match-funding for 2026",
    body: "Off-grid installs grew 41% YoY. The expansion is paid for partly via a carbon-credit pool that buyers in the EU subscribe to.",
    photo: 'gold', caption: 'rural grid technician',
    likes: 1820, comments: 134, shares: 220, saves: 540,
    verified: true, factScore: 88, sources: 3,
  },
  {
    id: 'p4',
    author: 'kenji',
    time: '12h',
    category: 'Science',
    location: 'Kyoto, JP',
    title: "Origami-inspired robotic gripper handles surgical sutures at 1/40th the cost of current arms",
    body: "The team published the spec under a permissive license. Two hospitals have already ordered prototypes for trial.",
    photo: 'rose', caption: 'robotic gripper, macro',
    likes: 3411, comments: 290, shares: 612, saves: 980,
    verified: true, factScore: 94, sources: 5,
  },
  {
    id: 'p5',
    author: 'lin',
    time: '18h',
    category: 'Education',
    location: 'Seoul, KR',
    title: "Public libraries in Seoul see 22% jump in teen attendance after late-night study hours",
    body: "Pilot ran in 14 districts. The city is rolling it out to all 25 next quarter. Staff hired from the local university workforce program.",
    photo: 'violet', caption: 'library at night',
    likes: 720, comments: 64, shares: 80, saves: 210,
    verified: true, factScore: 97, sources: 4,
  },
  {
    id: 'p6',
    author: 'sade',
    time: '1d',
    category: 'Human Rights',
    location: 'Accra, GH',
    title: "Ghana passes nationwide free legal aid for domestic workers — 4.2M eligible",
    body: "Bill drafted with input from worker collectives. First clinics open in March in Accra, Kumasi, and Tamale.",
    photo: 'green', caption: 'legal clinic exterior',
    likes: 5290, comments: 514, shares: 1105, saves: 1880,
    verified: true, factScore: 95, sources: 5,
  },
];

function getPerson(id) { return PEOPLE.find(p => p.id === id); }

// Export to window
Object.assign(window, {
  DoseLogo, Avatar, VerifiedBadge, TierBadge, Ic, I,
  PEOPLE, POSTS, getPerson,
});
