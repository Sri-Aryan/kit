// The skills catalog, mirrored from skills/catalog.json in the kit repo.
// When skills change, copy from there (or run `npx github:getsecuritykit/kit skills --json`).

export const GROUPS = [
  {
    id: "workflows", name: "Workflows",
    desc: "Start here: whole-project audits, everyday change reviews, fixing what was found, and finding a bug's siblings.",
    skills: [
      ["sk-help", "Where to start for this project, then every SecurityKit command, grouped"],
      ["sk-audit", "Run every relevant skill and produce one combined, deduplicated report and score"],
      ["sk-review", "Fast security review of the current diff, branch or PR only"],
      ["sk-fix", "Work through findings from any report, applying approved fixes with re-verification"],
      ["sk-variant", "Variant analysis: turn one confirmed bug into a rule and find its siblings everywhere"],
    ],
  },
  {
    id: "apis", name: "APIs",
    desc: "HTTP, REST, GraphQL, webhook, real-time and gRPC surfaces, and the contracts that describe them.",
    skills: [
      ["sk-api", "API audit: auth and ownership on every endpoint, errors, validation, missing tests"],
      ["sk-rest", "REST baseline: HTTPS, methods, content types, size limits, headers, CORS, errors"],
      ["sk-graphql", "GraphQL: introspection, depth/cost limits, batching, field-level authorization"],
      ["sk-openapi", "OpenAPI/Swagger spec vs code: undocumented and stale endpoints, auth mismatches"],
      ["sk-webhooks", "Webhooks received (signatures, replay) and sent (SSRF, signing)"],
      ["sk-websocket", "WebSockets, SSE and real-time: handshake auth, Origin, channel authorization, limits"],
      ["sk-grpc", "gRPC: TLS, auth interceptors, per-method authorization, reflection, limits, deadlines"],
    ],
  },
  {
    id: "identity", name: "Identity & access",
    desc: "Who the user is, how they prove it, what their credentials are worth, and what they're allowed to do.",
    skills: [
      ["sk-auth", "Login, sessions, MFA, enumeration, brute force, account recovery, SSO linking"],
      ["sk-password", "Password hashing parameters, policy, change and reset flows, credential stuffing"],
      ["sk-tokens", "JWT verification, token randomness and storage, refresh rotation, API keys"],
      ["sk-oauth2", "OAuth 2.0 / OIDC: PKCE, state, redirect URIs, ID tokens, audiences, scopes"],
      ["sk-saml", "SAML SSO: signature checks and wrapping, audience, replay, certificates, RelayState"],
      ["sk-authprovider", "Clerk, Auth0, NextAuth, Better Auth, Supabase/Firebase Auth: trust, roles, webhooks"],
      ["sk-passkeys", "Passkeys/WebAuthn, magic links and one-time codes: challenges, origins, tokens"],
      ["sk-authz", "Access-control design: default deny, roles, tenant isolation, IDOR, escalation"],
    ],
  },
  {
    id: "injection", name: "Injection & input",
    desc: "Every place user data reaches an interpreter, a browser, a URL fetcher or a parser.",
    skills: [
      ["sk-validation", "Input validation: schemas, mass assignment, type confusion, ranges, allow-lists"],
      ["sk-inject", "All injection: SQL, NoSQL, command, code, SSTI, LDAP, XPath, XXE, header, log"],
      ["sk-xss", "Cross-site scripting: DOM sinks, escaping bypasses, sanitizers, CSP"],
      ["sk-ssrf", "Server-side request forgery: URL fetches, private IPs, DNS rebinding, cloud metadata"],
      ["sk-redirect", "Open redirects: next/returnUrl parameters, bypassable validation, login flows"],
      ["sk-deserialize", "Unsafe deserialization (pickle, YAML, Java/.NET/PHP) and prototype pollution"],
      ["sk-upload", "File uploads: type checks, names, size, storage, serving, presigned URLs, zip slip"],
    ],
  },
  {
    id: "web", name: "Web & browser",
    desc: "What the browser sees: headers, cookies, CSRF, caching, framework config and the defaults you never set.",
    skills: [
      ["sk-browser", "Security headers, clickjacking, cookie flags, tokens in storage, bundle secrets, SRI"],
      ["sk-csrf", "CSRF: disabled protection, state-changing GETs, SameSite, CORS with credentials"],
      ["sk-cache", "Caching: personal data cached publicly, cache poisoning and deception, shared keys"],
      ["sk-config", "Misconfiguration: debug modes, stack traces, open actuators, fallback secrets"],
      ["sk-nextjs", "Next.js, SvelteKit, Nuxt, Remix: Server Actions, middleware, RSC leaks, public env"],
      ["sk-defaults", "Insecure defaults and fail-open: missing config, catch-allow, default-allow, nulls"],
    ],
  },
  {
    id: "data", name: "Data, privacy & crypto",
    desc: "Databases, personal data, cryptography and logs: where the data lives and who can read it.",
    skills: [
      ["sk-database", "Raw queries, row scoping, DB exposure, TLS, privileges and hardening"],
      ["sk-privacy", "Personal data: minimization, exposure, third parties, consent, deletion, retention"],
      ["sk-crypto", "Cryptography: algorithms, modes, IVs, keys and KDFs, randomness, TLS verification"],
      ["sk-logging", "Security logging: events, audit trails, secrets in logs, alerting, retention"],
      ["sk-baas", "Supabase/Firebase and other BaaS: RLS and rules, service keys, storage, functions"],
    ],
  },
  {
    id: "logic", name: "Business logic & abuse",
    desc: "Money, limits, workflows and fraud: the bugs scanners alone don't find.",
    skills: [
      ["sk-business", "Business logic abuse: client-set prices, coupon reuse, skipped steps, limits"],
      ["sk-race", "Race conditions: double spend, check-then-act, missing locks, idempotency"],
      ["sk-payments", "Payments: server-side amounts, webhook verification, refunds, card data scope"],
      ["sk-ratelimit", "Rate limits and quotas: login, OTP, expensive endpoints, IP spoofing, bypasses"],
      ["sk-dos", "Resource exhaustion: body/page limits, ReDoS, zip bombs, timeouts, unbounded work"],
      ["sk-email", "Email and SMS: header injection, poisoned links, spam relays, SMS pumping"],
      ["sk-queue", "Queues and jobs: broker auth, unsafe serializers, worker authz, dashboards, DLQs"],
      ["sk-abuse", "Abuse and fraud: bot sign-ups, CAPTCHA, trial and credit farming, free-tier costs"],
    ],
  },
  {
    id: "ai", name: "AI & agents",
    desc: "LLM features, prompt injection, tool-using agents, MCP servers, retrieval and AI-written code.",
    skills: [
      ["sk-ai", "LLM features vs OWASP LLM Top 10: unsafe output, leaks, PII, cost abuse, keys"],
      ["sk-prompt-injection", "Prompt injection: untrusted channels, system prompts, tool approvals, outputs"],
      ["sk-agents", "Agents and MCP: tool permissions, inputs, sandboxes, human approval, server trust"],
      ["sk-rag", "RAG pipelines: poisoning, per-chunk access control, tenant isolation, vector stores"],
      ["sk-ai-code", "AI-written code: placeholder auth, disabled checks, mass assignment, phantom packages"],
    ],
  },
  {
    id: "apps", name: "Apps & platforms",
    desc: "Code that ships to devices: mobile apps, desktop apps, browser extensions and games.",
    skills: [
      ["sk-mobile", "Android/iOS (MASVS): storage, cleartext, TLS, exported components, WebViews"],
      ["sk-electron", "Electron/Tauri: node integration, isolation, preload and IPC, openExternal, updates"],
      ["sk-extension", "Browser extensions: permissions, remote code, message senders, content scripts"],
      ["sk-game", "Games: server authority, leaderboards, economy, IAP and ad rewards, RPCs, client keys"],
    ],
  },
  {
    id: "infra", name: "Supply chain & infra",
    desc: "What ships with the code: credentials, dependencies, containers, cloud, pipelines and domains.",
    skills: [
      ["sk-secrets", "Hardcoded and leaked secrets in code, config, git history, CI and images"],
      ["sk-deps", "Dependencies: vulnerabilities, lockfiles, typosquats, confusion, install scripts"],
      ["sk-docker", "Dockerfiles, Compose and Kubernetes: root, privileges, mounts, images, secrets"],
      ["sk-cloud", "Cloud IaC: public buckets, wildcard IAM, open ports, encryption, IMDSv2, state"],
      ["sk-paas", "Hosting platforms (Vercel, Netlify, Cloudflare, Render, Fly): secrets, previews, crons"],
      ["sk-cicd", "CI/CD pipelines: triggers, script injection, token permissions, pinning, runners"],
      ["sk-repo", "Repository hygiene: policy, CODEOWNERS, branch protection, tracked secrets, scans"],
      ["sk-domain", "Domains and DNS: subdomain takeover, SPF/DKIM/DMARC, CAA, security.txt"],
    ],
  },
  {
    id: "design", name: "Design, testing & assurance",
    desc: "Threat models before you build, tests that keep controls from regressing, and evidence for audits.",
    skills: [
      ["sk-design", "Threat model: assets, trust boundaries, data flows, STRIDE per component"],
      ["sk-tests", "Security test gaps (authn, authz, validation) and generation of the missing tests"],
      ["sk-fuzz", "Property-based tests and fuzzing for parsers and input handlers"],
      ["sk-dast", "Dynamic scan of a running app you own (OWASP ZAP), with confirmed findings"],
      ["sk-asvs", "OWASP ASVS 5.0 coverage map at level 1-3, from all SecurityKit reports"],
      ["sk-compliance", "Map findings to SOC 2, ISO 27001, PCI DSS, HIPAA and GDPR controls"],
      ["sk-incident", "Incident readiness: plan, on-call, alerts, revocation, rotation, backups"],
    ],
  },
];

export const ALL_SKILLS = GROUPS.flatMap(g => g.skills.map(([cmd, desc]) => ({ cmd, desc, group: g })));

// Security areas covered, not counting the Workflows group.
export const AREAS = GROUPS.filter(g => g.id !== "workflows").length;
