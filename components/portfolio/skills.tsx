const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "React Native","Next.js", "TypeScript", "Tailwind CSS", "Redux", "middlewares"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Drizzle", "Python", "REST", "Prisma"],
  },
  {
    title: "Banco de Dados",
    items: ["PostgreSQL", "MongoDB", "SupaBase", "Mysql", "SQLite"],
  },
  {
    title: "DevOps & Ferramentas",
    items: ["Expo", "Git", "GitHub", "VsCode", "Vercel", "ChatGPT", "Gemini", "Métodos Ágeis"],
  },
]

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-foreground">
        Skills
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
          >
            <h3 className="mb-4 text-base font-semibold text-foreground">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
