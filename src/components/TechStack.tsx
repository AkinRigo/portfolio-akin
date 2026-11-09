import { stack } from '../data/content'
import Section from './Section'

export default function TechStack() {
  return (
    <Section
      id="stack"
      index="03"
      title="Tech stack"
      description="Ferramentas que eu uso no dia a dia, agrupadas por função."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <li
            key={group.label}
            className="group rounded-xl border border-white/10 bg-graphite/70 p-5 transition-colors hover:border-brand/40"
          >
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand transition-transform group-hover:scale-150" />
              {group.label.toUpperCase()}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((technology) => (
                <li
                  key={technology}
                  className="rounded-md border border-white/10 bg-void/60 px-2.5 py-1 font-mono text-xs text-white/85 transition-colors hover:border-brand/40 hover:text-lilac"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
