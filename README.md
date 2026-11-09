# Portfólio — Akin Rigo

Protótipo de portfólio profissional com estética de terminal Linux.
React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Lucide Icons.

## Rodar no dia a dia

```bash
npm run dev        # http://localhost:5173 - recarrega ao salvar
npm run build      # gera dist/
npm run preview    # serve o build local
npm run typecheck  # só checa os tipos
```

Para parar o servidor: `Ctrl + C` no terminal.

## Primeira vez em outro computador

O `node_modules` não fica no Git (são milhares de arquivos, todos
reinstaláveis). Então numa máquina nova:

```bash
# 1. pré-requisitos: Node.js LTS (nodejs.org) e Git
git clone https://github.com/AkinRigo/portfolio-akin.git
cd portfolio-akin

# 2. baixa as dependências (só na primeira vez, demora ~1 min)
npm install

# 3. sobe o site local
npm run dev
```

Depois disso, no dia a dia, só `npm run dev`.

### Identidade do Git na máquina nova

O `git config` de autor fica em `.git/config`, que **não é clonado**.
Numa máquina pessoal, configure uma vez:

```bash
git config --global user.name "Akin Rigo"
git config --global user.email "82190093+AkinRigo@users.noreply.github.com"
```

Esse e-mail é o anônimo do GitHub: o commit conta no perfil sem expor
o endereço real.

## Publicar uma alteração

```bash
git add -A
git commit -m "atualiza textos"
git push
```

O GitHub Actions builda, checa os tipos e publica no Cloudflare Pages
em cerca de um minuto. Se o TypeScript quebrar, nada vai pro ar.

- Site: https://portfolio-akin.pages.dev
- Builds: https://github.com/AkinRigo/portfolio-akin/actions

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
