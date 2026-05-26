import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { d as Route, L as Link } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { r as createLucideIcon, b as Button, X, n as SiteHeader, S as Search, h as Sheet, l as SheetTrigger, i as SheetContent, j as SheetHeader, k as SheetTitle, m as SiteFooter, M as MobileBottomNav } from "./site-chrome-Bvu9S7aA.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { L as Label } from "./label-BkE_bE0M.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-D3-FAHFg.js";
import { a as JobCardSkeleton, J as JobCard } from "./job-card-BjFLV_sn.js";
import { R as REGIONS, I as INDUSTRIES, P as POSITION_LEVELS, C as CONTRACT_TYPES, Q as QUALIFICATIONS, S as SALARY_BANDS } from "./kazi-data-D6hJPER9.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CV0emg7h.js";
import "./badge-BgXVePyZ.js";
import "./card-Ej90xD4L.js";
import "./map-pin-CkjyBNpx.js";
const __iconNode = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function JobsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = reactExports.useState(search.q ?? "");
  reactExports.useEffect(() => {
    setQ(search.q ?? "");
  }, [search.q]);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["jobs", search],
    queryFn: async () => {
      let query = supabase.from("jobs").select("id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)").eq("status", "published").order("featured", {
        ascending: false
      }).order("created_at", {
        ascending: false
      }).limit(50);
      if (search.q) query = query.ilike("title", `%${search.q}%`);
      if (search.region) query = query.eq("region", search.region);
      if (search.industry) query = query.eq("industry", search.industry);
      if (search.level) query = query.eq("position_level", search.level);
      if (search.contract) query = query.eq("contract_type", search.contract);
      if (search.qualification) query = query.eq("qualification", search.qualification);
      if (search.salary) {
        const band = SALARY_BANDS.find((b) => b.value === search.salary);
        if (band?.min) query = query.gte("salary_min", band.min);
        if (band?.max) query = query.lte("salary_max", band.max);
      }
      const {
        data: data2,
        error
      } = await query;
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const update = (patch) => navigate({
    search: (prev) => ({
      ...prev,
      ...patch
    })
  });
  const clear = () => navigate({
    search: {}
  });
  const activeCount = Object.values(search).filter(Boolean).length;
  const filters = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Region" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.region ?? "_all", onValueChange: (v) => update({
        region: v === "_all" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any region" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "Any region" }),
          REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Industry" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.industry ?? "_all", onValueChange: (v) => update({
        industry: v === "_all" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any industry" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "Any industry" }),
          INDUSTRIES.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: i.value, children: i.en }, i.value))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Position level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.level ?? "_all", onValueChange: (v) => update({
        level: v === "_all" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any level" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "Any level" }),
          POSITION_LEVELS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Contract type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.contract ?? "_all", onValueChange: (v) => update({
        contract: v === "_all" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any contract" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "Any contract" }),
          CONTRACT_TYPES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: c.label }, c.value))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Qualification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.qualification ?? "_all", onValueChange: (v) => update({
        qualification: v === "_all" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any qualification" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "_all", children: "Any qualification" }),
          QUALIFICATIONS.map((q2) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: q2.value, children: q2.label }, q2.value))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Salary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: search.salary ?? "any", onValueChange: (v) => update({
        salary: v === "any" ? void 0 : v
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Any salary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SALARY_BANDS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b.value, children: b.label }, b.value)) })
      ] })
    ] }),
    activeCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: clear, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
      " Clear all filters"
    ] }) : null
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-cream/60 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold", children: "Find your next role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        update({
          q: q || void 0
        });
      }, className: "mt-4 flex gap-2 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Job title, skill, or company", className: "pl-9 bg-background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: "Search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-[85vw] overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Filters" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: filters })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 grid md:grid-cols-[260px_1fr] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20 rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold mb-4", children: "Filters" }),
        filters
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: isLoading ? "Loading…" : `${data?.length ?? 0} jobs found` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: isLoading ? Array.from({
          length: 6
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, {}, i)) : data && data.length > 0 ? data.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job: j }, j.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border p-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No jobs match your filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try clearing some filters, or be the first to post a job." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: clear, children: "Clear filters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: "Post a job" }) })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, {})
  ] });
}
export {
  JobsPage as component
};
