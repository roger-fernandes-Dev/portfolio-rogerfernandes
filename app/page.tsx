import { Sidebar } from "@/components/portfolio/sidebar"
import { About } from "@/components/portfolio/about"
import { Skills } from "@/components/portfolio/skills"
import { Studies } from "@/components/portfolio/studies"
import { Projects } from "@/components/portfolio/projects"

export default function Page() {
  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-6xl px-6 py-12 md:px-12 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-12">
        <Sidebar />
        <div className="space-y-24 pt-16 lg:w-1/2 lg:py-24">
          <About />
          <Skills />
          <Studies />
          <Projects />
          <footer className="pb-8 text-sm leading-relaxed text-muted-foreground">
            Desenvolvido com Next.js, typescript, Tailwind CSS. e UX por Roger Fernandes.
          </footer>
        </div>
      </div>
    </main>
  )
}
