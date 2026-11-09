# Portfólio — Akin Rigo

Protótipo de portfólio profissional com estética de terminal Linux.
React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Lucide Icons.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview    # serve o build
npm run typecheck  # checagem de tipos
```

## Onde editar o conteúdo

**Tudo** que é texto, link ou número vive em um arquivo só:

```
src/data/content.ts
```

- `profile` — nome, cargo, chips do hero, bio, focos técnicos, certificações
- `projects` — cards de projeto (`repo` e `docs` estão como `'#'`)
- `stack` — grupos do tech stack
- `metrics` — a faixa de números do hero
- `socials` — GitHub, LinkedIn, e-mail e currículo (`href` como `'#'`)
- `navItems` — itens do menu

Enquanto um `href` for `'#'`, o botão não fica morto: nos cards ele explica
onde configurar, no hero ele leva à seção de contato, e no terminal o comando
`links` avisa que o endereço ainda não foi definido.

### Currículo em PDF

Coloque o arquivo em `public/curriculo.pdf` e aponte o `href` do item
`resume` em `content.ts` para `/curriculo.pdf`.

## Terminal interativo

Comandos: `help`, `about`, `whoami`, `projects`, `skills`, `contact`,
`links`, `clear`.

Teclas: `↑` `↓` histórico · `Tab` autocompleta · `Ctrl+L` limpa.
Depois de `links`: `↑` `↓` seleciona · `Enter` abre · `Esc` cancela.

## Estrutura

```
src/
  data/content.ts       fonte única de conteúdo
  hooks/useReveal.ts    revela seções ao rolar
  components/
    Nav.tsx             menu fixo, seção ativa, menu mobile
    Hero.tsx            apresentação + terminal + métricas
    Terminal.tsx        terminal interativo
    Section.tsx         casca padrão de seção
    About.tsx  Projects.tsx  TechStack.tsx  Contact.tsx  Footer.tsx
```
