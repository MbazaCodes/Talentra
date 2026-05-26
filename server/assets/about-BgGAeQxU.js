import { K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { L as Link } from "./router-CHXEIgg2.js";
import { n as SiteHeader, b as Button, m as SiteFooter } from "./site-chrome-Bvu9S7aA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold", children: "About Talentra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Talentra is built for Tanzania's workforce — a professional network and job marketplace tailored to how people work, hire, and grow careers across our country." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6 text-foreground/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We support every region from Dar es Salaam to Zanzibar, and every industry from tourism and ICT to agriculture and the public sector." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Job seekers get free access — always. Employers reach verified candidates with smart, location-aware matching." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The platform is bilingual (English & Kiswahili), mobile-first, and built for the realities of African connectivity." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: "Browse jobs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact us" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  About as component
};
