import * as React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Briefcase, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/lib/auth';
import {
  fetchSavedJobs,
  fetchUserApplications,
  getUserProfile,
  saveUserProfile,
  uploadResumeFile,
  SeekerProfile,
} from '@/lib/supabase-data';
import { EmployeeProfile } from '@/components/employee-profile';
import { EmployerBadge } from '@/components/employer-badge';
import { JobAlertSettings } from '@/components/job-alert-settings';
import { NotificationsCenter } from '@/components/notifications-center';
import { OpenToWorkToggle } from '@/components/open-to-work-toggle';

export const Route = createFileRoute('/dashboard')({ component: Dashboard });

type EmployerJob = Pick<
  Database['public']['Tables']['jobs']['Row'],
  'id' | 'title' | 'status' | 'created_at'
> & { companies: { name: string } | null };

function Dashboard() {
  const { user, loading, roles } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!loading && !user) navigate({ to: '/auth' });
  }, [user, loading, navigate]);

  const isEmployer = roles.includes('employer') || roles.includes('admin');
  const isEmployee = roles.includes('employee') || roles.includes('job_seeker');
  const profileQuery = useQuery({
    queryKey: ['supabase-profile', user?.id],
    enabled: !!user?.id,
    queryFn: () => getUserProfile(user!.id),
  });
  const { data: profile } = profileQuery;

  const suggestions = React.useMemo(() => {
    if (!user) return [];
    const items = [];
    if (!profile?.headline)
      items.push({
        title: 'Write a headline',
        description: 'Summarize what makes you a strong candidate.',
      });
    if (!profile?.bio)
      items.push({
        title: 'Add a career summary',
        description: 'Help employers understand your experience.',
      });
    if (!profile?.location)
      items.push({
        title: 'Set your location',
        description: 'Nearby roles are easier to match.',
      });
    if (!profile?.skills?.length)
      items.push({
        title: 'Share your top skills',
        description: 'Add keywords employers look for.',
      });
    if (!profile?.resumeUrl)
      items.push({
        title: 'Upload your resume',
        description: 'Let employers review your experience quickly.',
      });
    if (items.length === 0)
      items.push({
        title: isEmployer ? 'Post a new job' : 'Explore roles',
        description: isEmployer
          ? 'Keep your employer brand visible.'
          : 'Apply to opportunities with your updated profile.',
      });
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
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">
              {roles.includes('job_seeker')
                ? 'Job seeker'
                : roles.includes('employer')
                  ? 'Employer'
                  : roles.includes('employee')
                    ? 'Employee'
                    : 'Member'}
            </Badge>
            <EmployerBadge userId={user.id} size="sm" />
          </div>
        </div>
        {suggestions.length > 0 && (
          <Alert className="mt-6">
            <AlertTitle>Profile suggestion</AlertTitle>
            <AlertDescription>
              {isEmployer
                ? 'Complete your employer profile to attract more candidates.'
                : 'Complete your seeker profile to improve job matches.'}
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 mt-6 md:grid-cols-2">
          {suggestions.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
        <Tabs defaultValue={isEmployer ? 'employer' : 'seeker'} className="mt-6">
          <TabsList>
            <TabsTrigger value="seeker">Job seeker</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
            {isEmployer && <TabsTrigger value="employer">Employer</TabsTrigger>}
          </TabsList>
          <TabsContent value="seeker">
            <SeekerView
              user={user}
              profile={profile ?? null}
              refetchProfile={() =>
                queryClient.invalidateQueries({
                  queryKey: ['supabase-profile', user.id],
                })
              }
            />
          </TabsContent>
          <TabsContent value="employee">
            <EmployeeProfile />
          </TabsContent>
          {isEmployer && (
            <TabsContent value="employer">
              <EmployerView userId={user.id} />
            </TabsContent>
          )}
        </Tabs>
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}

function ProfileForm({
  user,
  profile,
  onSave,
}: {
  user: {
    id: string;
    email?: string | null;
    user_metadata?: {
      email_confirmed?: boolean;
    };
  };
  profile: SeekerProfile | null;
  onSave: () => void;
}) {
  const [fullName, setFullName] = React.useState(profile?.full_name ?? '');
  const [headline, setHeadline] = React.useState(profile?.headline ?? '');
  const [location, setLocation] = React.useState(profile?.location ?? '');
  const [bio, setBio] = React.useState(profile?.bio ?? '');
  const [portfolioUrl, setPortfolioUrl] = React.useState(profile?.portfolioUrl ?? '');
  const [skillInput, setSkillInput] = React.useState('');
  const [skills, setSkills] = React.useState<string[]>(profile?.skills ?? []);
  const [experience, setExperience] = React.useState((profile?.experience ?? []).join('\n'));
  const [education, setEducation] = React.useState((profile?.education ?? []).join('\n'));
  const [busy, setBusy] = React.useState(false);

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
    setSkills([...skills, trimmed]);
    setSkillInput('');
  };
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const saveProfile = async () => {
    setBusy(true);
    try {
      await saveUserProfile(user.id, {
        full_name: fullName,
        email: user.email ?? '',
        headline,
        bio,
        location,
        portfolioUrl,
        skills,
        experience: experience
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        education: education
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        verified: profile?.verified ?? false,
      });
      toast.success('Profile updated successfully');
      onSave();
    } catch (error) {
      toast.error((error as Error).message || 'Unable to save profile');
    } finally {
      setBusy(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      await uploadResumeFile(user.id, file);
      toast.success('Resume uploaded successfully');
      onSave();
    } catch (error) {
      toast.error((error as Error).message || 'Unable to upload resume');
    } finally {
      setBusy(false);
      event.target.value = '';
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
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <Label>Headline</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Example: Product Designer with 5 years in fintech"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, region"
              />
            </div>
            <div>
              <Label>Portfolio URL</Label>
              <Input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Bio</Label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                placeholder="Summarize your role, goals, and what you bring to a team."
              />
            </div>
            <div>
              <Label>Skills</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
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
              onChange={(e) => setExperience(e.target.value)}
              rows={5}
              placeholder="One role per line"
            />
          </div>
          <div>
            <Label>Education</Label>
            <Textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              rows={5}
              placeholder="One qualification per line"
            />
          </div>
        </div>
        <div className="grid gap-4 mt-6 md:grid-cols-2 items-end">
          <div>
            <Label>Resume</Label>
            <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            {profile?.resumeUrl && (
              <p className="text-sm text-muted-foreground mt-2">
                Resume uploaded.{' '}
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
            )}
          </div>
          <div className="text-right">
            <Button
              className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={saveProfile}
              disabled={busy}
            >
              {busy ? 'Saving' : 'Save profile'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SeekerView({
  user,
  profile,
  refetchProfile,
}: {
  user: {
    id: string;
    email?: string | null;
    user_metadata?: {
      email_confirmed?: boolean;
    };
  };
  profile: SeekerProfile | null;
  refetchProfile: () => void;
}) {
  const { data: applications } = useQuery({
    queryKey: ['supabase-applications', user.id],
    queryFn: () => fetchUserApplications(user.id),
    enabled: !!user.id,
  });
  const { data: savedJobs } = useQuery({
    queryKey: ['supabase-saved-jobs', user.id],
    queryFn: () => fetchSavedJobs(user.id),
    enabled: !!user.id,
  });
  const completeStatus = profile?.verified || user?.user_metadata?.email_confirmed;

  const handleSendVerification = async () => {
    if (!user?.email) return;
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });
      if (error) throw error;
      toast.success('Verification email sent. Check your inbox.');
    } catch (error) {
      toast.error((error as Error).message || 'Unable to send verification email.');
    }
  };

  const { data: sentRefs } = useQuery({
    queryKey: ['sent-reference-requests', user.id],
    queryFn: async () => {
      // New table — cast to any until types are regenerated post-migration
      const { data } = await (supabase as any)
        .from('reference_requests')
        .select('id,status,recommendation,rating,requested_at,completed_at,companies(name)')
        .eq('seeker_id', user.id)
        .order('requested_at', { ascending: false });
      return (data ?? []) as Array<{
        id: string;
        status: string;
        recommendation: string | null;
        rating: number | null;
        requested_at: string;
        companies: { name: string } | null;
      }>;
    },
    enabled: !!user.id,
  });

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
              applications.map((app) => (
                <div key={app.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{app.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{app.companyName}</p>
                    </div>
                    <Badge variant="outline" className="uppercase text-[10px]">
                      {app.status}
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
                      ? 'Yes, your email is verified.'
                      : 'Your account email is not verified yet.'}
                  </p>
                </div>
                {completeStatus ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
            </div>
            {!completeStatus && (
              <Button
                onClick={handleSendVerification}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Send verification email
              </Button>
            )}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-semibold">My references</h3>
            <Badge variant="secondary">{sentRefs?.length ?? 0}</Badge>
          </div>
          <div className="space-y-2">
            {sentRefs?.length ? (
              sentRefs.map(
                (r: {
                  id: string;
                  status: string;
                  recommendation: string | null;
                  rating: number | null;
                  requested_at: string;
                  companies: { name: string } | null;
                }) => (
                  <div key={r.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">
                        {r.companies?.name ?? 'Company'}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                          r.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'accepted'
                              ? 'bg-blue-100 text-blue-800'
                              : r.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                    {r.status === 'completed' && r.recommendation && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">
                        "{r.recommendation}"
                      </p>
                    )}
                  </div>
                ),
              )
            ) : (
              <p className="text-sm text-muted-foreground">No reference requests sent yet.</p>
            )}
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

        <NotificationsCenter />
        <OpenToWorkToggle />
        <JobAlertSettings />
      </div>
    </div>
  );
}

function EmployerView({ userId }: { userId: string }) {
  const queryClient = useQueryClient();

  const { data: pendingEmployees } = useQuery({
    queryKey: ['pending-employees', userId],
    queryFn: async () => {
      // Get companies owned by this user, then their pending employees
      const { data: companies } = await supabase
        .from('companies')
        .select('id,name,logo_url')
        .eq('owner_id', userId);
      if (!companies?.length) return [];

      const companyIds = companies.map((c: { id: string }) => c.id);
      const { data } = await (supabase as any)
        .from('company_employees')
        .select(
          'id,user_id,job_title,department,verified,company_id,profiles!user_id(full_name,headline)',
        )
        .in('company_id', companyIds)
        .order('verified', { ascending: true });

      return (data ?? []).map(
        (e: {
          id: string;
          user_id: string;
          job_title: string;
          department: string | null;
          verified: boolean;
          company_id: string;
          profiles: { full_name: string | null; headline: string | null } | null;
        }) => ({
          ...e,
          companyName:
            companies.find((c: { id: string; name: string }) => c.id === e.company_id)?.name ?? '',
        }),
      );
    },
  });

  const handleVerifyEmployee = async (employeeId: string, verify: boolean) => {
    await (supabase as any)
      .from('company_employees')
      .update({ verified: verify })
      .eq('id', employeeId);
    toast.success(verify ? 'Employee verified — badge awarded!' : 'Verification removed');
    queryClient.invalidateQueries({ queryKey: ['pending-employees', userId] });
  };

  const { data: jobs } = useQuery({
    queryKey: ['my-jobs', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('jobs')
        .select('id,title,status,created_at,companies(name)')
        .eq('posted_by', userId)
        .order('created_at', { ascending: false });
      return data ?? [];
    },
  });
  return (
    <div className="mt-4 space-y-4">
      {(pendingEmployees?.length ?? 0) > 0 && (
        <Card className="p-5">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" /> Employee verification
          </h3>
          <div className="space-y-3">
            {pendingEmployees!.map(
              (emp: {
                id: string;
                user_id: string;
                job_title: string;
                department: string | null;
                verified: boolean;
                company_id: string;
                companyName: string;
                profiles: { full_name: string | null; headline: string | null } | null;
              }) => (
                <div
                  key={emp.id}
                  className="flex items-center justify-between rounded-xl border border-border p-3 gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{emp.profiles?.full_name ?? 'User'}</p>
                    <p className="text-xs text-muted-foreground">
                      {emp.job_title}
                      {emp.department ? ` · ${emp.department}` : ''} at {emp.companyName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {emp.verified ? (
                      <>
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">Verified</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleVerifyEmployee(emp.id, false)}
                        >
                          Revoke
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                        <Button
                          size="sm"
                          className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground"
                          onClick={() => handleVerifyEmployee(emp.id, true)}
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Verify
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </Card>
      )}

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
          jobs.map((j: EmployerJob) => (
            <div key={j.id} className="p-4 flex items-center justify-between">
              <div>
                <Link
                  to="/jobs/$id"
                  params={{ id: String(j.id) }}
                  className="font-medium hover:text-accent"
                >
                  {j.title}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {j.companies?.name} {new Date(j.created_at).toLocaleDateString()}
                </div>
              </div>
              <Badge variant="outline" className="uppercase text-[10px]">
                {j.status}
              </Badge>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-muted-foreground">No jobs posted yet.</div>
        )}
      </Card>
    </div>
  );
}
