// Hero marquee: skill commands scroll into the shield, results scroll out.

import { icon } from "../lib/dom.js";
import { ALL_SKILLS } from "../data/skills.js";

const RESULTS = [
  ["✓", "0 critical"],
  ["!", "missing ownership check · invoices.ts:88", "warn"],
  ["✓", "queries parameterized"],
  ["✓", "JWT alg pinned"],
  ["!", "OTP not rate limited · otp.ts:21", "warn"],
  ["✓", "no secrets in git history"],
  ["✓", "webhook signatures verified"],
  ["!", "container runs as root · Dockerfile:1", "warn"],
  ["✓", "CSRF protection on"],
  ["✓", "Supabase RLS enabled on every table"],
  ["!", "dependency has an install script · package-lock.json", "warn"],
  ["✓", "no public S3 buckets"],
  ["✓", "regression test added"],
  ["✓", "score 92/100"],
];

// Each track is rendered twice so the -50% scroll loops seamlessly.
const twice = s => s + s;

export function Ticker() {
  const chips = ALL_SKILLS.map(s => `<span class="chip"><b>/</b>${s.cmd}</span>`).join("");
  const results = RESULTS.map(([sym, text, cls = ""]) => `<span class="${cls}"><b>${sym}</b>${text}</span>`).join("");
  return `
    <div class="ticker" aria-hidden="true">
      <div class="ticker-in"><div class="ticker-track">${twice(chips)}</div></div>
      <div class="ticker-icon"><span class="mark">${icon("shield")}</span></div>
      <div class="ticker-out"><div class="ticker-track">${twice(results)}</div></div>
    </div>`;
}
