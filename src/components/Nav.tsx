import { useEffect, useState } from 'react'
import { Menu, Terminal as TerminalIcon, X } from 'lucide-react'
import { navItems, profile } from '../data/content'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  /* Sombra/blur ao rolar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Destaque da seção visível */
  useEffect(() => {
    const sections = navItems
      .map((navItem) => document.getElementById(navItem.id))
      .filter((element): element is HTMLElement => Boolean(element))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  /* Trava a rolagem com o menu mobile aberto */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-white/10 bg-void/85 backdrop-blur-md'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8"
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2 font-mono text-sm"
        >
          <TerminalIcon className="h-4 w-4 text-brand transition-transform group-hover:scale-110" />
          <span className="text-ash">
            {profile.handle}@{profile.host}
          </span>
          <span className="text-brand">:~$</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <a
                href={`#${navItem.id}`}
                aria-current={active === navItem.id ? 'true' : undefined}
                className={[
                  'rounded-md px-3 py-1.5 font-mono text-sm transition-colors',
                  active === navItem.id
                    ? 'bg-brand/15 text-lilac'
                    : 'text-ash hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                <span className="text-brand/70">/</span>
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="rounded-md border border-white/10 p-2 text-ash transition-colors hover:border-brand/50 hover:text-white md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-white/10 bg-void/95 backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {navItems.map((navItem) => (
            <li key={navItem.id}>
              <a
                href={`#${navItem.id}`}
                onClick={() => setOpen(false)}
                className={[
                  'block rounded-md px-3 py-2.5 font-mono text-sm transition-colors',
                  active === navItem.id
                    ? 'bg-brand/15 text-lilac'
                    : 'text-ash hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                <span className="text-brand/70">/</span>
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
