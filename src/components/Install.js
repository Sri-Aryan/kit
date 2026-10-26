// Install: user-wide, per-repo and partial install, agent folders, requirements and CLI commands.

import { Section } from "./ui/Section.js";
import { CopyButton } from "./ui/CopyCommand.js";
import { INSTALL_CMD } from "../config.js";

const FOLDERS = [
  ["~/.claude/skills/", "Claude Code"],
  ["~/.codex/skills/", "OpenAI Codex"],
  ["~/.agents/skills/", `Other agents that support the open <a href="https://agentskills.io">Agent Skills</a> format`],
];

const QUICKSTART = [
  ["/sk-help", "where to start for this project, and every command"],
  ["/sk-audit", "audit the whole project"],
  ["/sk-review", "review only your current changes"],
  ["/sk-fix", "fix findings, with your approval"],
  ["/sk-variant", "find every copy of a bug you've confirmed"],
];

const CLI = [
  ["skills", "Show every skill, grouped, with a one-line description", "--group ai, --json"],
  ["init", "Install every skill for every agent, for all projects", "--project, --skills, --kit"],
  ["update", "Update installed skills; files you edited are kept and listed"],
  ["uninstall", "Remove the installed skills; your edits and reports are kept", "--project, --kit, --force"],
  ["list", "Show installed skills, versions and local edits"],
  ["doctor", "Check Node, Python, Semgrep and skill locations"],
];

const REQUIREMENTS = [["Node.js", "18+"], ["Python", "3"], ["Semgrep", "optional"]];

/** Dark code block with an optional copy button. Content is preformatted. */
const CodeBlock = (content, { copy, flush } = {}) =>
  `<div class="code-block"${flush ? ` style="margin-top:0"` : ""}>${copy ? CopyButton(copy) : ""}${content}</div>`;

function render() {
  const projectCmd = `${INSTALL_CMD} --project`;
  const partialCmds = [`${INSTALL_CMD} --skills sk-api,sk-auth,sk-tokens`, `${INSTALL_CMD} --kit claude`];
  const pad = Math.max(...QUICKSTART.map(([c]) => c.length)) + 2;

  return Section({
    id: "install",
    kicker: "Install",
    title: "One command. *No* questions.",
    text: "Every skill is installed once for your user, so it works in every project and for every agent.",
    body: `
      <div class="install">
        <div class="card rv">
          <h3>For you, everywhere</h3>
          <p>Installs into your home folder. Each skill is a plain folder with a <code>SKILL.md</code>.</p>
          ${CodeBlock(`<span class="p">$</span> ${INSTALL_CMD}`, { copy: INSTALL_CMD })}
          <table class="table">
            <thead><tr><th>Folder</th><th>Read by</th></tr></thead>
            <tbody>${FOLDERS.map(([dir, who]) => `<tr><td>${dir}</td><td>${who}</td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="card rv">
          <h3>For your team</h3>
          <p>Install into the repository and commit the skills, so everyone runs the same checks.</p>
          ${CodeBlock(`<span class="p">$</span> ${projectCmd}\n<span class="cm"># ./.claude/skills, ./.codex/skills, ./.agents/skills</span>`, { copy: projectCmd })}
          <div class="lbl-sm" style="margin-top:22px">Just what you need</div>
          <p>Install only some skills, or only for one agent.</p>
          ${CodeBlock(partialCmds.map(c => `<span class="p">$</span> ${c}`).join("\n"))}
          <div class="lbl-sm" style="margin-top:22px">Then, in your agent</div>
          ${CodeBlock(QUICKSTART.map(([c, d]) => `<span class="p">${c}</span>${" ".repeat(pad - c.length)}<span class="cm">${d}</span>`).join("\n"), { flush: true })}
          <p style="margin-top:12px">Or just ask: "audit this project", "check my JWT handling".</p>
          <div class="req">${REQUIREMENTS.map(([name, v]) => `<span><b>${name}</b> ${v}</span>`).join("")}</div>
        </div>
      </div>

      <div class="card cli rv">
        <h3>Terminal commands</h3>
        <table class="table"><tbody>
          ${CLI.map(([cmd, desc, flags]) => `<tr><td><code>kit ${cmd}</code></td><td>${desc}${flags ? ` <small>${flags}</small>` : ""}</td></tr>`).join("")}
        </tbody></table>
        <p class="hint">Prefix each with <code>npx github:getsecuritykit/</code>. Add <code>--dry-run</code> to <code>init</code>, <code>update</code> or <code>uninstall</code> to see what would change first.</p>
      </div>`,
  });
}

export default { render };
