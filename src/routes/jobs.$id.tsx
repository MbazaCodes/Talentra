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
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { formatSalary, industryLabel, timeAgo } from '@/lib/kazi-data';

export const Route = createFileRoute('/jobs/$id')({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = React.useState('');
  const [reportOpen, setReportOpen] = React.useState(false);

  // Increment view count once per mount (fire-and-forget)
  React.useEffect(() => {
    supabase.rpc('increment_job_views' as never, { job_id: id } as never).then(() => {});
  }, [id]);
  const [reportReason, setReportReason] = React.useState('scam');
  const [reportDetails, setReportDetails] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [reporting, setReporting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
      const { data, error } = await supabase
        .from('jobs')
        .select('*,companies(id,name,logo_url,description,location,industry,website,verified)')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

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

  const handleApply = async () => {
    if (!user) return navigate({ to: '/auth' });
    setSubmitting(true);
    const { error } = await supabase.from('applications').insert({
      job_id: id,
      applicant_id: user.id,
      cover_letter: coverLetter || null,
    });
    setSubmitting(false);
    if (error) {
      if (error.message.includes('duplicate')) toast.info("You've already applied to this job");
      else toast.error(error.message);
      return;
    }
    toast.success('Application sent!');
    setOpen(false);
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
              <p className="text-muted-foreground mt-1">
                <Link
                  to="/companies/$id"
                  params={{ id: co?.id ?? '' }}
                  className="hover:text-accent"
                >
                  {co?.name}
                </Link>
                {co?.verified ? <BadgeCheck className="inline h-4 w-4 ml-1 text-accent" /> : null}
              </p>
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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={hasApplied}
                  >
                    {hasApplied ? 'Applied' : 'Apply now'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                  </DialogHeader>
                  {user ? (
                    <>
                      <Textarea
                        placeholder="Brief cover letter (optional)"
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        maxLength={2000}
                      />
                      <DialogFooter>
                        <Button
                          onClick={handleApply}
                          disabled={submitting}
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          {submitting ? 'Sending…' : 'Send application'}
                        </Button>
                      </DialogFooter>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">Sign in to apply to this job.</p>
                      <DialogFooter>
                        <Button asChild>
                          <Link to="/auth">Sign in</Link>
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
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
