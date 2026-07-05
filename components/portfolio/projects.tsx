import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { GithubIcon } from "./brand-icons"

const projects = [
  {
    title: "Portfolio",
    description:
      "Design clean, intuitivo, flexível, escalável. Foco em performance e UX.",
    image: "/imagem-portfolio.png",
    tags: ["Next.js", "TypeScript", "TailwindCss"],
    demo: "https://portfolio-rogerfernandes.vercel.app/",
    repo: "https://github.com/roger-fernandes-Dev/portfolio-rogerfernandes",
  },
  {
    title: "Plataforma para times amadores",
    description:
      "Plataforma para receber times amadores, dando destaque e visibilidade, divulgando jogos, notícias e propagandas",
    image: "/imagem-centralvarzea.png",
    tags: ["NextJS", "Typescript", "Tailwindcss", "Drizzle", "supabase"],
    demo: "https://www.centralvarzea.com.br/",
    repo: "https://github.com/roger-fernandes-Dev/centralvarzea",
  },
  {
    title: "(unhApp) aplicativo de unha ",
    description:
      "Aplicação que facilita o dia da manicure, podendo realizar cadastros de clientes, horários, agendamentos, históricos, cobranças.",
    image: "/unhapp.png",
    tags: ["React Native", "Typescript", "Tailwindcss", "Expo"],
    demo: "#",
    repo: "https://github.com/roger-fernandes-Dev/unhApp---aplicativo-de-unha",
  },
]

export function Projects() {
  return (
    <section id="projetos" aria-label="Projetos" className="scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-foreground">
        Projetos
      </h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group grid gap-5 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50 sm:grid-cols-[200px_1fr]"
          >
            <div className="overflow-hidden rounded-md border border-border">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Captura de tela do projeto ${project.title}`}
                width={400}
                height={260}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Repositório do projeto ${project.title}`}
                    className="transition-colors hover:text-primary"
                  >
                    <GithubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Demo do projeto ${project.title}`}
                    className="transition-colors hover:text-primary"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
