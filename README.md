# Portfólio — Gustavo Oliveira

Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências.
Tema preto e branco, com troca de idioma PT/EN e tema claro/escuro.

## Estrutura

```
portfolio/
├── index.html            # conteúdo e estrutura da página
├── css/
│   └── style.css         # estilos (cores no topo, em :root)
├── js/
│   └── main.js           # tema, idioma, formulário, carrossel, animações
├── assets/
│   ├── favicon.svg       # ícone da aba do navegador
│   ├── img/
│   │   └── gustavo.jpg   # sua foto
│   └── docs/             # coloque aqui o PDF do currículo
├── .gitignore
└── README.md
```

## Como rodar localmente

Abra o `index.html` no navegador. Se preferir um servidor local:

```bash
npx serve .
```

## Como publicar

- **Vercel:** importe o repositório; não precisa de configuração.
- **GitHub Pages:** Settings → Pages → escolha a branch principal e a pasta `/ (root)`.

## O que editar (use Ctrl+F)

| O que | Onde | Procure por |
|---|---|---|
| Currículo (PDF) | coloque o arquivo em `assets/docs/` e ajuste `js/main.js` | `CV_URL` |
| Link de cada repositório | `index.html` | `github.com/gustavo-olvr` (botões "Código") |
| Link do Leo Gruber | `index.html` | `projeto-leo-gruber` |
| Link do projeto Yurig | `index.html` | `projeto-teste-yuri` |
| Seus e-mail, LinkedIn e GitHub | `index.html` | `mailto:`, `linkedin.com`, `github.com` |
| Foto | substitua o arquivo | `assets/img/gustavo.jpg` |
| Cores | `css/style.css` | `:root` (tema escuro) e `:root[data-theme="light"]` |
| Certificados | `index.html` | `id="pane-c"` |
| Screenshots dos projetos | `index.html` | `class="shot` (troque o bloco por uma `<img>`) |

## Idiomas

Cada texto traduzível tem o atributo `data-en` com a versão em inglês.
Ao mudar um texto em português, atualize também o `data-en` do mesmo elemento.

## Ícones

Logos de tecnologias de [Simple Icons](https://simpleicons.org) e ícones de interface de
[Lucide](https://lucide.dev), embutidos no HTML como SVG.
