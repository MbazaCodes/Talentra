import * as React from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { auth } from "@/integrations/firebase/client";
import { useAuth } from "@/lib/auth";
import { ensureUserDocument } from "@/lib/firebase-data";

export const Route = createFileRoute("/auth")({ component: AuthPage });

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(8, "At least 8 characters").max(72);
const nameSchema = z.string().trim().min(2, "Tell us your name").max(100);

type SignUpRole = "job_seeker" | "employer";

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center max-w-5xl">
        <div className="hidden md:block">
          <h1 className="font-display text-4xl font-bold leading-tight">
            Welcome to <span className="text-accent">Talentra</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Join thousands of Tanzanians discovering work and hiring talent across every region.
          </p>
        </div>
        <Card className="p-6 md:p-8">
          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      <SiteFooter />
    </div>
  );
}

function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
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
      toast.error((error as Error).message || "Unable to sign in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 mt-4">
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={busy}
      >
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<SignUpRole>("job_seeker");
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
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
          url: `${window.location.origin}/dashboard`,
        });
        toast.success("Account created. Check email to verify your account.");
      }
    } catch (error) {
      toast.error((error as Error).message || "Unable to create account");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 mt-4">
      <div>
        <Label>I am a…</Label>
        <RadioGroup
          value={role}
          onValueChange={(v) => setRole(v as SignUpRole)}
          className="grid grid-cols-2 gap-2 mt-2"
        >
          <Label
            className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${role === "job_seeker" ? "border-accent bg-accent/5" : "border-border"}`}
          >
            <RadioGroupItem value="job_seeker" /> Job seeker
          </Label>
          <Label
            className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${role === "employer" ? "border-accent bg-accent/5" : "border-border"}`}
          >
            <RadioGroupItem value="employer" /> Employer
          </Label>
        </RadioGroup>
      </div>
      <div>
        <Label>Full name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <p className="text-xs text-muted-foreground mt-1">At least 8 characters.</p>
      </div>
      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={busy}
      >
        {busy ? "Creating…" : "Create account"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        By signing up you agree to our{" "}
        <Link to="/about" className="underline">
          terms
        </Link>
        .
      </p>
    </form>
  );
}
