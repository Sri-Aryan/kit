// FAQ accordion (native <details>, no JS needed).

import { Section } from "./ui/Section.js";

const QUESTIONS = [
  ["Does my code get sent anywhere?",
    "No. Scans run as local Python and Node scripts. There's no telemetry, no account and nothing is uploaded. Your agent reads the code the same way it already does when you work with it. Two skills can run tools you already have that contact their own services: <code>/sk-deps</code> uses your project's audit tool (<code>npm audit</code>, <code>pip-audit</code>, <code>osv-scanner</code>…) to look up known vulnerabilities, and <code>/sk-dast</code> downloads the OWASP ZAP image once, then sends traffic only to the app you're testing."],
  ["Which agents does it work with?",
    "Claude Code, OpenAI Codex and any agent that reads the open Agent Skills format. <code>init</code> installs into all three folders at once (<code>~/.claude/skills</code>, <code>~/.codex/skills</code>, <code>~/.agents/skills</code>). Each skill is a plain folder with a <code>SKILL.md</code>, so other agents can use it too: point them at the folder or paste the file into their instructions."],
  ["What languages and frameworks are supported?",
    `Skills check security concepts ("is this query parameterized?", "is ownership checked?") rather than one framework's API, so they work across languages. Route discovery knows Express, NestJS, Fastify, FastAPI, Flask, Django/DRF, Spring Boot, Gin and net/http. Dependency checks cover npm, yarn, pnpm, bun, pip, Poetry, uv, Go, Ruby, PHP, Rust, Maven/Gradle, NuGet, Dart and Swift. Dedicated skills cover Next.js, SvelteKit, Nuxt and Remix, Supabase and Firebase, Clerk, Auth0 and NextAuth, Android and iOS, Electron and Tauri, browser extensions and games.`],
  ["Do I need Semgrep?",
    "No, it's optional. When it's installed, <code>/sk-api</code> uses its taint rules (which also help <code>/sk-inject</code>, <code>/sk-database</code> and <code>/sk-graphql</code>), and <code>/sk-variant</code> can turn a confirmed bug into a Semgrep rule. It runs locally with metrics off. Without it, your agent reviews that code by hand and tells you once. <code>kit doctor</code> shows whether it's installed."],
  ["How do I suppress a risk we've accepted?",
    "Add <code>securitykit-ignore: CHECK-ID</code> in a comment on or above the line, or add an entry to <code>.securitykit/ignore.json</code> with a reason and an optional expiry date. Entries without a reason are ignored. Commit <code>ignore.json</code> so the whole team shares the same decisions."],
  ["Will <code>/sk-fix</code> change code without asking?",
    `No. For each finding it shows the change it wants to make and waits for your yes, unless you give it a rule such as "approve all Low findings in this file". It makes the smallest safe fix, runs the regression test and re-checks. A finding that's still detected stays open. It never commits or pushes unless you ask, and never hides a finding to "fix" it. For leaked secrets it reminds you to rotate them, and marks the finding fixed only after you confirm.`],
  ["Is this a penetration test?",
    "No. SecurityKit helps you find and fix common weaknesses in your code before they ship. It isn't a penetration test or a certification, and a clean report isn't a guarantee of security. <code>/sk-asvs</code> and <code>/sk-compliance</code> map your results to OWASP ASVS 5.0, SOC 2, ISO 27001, PCI DSS, HIPAA and GDPR, which is useful evidence for an audit but not a replacement for one."],
  ["How do updates work?",
    "Run <code>npx github:getsecuritykit/kit update</code>. Files you've edited are kept and listed rather than overwritten (pass <code>--force</code> to replace them). <code>kit list</code> shows installed versions and your local edits. Update between sessions, not in the middle of one."],
  ["Do I have to remember 70 commands?",
    `No. Ask in plain words: "audit this project", "review my change", "check my JWT handling". Your agent runs the matching skill and tells you its command for next time. <code>/sk-help</code> looks at your project's stack and recommends the three commands to run first.`],
  ["Will it fill my agent's context or cost more tokens?",
    "Barely. In Claude Code only the five workflow skills put a description in every conversation, about 1 KB instead of 20 KB; the rest load only when you use them. (Codex doesn't support that setting yet, so it lists every skill.) Scanner output is identical between runs and each file is read once, so prompt caching keeps long audits cheap. Run <code>/sk-audit</code> and <code>/sk-fix</code> in the same session to reuse what's already been read."],
  ["Will reports end up in my git history?",
    "No. Reports list weaknesses that may not be fixed yet, so the first scan keeps them out of git automatically, without changing your <code>.gitignore</code>. The suppression file (<code>ignore.json</code>) can still be committed. If reports were committed before, the scan warns you. To share a report on purpose, use <code>git add -f</code>."],
  ["Can it test my running app?",
    "Yes, only when you ask. Pass <code>--base-url</code> to enable dynamic checks, or run <code>/sk-dast</code> for an OWASP ZAP scan. Passive scans run first, active scans need your explicit consent, and SecurityKit only ever targets localhost or a host you confirm you own."],
  ["How long does a full audit take?",
    "It depends on the size of the project and how many skills apply. <code>/sk-audit</code> shows you the plan and how many skills will run before it starts, then prints a line as each one starts and finishes. Use <code>--quick</code> for a faster pass, or <code>--only</code> / <code>--skip</code> to choose skills."],
  ["How do I uninstall?",
    "Run <code>npx github:getsecuritykit/kit uninstall</code> (add <code>--project</code> for a repo install, <code>--kit codex</code> to remove one agent's copy, <code>--dry-run</code> to preview). Files you edited are kept unless you pass <code>--force</code>. Your reports and suppressions in <code>.securitykit/</code> are never touched."],
];

const Question = ([q, a], i) => `
  <details${i === 0 ? " open" : ""}>
    <summary><span>${q}</span></summary>
    <p>${a}</p>
  </details>`;

function render() {
  return Section({
    id: "faq",
    kicker: "FAQ",
    title: "Questions, *answered*.",
    body: `<div class="faq rv">${QUESTIONS.map(Question).join("")}</div>`,
  });
}

export default { render };
