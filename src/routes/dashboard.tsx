import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, Bookmark, FileText, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader, SiteFooter, MobileBottomNav } from "@/components/site-chrome";
import { auth } from "@/integrations/firebase/client";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth";
import {
  fetchSavedJobs,
  fetchUserApplications,
  getUserProfile,
  saveUserProfile,
  uploadResumeFile,
  SeekerProfile,
} from "@/lib/firebase-data";
import { sendEmailVerification } from "firebase/auth";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

type EmployerJob = Pick<
  Database["public"]["Tables"]["jobs"]["Row"],
  "id" | "title" | "status" | "created_at"
> & {
  companies: { name: string } | null;
};

function Dashboard() {
  const { user, loading, roles } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const isEmployer = roles.includes("employer") || roles.includes("admin");

  const profileQuery = useQuery({
    queryKey: ["firebase-profile", user?.uid],
    enabled: !!user?.uid,
    queryFn: () => getUserProfile(user!.uid),
  });

  const { data: profile } = profileQuery;

  const suggestions = React.useMemo(() => {
    if (!user) return [];
    const items = [];
    if (!profile?.headline)
      items.push({
        title: "Write a headline",
        description: "Summarize what makes you a strong candidate.",
      });
    if (!profile?.bio)
      items.push({
        title: "Add a career summary",
        description: "Help employers understand your experience.",
      });
    if (!profile?.location)
      items.push({ title: "Set your location", description: "Nearby roles are easier to match." });
    if (!profile?.skills?.length)
      items.push({
        title: "Share your top skills",
        description: "Add keywords employers look for.",
      });
    if (!profile?.resumeUrl)
      items.push({
        title: "Upload your resume",
        description: "Let employers review your experience quickly.",
      });
    if (items.length === 0) {
      items.push({
        title: isEmployer ? "Post a new job" : "Explore roles",
        description: isEmployer
          ? "Keep your employer brand visible."
          : "Apply to opportunities with your updated profile.",
      });
    }
    return items;
  }, [profile, isEmployer, user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground mt-1 truncate">{user.email}</p>
          </div>
          <Badge variant="secondary">
            {roles.includes("job_seeker")
              ? "Job seeker"
              : roles.includes("employer")
                ? "Employer"
                : "Member"}
          </Badge>
        </div>

        {suggestions.length > 0 ? (
          <Alert className="mt-6">
            <AlertTitle>Profile suggestion</AlertTitle>
            <AlertDescription>
              {isEmployer
                ? "Complete your employer profile to attract more candidates."
                : "Complete your seeker profile to improve job matches."}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-4 mt-6 md:grid-cols-2">
          {suggestions.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue={isEmployer ? "employer" : "seeker"} className="mt-6">
          <TabsList>
            <TabsTrigger value="seeker">Job seeker</TabsTrigger>
            {isEmployer ? <TabsTrigger value="employer">Employer</TabsTrigger> : null}
          </TabsList>
          <TabsContent value="seeker">
            <SeekerView
              user={user}
              profile={profile ?? null}
              refetchProfile={() =>
                queryClient.invalidateQueries({ queryKey: ["firebase-profile", user.uid] })
              }
            />
          </TabsContent>
          {isEmployer ? (
            <TabsContent value="employer">
              <EmployerView userId={user.uid} />
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}

type ProfileFormProps = {
  user: { uid: string; email: string | null };
  profile: SeekerProfile | null;
  onSave: () => void;
};

function ProfileForm({ user, profile, onSave }: ProfileFormProps) {
  const [fullName, setFullName] = React.useState(profile?.full_name ?? "");
  const [headline, setHeadline] = React.useState(profile?.headline ?? "");
  const [location, setLocation] = React.useState(profile?.location ?? "");
  const [bio, setBio] = React.useState(profile?.bio ?? "");
  const [portfolioUrl, setPortfolioUrl] = React.useState(profile?.portfolioUrl ?? "");
  const [skillInput, setSkillInput] = React.useState("");
  const [skills, setSkills] = React.useState<string[]>(profile?.skills ?? []);
  const [experience, setExperience] = React.useState((profile?.experience ?? []).join("\n"));
  const [education, setEducation] = React.useState((profile?.education ?? []).join("\n"));
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
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

  const profileCompletion = React.useMemo(() => {
    const completed = [
      headline,
      bio,
      location,
      skills.length > 0,
      portfolioUrl,
      profile?.resumeUrl,
    ].filter(Boolean).length;
    return Math.round((completed / 6) * 100);
  }, [headline, bio, location, portfolioUrl, profile?.resumeUrl, skills.length]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((current) => [...current, trimmed]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
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
        experience: experience
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        education: education
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        verified: profile?.verified ?? false,
      });
      toast.success("Profile updated successfully");
      onSave();
    } catch (error) {
      toast.error((error as Error).message || "Unable to save profile");
    } finally {
      setBusy(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await uploadResumeFile(user.uid, file);
      toast.success("Resume uploaded successfully");
      onSave();
    } catch (error) {
      toast.error((error as Error).message || "Unable to upload resume");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">Profile builder</h2>
            <p className="text-sm text-muted-foreground mt-1">
              A complete seeker profile helps you stand out to hiring teams.
            </p>
          </div>
          <Badge variant="secondary">{profileCompletion}% complete</Badge>
        </div>
        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label>Full name</Label>
              <Input value={fullName} onChange={(event) => setFullName(event.target.value)} />
            </div>
            <div>
              <Label>Headline</Label>
              <Input
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                placeholder="Example: Product Designer with 5 years in fintech"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City, region"
              />
            </div>
            <div>
              <Label>Portfolio URL</Label>
              <Input
                type="url"
                value={portfolioUrl}
                onChange={(event) => setPortfolioUrl(event.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Bio</Label>
              <Textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                rows={6}
                placeholder="Summarize your role, goals, and what you bring to a team."
              />
            </div>
            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  placeholder="Add a skill"
                />
                <Button type="button" variant="secondary" onClick={handleAddSkill}>
                  Add
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <div>
            <Label>Experience</Label>
            <Textarea
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              rows={5}
              placeholder="One role per line"
            />
          </div>
          <div>
            <Label>Education</Label>
            <Textarea
              value={education}
              onChange={(event) => setEducation(event.target.value)}
              rows={5}
              placeholder="One qualification per line"
            />
          </div>
        </div>

        <div className="grid gap-4 mt-6 md:grid-cols-2 items-end">
          <div>
            <Label>Resume</Label>
            <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            {profile?.resumeUrl ? (
              <p className="text-sm text-muted-foreground mt-2">
                Resume uploaded.{" "}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline"
                >
                  View file
                </a>
                .
              </p>
            ) : null}
          </div>
          <div className="text-right">
            <Button
              type="button"
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={saveProfile}
              disabled={busy}
            >
              {busy ? "Saving…" : "Save profile"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

type SeekerViewProps = {
  user: { uid: string; email: string | null };
  profile: SeekerProfile | null;
  refetchProfile: () => void;
};

function SeekerView({ user, profile, refetchProfile }: SeekerViewProps) {
  const { data: applications } = useQuery({
    queryKey: ["firebase-applications", user.uid],
    queryFn: () => fetchUserApplications(user.uid),
    enabled: !!user.uid,
  });

  const { data: savedJobs } = useQuery({
    queryKey: ["firebase-saved-jobs", user.uid],
    queryFn: () => fetchSavedJobs(user.uid),
    enabled: !!user.uid,
  });

  const completeStatus = profile?.verified || auth?.currentUser?.emailVerified;

  const handleSendVerification = async () => {
    if (!auth?.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser, { url: `${window.location.origin}/dashboard` });
      toast.success("Verification email sent. Check your inbox.");
    } catch (error) {
      toast.error((error as Error).message || "Unable to send verification email.");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr] mt-4">
      <div className="space-y-4">
        <ProfileForm user={user} profile={profile} onSave={refetchProfile} />

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Applications</h3>
              <p className="text-sm text-muted-foreground">
                Track your active and past applications.
              </p>
            </div>
            <Badge variant="secondary">{applications?.length ?? 0}</Badge>
          </div>
          <div className="space-y-3">
            {applications?.length ? (
              applications.map((application) => (
                <div key={application.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{application.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{application.companyName}</p>
                    </div>
                    <Badge variant="outline" className="uppercase text-[10px]">
                      {application.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                You have not applied to any roles yet. Visit the jobs page to discover new
                opportunities.
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-accent/10 p-3 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">Verification</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Keep your account trusted by completing email verification.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email verified</p>
                  <p className="text-sm text-muted-foreground">
                    {completeStatus
                      ? "Yes, your email is verified."
                      : "Your account email is not verified yet."}
                  </p>
                </div>
                {completeStatus ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
            </div>
            {!completeStatus ? (
              <Button
                onClick={handleSendVerification}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Send verification email
              </Button>
            ) : null}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Saved jobs</h3>
              <p className="text-sm text-muted-foreground">Keep roles you want to return to.</p>
            </div>
            <Badge variant="secondary">{savedJobs?.length ?? 0}</Badge>
          </div>
          <div className="space-y-3">
            {savedJobs?.length ? (
              savedJobs.map((saved) => (
                <div key={saved.id} className="rounded-xl border border-border p-4">
                  <p className="font-medium">{saved.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{saved.companyName}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Save jobs from listings and they'll appear here.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function EmployerView({ userId }: { userId: string }) {
  const { data: jobs } = useQuery({
    queryKey: ["my-jobs", userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("jobs")
        .select("id,title,status,created_at,companies(name)")
        .eq("posted_by", userId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-accent" /> Your job listings
        </h3>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/post-job">Post a job</Link>
        </Button>
      </div>
      <Card className="p-0 divide-y divide-border">
        {jobs?.length ? (
          jobs.map((j: EmployerJob) => {
            const co = j.companies;
            return (
              <div key={j.id} className="p-4 flex items-center justify-between">
                <div>
                  <Link
                    to="/jobs/$id"
                    params={{ id: j.id }}
                    className="font-medium hover:text-accent"
                  >
                    {j.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {co?.name} · {new Date(j.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="outline" className="uppercase text-[10px]">
                  {j.status}
                </Badge>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground">No jobs posted yet.</div>
        )}
      </Card>
    </div>
  );
}
