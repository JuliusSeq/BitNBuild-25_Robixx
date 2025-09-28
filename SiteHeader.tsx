import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Insight engine", href: "#insights" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="/" className="flex items-center gap-3 text-white">
  

          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-semibold">Robixx Review Radar</span>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              Products URL insights
            </span>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
       
      </div>
      <MobileMenu navItems={navItems} open={isOpen} onClose={closeMenu} />
    </header>
  );
};

const MobileMenu = ({ navItems, open, onClose }: { navItems: NavItem[]; open: boolean; onClose: () => void }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-slate-950/80 backdrop-blur-md md:hidden">
      <button
        type="button"
        className="absolute inset-0 h-full w-full"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <div
        id="mobile-menu"
        className="relative right-4 top-24 w-[calc(100%-2rem)] max-w-xs rounded-3xl border border-white/12 bg-slate-900/95 p-6 shadow-2xl"
      >
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-6">
          <a
            href="#cta"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(255,179,71,0.3)] transition hover:-translate-y-0.5"
          >
            Get early access
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
