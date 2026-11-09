import { useState } from 'react'
import { BookText, Github, Info } from 'lucide-react'
import { projects, type Project } from '../data/content'
import Section from './Section'

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      title="Projetos"
      description="Sistemas que eu projetei, implementei e mantenho rodando — arquitetura, banco, back-end e deploy."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </Section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [note, setNote] = useState<string | null>(null)
  const live = project.status === 'EM PRODUÇÃO'

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-graphite/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand/45 hover:shadow-[0_0_38px_-14px_rgb(139_92_246/0.6)]">
      {/* Fio de luz no topo, no hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-sans text-lg font-bold text-white">{project.name}</h3>
            <p className="font-mono text-xs text-brand">{project.kind}</p>
          </div>
          <span
            className={[
              'shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider',
              live
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                : 'border-amber-400/30 bg-amber-400/10 text-amber-300',
            ].join(' ')}
          >
            {project.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ash">{project.summary}</p>

        {/* Destaques */}
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 font-mono text-xs text-ash">
              <span className="text-brand">·</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded border border-white/10 bg-void/60 px-2 py-0.5 font-mono text-[11px] text-lilac"
            >
              {technology}
            </li>
          ))}
        </ul>

        {/* Ações */}
        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <CardLink
            href={project.repo}
            icon={<Github className="h-3.5 w-3.5" />}
            label="Repositório"
            onPlaceholder={() =>
              setNote(
                note === 'repo'
                  ? null
                  : 'repo',
              )
            }
            noteOpen={note === 'repo'}
          />
          <CardLink
            href={project.docs}
            icon={<BookText className="h-3.5 w-3.5" />}
            label="Documentação"
            onPlaceholder={() => setNote(note === 'docs' ? null : 'docs')}
            noteOpen={note === 'docs'}
          />
        </div>

        {note && (
          <p className="mt-3 flex items-start gap-2 rounded-md border border-brand/25 bg-brand/8 px-3 py-2 font-mono text-[11px] leading-relaxed text-ash">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lilac" />
            <span>
              Link ainda não configurado. Defina{' '}
              <span className="text-lilac">
                {note === 'repo' ? 'repo' : 'docs'}
              </span>{' '}
              deste projeto em <span className="text-lilac">src/data/content.ts</span>.
            </span>
          </p>
        )}
      </div>
    </li>
  )
}

function CardLink({
  href,
  icon,
  label,
  onPlaceholder,
  noteOpen,
}: {
  href: string
  icon: React.ReactNode
  label: string
  onPlaceholder: () => void
  noteOpen: boolean
}) {
  const base =
    'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors'

  if (!href || href === '#') {
    return (
      <button
        type="button"
        onClick={onPlaceholder}
        aria-expanded={noteOpen}
        className={`${base} border-white/10 text-ash hover:border-brand/40 hover:text-white`}
      >
        {icon}
        {label}
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${base} border-brand/35 bg-brand/10 text-lilac hover:bg-brand/25 hover:text-white`}
    >
      {icon}
      {label}
    </a>
  )
}
