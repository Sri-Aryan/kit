// "Why SecurityKit": the six principles.

import { icon } from "../lib/dom.js";
import { Section } from "./ui/Section.js";

const PRINCIPLES = [
  ["lock", "Local only", "Your source code never leaves your machine. No telemetry, no accounts, nothing uploaded."],
  ["pin", "Evidence, not guesses", "Every finding cites <code>file:line</code>, a check ID, OWASP and CWE references, a fix and a regression test."],
  ["layers", "Concept-based", `Skills check concepts like "is this query parameterized?", so they work across languages and frameworks, guided by the OWASP Cheat Sheet Series.`],
  ["eye", "Readable", "Plain Python and Node scripts with no dependencies to install. Nothing is obfuscated; read every line."],
  ["chat", "Ask in plain words", `"Audit this project", "review my change", "check my JWT handling". Your agent picks the right skill and tells you its command for next time. <code>/sk-help</code> looks at your stack and says where to start.`],
  ["feather", "Light on your context", "In Claude Code only the five workflow skills load into every session, about 1 KB instead of 20 KB. The other 65 load only when you use them, so having SecurityKit installed costs almost nothing."],
];

const FeatureCard = ([ic, title, text]) => `
  <div class="card rv">
    <div class="ic">${icon(ic)}</div>
    <h3>${title}</h3>
    <p>${text}</p>
  </div>`;

function render() {
  return Section({
    id: "why",
    kicker: "Why SecurityKit",
    title: "Findings you can *check*, not vibes.",
    text: `An agent asked to "look for security issues" guesses. SecurityKit gives it a method: scripts find candidates, the agent proves each one in your code, and every finding comes with what you need to fix it.`,
    body: `<div class="grid-4">${PRINCIPLES.map(FeatureCard).join("")}</div>`,
  });
}

export default { render };
