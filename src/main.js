// SecurityKit landing page. Each component returns its HTML from render() and,
// if it has behaviour, wires it up in mount() after the page is in the DOM.
// Reorder, add or remove sections by editing PAGE.

import { Icons } from "./components/ui/Icons.js";
import { mountCopy } from "./components/ui/CopyCommand.js";
import { mountReveal } from "./lib/dom.js";

import Nav from "./components/Nav.js";
import Hero from "./components/Hero.js";
import Why from "./components/Why.js";
import HowItWorks from "./components/HowItWorks.js";
import SkillsCatalog from "./components/SkillsCatalog.js";
import FindingExample from "./components/FindingExample.js";
import Install from "./components/Install.js";
import Pricing from "./components/Pricing.js";
import Faq from "./components/Faq.js";
import FinalCta from "./components/FinalCta.js";
import Footer from "./components/Footer.js";

const PAGE = [
  Nav,
  Hero,
  Why,
  HowItWorks,
  SkillsCatalog,
  FindingExample,
  Install,
  Pricing,
  Faq,
  FinalCta,
  Footer,
];

const app = document.getElementById("app");
app.innerHTML = Icons() + PAGE.map(c => c.render()).join("");

PAGE.forEach(c => c.mount && c.mount());
mountCopy();
mountReveal(app);

// The page renders after load, so jump to a #section in the URL ourselves.
try { if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: "instant" }); } catch {}
