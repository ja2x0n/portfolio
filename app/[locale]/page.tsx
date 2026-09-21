import { setRequestLocale } from "next-intl/server";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Home from "@/components/sections/Home";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Home />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
