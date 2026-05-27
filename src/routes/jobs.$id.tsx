import * as React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MapPin, Clock, Briefcase, Calendar, BadgeCheck, Bookmark, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { ApplyDialog } from '@/components/apply-dialog';
import { supabase, supabaseConfigured } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { getUserProfile } from '@/lib/supabase-data';
import { formatSalary, industryLabel, timeAgo } from '@/lib/kazi-data';

export const Route = createFileRoute('/jobs/$id')({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = React.useState(false);

  // Increment view count once per mount (fire-and-forget)
  React.useEffect(() => {
    supabase.rpc('increment_job_views' as never, { job_id: id } as never).then(() => {});
  }, [id]);
  const [reportReason, setReportReason] = React.useState('scam');
  const [reportDetails, setReportDetails] = React.useState('');
  const [reporting, setReporting] = React.useState(false);

  const { data: existingReport } = useQuery({
    queryKey: ['job-report', id, user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_reports')
        .select('id')
        .eq('job_id', id)
        .eq('reporter_id', user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      if (!supabaseConfigured) {
        // Dev fallback so UI can be tested without real Supabase credentials
        return {
          id,
          title: `Sample job ${id}`,
          location: 'Dar es Salaam',
          region: 'Dar es Salaam',
          industry: 'software',
          contract_type: 'Full-time',
          salary_min: 1000000,
          salary_max: 2000000,
          salary_negotiable: false,
          currency: 'TZS',
          created_at: new Date().toISOString(),
          deadline: null,
          featured: false,
          description: 'This is a development-only sample job description used when Supabase is not configured.',
          companies: { id: 'devco', name: 'Dev Company', logo_url: null, description: null, location: null, verified: false },
          views_count: 42,
        } as any;
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*,companies(id,name,logo_url,description,location,industry,website,verified)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: applicantCount } = useQuery({
    queryKey: ['job-applicants-count', id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true })
        .eq('job_id', id as string);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      if (!user) return null;
      return getUserProfile(user.id);
    },
  });

  const match = React.useMemo(() => {
    if (!profile || !job) return { score: 0, breakdown: {} as Record<string, number> };
    // Simple heuristic match scoring: location, industry, level/qualification, skills
    let total = 0;
    const breakdown: Record<string, number> = {};

    // Location (25)
    const locMatch =
      (profile.location && job.region && profile.location === job.region) ||
      (profile.location && job.location && profile.location === job.location)
        ? 25
        : 0;
    breakdown.location = locMatch;
    total += locMatch;

    // Industry (25)
    const industryMatch = profile.headline && job.industry && profile.headline.toLowerCase().includes(job.industry.toLowerCase()) ? 25 : profile?.skills?.some((s) => s.toLowerCase().includes(job.industry.toLowerCase())) ? 20 : 0;
    breakdown.industry = industryMatch;
    total += industryMatch;

    // Level / qualification (25)
    const levelMatch = (profile as any).education?.length && job.position_level ? 15 : 0;
    breakdown.level = levelMatch;
    total += levelMatch;

    // Skills overlap (25)
    let skillsScore = 0;
    if (profile.skills && profile.skills.length > 0 && job.description) {
      const jobText = job.description.toLowerCase();
      const matches = profile.skills.filter((s: string) => s && jobText.includes(s.toLowerCase()));
      const ratio = Math.min(matches.length / Math.max(1, profile.skills.length), 1);
      skillsScore = Math.round(ratio * 25);
    }
    breakdown.skills = skillsScore;
    total += skillsScore;

    // Normalize to 0-100
    const score = Math.min(100, Math.round(total));
    return { score, breakdown };
  }, [profile, job]);

  const { data: hasApplied } = useQuery({
    queryKey: ['application', id, user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', id)
        .eq('applicant_id', user!.id)
        .maybeSingle();
      return !!data;
    },
  });

  const handleSave = async () => {
    if (!user) return navigate({ to: '/auth' });
    const { error } = await supabase.from('saved_jobs').insert({ user_id: user.id, job_id: id });
    if (error && !error.message.includes('duplicate')) toast.error(error.message);
    else toast.success('Saved to your list');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 w-1/2 bg-muted rounded" />
          <div className="h-4 w-1/4 bg-muted rounded mt-3" />
          <div className="h-40 bg-muted rounded mt-8" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-semibold">Job not found</h1>
          <Button asChild className="mt-4">
            <Link to="/jobs">Browse jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  const co = (
    job as never as {
      companies: {
        id: string;
        name: string;
        logo_url: string | null;
        description: string | null;
        location: string | null;
        verified: boolean | null;
      };
    }
  ).companies;

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link to="/jobs">
            <ArrowLeft className="h-4 w-4" /> Back to jobs
          </Link>
        </Button>

        <Card className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            {co?.logo_url ? (
              <img
                src={co.logo_url}
                alt={co.name}
                className="h-16 w-16 rounded-xl border border-border object-cover"
              />
            ) : (
              <div className="h-16 w-16 rounded-xl bg-cream grid place-items-center font-display font-bold text-xl text-primary border border-border">
                {co?.name?.[0]?.toUpperCase() ?? 'K'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                {job.title}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-muted-foreground">
                <Link
                  to="/companies/$id"
                  params={{ id: co?.id ?? '' }}
                  className="hover:text-accent"
                >
                  {co?.name}
                </Link>
                {co?.verified ? <BadgeCheck className="inline h-4 w-4 ml-1 text-accent" /> : null}
                </p>
                <div className="ml-2 flex items-center gap-2">
                  <Badge className="text-xs bg-cream border border-border">
                    Match {match.score}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{applicantCount ?? 0} applied</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{job.views_count ?? 0} views</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-cream border border-border">
              <MapPin className="h-3 w-3 mr-1" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="bg-cream border border-border">
              <Briefcase className="h-3 w-3 mr-1" />
              {job.contract_type}
            </Badge>
            <Badge variant="secondary" className="bg-cream border border-border">
              {industryLabel(job.industry)}
            </Badge>
            <Badge variant="secondary" className="bg-cream border border-border">
              {job.position_level}
            </Badge>
            {job.deadline ? (
              <Badge variant="secondary" className="bg-cream border border-border">
                <Calendar className="h-3 w-3 mr-1" />
                Deadline {new Date(job.deadline).toLocaleDateString()}
              </Badge>
            ) : null}
            <Badge variant="secondary" className="bg-cream border border-border">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo(job.created_at)}
            </Badge>
          </div>

          <div className="mt-6 flex items-center justify-between flex-wrap gap-3 border-t border-border pt-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Salary</p>
              <p className="font-display text-lg font-semibold">
                {formatSalary(
                  job.salary_min,
                  job.salary_max,
                  job.currency ?? 'TZS',
                  job.salary_negotiable ?? undefined,
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSave}>
                <Bookmark className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" onClick={() => setReportOpen(true)}>
                Report job
              </Button>
              <ApplyDialog
                jobId={id}
                jobTitle={job.title}
                companyName={co?.name ?? ''}
                hasApplied={!!hasApplied}
              />
            </div>
          </div>
        </Card>

        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report this job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose the issue that best describes why this listing should be reviewed.
              </p>
              <div>
                <label
                  htmlFor="report-reason"
                  className="block text-sm font-medium text-foreground"
                >
                  Reason
                </label>
                <select
                  id="report-reason"
                  value={reportReason}
                  onChange={(event) => setReportReason(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="scam">Scam / fraudulent</option>
                  <option value="fake_salary">Fake salary or pay</option>
                  <option value="suspicious_company">Suspicious company details</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Details</label>
                <Textarea
                  value={reportDetails}
                  onChange={(event) => setReportDetails(event.target.value)}
                  rows={5}
                  placeholder="Additional information (optional)"
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={reporting || !!existingReport}
                onClick={async () => {
                  if (!user) return navigate({ to: '/auth' });
                  if (existingReport) return toast.info('You have already reported this job.');
                  setReporting(true);
                  const { error } = await supabase.from('job_reports').insert({
                    job_id: id,
                    reporter_id: user.id,
                    reason: reportReason,
                    details: reportDetails || null,
                  });
                  setReporting(false);
                  if (error) {
                    toast.error(error.message);
                  } else {
                    toast.success('Report submitted. Admin review will follow.');
                    setReportOpen(false);
                  }
                }}
              >
                {reporting ? 'Submitting…' : existingReport ? 'Already reported' : 'Submit report'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="p-6 md:p-8 mt-6">
          <h2 className="font-display text-xl font-semibold mb-3">Job description</h2>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90">
            {job.description}
          </div>
        </Card>

        {co?.description ? (
          <Card className="p-6 md:p-8 mt-6">
            <h2 className="font-display text-xl font-semibold mb-3">About {co.name}</h2>
            <p className="text-foreground/80">{co.description}</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/companies/$id" params={{ id: co.id }}>
                View company
              </Link>
            </Button>
          </Card>
        ) : null}
      </div>

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
