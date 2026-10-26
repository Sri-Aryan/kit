// Footer: link columns and legal note.

import { Logo } from "./Nav.js";
import { PRODUCT, GITHUB_URL } from "../config.js";

const COLUMNS = [
  ["Product", [["#why", "Why"], ["#how", "How it works"], ["#skills", "Skills"], ["#pricing", "Pricing"], ["#install", "Install"]]],
  ["Workflows", [["#skills", "/sk-audit"], ["#skills", "/sk-review"], ["#skills", "/sk-fix"], ["#skills", "/sk-variant"], ["#skills", "/sk-help"]]],
  ["Resources", [[GITHUB_URL, "GitHub"], ["https://agentskills.io", "Agent Skills format"], ["https://cheatsheetseries.owasp.org", "OWASP Cheat Sheets"], ["#faq", "FAQ"]]],
];

const Column = ([title, links]) => `
  <div>
    <h5>${title}</h5>
    <ul>${links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
  </div>`;

function render() {
  return `
    <footer>
      <div class="wrap">
        <div class="foot">
          <div>
            ${Logo()}
            <p class="foot-blurb">Security skills for AI coding agents. Local only, evidence-backed, readable.</p>
          </div>
          ${COLUMNS.map(Column).join("")}
        </div>
        <div class="foot-note">
          <span>© ${new Date().getFullYear()} ${PRODUCT}. Proprietary. All rights reserved.</span>
          <span>Not a penetration test or certification. A clean report is not a guarantee of security.</span>
        </div>
      </div>
    </footer>`;
}

export default { render };
