// "In practice": what you type, and an example finding with fix and regression test.

import { Section } from "./ui/Section.js";

const FINDING = {
  severity: "CRITICAL",
  title: "SQL query built from request input",
  details: [
    ["Location", "src/routes/orders.ts:42"],
    ["Check", "INJ-SQL-001 · SQL is never built from input by concatenation; bound parameters are used"],
    ["References", "OWASP A03:2021 · CWE-89"],
    ["Evidence", "req.query.status reaches db.query() via string concatenation"],
  ],
  fix: `<span class="del">- const rows = await db.query(\`SELECT * FROM orders WHERE status = '\${req.query.status}'\`);</span>
<span class="add">+ const rows = await db.query("SELECT * FROM orders WHERE status = $1", [req.query.status]);</span>`,
  test: `<span class="cm">// orders.security.test.ts</span>
it("treats status as data, not SQL", async () =&gt; {
  const res = await get("/orders?status=' OR '1'='1");
  expect(res.body).toHaveLength(0);
});`,
};

const FindingCard = f => `
  <div class="card finding rv">
    <div class="finding-head">
      <span class="badge crit">${f.severity}</span>
      <span class="badge">Example</span>
      <h4>${f.title}</h4>
    </div>
    <div class="finding-body">
      <dl class="kv">${f.details.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
      <div class="diff-label">Fix</div>
      <pre class="diff">${f.fix}</pre>
      <div class="diff-label">Regression test</div>
      <pre class="diff">${f.test}</pre>
    </div>
  </div>`;

function render() {
  return Section({
    kicker: "In practice",
    title: "What a finding *looks like*.",
    text: `No "consider reviewing your input handling". A location, a reference, a fix and a test.`,
    body: `
      <div class="split">
        <div class="you">
          <div class="card rv">
            <div class="lbl-sm">You type</div>
            <div class="prompt-box"><span class="p">&gt;</span> /sk-review</div>
            <p style="margin-top:14px">Before merging a branch that adds an order search endpoint.</p>
          </div>
          <div class="card rv">
            <div class="lbl-sm">You get</div>
            <p><code>security-report-review.md</code> plus <code>.securitykit/review-report.json</code>, and a verdict: approve, comment or request changes. Then <code>/sk-fix</code> walks you through each fix and re-verifies it.</p>
          </div>
          <div class="card rv">
            <div class="lbl-sm">Found one bug? Find its siblings.</div>
            <p>Run <code>/sk-variant</code> on a confirmed finding and it turns the bug into a rule, then searches the whole codebase for the same mistake.</p>
          </div>
        </div>
        ${FindingCard(FINDING)}
      </div>`,
  });
}

export default { render };
