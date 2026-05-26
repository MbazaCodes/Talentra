import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { a6 as useAuth, ab as useNavigate, L as Link } from "./router-CHXEIgg2.js";
import { n as SiteHeader, b as Button, m as SiteFooter } from "./site-chrome-Bvu9S7aA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function EmployersPage() {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent", children: "For employers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl font-bold", children: "Hire talent faster with Talentra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Talentra helps employers in Tanzania attract verified candidates across every region and industry. Post jobs, manage applications, and build your employer profile from one place." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: "Post a job" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Manage listings" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Reach verified candidates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Connect with applicants who are actively searching, experienced, and ready to grow their careers." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Post jobs in minutes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Create targeted listings for jobs in Dar es Salaam, Arusha, Mwanza, and beyond." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border bg-background p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Track applications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Review candidates, save favorites, and stay organized from a central dashboard." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold", children: "Why Talentra for hiring?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-4 text-sm text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Local focus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Designed for Tanzania's job market, employers, and candidate needs." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Verified employer visibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Build trust with candidates through employer profiles and verified listings." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block font-semibold", children: "Bilingual reach" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-muted-foreground", children: "Engage seekers in English and Kiswahili for broader candidate coverage." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  EmployersPage as component
};
