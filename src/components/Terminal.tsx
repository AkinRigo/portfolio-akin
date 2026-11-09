import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects, socials, stack } from '../data/content'

/* ------------------------------------------------------------------ */
/*  Tipos                                                              */
/* ------------------------------------------------------------------ */

type Tone = 'default' | 'dim' | 'accent' | 'heading' | 'ok' | 'error'

type Line = { text: string; tone?: Tone; indent?: boolean }

/** Corpo do bloco, sem identidade — é o que os comandos produzem. */
type BlockBody =
  | { kind: 'input'; value: string }
  | { kind: 'lines'; lines: Line[] }
  | { kind: 'links' }

type Block = BlockBody & { id: number }

type CommandResult = { lines?: Line[]; links?: boolean; clear?: boolean }

type Command = {
  name: string
  describe: string
  run: () => CommandResult
}

/* ------------------------------------------------------------------ */
/*  Helpers de formatação                                              */
/* ------------------------------------------------------------------ */

const blank: Line = { text: '' }
const heading = (text: string): Line => ({ text, tone: 'heading' })
const dim = (text: string): Line => ({ text, tone: 'dim' })
const accent = (text: string): Line => ({ text, tone: 'accent' })
const item = (text: string): Line => ({ text, indent: true })

/** Alinha o nome do comando numa coluna fixa, como um `--help` de verdade. */
const pad = (value: string, size: number) => value.padEnd(size, ' ')

/* ------------------------------------------------------------------ */
/*  Registro de comandos                                               */
/* ------------------------------------------------------------------ */

function buildCommands(): Command[] {
  const list: Command[] = [
    {
      name: 'help',
      describe: 'lista os comandos disponíveis',
      run: () => ({ lines: [] }), // preenchido abaixo (precisa da lista pronta)
    },
    {
      name: 'about',
      describe: 'quem eu sou e como eu trabalho',
      run: () => ({
        lines: [
          heading('// SOBRE'),
          blank,
          ...profile.summary.flatMap((paragraph) => [{ text: paragraph }, blank]),
          dim(`local: ${profile.location}`),
        ],
      }),
    },
    {
      name: 'whoami',
      describe: 'identidade profissional resumida',
      run: () => ({
        lines: [
          accent(profile.fullName),
          { text: profile.role },
          blank,
          dim('função ......... back-end (Java / Spring Boot)'),
          dim('domínio ........ ERP, fiscal brasileiro, RH'),
          dim('também faço .... banco de dados, infraestrutura e deploy'),
          dim(`stack base ..... ${stack[0].items.slice(0, 3).join(', ')}`),
          blank,
          { text: profile.tagline, tone: 'dim' },
        ],
      }),
    },
    {
      name: 'projects',
      describe: 'sistemas que eu construí ou mantenho',
      run: () => ({
        lines: [
          heading('// PROJETOS'),
          blank,
          ...projects.flatMap<Line>((project) => [
            accent(`${project.name}  —  ${project.kind}`),
            dim(`status: ${project.status.toLowerCase()} · ${project.year}`),
            { text: project.summary },
            ...project.highlights.map((highlight) => item(`· ${highlight}`)),
            item(`stack: ${project.stack.join(' · ')}`),
            blank,
          ]),
          dim("Veja os cards completos na seção 'projects' da página."),
        ],
      }),
    },
    {
      name: 'skills',
      describe: 'tecnologias por categoria',
      run: () => ({
        lines: [
          heading('// TECH STACK'),
          blank,
          ...stack.flatMap<Line>((group) => [
            accent(group.label),
            item(group.items.join(' · ')),
            blank,
          ]),
        ],
      }),
    },
    {
      name: 'contact',
      describe: 'como falar comigo',
      run: () => ({
        lines: [
          heading('// CONTATO'),
          blank,
          ...socials.map((social) => item(`${pad(social.label, 10)} ${social.value}`)),
          blank,
          dim("Digite 'links' para abrir qualquer um deles pelo teclado."),
        ],
      }),
    },
    {
      name: 'links',
      describe: 'abre um link pelo teclado (↑ ↓ enter)',
      run: () => ({ links: true }),
    },
    {
      name: 'clear',
      describe: 'limpa o terminal',
      run: () => ({ clear: true }),
    },
  ]

  const width = Math.max(...list.map((command) => command.name.length)) + 2
  const helpCommand = list.find((command) => command.name === 'help')
  if (helpCommand) {
    helpCommand.run = () => ({
      lines: [
        heading('// COMANDOS DISPONÍVEIS'),
        blank,
        ...list.map((command) => ({
          text: `${pad(command.name, width)}${command.describe}`,
          indent: true,
        })),
        blank,
        dim('dica: use ↑ e ↓ para repetir comandos e Tab para completar.'),
      ],
    })
  }

  return list
}

