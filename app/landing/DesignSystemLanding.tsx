import { MarqueeBand } from "./components/MarqueeBand";
import { ScrollProgress } from "./components/ScrollProgress";
import { StickyNav } from "./components/StickyNav";
import { AtomicPrinciples } from "./sections/AtomicPrinciples";
import { Catalog } from "./sections/Catalog";
import { CtaFooter } from "./sections/CtaFooter";
import { Hero } from "./sections/Hero";
import { Impact } from "./sections/Impact";
import { InsideTixia } from "./sections/InsideTixia";
import { Manifesto } from "./sections/Manifesto";

export function DesignSystemLanding() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <ScrollProgress />
      <StickyNav />

      <Hero />

      <main className="flex flex-1 flex-col">
        <Manifesto />
        <AtomicPrinciples />
        <Impact />
        <Catalog />
        <InsideTixia />
        <MarqueeBand />
        <CtaFooter />
      </main>
    </div>
  );
}
