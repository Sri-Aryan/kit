// Ring gauge that counts up to the report score, with the severity breakdown beside it.

import { onVisible } from "../lib/dom.js";

const WEIGHTS = { Critical: 25, High: 10, Medium: 4, Low: 1 };
const COLORS = { Critical: "var(--crit)", High: "var(--high)", Medium: "var(--med)", Low: "var(--low)" };
const CIRC = 2 * Math.PI * 52;

export const score = counts =>
  Math.max(0, 100 - Object.entries(counts).reduce((s, [sev, n]) => s + WEIGHTS[sev] * n, 0));

export function ScoreGauge(counts) {
  return `
    <div class="card gauge-card rv" data-score="${score(counts)}">
      <div class="gauge">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--panel2)" stroke-width="10"/>
          <circle class="arc" cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC}"/>
        </svg>
        <div class="val">0</div>
      </div>
      <ul class="sev-list">
        ${Object.entries(counts).map(([sev, n]) =>
          `<li><span class="sev"><i style="background:${COLORS[sev]}"></i>${sev}</span><b>${n}</b></li>`).join("")}
      </ul>
    </div>`;
}

export function mountScoreGauge() {
  document.querySelectorAll(".gauge-card").forEach(card => {
    const target = Number(card.dataset.score);
    const arc = card.querySelector(".arc");
    const val = card.querySelector(".val");
    onVisible(card.querySelector(".gauge"), () => {
      arc.style.strokeDashoffset = CIRC * (1 - target / 100);
      const t0 = performance.now();
      (function step(t) {
        const p = Math.min(1, (t - t0) / 1400);
        val.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, .4);
  });
}
