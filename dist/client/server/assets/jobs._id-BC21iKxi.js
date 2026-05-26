import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { l as cn, e as Route, a6 as useAuth, ab as useNavigate, L as Link, a4 as toast } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { r as createLucideIcon, g as Root, p as Trigger, P as Portal, e as Content, d as Close, X, T as Title, O as Overlay, D as Description, n as SiteHeader, b as Button, a as Briefcase, B as Bookmark, m as SiteFooter, M as MobileBottomNav } from "./site-chrome-Bvu9S7aA.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { T as Textarea } from "./textarea-rlBQz2Te.js";
import { i as industryLabel, t as timeAgo, f as formatSalary } from "./kazi-data-D6hJPER9.js";
import { A as ArrowLeft } from "./arrow-left-ubG9ohLg.js";
import { B as BadgeCheck, M as MapPin, C as Clock } from "./map-pin-CkjyBNpx.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function JobDetail() {
  const {
    id
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = reactExports.useState("");
  const [reportOpen, setReportOpen] = reactExports.useState(false);
  const [reportReason, setReportReason] = reactExports.useState("scam");
  const [reportDetails, setReportDetails] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [reporting, setReporting] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const {
    data: existingReport
  } = useQuery({
    queryKey: ["job-report", id, user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("job_reports").select("id").eq("job_id", id).eq("reporter_id", user.uid).maybeSingle();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: job,
    isLoading
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("jobs").select("*,companies(id,name,logo_url,description,location,industry,website,verified)").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: hasApplied
  } = useQuery({
    queryKey: ["application", id, user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("applications").select("id").eq("job_id", id).eq("applicant_id", user.uid).maybeSingle();
      return !!data;
    }
  });
  const handleSave = async () => {
    if (!user) return navigate({
      to: "/auth"
    });
    const {
      error
    } = await supabase.from("saved_jobs").insert({
      user_id: user.uid,
      job_id: id
    });
    if (error && !error.message.includes("duplicate")) toast.error(error.message);
    else toast.success("Saved to your list");
  };
  const handleApply = async () => {
    if (!user) return navigate({
      to: "/auth"
    });
    setSubmitting(true);
    const {
      error
    } = await supabase.from("applications").insert({
      job_id: id,
      applicant_id: user.uid,
      cover_letter: coverLetter || null
    });
    setSubmitting(false);
    if (error) {
      if (error.message.includes("duplicate")) toast.info("You've already applied to this job");
      else toast.error(error.message);
      return;
    }
    toast.success("Application sent!");
    setOpen(false);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-1/2 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/4 bg-muted rounded mt-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-muted rounded mt-8" })
      ] })
    ] });
  }
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Job not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: "Browse jobs" }) })
      ] })
    ] });
  }
  const co = job.companies;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/jobs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to jobs"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 md:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          co?.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: co.logo_url, alt: co.name, className: "h-16 w-16 rounded-xl border border-border object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-xl bg-cream grid place-items-center font-display font-bold text-xl text-primary border border-border", children: co?.name?.[0]?.toUpperCase() ?? "K" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-semibold leading-tight", children: job.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/companies/$id", params: {
                id: co?.id ?? ""
              }, className: "hover:text-accent", children: co?.name }),
              co?.verified ? /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "inline h-4 w-4 ml-1 text-accent" }) : null
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-cream border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-cream border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 mr-1" }),
            job.contract_type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-cream border border-border", children: industryLabel(job.industry) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-cream border border-border", children: job.position_level }),
          job.deadline ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-cream border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 mr-1" }),
            "Deadline ",
            new Date(job.deadline).toLocaleDateString()
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-cream border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1" }),
            timeAgo(job.created_at)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between flex-wrap gap-3 border-t border-border pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Salary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: formatSalary(job.salary_min, job.salary_max, job.currency ?? "TZS", job.salary_negotiable ?? void 0) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleSave, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
              " Save"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setReportOpen(true), children: "Report job" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-accent hover:bg-accent/90 text-accent-foreground", disabled: hasApplied, children: hasApplied ? "Applied" : "Apply now" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
                  "Apply for ",
                  job.title
                ] }) }),
                user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Brief cover letter (optional)", rows: 6, value: coverLetter, onChange: (e) => setCoverLetter(e.target.value), maxLength: 2e3 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleApply, disabled: submitting, className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: submitting ? "Sending…" : "Send application" }) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to apply to this job." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Sign in" }) }) })
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: reportOpen, onOpenChange: setReportOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Report this job" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose the issue that best describes why this listing should be reviewed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "report-reason", className: "block text-sm font-medium text-foreground", children: "Reason" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "report-reason", value: reportReason, onChange: (event) => setReportReason(event.target.value), className: "mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "scam", children: "Scam / fraudulent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "fake_salary", children: "Fake salary or pay" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suspicious_company", children: "Suspicious company details" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-foreground", children: "Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: reportDetails, onChange: (event) => setReportDetails(event.target.value), rows: 5, placeholder: "Additional information (optional)", className: "mt-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-accent hover:bg-accent/90 text-accent-foreground", disabled: reporting || !!existingReport, onClick: async () => {
          if (!user) return navigate({
            to: "/auth"
          });
          if (existingReport) return toast.info("You have already reported this job.");
          setReporting(true);
          const {
            error
          } = await supabase.from("job_reports").insert({
            job_id: id,
            reporter_id: user.uid,
            reason: reportReason,
            details: reportDetails || null
          });
          setReporting(false);
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Report submitted. Admin review will follow.");
            setReportOpen(false);
          }
        }, children: reporting ? "Submitting…" : existingReport ? "Already reported" : "Submit report" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 md:p-8 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-3", children: "Job description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90", children: job.description })
      ] }),
      co?.description ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 md:p-8 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-3", children: [
          "About ",
          co.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80", children: co.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/companies/$id", params: {
          id: co.id
        }, children: "View company" }) })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, {})
  ] });
}
export {
  JobDetail as component
};
