// Standard page section: centered kicker + serif title + intro, then the body.
// Wrap a word in *asterisks* in the title to set it in accent italics.

const accent = title => title.replace(/\*(.+?)\*/g, "<em>$1</em>");

export function SectionHead({ kicker, title, text }) {
  return `
    <div class="sec-head rv">
      <div class="kicker">${kicker}</div>
      <h2 class="h2">${accent(title)}</h2>
      ${text ? `<p>${text}</p>` : ""}
    </div>`;
}

export function Section({ id, kicker, title, text, body }) {
  return `
    <section ${id ? `id="${id}"` : ""} class="sec">
      <div class="wrap">
        ${SectionHead({ kicker, title, text })}
        ${body}
      </div>
    </section>`;
}
