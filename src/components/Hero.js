// Hero: ticker, headline, install command, proof stats and the terminal demo.

import { Ticker } from "./Ticker.js";
import { Terminal, mountTerminal } from "./Terminal.js";
import { CopyCommand } from "./ui/CopyCommand.js";
import { Button } from "./ui/Button.js";
import { INSTALL_CMD } from "../config.js";
import { AREAS, ALL_SKILLS } from "../data/skills.js";

const STATS = [
  [ALL_SKILLS.length, "security skills"],
  [AREAS, "areas covered"],
  [0, "telemetry"],
  [0, "deps to install"],
];

function render() {
  return `
    <header id="top" class="hero">
      ${Ticker()}
      <div class="wrap">
        <div class="eyebrow"><span class="dot"></span>For Claude Code, OpenAI Codex &amp; any Agent Skills agent</div>
        <h1 class="h1">A security team, <em>inside</em> your coding agent.</h1>
        <p class="lede">
          Install ${ALL_SKILLS.length} security skills, then ask your agent to audit the project.
          <code>/sk-audit</code> for everything, <code>/sk-review</code> before each merge,
          <code>/sk-fix</code> to fix what was found. Your code never leaves your machine.
        </p>

        <div class="hero-cta">
          ${CopyCommand(INSTALL_CMD)}
          ${Button({ href: "#skills", label: "Browse the skills", size: "lg" })}
        </div>

        <div class="proof">
          ${STATS.map(([n, label]) => `<div><strong>${n}</strong><span>${label}</span></div>`).join("")}
        </div>

        ${Terminal()}
      </div>
    </header>`;
}

export default { render, mount: mountTerminal };
