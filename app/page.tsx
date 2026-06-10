import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Boot } from "@/components/scene/Boot";
import { Nav } from "@/components/ui/Nav";
import { CornerReadout } from "@/components/ui/CornerReadout";
import { Hero } from "@/components/scene/Hero";
import { Identity } from "@/components/scene/Identity";
import { Timeline } from "@/components/scene/Timeline";
import { Capabilities } from "@/components/scene/Capabilities";
import { Work } from "@/components/scene/Work";
import { Leadership } from "@/components/scene/Leadership";
import { Credentials } from "@/components/scene/Credentials";
import { Contact } from "@/components/scene/Contact";

export default function Page() {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <Boot />
      <Nav />
      <CornerReadout />
      <main>
        <Hero />
        <Identity />
        <Timeline />
        <Capabilities />
        <Work />
        <Leadership />
        <Credentials />
        <Contact />
      </main>
    </ThemeProvider>
  );
}
