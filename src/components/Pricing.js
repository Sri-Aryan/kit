// Pricing card and Polar checkout.

import { icon } from "../lib/dom.js";
import { Section } from "./ui/Section.js";
import { Button } from "./ui/Button.js";
import { PRODUCT, PRICE, POLAR_CHECKOUT_URL } from "../config.js";
import { ALL_SKILLS, AREAS } from "../data/skills.js";

const FEATURES = [
  [`${ALL_SKILLS.length} security skills`, `across ${AREAS} areas, from APIs and auth to AI agents, mobile apps and cloud`],
  ["Workflows", "<code>/sk-audit</code>, <code>/sk-review</code>, <code>/sk-fix</code>, <code>/sk-variant</code> and <code>/sk-help</code>"],
  ["Evidence-backed reports", "with file:line, check ID, OWASP, CWE, fix and test"],
  ["Regression tests", "generated with <code>--tests</code>"],
  ["Fixes", "applied only with your approval, each one re-verified"],
  ["ASVS 5.0 coverage map", "and SOC 2 / ISO 27001 / PCI DSS / HIPAA / GDPR mapping"],
  ["Team install", "into the repo with <code>--project</code>"],
  ["Updates", "via <code>kit update</code>, keeping your local edits"],
  ["Local only.", "No accounts, no telemetry, your code is never uploaded"],
];

/** Any link with data-checkout opens Polar checkout. Reuse it for other buy buttons. */
export const BuyButton = ({ cls } = {}) =>
  Button({ href: "#pricing", label: `Get ${PRODUCT} · $${PRICE}`, variant: "primary", size: "lg", cls, attrs: "data-checkout" });

function render() {
  return Section({
    id: "pricing",
    kicker: "Pricing",
    title: "One price. *Every* skill.",
    text: "Less than an hour of a security consultant's time, for a review you can run before every merge.",
    body: `
      <div class="price-card rv">
        <div class="price-main">
          <div class="price-tag"><span class="plan">${PRODUCT}</span><span class="pill">One-time payment</span></div>
          <div class="price"><span class="cur">$</span>${PRICE}<span class="per">USD</span></div>
          <p class="price-sub">All ${ALL_SKILLS.length} skills for Claude Code, OpenAI Codex and any Agent Skills agent.</p>
          ${BuyButton({ cls: "price-btn" })}
          <div class="price-fine" id="checkoutNote">Secure checkout by Polar · Instant access after purchase</div>
        </div>
        <ul class="price-list">
          ${FEATURES.map(([b, rest]) => `<li>${icon("check")}<span><b>${b}</b> ${rest}</span></li>`).join("")}
        </ul>
      </div>`,
  });
}

function mount() {
  const note = document.getElementById("checkoutNote");
  const currentTheme = () => document.documentElement.dataset.theme
    || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  let opening = false;

  document.querySelectorAll("[data-checkout]").forEach(a => {
    // Without JS, or if the embed fails to load, the link still opens Polar's hosted checkout.
    if (POLAR_CHECKOUT_URL) a.href = POLAR_CHECKOUT_URL;

    a.addEventListener("click", async e => {
      e.preventDefault();
      if (!POLAR_CHECKOUT_URL) {
        alert("Checkout link not set yet: add it to POLAR_CHECKOUT_URL in src/config.js.");
        return;
      }
      const Embed = window.Polar && window.Polar.EmbedCheckout;
      if (!Embed) { location.href = POLAR_CHECKOUT_URL; return; }
      if (opening) return;
      opening = true;
      try {
        const co = await Embed.create(POLAR_CHECKOUT_URL, { theme: currentTheme() });
        co.addEventListener("success", ev => {
          if (!ev.detail || !ev.detail.redirect) {
            if (note) note.textContent = `Thanks for buying ${PRODUCT}! Check your email for access.`;
          }
        });
      } catch {
        location.href = POLAR_CHECKOUT_URL;
      } finally {
        opening = false;
      }
    });
  });
}

export default { render, mount };
