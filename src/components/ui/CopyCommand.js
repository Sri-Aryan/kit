// Copy-to-clipboard button and the dark "$ command  [Copy]" pill.

import { icon } from "../../lib/dom.js";

export function CopyButton(text) {
  return `<button class="copy-btn" data-copy="${text}">${icon("copy")}<span>Copy</span></button>`;
}

export function CopyCommand(cmd) {
  return `
    <div class="copy">
      <span class="copy-text"><span class="p">$</span> ${cmd}</span>
      ${CopyButton(cmd)}
    </div>`;
}

/** One delegated listener handles every copy button on the page. */
export function mountCopy() {
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const label = b.querySelector("span");
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      label.textContent = "Copied";
    } catch {
      label.textContent = "Press Ctrl+C";
    }
    b.classList.add("done");
    setTimeout(() => { label.textContent = "Copy"; b.classList.remove("done"); }, 1600);
  });
}
