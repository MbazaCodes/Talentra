import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { a6 as useAuth, ab as useNavigate, ac as useQueryClient, L as Link, a4 as toast } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { n as SiteHeader, b as Button, m as SiteFooter } from "./site-chrome-Bvu9S7aA.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { t as timeAgo } from "./kazi-data-D6hJPER9.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function AdminPage() {
  const {
    user,
    loading,
    roles
  } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAdmin = roles.includes("admin");
  reactExports.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate({
          to: "/auth"
        });
      } else if (!isAdmin) {
        navigate({
          to: "/dashboard"
        });
      }
    }
  }, [user, loading, isAdmin, navigate]);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-dashboard"],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const [jobsCountRes, applicationsCountRes, employerCountRes, seekerCountRes, reportCountRes, jobsRes, companiesRes, reportsRes] = await Promise.all([supabase.from("jobs").select("*", {
        count: "exact",
        head: true
      }), supabase.from("applications").select("*", {
        count: "exact",
        head: true
      }), supabase.from("user_roles").select("*", {
        count: "exact",
        head: true
      }).eq("role", "employer"), supabase.from("user_roles").select("*", {
        count: "exact",
        head: true
      }).eq("role", "job_seeker"), supabase.from("job_reports").select("*", {
        count: "exact",
        head: true
      }), supabase.from("jobs").select("id,title,status,featured,created_at,created_by_role,company_id,companies(id,name,verified),posted_by").order("created_at", {
        ascending: false
      }).limit(12), supabase.from("companies").select("id,name,verified,suspended,owner_id,website").order("created_at", {
        ascending: false
      }).limit(12), supabase.from("job_reports").select("id,reason,status,details,created_at,job_id,jobs(id,title,companies(name))").order("created_at", {
        ascending: false
      }).limit(12)]);
      return {
        totalJobs: jobsCountRes.count ?? 0,
        totalApplications: applicationsCountRes.count ?? 0,
        employerCount: employerCountRes.count ?? 0,
        seekerCount: seekerCountRes.count ?? 0,
        reportCount: reportCountRes.count ?? 0,
        jobs: jobsRes.data ?? [],
        companies: companiesRes.data ?? [],
        reports: reportsRes.data ?? []
      };
    }
  });
  const handleJobAction = async (jobId, patch) => {
    const {
      error
    } = await supabase.from("jobs").update(patch).eq("id", jobId);
    if (error) return toast.error(error.message);
    toast.success("Job updated");
    queryClient.invalidateQueries({
      queryKey: ["admin-dashboard"]
    });
  };
  const handleCompanyAction = async (companyId, patch) => {
    const {
      error
    } = await supabase.from("companies").update(patch).eq("id", companyId);
    if (error) return toast.error(error.message);
    toast.success("Company updated");
    queryClient.invalidateQueries({
      queryKey: ["admin-dashboard"]
    });
  };
  const handleReportAction = async (reportId, patch) => {
    const {
      error
    } = await supabase.from("job_reports").update(patch).eq("id", reportId);
    if (error) return toast.error(error.message);
    toast.success("Report updated");
    queryClient.invalidateQueries({
      queryKey: ["admin-dashboard"]
    });
  };
  if (loading || isLoading || !user || !isAdmin) return null;
  const summary = data ?? {
    totalJobs: 0,
    employerCount: 0,
    seekerCount: 0,
    reportCount: 0,
    jobs: [],
    companies: [],
    reports: []
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-3xl border border-border bg-card p-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-accent", children: "Admin console" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl font-bold", children: "Talentra platform controls" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl", children: "Review reports, manage employers, and keep the marketplace safe and productive." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: "Post job" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "View dashboard" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Published jobs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold", children: summary.totalJobs })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Active employers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold", children: summary.employerCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Job seekers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold", children: summary.seekerCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Open reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-semibold", children: summary.reportCount })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Recent jobs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Review and moderate the latest published roles." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              summary.jobs.length,
              " jobs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: summary.jobs.length ? summary.jobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                job.companies?.name,
                " · ",
                job.created_by_role,
                " ·",
                " ",
                timeAgo(job.created_at)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: job.status === "published" ? "secondary" : "outline", className: "uppercase text-[10px]", children: job.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => handleJobAction(job.id, {
                featured: !job.featured
              }), children: job.featured ? "Unfeature" : "Feature" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => handleJobAction(job.id, {
                status: job.status === "closed" ? "published" : "closed"
              }), children: job.status === "closed" ? "Reopen" : "Close" })
            ] })
          ] }) }, job.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border p-6 text-sm text-muted-foreground", children: "No jobs found yet." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Employer profiles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Verify trusted employers and suspend suspicious accounts." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: summary.companies.length ? summary.companies.map((company) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: company.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: company.website ?? "No website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: company.verified ? "bg-green-100 text-green-800" : void 0, children: company.verified ? "Verified" : "Not verified" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: company.suspended ? "destructive" : "secondary", children: company.suspended ? "Suspended" : "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => handleCompanyAction(company.id, {
                verified: !company.verified
              }), children: company.verified ? "Unverify" : "Verify" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => handleCompanyAction(company.id, {
                suspended: !company.suspended
              }), children: company.suspended ? "Unsuspend" : "Suspend" })
            ] })
          ] }, company.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border p-6 text-sm text-muted-foreground", children: "No employer profiles available." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Recent reports" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Review flagged jobs and mark reports as handled." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
            summary.reports.length,
            " items"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: summary.reports.length ? summary.reports.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: report.jobs?.title || "Reported job" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              report.reason,
              " · ",
              report.jobs?.companies?.name ?? "Unknown employer"
            ] }),
            report.details ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mt-2 text-foreground/80", children: [
              '"',
              report.details,
              '"'
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: report.status === "open" ? "destructive" : "secondary", children: report.status }),
            report.status !== "reviewed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => handleReportAction(report.id, {
              status: "reviewed"
            }), children: "Mark reviewed" }) : null
          ] })
        ] }) }, report.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border p-6 text-sm text-muted-foreground", children: "No new reports at the moment." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AdminPage as component
};
