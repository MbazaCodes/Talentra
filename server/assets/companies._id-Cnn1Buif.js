import { K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { f as Route, L as Link } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { n as SiteHeader, b as Button, m as SiteFooter, M as MobileBottomNav } from "./site-chrome-Bvu9S7aA.js";
import { J as JobCard } from "./job-card-BjFLV_sn.js";
import { i as industryLabel } from "./kazi-data-D6hJPER9.js";
import { B as BadgeCheck, M as MapPin } from "./map-pin-CkjyBNpx.js";
import { G as Globe } from "./globe-QP9j5P55.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function CompanyPage() {
  const {
    id
  } = Route.useParams();
  const {
    data: co
  } = useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("companies").select("*").eq("id", id).maybeSingle();
      return data;
    }
  });
  const {
    data: jobs
  } = useQuery({
    queryKey: ["company-jobs", id],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("jobs").select("id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)").eq("company_id", id).eq("status", "published").order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  if (!co) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Company not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: "Browse jobs" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
      co.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: co.logo_url, alt: co.name, className: "h-20 w-20 rounded-2xl border-4 border-background object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl bg-cream text-primary grid place-items-center font-display font-bold text-3xl border-4 border-background", children: co.name[0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-semibold", children: [
          co.name,
          " ",
          co.verified ? /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "inline h-5 w-5 text-accent" }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-sm text-primary-foreground/80", children: [
          co.industry ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground", children: industryLabel(co.industry) }) : null,
          co.location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            co.location
          ] }) : null,
          co.website ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: co.website, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 hover:text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5" }),
            "Website"
          ] }) : null
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-5xl", children: [
      co.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 whitespace-pre-wrap", children: co.description }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mt-8 mb-4", children: [
        "Open roles (",
        jobs?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: jobs?.length ? jobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j }, j.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No open roles right now." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, {})
  ] });
}
export {
  CompanyPage as component
};
