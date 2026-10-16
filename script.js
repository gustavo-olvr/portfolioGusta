
const EMAIL = "gustavo098122@gmail.com";

/* ---------- 2. Elementos da página ---------- */
const root = document.documentElement;
const nav = document.getElementById("nav");
const menuButton = document.getElementById("menu");
const themeButton = document.getElementById("theme");
const copyButton = document.getElementById("copy");
const hint = document.getElementById("hint");

// Esconde os elementos animados só se o JavaScript estiver funcionando
root.classList.add("js");

/* ---------- 3. Fundo animado (rede de pontos) ---------- */
const background = (() => {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const MAX_PARTICLES = 70;
  const LINK_DISTANCE = 130; // distância máxima para ligar dois pontos
  const MOUSE_DISTANCE = 170; // distância máxima para ligar ao mouse

  let width = 0;
  let height = 0;
  let particles = [];
  let mouse = { x: -999, y: -999 };
  let color = "35,73,214"; // RGB da cor de destaque
  let frame = 0;
  let animationId = 0;

  // Lê a cor de destaque (--accent) do tema atual
  function readAccentColor() {
    const hex = getComputedStyle(root).getPropertyValue("--accent").trim().replace("#", "");
    if (hex.length !== 6) return;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    color = `${r},${g},${b}`;
  }

  // Ajusta o canvas à tela e cria a quantidade certa de pontos
  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth;
    height = innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const wanted = Math.min(MAX_PARTICLES, Math.round((width * height) / 20000));
    while (particles.length < wanted) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }
    particles.length = wanted;
  }

  function drawLine(from, to, alpha) {
    ctx.strokeStyle = `rgba(${color},${alpha})`;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function draw() {
    frame++;
    if (frame % 30 === 1) readAccentColor();
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      // Movimento (parado para quem prefere menos animação)
      if (!reducedMotion.matches) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Ponto
      ctx.fillStyle = `rgba(${color},0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
      ctx.fill();

      // Linhas até os pontos vizinhos
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const distance = Math.hypot(p.x - other.x, p.y - other.y);
        if (distance < LINK_DISTANCE) {
          drawLine(p, other, 0.22 * (1 - distance / LINK_DISTANCE));
        }
      }

      // Linha até o mouse
      const mouseDistance = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (mouseDistance < MOUSE_DISTANCE) {
        drawLine(p, mouse, 0.4 * (1 - mouseDistance / MOUSE_DISTANCE));
      }
    });

    // Continua animando, a não ser que a aba esteja oculta
    if (!reducedMotion.matches && !document.hidden) {
      animationId = requestAnimationFrame(draw);
    }
  }

  function start() {
    cancelAnimationFrame(animationId);
    draw();
  }

  resize();
  readAccentColor();
  start();

  addEventListener("resize", () => {
    resize();
    start();
  });
  addEventListener("pointermove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  document.addEventListener("pointerleave", () => {
    mouse = { x: -999, y: -999 };
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) start();
  });

  // Usado quando o tema muda, para atualizar a cor
  return {
    restart() {
      readAccentColor();
      start();
    },
  };
})();

/* ---------- 4. Tema claro/escuro ---------- */
function isDarkTheme() {
  const chosen = root.dataset.theme;
  if (chosen) return chosen === "dark";
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

themeButton.addEventListener("click", () => {
  root.dataset.theme = isDarkTheme() ? "light" : "dark";
  background.restart();
});

/* ---------- 5. Menu no celular ---------- */
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

/* ---------- 6. Animação de entrada das seções ---------- */
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

/* ---------- 7. Destaque do menu conforme a seção ---------- */
const navLinks = [...nav.querySelectorAll("a")];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("on", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));

/* ---------- 8. Botão "Copiar e-mail" ---------- */
if (EMAIL) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      hint.textContent = `E-mail copiado: ${EMAIL}`;
    } catch {
      hint.textContent = `Não consegui copiar. Meu e-mail é ${EMAIL}`;
    }
  });
}

/* ---------- 9. Ano no rodapé ---------- */
document.getElementById("year").textContent = new Date().getFullYear();