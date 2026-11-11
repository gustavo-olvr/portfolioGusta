# Portfólio — Gustavo Oliveira

Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências.
Tema preto e branco, troca de idioma PT/EN e tema claro/escuro.

## Estrutura

```
portfolio/
├── index.html            # conteúdo da página (seções comentadas)
├── css/
│   └── style.css         # estilos, divididos em blocos comentados
├── js/
│   └── main.js           # comportamento, dividido em 8 seções numeradas
├── assets/
│   ├── favicon.svg       # ícone da aba do navegador
│   ├── img/gustavo.jpg   # sua foto
│   ├── img/certificates/ # imagens da frente dos certificados
│   └── docs/             # coloque aqui o PDF do currículo
├── .prettierrc           # padrão de formatação do código
├── .gitignore
└── README.md
```

## Como rodar localmente

Abra o `index.html` no navegador, ou use um servidor local:

```bash
npx serve .
```

## Como publicar

- **Vercel:** importe o repositório; não precisa de configuração.
- **GitHub Pages:** Settings → Pages → branch principal, pasta `/ (root)`.

## O que editar (use Ctrl+F)

| O que | Arquivo | Procure por |
|---|---|---|
| Currículo (PDF) | `js/main.js` | `RESUME_URL` (coloque o PDF em `assets/docs/`) |
| Seu e-mail (formulário) | `js/main.js` | `EMAIL` |
| Link de cada repositório | `index.html` | `github.com/gustavo-olvr` (botões "Código") |
| Link do Leo Gruber | `index.html` | `projeto-leo-gruber` |
| Link do projeto Yurig | `index.html` | `projeto-teste-yuri` |
| Foto | `assets/img/gustavo.jpg` | substitua o arquivo |
| Cores | `css/style.css` | `:root` (escuro) e `:root[data-theme="light"]` (claro) |
| Certificados | `index.html` + `assets/img/certificates/` | `card-certificate` (copie um card e troque imagem, textos e data) |
| Prévia dos projetos | `index.html` | `project-shot` (troque por uma `<img>`) |

## Como o HTML está organizado

Cada bloco começa com um comentário `<!-- ===== NOME ===== -->`:
cabeçalho → hero → sobre → stack → portfólio → contato → rodapé → ícones.

### Nomes das classes principais

| Classe | O que é |
|---|---|
| `container` | largura máxima e margens laterais |
| `section-block` | cada seção da página |
| `eyebrow` / `section-sub` | rótulo pequeno e texto abaixo do título |
| `hero-actions` | botões do topo |
| `profile`, `ring-*` | foto redonda e anéis luminosos |
| `card`, `grid-two` | cartões e grade de duas colunas |
| `timeline`, `org`, `date` | linha do tempo da formação |
| `tech-grid`, `tech-tile`, `tech-category` | grade de tecnologias |
| `carousel`, `carousel-track`, `carousel-arrow`, `carousel-dots` | carrossel do portfólio |
| `project-shot`, `project-tags`, `project-links` | partes de um card de projeto |
| `contact-grid`, `form-row`, `channel` | seção de contato |
| `reveal` → `is-visible` | animação de entrada ao rolar |
| `active` | estado ativo (menu, aba, bolinha, aviso) |

## Idiomas

Cada texto traduzível tem o atributo `data-en` com a versão em inglês.
Ao mudar um texto em português, atualize também o `data-en` do mesmo elemento.
Placeholders dos campos usam `data-en-placeholder`.

## Ícones

Logos de [Simple Icons](https://simpleicons.org) e ícones de [Lucide](https://lucide.dev),
reunidos em um sprite SVG no fim do `index.html`. Para usar um ícone:

```html
<svg class="icon" viewBox="0 0 24 24"><use href="#i-mail" /></svg>
```

## Formatação

O código segue o Prettier (configuração em `.prettierrc`). Para reformatar depois de editar:

```bash
npx prettier --write .
```

## Certificados: atenção à privacidade

Use apenas a **primeira página** do PDF (a frente do certificado). A segunda página
("Detalhes do Certificado") traz o **CPF**, que não deve ficar em um site público.
Por isso os PDFs originais não estão no repositório; só as imagens da frente.
