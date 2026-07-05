export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Applications", href: "#applications" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Get Started",
  href: "#dashboard",
};

export const brand = {
  name: "AIOS",
  tagline: "Your AI Operating System",
  accentColor: "#7c3aed",
  secondaryColor: "#06b6d4",
};

export type SummaryItem = {
  id: string;
  icon: string;
  text: string;
  priority: "high" | "medium" | "low";
};

export type AppTile = {
  id: string;
  icon: string;
  label: string;
  description: string;
  color: string;
};

export type IntelFeed = {
  id: string;
  label: string;
  icon: string;
};