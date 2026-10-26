// Closing call to action.

import { BuyButton } from "./Pricing.js";
import { CopyCommand } from "./ui/CopyCommand.js";
import { INSTALL_CMD } from "../config.js";

function render() {
  return `
    <section class="final">
      <div class="wrap rv">
        <h2 class="h2">Ship the feature. <em>Not</em> the vulnerability.</h2>
        <p>One command to install. One slash command to audit. Everything stays on your machine.</p>
        <div class="hero-cta">
          ${BuyButton()}
          ${CopyCommand(INSTALL_CMD)}
        </div>
      </div>
    </section>`;
}

export default { render };
