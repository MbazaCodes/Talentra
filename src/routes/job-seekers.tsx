import * as React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter } from '@/components/site-chrome';
import { useAuth } from '@/lib/auth';

export const Route = createFileRoute('/job-seekers')({
  component: JobSeekersPage,
});

function JobSeekersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/auth' });
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
              For job seekers
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold">
              Find your next role with Talentra
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse Tanzania's latest job opportunities, get matched with top employers, and apply
              with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/jobs">Browse jobs</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Create account</Link>
              </Button>
            </div>
          </div>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">Search fast</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Filter listings by role, region, and industry so you see the right jobs quickly.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">Trusted employers</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Apply to verified companies and stay in control of your job search.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">Career growth</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Find jobs in tech, finance, healthcare, hospitality and more.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-10">
            <h2 className="font-display text-3xl font-semibold">Getting started</h2>
            <ul className="mt-6 space-y-4 text-sm text-foreground/80">
              <li className="space-y-2">
                <strong className="block font-semibold">Search jobs</strong>
                <span className="block text-muted-foreground">
                  Use keywords, regions, and industries to find relevant roles.
                </span>
              </li>
              <li className="space-y-2">
                <strong className="block font-semibold">Save opportunities</strong>
                <span className="block text-muted-foreground">
                  Bookmark listings you want to revisit and apply when ready.
                </span>
              </li>
              <li className="space-y-2">
                <strong className="block font-semibold">Apply directly</strong>
                <span className="block text-muted-foreground">
                  Reach employers through the platform and track your applications.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
