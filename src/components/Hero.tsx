import { ArrowDown, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { metrics, profile, socials } from '../data/content'
import Terminal from './Terminal'

const iconFor = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  file: FileText,
} as const

/** Enquanto o link real não é preenchido, o botão leva à seção de contato. */
const resolve = (href: string) => (href && href !== '#' ? href : '#contact')
const isExternal = (href: string) => href.startsWith('http')

export default function Hero() {
  const contact = socials.find((social) => social.id === 'email')
  const resume = socials.find((social) => social.id === 'resume')
  const resumeHref = resolve(resume?.href ?? '#')

  return (
    <section id="home" className="aura relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36">
      {/* Linha de varredura discreta */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-scan h-24 w-full bg-gradient-to-b from-transparent via-brand/5 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* ---------------- Coluna esquerda ---------------- */}
        <div className="animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/35 bg-brand/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-lilac">
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-brand" />
            SYSTEM.STATUS: ONLINE
          </p>

          <h1 className="text-glow mt-5 font-sans text-5xl leading-[0.95] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-3 font-mono text-lg text-ash sm:text-xl">
            {profile.role}
            <span
              aria-hidden="true"
              className="animate-blink ml-1 inline-block h-[0.95em] w-[0.5em] translate-y-[0.1em] bg-lilac"
            />
          </p>

          {/* Chips */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-brand/30 bg-graphite/70 px-2.5 py-1 font-mono text-[11px] tracking-wider text-lilac"
              >
                <span className="text-brand">[</span> {tag} <span className="text-brand">]</span>
              </li>
            ))}
          </ul>

          {/* Linha de descrição em prompt */}
          <p className="mt-6 max-w-xl border-l-2 border-brand/50 pl-4 font-mono text-sm leading-relaxed text-ash sm:text-[15px]">
            <span className="text-brand">&gt; </span>
            {profile.tagline}
          </p>

          {/* Ações */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="glow-sm rounded-md border border-brand bg-brand/15 px-5 py-2.5 font-mono text-sm text-white transition-all hover:-translate-y-0.5 hover:bg-brand/30"
            >
              init_contact()
            </a>
            <a
              href={resumeHref}
              {...(resumeHref !== '#contact' ? { download: '' } : {})}
              title={
                resumeHref === '#contact'
                  ? 'Currículo ainda não configurado — ir para contato'
                  : 'Baixar currículo'
              }
              className="rounded-md border border-white/15 px-5 py-2.5 font-mono text-sm text-ash transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-white"
            >
              view_resume.pdf
            </a>

            {/* Ícones sociais */}
            <div className="flex items-center gap-1 sm:ml-2">
              {socials
                .filter((social) => social.id !== 'resume')
                .map((social) => {
                  const Icon = iconFor[social.icon]
                  const href = resolve(social.href)
                  return (
                    <a
                      key={social.id}
                      href={href}
                      aria-label={social.label}
                      title={href === '#contact' ? `${social.label} — ver em contato` : social.label}
                      {...(isExternal(href)
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      className="rounded-md border border-white/10 p-2.5 text-ash transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-lilac"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
            </div>
          </div>

          {contact && (
            <p className="mt-5 font-mono text-xs text-ash/70">
              <span className="text-brand">#</span> {contact.value}
            </p>
          )}
        </div>

        {/* ---------------- Coluna direita: terminal ---------------- */}
        <div className="animate-rise [animation-delay:120ms]">
          <Terminal />
          <p className="mt-3 text-center font-mono text-[11px] text-ash/70">
            terminal interativo — clique e digite{' '}
            <span className="text-lilac">help</span>
          </p>
        </div>
      </div>

      {/* ---------------- Métricas ---------------- */}
      <div className="relative mx-auto mt-16 max-w-6xl">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {metrics.map((metric) => (
            <li key={metric.label} className="bg-graphite/70 px-4 py-5 text-center">
              <p className="font-mono text-2xl font-bold text-lilac sm:text-3xl">{metric.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-ash sm:text-xs">{metric.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-12 flex justify-center">
        <a
          href="#about"
          aria-label="Ir para a seção sobre"
          className="rounded-full border border-white/10 p-2.5 text-ash transition-colors hover:border-brand/50 hover:text-lilac"
        >
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
