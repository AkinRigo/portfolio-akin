import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-ash">
          <span className="text-brand">❯</span> {profile.handle}@{profile.host} ·{' '}
          {new Date().getFullYear()}
        </p>

        <p className="font-mono text-xs text-ash/70">
          Construído com React, TypeScript, Vite e Tailwind CSS.
        </p>

        <a
          href="#home"
          aria-label="Voltar ao topo"
          className="rounded-md border border-white/10 p-2 text-ash transition-colors hover:border-brand/50 hover:text-lilac"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  )
}
