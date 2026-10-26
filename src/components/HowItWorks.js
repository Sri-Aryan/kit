// "How a skill works": five steps, the score formula, a sample gauge and notes on reports and progress.

import { Section } from "./ui/Section.js";
import { ScoreGauge, mountScoreGauge } from "./ScoreGauge.js";

const STEPS = [
  ["Inventory", "What the project has in this area: endpoints, queries, uploads, model calls."],
  ["Scan", "A local script finds candidate issues into <code>.securitykit/&lt;area&gt;-scan.json</code>."],
  ["Confirm", "The agent reads the code behind each candidate and keeps only real issues, with evidence."],
  ["Report", "A fixed template gives <code>security-report-&lt;area&gt;.md</code> and a JSON twin."],
  ["Optional", "<code>--tests</code> writes regression tests. <code>--fix</code> applies only the fixes you approve."],
];

const SAMPLE = { Critical: 0, High: 1, Medium: 2, Low: 4 };

const NOTES = [
  ["Reports stay out of git", "Reports list weaknesses that may not be fixed yet, so SecurityKit keeps them out of your commits automatically, without touching your <code>.gitignore</code>. To share a report on purpose, <code>git add -f</code> it."],
  ["You always see where an audit is", "<code>/sk-audit</code> prints one line as each skill starts and one as it finishes, with its findings and score. A skipped or failed skill gets its line too, and the audit carries on."],
];

const Step = ([title, text], i) => `
  <div class="step"><div class="n">${String(i + 1).padStart(2, "0")}</div><h4>${title}</h4><p>${text}</p></div>`;

function render() {
  return Section({
    id: "how",
    kicker: "How a skill works",
    title: "Scan, *confirm*, report.",
    text: "Every skill follows the same five steps, so every report reads the same way.",
    body: `
      <div class="steps rv">${STEPS.map(Step).join("")}</div>
      <div class="score">
        <div class="formula rv">
          <div class="lbl">Score</div>
          <div class="eq">100 − 25×<span class="c">Critical</span> − 10×<span class="h">High</span><br>&nbsp;&nbsp;&nbsp;&nbsp;− 4×<span class="m">Medium</span> − 1×<span class="l">Low</span></div>
          <div class="note">Dynamic checks (<code>--base-url</code>) only ever target localhost or a host you confirm you own.</div>
        </div>
        ${ScoreGauge(SAMPLE)}
      </div>
      <div class="score">
        ${NOTES.map(([title, text]) => `<div class="card rv"><h3>${title}</h3><p>${text}</p></div>`).join("")}
      </div>`,
  });
}

export default { render, mount: mountScoreGauge };
