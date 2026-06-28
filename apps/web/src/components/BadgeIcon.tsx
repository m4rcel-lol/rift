"use client";

// SolarCord badge icons. Most use the supplied PNG art (served from /badges);
// a few keys without a custom image fall back to a small SVG tile.

function tile(main: string, tint: string) {
  return <rect x="2.5" y="2.5" width="43" height="43" rx="13" fill={tint} stroke={main} strokeWidth="3.5" />;
}

interface IconDef {
  label: string;
  img?: string; // path under /public
  svg?: React.ReactNode;
}

const ICONS: Record<string, IconDef> = {
  staff: { label: "SolarCord Staff", img: "/badges/staff.png" },
  owner: { label: "Owner", img: "/badges/crown.png" },
  early_supporter: { label: "Early Supporter", img: "/badges/booster.png" },
  booster: { label: "Server Booster", img: "/badges/booster.png" },
  bug_hunter: { label: "Bug Hunter", img: "/badges/bughunter.png" },
  community: { label: "Community", img: "/badges/community.png" },
  partner: { label: "Solar Partner", img: "/badges/partner.png" },
  verified: { label: "Verified", img: "/badges/verified.png" },
  verifiedserver: { label: "Verified Server", img: "/badges/verifiedserver.png" },

  // Keys without supplied art — small SVG tiles.
  active_developer: { label: "Active Developer", img: "/badges/staff.png" },
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
  solar_plus: { label: "Solar+", img: "/badges/flame.webp" },
};

// Server badge types map onto the badge art.
const ALIAS: Record<string, string> = {
  VERIFIED: "verifiedserver",
  SOLAR_PARTNER: "partner",
  COMMUNITY: "community",
  DISCOVERABLE: "community",
  SAFE_COMMUNITY: "community",
  BOOSTED: "booster",
  OFFICIAL_CREATOR: "verifiedserver",
  OFFICIAL_BRAND: "verifiedserver",
  STAFF_PICK: "staff",
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
  if (entry.img) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={entry.img} alt={label} title={label} width={size} height={size} className="shrink-0 object-contain" style={{ width: size, height: size }} />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={label}>
      <title>{label}</title>
      {entry.svg}
    </svg>
  );
}
