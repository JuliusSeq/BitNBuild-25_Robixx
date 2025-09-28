import { Outlet } from "react-router-dom";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const AppLayout = () => (
  <div className="relative flex min-h-screen flex-col text-white">
    <BackgroundDecorations />
    <SiteHeader />
    <main className="flex-1">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);

const BackgroundDecorations = () => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute left-[-20%] top-[-30%] h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-3xl" />
    <div className="absolute right-[-10%] top-[-10%] h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-3xl" />
    <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[140px]" />
    <div className="absolute bottom-[-25%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
    <div className="absolute bottom-[-30%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-[160px]" />
    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
  </div>
);

export default AppLayout;
