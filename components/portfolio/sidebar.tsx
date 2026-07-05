"use client"

import { useEffect, useState } from "react"
import { Mail, FileText } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "./brand-icons"

const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "skills", label: "Skills" },
  { id: "estudos", label: "Estudos" },
  { id: "projetos", label: "Projetos" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/roger-fernandes-Dev", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/roger-fernandes-garcia-de-sousa-5a0bb214b/", icon: LinkedinIcon },
  { label: "Email", href: "rogerfernandesdeveloper@gmail.com", icon: Mail },
  { label: "Currículo", href: "#", icon: FileText },
]

export function Sidebar() {
  const [active, setActive] = useState("sobre")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Roger Fernandes
        </h1>
        <h2 className="mt-3 text-lg font-medium text-foreground sm:text-xl">
          Desenvolvedor Full Stack
        </h2>
        <p className="mt-4 max-w-xs text-pretty leading-relaxed text-muted-foreground">
          Construo interfaces acessíveis e APIs robustas, da concepção ao deploy.
        </p>

        {/* Navegação - desktop */}
        <nav className="mt-16 hidden lg:block" aria-label="Navegação interna">
          <ul className="flex flex-col gap-4">
            {navItems.map(({ id, label }) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <a href={`#${id}`} className="group flex items-center gap-4 py-1">
                    <span
                      className={`h-px transition-all duration-200 ${
                        isActive
                          ? "w-16 bg-primary"
                          : "w-8 bg-muted-foreground/40 group-hover:w-16 group-hover:bg-foreground"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ul className="mt-8 flex items-center gap-5" aria-label="Redes sociais">
        {socials.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="block text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}