/* ------------------------------------------------------------------ */
/*  Boot                                                               */
/* ------------------------------------------------------------------ */

const bootLines: Line[] = [
  dim('portfolio.sh — inicializando sessão'),
  { text: '[ OK ]  perfil carregado .......... ' + profile.handle, tone: 'ok' },
  { text: '[ OK ]  /projects montado ......... ' + projects.length + ' entradas', tone: 'ok' },
  { text: '[ OK ]  runtime ................... java 21 lts', tone: 'ok' },
  { text: '[ OK ]  sessão .................... pronta', tone: 'ok' },
  blank,
  { text: "Digite 'help' para ver os comandos disponíveis.", tone: 'accent' },
]

/* ------------------------------------------------------------------ */
/*  Componente                                                         */
/* ------------------------------------------------------------------ */

export default function Terminal() {
  const commands = useMemo(buildCommands, [])
  const commandNames = useMemo(() => commands.map((command) => command.name), [commands])

  const [blocks, setBlocks] = useState<Block[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [uptime, setUptime] = useState(0)
  const [booting, setBooting] = useState(true)
  const [linkIndex, setLinkIndex] = useState<number | null>(null)
  /** Id do bloco de links que está no comando: só ele responde ao teclado. */
  const [linksBlockId, setLinksBlockId] = useState<number | null>(null)

  const nextId = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const push = useCallback((block: BlockBody) => {
    setBlocks((current) => [...current, { ...block, id: nextId.current++ }])
  }, [])

  /* ---- Sequência de boot ---- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setBlocks([{ id: nextId.current++, kind: 'lines', lines: bootLines }])
      setBooting(false)
      return
    }

    const timers: number[] = []
    bootLines.forEach((line, index) => {
      timers.push(
        window.setTimeout(() => {
          setBlocks((current) => {
            const last = current[current.length - 1]
            if (last && last.kind === 'lines') {
              const merged = [...current]
              merged[merged.length - 1] = { ...last, lines: [...last.lines, line] }
              return merged
            }
            return [...current, { id: nextId.current++, kind: 'lines', lines: [line] }]
          })
          if (index === bootLines.length - 1) setBooting(false)
        }, 170 * (index + 1)),
      )
    })
    return () => timers.forEach(window.clearTimeout)
  }, [])

  /* ---- Relógio de uptime ---- */
  useEffect(() => {
    const timer = window.setInterval(() => setUptime((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  /* ---- Rolagem automática ---- */
  useEffect(() => {
    const node = scrollRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [blocks, linkIndex])

  /* ---- Execução ---- */
  const execute = useCallback(
    (raw: string) => {
      const value = raw.trim()
      push({ kind: 'input', value: raw })
      setCount((current) => current + 1)

      if (!value) return

      setHistory((current) => [...current, value])
      setHistoryIndex(null)

      const name = value.split(/\s+/)[0].toLowerCase()
      const command = commands.find((candidate) => candidate.name === name)

      if (!command) {
        push({
          kind: 'lines',
          lines: [
            { text: `comando não encontrado: ${name}`, tone: 'error' },
            dim("Digite 'help' para ver a lista de comandos."),
          ],
        })
        return
      }

      const result = command.run()

      if (result.clear) {
        setBlocks([])
        setLinkIndex(null)
        setLinksBlockId(null)
        return
      }
      if (result.links) {
        setLinkIndex(0)
        setLinksBlockId(nextId.current)
        push({ kind: 'links' })
        return
      }
      if (result.lines) push({ kind: 'lines', lines: result.lines })
    },
    [commands, push],
  )

  /* ---- Teclado ---- */
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Modo de navegação dos links
    if (linkIndex !== null) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setLinkIndex((current) => ((current ?? 0) + 1) % socials.length)
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setLinkIndex((current) => ((current ?? 0) - 1 + socials.length) % socials.length)
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        setLinkIndex(null)
        setLinksBlockId(null)
        push({ kind: 'lines', lines: [dim('seleção cancelada.')] })
        return
      }
      if (event.key === 'Enter' && input.trim() === '') {
        event.preventDefault()
        openLink(linkIndex)
        return
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      execute(input)
      setInput('')
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.length) return
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(index)
      setInput(history[index])
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === null) return
      const index = historyIndex + 1
      if (index >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(index)
        setInput(history[index])
      }
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const match = commandNames.find((name) => name.startsWith(input.trim().toLowerCase()))
      if (match) setInput(match)
      return
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      setBlocks([])
      setLinkIndex(null)
    }
  }

  const openLink = (index: number) => {
    const social = socials[index]
    setLinkIndex(null)
    setLinksBlockId(null)
    if (!social.href || social.href === '#') {
      push({
        kind: 'lines',
        lines: [
          { text: `${social.label}: link ainda não configurado.`, tone: 'error' },
          dim('Defina o endereço em src/data/content.ts → socials.'),
        ],
      })
      return
    }
    push({ kind: 'lines', lines: [{ text: `abrindo ${social.label}…`, tone: 'ok' }] })
    window.open(social.href, social.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener')
  }

  const minutes = String(Math.floor(uptime / 60)).padStart(2, '0')
  const seconds = String(uptime % 60).padStart(2, '0')

  return (
    <div
      className="glow-md flex h-[26rem] flex-col overflow-hidden rounded-xl border border-white/10 bg-graphite/85 backdrop-blur-sm sm:h-[30rem]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Barra de título */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-void/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <p className="ml-2 truncate font-mono text-xs text-ash">
          {profile.handle}@{profile.host}: ~
        </p>
        <span className="ml-auto hidden font-mono text-[10px] tracking-widest text-brand sm:inline">
          bash
        </span>
      </div>

      {/* Corpo */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Saída do terminal interativo"
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
      >
        {blocks.map((block) => {
          if (block.kind === 'input') {
            return (
              <p key={block.id} className="break-all">
                <span className="text-brand">❯</span>{' '}
                <span className="text-white">{block.value}</span>
              </p>
            )
          }
          if (block.kind === 'links') {
            const live = block.id === linksBlockId
            return (
              <LinkList
                key={block.id}
                selected={live ? linkIndex : null}
                onPick={openLink}
                onHover={(index) => live && linkIndex !== null && setLinkIndex(index)}
              />
            )
          }
          return (
            <div key={block.id} className="pb-1">
              {block.lines.map((line, index) => (
                <p
                  key={index}
                  className={[
                    'whitespace-pre-wrap break-words',
                    line.indent ? 'pl-3' : '',
                    line.tone === 'dim'
                      ? 'text-ash'
                      : line.tone === 'accent'
                        ? 'text-lilac'
                        : line.tone === 'heading'
                          ? 'font-bold tracking-wide text-brand'
                          : line.tone === 'ok'
                            ? 'text-emerald-400/85'
                            : line.tone === 'error'
                              ? 'text-rose-400'
                              : 'text-white/85',
                  ].join(' ')}
                >
                  {line.text || ' '}
                </p>
              ))}
            </div>
          )
        })}

        {/* Linha de entrada */}
        {!booting && (
          <label className="flex items-center gap-2">
            <span className="shrink-0 text-brand" aria-hidden="true">
              ❯
            </span>
            <span className="sr-only">Digite um comando</span>
            <span className="relative flex min-w-0 flex-1 items-center">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="w-full bg-transparent font-mono text-white caret-transparent outline-none"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-[1.05em] w-[0.55em] -translate-y-1/2 animate-blink bg-lilac"
                style={{ left: `${input.length}ch` }}
              />
            </span>
          </label>
        )}
      </div>

      {/* Barra de status */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 bg-void/60 px-4 py-2 font-mono text-[10px] text-ash">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand" />
          online
        </span>
        <span aria-hidden="true">·</span>
        <span>
          uptime: {minutes}m {seconds}s
        </span>
        <span aria-hidden="true">·</span>
        <span>cmds: {count}</span>
        <span aria-hidden="true">·</span>
        <span className="hidden sm:inline">heap: nominal</span>
        {linkIndex !== null && (
          <span className="ml-auto text-lilac">↑↓ seleciona · enter abre · esc cancela</span>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Lista de links navegável                                           */
/* ------------------------------------------------------------------ */

function LinkList({
  selected,
  onPick,
  onHover,
}: {
  selected: number | null
  onPick: (index: number) => void
  onHover: (index: number) => void
}) {
  return (
    <div className="pb-1">
      <p className="font-bold tracking-wide text-brand">// QUICK LINKS</p>
      <p className="text-ash">&nbsp;</p>
      <ul>
        {socials.map((social, index) => {
          const active = selected === index
          return (
            <li key={social.id}>
              <button
                type="button"
                onClick={() => onPick(index)}
                onMouseEnter={() => onHover(index)}
                className={[
                  'flex w-full items-center gap-2 rounded px-2 py-0.5 text-left font-mono transition-colors',
                  active ? 'bg-brand/20 text-white' : 'text-white/85 hover:bg-white/5',
                ].join(' ')}
              >
                <span className={active ? 'text-lilac' : 'text-brand'}>
                  {active ? '▸' : ' '}
                </span>
                <span className="text-ash">{index + 1}.</span>
                <span className="font-medium">{social.label}</span>
                <span className="truncate text-ash">— {social.value}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="pt-1 pl-2 text-ash">↑↓ seleciona · enter abre · esc cancela</p>
    </div>
  )
}
