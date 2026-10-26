// Sticky top nav with theme toggle.

import { icon } from "../lib/dom.js";
import { Button } from "./ui/Button.js";
import { PRODUCT } from "../config.js";

const LINKS = [
  ["#why", "Why"],
  ["#how", "How it works"],
  ["#skills", "Skills"],
  ["#pricing", "Pricing"],
  ["#faq", "FAQ"],
];

export const Logo = () => `<a class="logo" href="#top"><span class="mark">${icon("shield")}</span>${PRODUCT}</a>`;

function render() {
  return `
    <nav id="nav" class="nav">
      <div class="nav-inner">
        ${Logo()}
        <div class="nav-links">
          ${LINKS.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">${icon("moon")}</button>
          ${Button({ href: "#pricing", label: `Get ${PRODUCT}` })}
        </div>
      </div>
    </nav>`;
}

function mount() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const sync = () => btn.querySelector("use").setAttribute("href", isDark() ? "#i-sun" : "#i-moon");
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("sk-theme", next); } catch {}
    sync();
  });
  sync();
}

export default { render, mount };
