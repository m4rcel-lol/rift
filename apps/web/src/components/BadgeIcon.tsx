"use client";

// Built-in SolarCord badge icons — app-icon style: a rounded tile (tinted fill
// + coloured border) with a glyph. Recreated as SVG so they're crisp at any size.

function tile(main: string, tint: string) {
  return <rect x="2.5" y="2.5" width="43" height="43" rx="13" fill={tint} stroke={main} strokeWidth="3.5" />;
}

const ICONS: Record<string, { label: string; svg: React.ReactNode }> = {
  // Orange crown
  staff: {
    label: "SolarCord Staff",
    svg: (
      <>
        {tile("#e8951f", "#f7e6c8")}
        <path d="M13 31 11 19.5 18.5 24.5 24 16.5 29.5 24.5 37 19.5 35 31Z" fill="#e8951f" />
        <rect x="14" y="33.5" width="20" height="4.6" rx="2.3" fill="#e8951f" />
        <rect x="22" y="12.6" width="4" height="4" rx="1" transform="rotate(45 24 14.6)" fill="#e8951f" />
      </>
    ),
  },
  // Pink rocket + heart
  early_supporter: {
    label: "Early Supporter",
    svg: (
      <>
        {tile("#ff2ec4", "#ffd0f1")}
        <g transform="rotate(45 24 24)">
          <path d="M24 12c3.5 0 5.5 3 5.5 7v6h-11v-6c0-4 2-7 5.5-7Z" fill="#ff2ec4" />
          <circle cx="24" cy="19" r="2.2" fill="#ffd0f1" />
          <path d="M18.5 25.5 15.5 30h3z" fill="#ff2ec4" />
          <path d="M29.5 25.5 32.5 30h-3z" fill="#ff2ec4" />
          <rect x="21.5" y="29" width="5" height="3" rx="1.2" fill="#ff2ec4" />
        </g>
        <path d="M14 30.4c-1-1-2.7-.6-2.7.9 0 1.2 1.4 2.3 2.7 3.2 1.3-.9 2.7-2 2.7-3.2 0-1.5-1.7-1.9-2.7-.9Z" fill="#ff2ec4" />
      </>
    ),
  },
  // Blue crossed tools (hammer + screwdriver)
  active_developer: {
    label: "Active Developer",
    svg: (
      <>
        {tile("#5b63e8", "#cfd2fb")}
        <g transform="rotate(45 24 24)">
          <rect x="22.4" y="11" width="3.2" height="13" rx="1.6" fill="#5b63e8" />
          <rect x="22.7" y="24" width="2.6" height="10" rx="1" fill="#5b63e8" />
        </g>
        <g transform="rotate(-45 24 24)">
          <rect x="22.4" y="21" width="3.2" height="15" rx="1.6" fill="#5b63e8" />
          <path d="M17.5 12h13l-2.2 5.5h-8.6z" fill="#5b63e8" />
        </g>
      </>
    ),
  },
  // Blue partner — SolarCord mark
  partner: {
    label: "Solar Partner",
    svg: (
      <>
        {tile("#5b63e8", "#cfd2fb")}
        <circle cx="24" cy="24" r="12.5" fill="#5b63e8" />
        <path d="M16 20.5c3-2.2 7-1.8 9.6.4-2-1.1-4.6-.9-6.2.5 1.9-.5 3.8.2 4.8 1.6-3.2 1.6-7.2 1-10-1-.7-.5-.7-1 1.8-1.9Z" fill="#fff" />
        <path d="M32 27.5c-3 2.2-7 1.8-9.6-.4 2 1.1 4.6.9 6.2-.5-1.9.5-3.8-.2-4.8-1.6 3.2-1.6 7.2-1 10 1 .7.5.7 1-1.8 1.9Z" fill="#fff" />
      </>
    ),
  },
  // Green verified check
  verified: {
    label: "Verified",
    svg: (
      <>
        {tile("#2e9e4f", "#cfe9d6")}
        <circle cx="24" cy="24" r="12.5" fill="#2e9e4f" />
        <path d="M17.8 24.5 22 28.7 30.4 19.5" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  // Kept (tile style) for completeness
  moderator: {
    label: "Moderator",
    svg: (
      <>
        {tile("#4f86c6", "#cfe0f2")}
        <path d="M24 13l8 3v5.4c0 5-3.4 8.4-8 9.3-4.6-.9-8-4.3-8-9.3V16l8-3Z" fill="#4f86c6" />
        <path d="M20 23.5 23 26.5 28.5 20.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  solar_plus: {
    label: "Solar+",
    svg: (
      <>
        {tile("#9b8cff", "#e3deff")}
        <path d="M24 15v18M15 24h18" stroke="#9b8cff" strokeWidth="4" strokeLinecap="round" />
      </>
    ),
  },
  bug_hunter: {
    label: "Bug Hunter",
    svg: (
      <>
        {tile("#3fae6b", "#d2eddd")}
        <circle cx="24" cy="25" r="6.5" fill="#3fae6b" />
        <path d="M24 14v4M16 19l3 2M32 19l-3 2M15 28h4M29 28h4" stroke="#3fae6b" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
};

// Server badge types map onto the same art where it makes sense.
const ALIAS: Record<string, string> = {
  VERIFIED: "verified",
  SOLAR_PARTNER: "partner",
  OFFICIAL_CREATOR: "verified",
  OFFICIAL_BRAND: "verified",
  STAFF_PICK: "staff",
  BOOSTED: "early_supporter",
};

export function badgeLabel(key: string): string | undefined {
  return ICONS[ALIAS[key] ?? key]?.label;
}

export function hasBadgeIcon(key: string): boolean {
  return !!ICONS[ALIAS[key] ?? key];
}

export function BadgeIcon({ badge, size = 22, title }: { badge: string; size?: number; title?: string }) {
  const entry = ICONS[ALIAS[badge] ?? badge];
  const label = title ?? entry?.label ?? badge;
  if (!entry) {
    return (
      <span
        title={label}
        className="grid place-items-center rounded-full bg-night-600 text-[10px] font-bold text-ink"
        style={{ width: size, height: size }}
      >
        {badge[0]?.toUpperCase() ?? "?"}
      </span>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={label}>
      <title>{label}</title>
      {entry.svg}
    </svg>
  );
}
