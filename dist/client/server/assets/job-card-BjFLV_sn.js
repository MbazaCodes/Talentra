import { K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { L as Link } from "./router-CHXEIgg2.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { i as industryLabel, f as formatSalary, t as timeAgo } from "./kazi-data-D6hJPER9.js";
import { B as BadgeCheck, M as MapPin, C as Clock } from "./map-pin-CkjyBNpx.js";
import { B as Bookmark, a as Briefcase } from "./site-chrome-Bvu9S7aA.js";
function JobCard({ job }) {
  const co = job.companies;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/$id", params: { id: job.id }, className: "group block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 hover:shadow-md hover:border-accent/40 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: co?.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: co.logo_url,
        alt: co.name,
        className: "h-12 w-12 rounded-lg object-cover border border-border"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-lg bg-cream grid place-items-center font-display font-bold text-primary border border-border", children: co?.name?.[0]?.toUpperCase() ?? "K" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold leading-tight text-foreground group-hover:text-accent transition", children: job.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5 truncate", children: [
            co?.name ?? "Company",
            co?.verified ? /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "inline h-3.5 w-3.5 ml-1 text-accent" }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
            },
            className: "text-muted-foreground hover:text-accent transition shrink-0",
            "aria-label": "Save job",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "bg-cream text-foreground/80 border border-border font-normal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
              job.region ?? job.location
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "bg-cream text-foreground/80 border border-border font-normal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 mr-1" }),
              job.contract_type
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "bg-cream text-foreground/80 border border-border font-normal",
            children: industryLabel(job.industry)
          }
        ),
        job.featured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground", children: "Featured" }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatSalary(
          job.salary_min,
          job.salary_max,
          job.currency ?? "TZS",
          job.salary_negotiable ?? false
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          timeAgo(job.created_at)
        ] })
      ] })
    ] })
  ] }) }) });
}
function JobCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-lg bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-2/3 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-16 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-20 bg-muted rounded" })
      ] })
    ] })
  ] }) });
}
export {
  JobCard as J,
  JobCardSkeleton as a
};
