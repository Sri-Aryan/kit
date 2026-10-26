// Filterable, searchable catalog of every skill.

import { icon } from "../lib/dom.js";
import { Section } from "./ui/Section.js";
import { GROUPS, ALL_SKILLS, AREAS } from "../data/skills.js";

const TABS = [
  { id: "all", name: "All", count: ALL_SKILLS.length },
  ...GROUPS.map(g => ({ id: g.id, name: g.name, count: g.skills.length })),
];

const SkillCard = (s, i, showGroup) => `
  <div class="skill" style="animation-delay:${Math.min(i, 12) * 25}ms">
    <div class="cmd"><div><span>/</span>${s.cmd}</div>${showGroup ? `<span class="grp">${s.group.name}</span>` : ""}</div>
    <p>${s.desc}</p>
  </div>`;

function render() {
  return Section({
    id: "skills",
    kicker: "The catalog",
    title: `${ALL_SKILLS.length} skills. *One* report.`,
    text: "Start with the workflows. <code>/sk-audit</code> runs every relevant skill and merges the results into one deduplicated report and score.",
    body: `
      <div class="cat-tools">
        <div class="tabs" id="tabs" role="tablist">
          ${TABS.map(t => `<button class="tab" role="tab" data-id="${t.id}" aria-selected="${t.id === "all"}">${t.name}<span class="ct">${t.count}</span></button>`).join("")}
        </div>
        <label class="search">${icon("search")}<input id="q" type="search" placeholder="Search skills, e.g. jwt" aria-label="Search skills"></label>
      </div>
      <p class="group-desc" id="groupDesc"></p>
      <div class="skills" id="skillGrid"></div>`,
  });
}

function mount() {
  const tabs = document.getElementById("tabs");
  const grid = document.getElementById("skillGrid");
  const desc = document.getElementById("groupDesc");
  const q = document.getElementById("q");
  let active = "all";

  function update() {
    const term = q.value.trim();
    const needle = term.toLowerCase();
    let list = active === "all" ? ALL_SKILLS : ALL_SKILLS.filter(s => s.group.id === active);
    if (needle) list = list.filter(s => `${s.cmd} ${s.desc} ${s.group.name}`.toLowerCase().includes(needle));

    const group = GROUPS.find(g => g.id === active);
    desc.textContent = needle
      ? `${list.length} skill${list.length === 1 ? "" : "s"} matching "${term}"`
      : group ? group.desc : `Every skill, across ${AREAS} areas. Pick an area to narrow it down.`;

    grid.innerHTML = list.length
      ? list.map((s, i) => SkillCard(s, i, active === "all")).join("")
      : `<div class="empty"></div>`;
    if (!list.length) grid.firstChild.textContent = `No skills match "${term}".`;
  }

  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab");
    if (!b) return;
    active = b.dataset.id;
    tabs.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === b));
    update();
  });
  q.addEventListener("input", update);
  update();
}

export default { render, mount };
