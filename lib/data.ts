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
  { label: "Research", href: "/research" },
  { label: "Business", href: "/business" },
  { label: "Finance", href: "/finance" },
  { label: "Documents", href: "/documents" },
  { label: "Truth Verify", href: "/truth-verify" },
  { label: "Agents", href: "/agents" },
  { label: "Internet", href: "/internet" },
  { label: "Profile", href: "/profile" },
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
