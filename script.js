/* ---------- 1. Elementos da página ---------- */
// A classe "js" e o tema salvo são aplicados por um script no <head> (veja o index.html),
// assim a página não pisca ao carregar.
const root = document.documentElement;
const nav = document.getElementById("nav");
const menuButton = document.getElementById("menu");
const themeButton = document.getElementById("theme");
const copyButton = document.getElementById("copy");
const hint = document.getElementById("hint");

// O e-mail é lido do próprio link "Enviar e-mail", então existe um só lugar para editar
const email = document.querySelector('a[href^="mailto:"]').getAttribute("href").slice(7);

/* ---------- 3. Tema claro/escuro (lembra a escolha) ---------- */
function isDarkTheme() {
  const chosen = root.dataset.theme;
  if (chosen) return chosen === "dark";
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateThemeButton() {
  themeButton.setAttribute("aria-pressed", isDarkTheme());
}
updateThemeButton();

themeButton.addEventListener("click", () => {
  const next = isDarkTheme() ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  updateThemeButton();
});

/* ---------- 4. Menu no celular ---------- */
function setMenuOpen(open) {
  nav.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", open);
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuButton.addEventListener("click", () => {
  setMenuOpen(!nav.classList.contains("open"));
});

// Fecha o menu ao clicar em um link
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") setMenuOpen(false);
});

// Fecha o menu com a tecla Esc e devolve o foco ao botão
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

/* ---------- 5. Animação de entrada das seções ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".rv").forEach((el) => revealObserver.observe(el));

/* ---------- 6. Destaque do menu conforme a seção ---------- */
const navLinks = [...nav.querySelectorAll("a")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("on", active);
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
// "#inicio" é um <div>, por isso entra na lista junto com as seções
document.querySelectorAll("#inicio, section[id]").forEach((el) => sectionObserver.observe(el));

/* ---------- 7. Botão "Copiar e-mail" ---------- */
if (navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      hint.textContent = `E-mail copiado: ${email}`;
    } catch {
      hint.textContent = `Não consegui copiar. Meu e-mail é ${email}`;
    }
  });
}

/* ---------- 8. Ano no rodapé ---------- */
document.getElementById("year").textContent = new Date().getFullYear();