import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  id: string
  index: string
  title: string
  description?: string
  children: ReactNode
}

/** Casca padrão de seção: cabeçalho em gradiente roxo + conteúdo revelado na rolagem. */
export default function Section({ id, index, title, description, children }: Props) {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <section id={id} className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-xl border border-brand/25 bg-gradient-to-r from-brand/22 via-brand/8 to-transparent px-5 py-5 sm:px-7 sm:py-6">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-lilac to-transparent"
          />
          <p className="font-mono text-xs tracking-[0.2em] text-lilac/80">
            {index} <span className="text-brand">//</span> {id.toUpperCase()}
          </p>
          <h2 className="mt-1.5 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash sm:text-[15px]">
              {description}
            </p>
          )}
        </header>

        <div
          ref={ref}
          className={[
            'mt-8 transition-all duration-700 ease-out sm:mt-10',
            shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
