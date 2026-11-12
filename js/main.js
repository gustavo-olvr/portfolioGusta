/* ==========================================================================
   Portfólio — Gustavo Oliveira
   Índice deste arquivo:
     1. Configuração
     2. Utilitários
     3. Tema claro/escuro
     4. Idioma PT/EN
     5. Botão de currículo
     6. Formulário de contato
     7. Portfólio: abas e carrossel
     8. Animação de entrada e menu ativo
   ========================================================================== */

/* ===== 1. CONFIGURAÇÃO ===== */
// Depois de colocar o PDF em assets/docs/, preencha. Ex.: 'assets/docs/curriculo.pdf'
const RESUME_URL = "assets/docs/curriculo.pdf";
const EMAIL = "gustavo098122@gmail.com";

/* ===== 2. UTILITÁRIOS ===== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasObserver = "IntersectionObserver" in window;

let language = "pt";
// Devolve o texto no idioma atual: translate("português", "english")
const translate = (pt, en) => (language === "en" ? en : pt);

// Aviso rápido no rodapé da tela
const toastElement = $("#toast");
let toastTimer;
function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("active");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove("active"), 2800);
}

/* ===== 3. TEMA CLARO/ESCURO ===== */
// O CSS troca as cores quando <html data-theme="light">
$("#btn-theme").addEventListener("click", () => {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
});

/* ===== 4. IDIOMA PT/EN =====
   Cada elemento com data-en guarda o texto em inglês.
   O texto original (português) é salvo em data-pt na primeira troca. */
function applyLanguage() {
  $$("[data-en]").forEach((element) => {
    if (!("pt" in element.dataset)) element.dataset.pt = element.innerHTML;
    element.innerHTML = language === "en" ? element.dataset.en : element.dataset.pt;
  });

  $$("[data-en-placeholder]").forEach((input) => {
    if (!("ptPlaceholder" in input.dataset)) input.dataset.ptPlaceholder = input.placeholder;
    input.placeholder =
      language === "en" ? input.dataset.enPlaceholder : input.dataset.ptPlaceholder;
  });

  document.documentElement.lang = language === "en" ? "en" : "pt-BR";
}

$("#btn-lang").addEventListener("click", () => {
  language = language === "pt" ? "en" : "pt";
  applyLanguage();
});

/* ===== 5. BOTÃO DE CURRÍCULO ===== */
$("#btn-resume").addEventListener("click", () => {
  if (RESUME_URL) {
    window.open(RESUME_URL, "_blank");
  } else {
    showToast(
      translate("Aqui entra o link do seu currículo em PDF", "Add your résumé PDF link here"),
    );
  }
});

/* ===== 6. FORMULÁRIO DE CONTATO =====
   Não há servidor: ao enviar, abre o app de e-mail com a mensagem pronta. */
$("#btn-send").addEventListener("click", () => {
  const value = (id) => $("#" + id).value.trim();
  const name = value("field-name");
  const email = value("field-email");
  const subject = value("field-subject") || "Contato pelo portfólio";
  const message = value("field-message");

  const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const link = document.createElement("a");
  link.href = mailto;
  document.body.appendChild(link);
  link.click();
  link.remove();

  showToast(translate("Abrindo seu app de e-mail...", "Opening your email app..."));
});

/* ===== 7. PORTFÓLIO: ABAS E CARROSSEL ===== */
// Cria uma bolinha para cada cartão do carrossel
function buildDots(carousel) {
  const cardCount = $(".carousel-track", carousel).children.length;
  const dots = $(".carousel-dots", carousel);

  dots.innerHTML = "";
  for (let i = 0; i < cardCount; i++) dots.appendChild(document.createElement("i"));
  highlightDot(carousel);
}

// Destaca a bolinha do cartão mais próximo do início da área visível
function highlightDot(carousel) {
  const track = $(".carousel-track", carousel);
  let nearestIndex = 0;
  let shortestDistance = Infinity;

  [...track.children].forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestIndex = index;
    }
  });

  $$(".carousel-dots i", carousel).forEach((dot, index) => {
    dot.classList.toggle("active", index === nearestIndex);
  });
}

$$(".carousel").forEach((carousel) => {
  const track = $(".carousel-track", carousel);
  const SCROLL_STEP = 380;

  $(".carousel-arrow.prev", carousel).addEventListener("click", () => {
    track.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
  });
  $(".carousel-arrow.next", carousel).addEventListener("click", () => {
    track.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
  });
  track.addEventListener("scroll", () => highlightDot(carousel), { passive: true });

  buildDots(carousel);
});

// Abas Projetos / Certificados
const panes = {
  projects: $("#pane-projects"),
  certificates: $("#pane-certificates"),
};

$$(".tabs button").forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.tab;

    $$(".tabs button").forEach((other) => other.classList.toggle("active", other === tab));
    Object.entries(panes).forEach(([name, pane]) => {
      pane.hidden = name !== selected;
    });
    buildDots(panes[selected]);
  });
});

/* ===== 8. ANIMAÇÃO DE ENTRADA E MENU ATIVO ===== */
// Elementos .reveal aparecem suavemente ao entrar na tela
const revealItems = $$(".reveal");
if (hasObserver && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Destaca no menu a seção que está no meio da tela
if (hasObserver) {
  const menuLinks = $$("nav a");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        menuLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  $$("#inicio, section[id]").forEach((section) => sectionObserver.observe(section));
}
