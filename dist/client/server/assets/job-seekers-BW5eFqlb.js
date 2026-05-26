import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { a6 as useAuth, ab as useNavigate, L as Link } from "./router-CHXEIgg2.js";
import { n as SiteHeader, b as Button, m as SiteFooter } from "./site-chrome-Bvu9S7aA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function JobSeekersPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && !user) {
      navigate({
        to: "/auth"
      });
    }
  }, [user, loading, navigate]);
  if (loading || !user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-card p-10 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent", children: "For job seekers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl font-bold", children: "Find your next role with Talentra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Browse Tanzania's latest job opportunities, get matched with top employers, and apply with confidence." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: "Browse jobs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Create account" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Search fast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Filter listings by role, region, and industry so you see the right jobs quickly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Trusted employers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Apply to verified companies and stay in control of your job search." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Career growth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Find jobs in tech, finance, healthcare, hospitality and more." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold", children: "Getting started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-4 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Search jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Use keywords, regions, and industries to find relevant roles." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Save opportunities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Bookmark listings you want to revisit and apply when ready." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Apply directly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Reach employers through the platform and track your applications." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  JobSeekersPage as component
};
