import { GraduationCap, BookOpen, Award } from "lucide-react"

const studies = [
  {
    period: "2026 - cursando",
    title: "Bacharelado em Engenharia de Software",
    description:
      "Estrutura de dados, design de projeto, arquitetura de software, Métodos Ágeis, IAs.",
    tags: ["Estrutura de dados", "Algoritmos", "Métodos Ágeis", "Design de sotware", "Modelagem de dados", "Scrum", "Kanban"],
    icon: Award,
  },
  {
    period: "2011 — 2015",
    title: "Bacharelado em Ciência da Computação",
    description:
      "Base sólida em algoritmos, estruturas de dados, redes e engenharia de software.",
    tags: ["Algoritmos", "Engenharia de Software"],
    icon: GraduationCap,
  },
]

export function Studies() {
  return (
    <section id="estudos" aria-label="Estudos" className="scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-foreground">
        Estudos
      </h2>
      <ol className="space-y-6">
        {studies.map(({ period, title, description, tags, icon: Icon }) => (
          <li
            key={title}
            className="group relative rounded-lg border border-transparent p-5 transition-colors hover:border-border hover:bg-card"
          >
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {period}
                </p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
