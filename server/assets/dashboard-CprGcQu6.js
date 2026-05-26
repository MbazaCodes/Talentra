import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { l as cn, a6 as useAuth, ab as useNavigate, ac as useQueryClient, j as auth, L as Link, W as sendEmailVerification, a4 as toast } from "./router-CHXEIgg2.js";
import { u as useQuery, s as supabase } from "./client-D4K_z1dx.js";
import { r as createLucideIcon, u as cva, n as SiteHeader, m as SiteFooter, M as MobileBottomNav, b as Button, a as Briefcase } from "./site-chrome-Bvu9S7aA.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent, u as uploadResumeFile, s as saveUserProfile, g as getUserProfile, d as fetchUserApplications, f as fetchSavedJobs } from "./firebase-data-BUO9wKcd.js";
import { B as Badge } from "./badge-BgXVePyZ.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { L as Label } from "./label-BkE_bE0M.js";
import { T as Textarea } from "./textarea-rlBQz2Te.js";
import { S as ShieldCheck } from "./shield-check-BwmLv38s.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
function Dashboard() {
  const {
    user,
    loading,
    roles
  } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [user, loading, navigate]);
  const isEmployer = roles.includes("employer") || roles.includes("admin");
  const profileQuery = useQuery({
    queryKey: ["firebase-profile", user?.uid],
    enabled: !!user?.uid,
    queryFn: () => getUserProfile(user.uid)
  });
  const {
    data: profile
  } = profileQuery;
  const suggestions = reactExports.useMemo(() => {
    if (!user) return [];
    const items = [];
    if (!profile?.headline) items.push({
      title: "Write a headline",
      description: "Summarize what makes you a strong candidate."
    });
    if (!profile?.bio) items.push({
      title: "Add a career summary",
      description: "Help employers understand your experience."
    });
    if (!profile?.location) items.push({
      title: "Set your location",
      description: "Nearby roles are easier to match."
    });
    if (!profile?.skills?.length) items.push({
      title: "Share your top skills",
      description: "Add keywords employers look for."
    });
    if (!profile?.resumeUrl) items.push({
      title: "Upload your resume",
      description: "Let employers review your experience quickly."
    });
    if (items.length === 0) {
      items.push({
        title: isEmployer ? "Post a new job" : "Explore roles",
        description: isEmployer ? "Keep your employer brand visible." : "Apply to opportunities with your updated profile."
      });
    }
    return items;
  }, [profile, isEmployer, user]);
  if (loading || !user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 truncate", children: user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: roles.includes("job_seeker") ? "Job seeker" : roles.includes("employer") ? "Employer" : "Member" })
      ] }),
      suggestions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "Profile suggestion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: isEmployer ? "Complete your employer profile to attract more candidates." : "Complete your seeker profile to improve job matches." })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 mt-6 md:grid-cols-2", children: suggestions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: item.description })
      ] }, item.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: isEmployer ? "employer" : "seeker", className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "seeker", children: "Job seeker" }),
          isEmployer ? /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "employer", children: "Employer" }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "seeker", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SeekerView, { user, profile: profile ?? null, refetchProfile: () => queryClient.invalidateQueries({
          queryKey: ["firebase-profile", user.uid]
        }) }) }),
        isEmployer ? /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "employer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmployerView, { userId: user.uid }) }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileBottomNav, {})
  ] });
}
function ProfileForm({
  user,
  profile,
  onSave
}) {
  const [fullName, setFullName] = reactExports.useState(profile?.full_name ?? "");
  const [headline, setHeadline] = reactExports.useState(profile?.headline ?? "");
  const [location, setLocation] = reactExports.useState(profile?.location ?? "");
  const [bio, setBio] = reactExports.useState(profile?.bio ?? "");
  const [portfolioUrl, setPortfolioUrl] = reactExports.useState(profile?.portfolioUrl ?? "");
  const [skillInput, setSkillInput] = reactExports.useState("");
  const [skills, setSkills] = reactExports.useState(profile?.skills ?? []);
  const [experience, setExperience] = reactExports.useState((profile?.experience ?? []).join("\n"));
  const [education, setEducation] = reactExports.useState((profile?.education ?? []).join("\n"));
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!profile) return;
    setFullName(profile.full_name);
    setHeadline(profile.headline ?? "");
    setLocation(profile.location ?? "");
    setBio(profile.bio ?? "");
    setPortfolioUrl(profile.portfolioUrl ?? "");
    setSkills(profile.skills ?? []);
    setExperience((profile.experience ?? []).join("\n"));
    setEducation((profile.education ?? []).join("\n"));
  }, [profile]);
  const profileCompletion = reactExports.useMemo(() => {
    const completed = [headline, bio, location, skills.length > 0, portfolioUrl, profile?.resumeUrl].filter(Boolean).length;
    return Math.round(completed / 6 * 100);
  }, [headline, bio, location, portfolioUrl, profile?.resumeUrl, skills.length]);
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((current) => [...current, trimmed]);
    setSkillInput("");
  };
  const handleRemoveSkill = (skill) => {
    setSkills((current) => current.filter((item) => item !== skill));
  };
  const saveProfile = async () => {
    setBusy(true);
    try {
      await saveUserProfile(user.uid, {
        full_name: fullName,
        email: user.email ?? "",
        headline,
        bio,
        location,
        portfolioUrl,
        skills,
        experience: experience.split("\n").map((item) => item.trim()).filter(Boolean),
        education: education.split("\n").map((item) => item.trim()).filter(Boolean),
        verified: profile?.verified ?? false
      });
      toast.success("Profile updated successfully");
      onSave();
    } catch (error) {
      toast.error(error.message || "Unable to save profile");
    } finally {
      setBusy(false);
    }
  };
  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await uploadResumeFile(user.uid, file);
      toast.success("Resume uploaded successfully");
      onSave();
    } catch (error) {
      toast.error(error.message || "Unable to upload resume");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Profile builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "A complete seeker profile helps you stand out to hiring teams." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
        profileCompletion,
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 mt-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (event) => setFullName(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Headline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: headline, onChange: (event) => setHeadline(event.target.value), placeholder: "Example: Product Designer with 5 years in fintech" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: location, onChange: (event) => setLocation(event.target.value), placeholder: "City, region" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Portfolio URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "url", value: portfolioUrl, onChange: (event) => setPortfolioUrl(event.target.value), placeholder: "https://" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: bio, onChange: (event) => setBio(event.target.value), rows: 6, placeholder: "Summarize your role, goals, and what you bring to a team." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: skillInput, onChange: (event) => setSkillInput(event.target.value), placeholder: "Add a skill" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "secondary", onClick: handleAddSkill, children: "Add" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "cursor-pointer", variant: "outline", onClick: () => handleRemoveSkill(skill), children: skill }, skill)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 mt-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Experience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: experience, onChange: (event) => setExperience(event.target.value), rows: 5, placeholder: "One role per line" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Education" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: education, onChange: (event) => setEducation(event.target.value), rows: 5, placeholder: "One qualification per line" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 mt-6 md:grid-cols-2 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Resume" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: ".pdf,.doc,.docx", onChange: handleResumeUpload }),
        profile?.resumeUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
          "Resume uploaded.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: profile.resumeUrl, target: "_blank", rel: "noreferrer", className: "text-accent underline", children: "View file" }),
          "."
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground", onClick: saveProfile, disabled: busy, children: busy ? "Saving…" : "Save profile" }) })
    ] })
  ] }) });
}
function SeekerView({
  user,
  profile,
  refetchProfile
}) {
  const {
    data: applications
  } = useQuery({
    queryKey: ["firebase-applications", user.uid],
    queryFn: () => fetchUserApplications(user.uid),
    enabled: !!user.uid
  });
  const {
    data: savedJobs
  } = useQuery({
    queryKey: ["firebase-saved-jobs", user.uid],
    queryFn: () => fetchSavedJobs(user.uid),
    enabled: !!user.uid
  });
  const completeStatus = profile?.verified || auth?.currentUser?.emailVerified;
  const handleSendVerification = async () => {
    if (!auth?.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/dashboard`
      });
      toast.success("Verification email sent. Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Unable to send verification email.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1.6fr_0.9fr] mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileForm, { user, profile, onSave: refetchProfile }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Applications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track your active and past applications." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: applications?.length ?? 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: applications?.length ? applications.map((application) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: application.jobTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: application.companyName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "uppercase text-[10px]", children: application.status })
        ] }) }, application.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You have not applied to any roles yet. Visit the jobs page to discover new opportunities." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-accent/10 p-3 text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Verification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Keep your account trusted by completing email verification." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Email verified" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: completeStatus ? "Yes, your email is verified." : "Your account email is not verified yet." })
            ] }),
            completeStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Pending" })
          ] }) }),
          !completeStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSendVerification, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: "Send verification email" }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Saved jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Keep roles you want to return to." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: savedJobs?.length ?? 0 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: savedJobs?.length ? savedJobs.map((saved) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: saved.jobTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: saved.companyName })
        ] }, saved.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Save jobs from listings and they'll appear here." }) })
      ] })
    ] })
  ] });
}
function EmployerView({
  userId
}) {
  const {
    data: jobs
  } = useQuery({
    queryKey: ["my-jobs", userId],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("jobs").select("id,title,status,created_at,companies(name)").eq("posted_by", userId).order("created_at", {
        ascending: false
      });
      return data ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-accent" }),
        " Your job listings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: "Post a job" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-0 divide-y divide-border", children: jobs?.length ? jobs.map((j) => {
      const co = j.companies;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/$id", params: {
            id: j.id
          }, className: "font-medium hover:text-accent", children: j.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            co?.name,
            " · ",
            new Date(j.created_at).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "uppercase text-[10px]", children: j.status })
      ] }, j.id);
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No jobs posted yet." }) })
  ] });
}
export {
  Dashboard as component
};
