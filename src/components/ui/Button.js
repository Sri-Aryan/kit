// Pill button rendered as a link.
// variant: "primary" | "line"; size: "lg" or omitted; cls: extra classes; attrs: extra raw attributes.

export function Button({ href, label, variant = "line", size, cls, attrs = "" }) {
  const classes = ["btn", `btn-${variant}`, size && `btn-${size}`, cls].filter(Boolean).join(" ");
  return `<a class="${classes}" href="${href}" ${attrs}>${label}</a>`;
}
