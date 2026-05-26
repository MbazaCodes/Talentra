import { T as reactExports, K as jsxRuntimeExports } from "./server-Dnqa4y-f.js";
import { a6 as useAuth, ab as useNavigate, L as Link, a4 as toast, j as auth, a0 as signInWithEmailAndPassword, s as createUserWithEmailAndPassword, W as sendEmailVerification } from "./router-CHXEIgg2.js";
import { n as SiteHeader, m as SiteFooter, b as Button } from "./site-chrome-Bvu9S7aA.js";
import { I as Input } from "./input-iG5zEoI9.js";
import { L as Label } from "./label-BkE_bE0M.js";
import { C as Card } from "./card-Ej90xD4L.js";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent, e as ensureUserDocument } from "./firebase-data-BUO9wKcd.js";
import { R as RadioGroup, a as RadioGroupItem, s as stringType } from "./types-BvBJ3Z1V.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CV0emg7h.js";
const emailSchema = stringType().trim().email("Invalid email").max(255);
const passwordSchema = stringType().min(8, "At least 8 characters").max(72);
const nameSchema = stringType().trim().min(2, "Tell us your name").max(100);
function AuthPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && user) navigate({
      to: "/dashboard"
    });
  }, [user, loading, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold leading-tight", children: [
          "Welcome to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Talentra" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Join thousands of Tanzanians discovering work and hiring talent across every region." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "signin", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Sign in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Sign up" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function SignInForm() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const eP = emailSchema.safeParse(email);
    const pP = passwordSchema.safeParse(password);
    if (!eP.success) return toast.error(eP.error.issues[0].message);
    if (!pP.success) return toast.error(pP.error.issues[0].message);
    if (!auth) return toast.error("Firebase is not configured. Add Firebase values to .env.");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, eP.data, pP.data);
      toast.success("Welcome back");
    } catch (error) {
      toast.error(error.message || "Unable to sign in");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", autoComplete: "current-password", value: password, onChange: (e) => setPassword(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", disabled: busy, children: busy ? "Signing in…" : "Sign in" })
  ] });
}
function SignUpForm() {
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("job_seeker");
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const nP = nameSchema.safeParse(name);
    const eP = emailSchema.safeParse(email);
    const pP = passwordSchema.safeParse(password);
    if (!nP.success) return toast.error(nP.error.issues[0].message);
    if (!eP.success) return toast.error(eP.error.issues[0].message);
    if (!pP.success) return toast.error(pP.error.issues[0].message);
    if (!auth) return toast.error("Firebase is not configured. Add Firebase values to .env.");
    setBusy(true);
    try {
      const credentials = await createUserWithEmailAndPassword(auth, eP.data, pP.data);
      if (credentials.user) {
        await ensureUserDocument(credentials.user.uid, eP.data, role, nP.data);
        await sendEmailVerification(credentials.user, {
          url: `${window.location.origin}/dashboard`
        });
        toast.success("Account created. Check email to verify your account.");
      }
    } catch (error) {
      toast.error(error.message || "Unable to create account");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "I am a…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { value: role, onValueChange: (v) => setRole(v), className: "grid grid-cols-2 gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: `flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${role === "job_seeker" ? "border-accent bg-accent/5" : "border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "job_seeker" }),
          " Job seeker"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: `flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${role === "employer" ? "border-accent bg-accent/5" : "border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "employer" }),
          " Employer"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true, maxLength: 100 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", autoComplete: "new-password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "At least 8 characters." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", disabled: busy, children: busy ? "Creating…" : "Create account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
      "By signing up you agree to our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "underline", children: "terms" }),
      "."
    ] })
  ] });
}
export {
  AuthPage as component
};
