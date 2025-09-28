import { ArrowUpRight, Linkedin, Mail, Twitter } from "lucide-react";

const footerLinks = [
  {
    heading: "Platform",
    items: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Insight engine", href: "#insights" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Support", href: "#faq" },
    ],
  },
];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:hello@amazescope.ai",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com",
    icon: Twitter,
  },
];

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/40 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-3 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary text-slate-950 font-display text-xl shadow-[0_18px_36px_rgba(0,0,0,0.25)]">
                A
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-3xl font-semibold">AmazeScope</span>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
                  Amazon URL insights
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Decode every Amazon product link with sentiment-rich insights. AmazeScope highlights what delighted and frustrated reviewers, so your team can make faster merchandising decisions.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 transition hover:border-primary/40 hover:bg-primary/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {footerLinks.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                  {section.heading}
                </h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="transition hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Get a personalized walkthrough</p>
              <p className="mt-2 text-sm text-white/60">
                Share a couple of Amazon listings and we&apos;ll send back a tailored insight report.
              </p>
              <a
                href="#cta"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary via-primary/90 to-secondary px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(255,179,71,0.3)] transition hover:-translate-y-0.5"
              >
                Book a session
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} AmazeScope Labs. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#privacy" className="transition hover:text-white">
              Privacy policy
            </a>
            <a href="#terms" className="transition hover:text-white">
              Terms of service
            </a>
            <a href="#status" className="transition hover:text-white">
              System status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
