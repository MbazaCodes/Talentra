import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/employers")({
  component: EmployersPage,
});

function EmployersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
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
              For employers
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold">
              Hire talent faster with Talentra
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Talentra helps employers in Tanzania attract verified candidates
              across every region and industry. Post jobs, manage applications,
              and build your employer profile from one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link to="/post-job">Post a job</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/dashboard">Manage listings</Link>
              </Button>
            </div>
          </div>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">
                Reach verified candidates
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Connect with applicants who are actively searching, experienced,
                and ready to grow their careers.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">
                Post jobs in minutes
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Create targeted listings for jobs in Dar es Salaam, Arusha,
                Mwanza, and beyond.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6">
              <h2 className="font-display text-xl font-semibold">
                Track applications
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Review candidates, save favorites, and stay organized from a
                central dashboard.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-10">
            <h2 className="font-display text-3xl font-semibold">
              Why Talentra for hiring?
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-foreground/80">
              <li className="space-y-2">
                <strong className="block font-semibold">Local focus</strong>
                <span className="block text-muted-foreground">
                  Designed for Tanzania's job market, employers, and candidate
                  needs.
                </span>
              </li>
              <li className="space-y-2">
                <strong className="block font-semibold">
                  Verified employer visibility
                </strong>
                <span className="block text-muted-foreground">
                  Build trust with candidates through employer profiles and
                  verified listings.
                </span>
              </li>
              <li className="space-y-2">
                <strong className="block font-semibold">Bilingual reach</strong>
                <span className="block text-muted-foreground">
                  Engage seekers in English and Kiswahili for broader candidate
                  coverage.
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
