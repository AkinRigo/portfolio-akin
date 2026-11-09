import { BadgeCheck } from 'lucide-react'
import { profile } from '../data/content'
import Section from './Section'

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      title="Sobre mim"
      description="Back-end júnior com escopo de produto: do modelo de dados ao deploy."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Texto */}
        <div className="space-y-4">
          {profile.summary.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-ash">
              {paragraph}
            </p>
          ))}

          {/* Certificações */}
          <div className="mt-8 rounded-xl border border-white/10 bg-graphite/60 p-5">
            <p className="font-mono text-xs tracking-[0.18em] text-brand">// CERTIFICAÇÕES</p>
            <ul className="mt-3 space-y-3">
              {profile.certifications.map((certification) => (
                <li key={certification.issuer} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-lilac" />
                  <span className="text-sm">
                    <span className="text-white">{certification.name}</span>
                    <span className="block text-xs text-ash">
                      {certification.issuer} · nível {certification.level.toLowerCase()}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interesses */}
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-brand">// FOCO TÉCNICO</p>
          <ul className="mt-4 space-y-3">
            {profile.interests.map((interest) => (
              <li
                key={interest.title}
                className="group rounded-lg border border-white/10 bg-graphite/60 p-4 transition-colors hover:border-brand/40"
              >
                <p className="flex items-center gap-2 font-mono text-sm text-white">
                  <span className="text-brand transition-transform group-hover:translate-x-0.5">
                    ▸
                  </span>
                  {interest.title}
                </p>
                <p className="mt-1.5 pl-5 text-sm leading-relaxed text-ash">{interest.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
