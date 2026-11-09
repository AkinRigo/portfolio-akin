import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { socials, type Social } from '../data/content'
import Section from './Section'

const iconFor = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  file: FileText,
} as const

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (social: Social) => {
    try {
      await navigator.clipboard.writeText(social.value)
      setCopied(social.id)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  return (
    <Section
      id="contact"
      index="04"
      title="Contato"
      description="Aberto a conversar sobre back-end, ERP e arquitetura. Resposta em até um dia útil."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {socials.map((social) => {
          const Icon = iconFor[social.icon]
          const configured = Boolean(social.href) && social.href !== '#'
          const isResume = social.id === 'resume'

          return (
            <div
              key={social.id}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-graphite/70 p-4 transition-all hover:-translate-y-0.5 hover:border-brand/45 sm:p-5"
            >
              <span className="rounded-lg border border-brand/25 bg-brand/10 p-2.5 text-lilac">
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs tracking-wider text-brand">
                  {social.label.toUpperCase()}
                </p>
                <p className="truncate font-mono text-sm text-white/90">{social.value}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => copy(social)}
                  aria-label={`Copiar ${social.label}`}
                  title="Copiar"
                  className="rounded-md border border-white/10 p-2 text-ash transition-colors hover:border-brand/45 hover:text-lilac"
                >
                  {copied === social.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>

                {configured ? (
                  <a
                    href={social.href}
                    {...(social.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    aria-label={`Abrir ${social.label}`}
                    title={isResume ? 'Baixar' : 'Abrir'}
                    className="rounded-md border border-brand/35 bg-brand/10 p-2 text-lilac transition-colors hover:bg-brand/25 hover:text-white"
                  >
                    {isResume ? (
                      <Download className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}
                  </a>
                ) : (
                  <span
                    title="Link ainda não configurado em src/data/content.ts"
                    className="cursor-help rounded-md border border-white/10 px-2 py-2 font-mono text-[10px] text-ash"
                  >
                    n/d
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Chamada final */}
      <div className="mt-6 overflow-hidden rounded-xl border border-brand/25 bg-gradient-to-r from-brand/18 via-brand/6 to-transparent p-6 sm:p-8">
        <p className="font-mono text-sm text-ash">
          <span className="text-brand">❯</span> echo <span className="text-lilac">$DISPONIBILIDADE</span>
        </p>
        <p className="mt-3 max-w-2xl font-sans text-xl leading-snug font-bold text-white sm:text-2xl">
          Aberto a oportunidades como desenvolvedor back-end Java.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-ash">
          Se o seu time trabalha com Spring Boot, PostgreSQL ou domínio fiscal, vamos conversar.
        </p>
      </div>
    </Section>
  )
}
