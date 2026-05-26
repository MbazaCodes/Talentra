import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { ae as useT, a9 as useLang, ab as useNavigate, L as Link } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { r as createLucideIcon, n as SiteHeader, S as Search, b as Button, a as Briefcase, m as SiteFooter, M as MobileBottomNav } from "./site-chrome-Bvu9S7aA.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-D3-FAHFg.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { a as JobCardSkeleton, J as JobCard } from "./job-card-BjFLV_sn.js";
import { R as REGIONS, I as INDUSTRIES } from "./kazi-data-D6hJPER9.js";
import { S as Sparkles, A as ArrowRight } from "./sparkles-BJXlPMQM.js";
import { M as MapPin, B as BadgeCheck } from "./map-pin-CkjyBNpx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CV0emg7h.js";
import "./card-Ej90xD4L.js";
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const heroImg = "/assets/hero-kazi-D177CsWw.jpg";
function LandingPage() {
  const t = useT();
  const {
    lang
  } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = reactExports.useState("");
  const [region, setRegion] = reactExports.useState("");
  const {
    data: featured,
    isLoading
  } = useQuery({
    queryKey: ["featured-jobs"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("jobs").select("id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)").eq("status", "published").order("featured", {
        ascending: false
      }).order("created_at", {
        ascending: false
      }).limit(6);
      if (error) throw error;
      return data ?? [];
    }
  });
  const handleSearch = (e) => {
    e.preventDefault();
    navigate({
      to: "/jobs",
      search: {
        q: q || void 0,
        region: region || void 0
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-cream border border-border text-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1 text-accent" }),
          " ",
          t("tagline")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold leading-[1.05]", children: [
          t("hero_title_1"),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative whitespace-nowrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: t("hero_title_2") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-2 bg-peach/50 -z-10 rounded" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-xl", children: t("hero_sub") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "bg-card border border-border rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("search_title"), className: "border-0 shadow-none focus-visible:ring-0 px-0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:w-48 flex items-center gap-2 px-3 sm:border-l border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: region, onValueChange: setRegion, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-0 shadow-none focus:ring-0 px-0 h-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: t("search_location") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: t("search_btn") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Popular:" }),
          ["Dar es Salaam", "ICT", "NGO", "Banking", "Remote"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", search: {
            q: tag
          }, className: "text-foreground/80 hover:text-accent underline-offset-4 hover:underline", children: tag }, tag))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-linear-to-tr from-accent/20 via-peach/20 to-primary/10 rounded-4xl blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Diverse Tanzanian professionals at work", width: 1024, height: 1024, className: "relative rounded-4xl shadow-xl object-cover aspect-square w-full border-4 border-background" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg border border-border p-4 flex items-center gap-3 max-w-55", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold", children: "12,500+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Active jobs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex absolute -top-4 -right-4 bg-card rounded-2xl shadow-lg border border-border p-4 items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold", children: "800+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Verified employers" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold", children: "Browse by industry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/jobs", className: "text-sm text-accent hover:underline inline-flex items-center gap-1", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: INDUSTRIES.slice(0, 8).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/jobs", search: {
        industry: i.value
      }, className: "group rounded-xl border border-border bg-card p-4 hover:border-accent/40 hover:shadow-sm transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-foreground group-hover:text-accent transition", children: lang === "sw" ? i.sw : i.en }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: lang === "sw" ? i.en : i.sw })
      ] }, i.value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-semibold", children: "Latest opportunities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Fresh listings from Tanzania's top employers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/jobs", className: "text-sm text-accent hover:underline inline-flex items-center gap-1", children: [
          "All jobs ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: isLoading ? Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, {}, i)) : featured && featured.length > 0 ? featured.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j }, j.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3 w-3 mr-1" }),
          " For employers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl md:text-4xl font-semibold leading-tight", children: "Hire the right talent across Tanzania, faster." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-primary-foreground/80", children: "Post your first job free. Reach verified candidates in every region." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex md:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/post-job", children: [
        "Post a job ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, {})
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 rounded-xl border border-dashed border-border p-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No jobs posted yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Be the first to post — your listing will appear here." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: "Post a job" }) })
  ] });
}
export {
  LandingPage as component
};
