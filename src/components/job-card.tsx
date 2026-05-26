import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin, Clock, Briefcase, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatSalary, industryLabel, timeAgo } from "@/lib/kazi-data";

export type JobCardData = {
  id: string;
  title: string;
  location: string;
  region?: string | null;
  industry: string;
  contract_type: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_negotiable?: boolean | null;
  currency?: string | null;
  created_at: string;
  deadline?: string | null;
  featured?: boolean;
  companies?: { name: string; logo_url?: string | null; verified?: boolean | null } | null;
};

export function JobCard({ job }: { job: JobCardData }) {
  const co = job.companies;
  return (
    <Link to="/jobs/$id" params={{ id: job.id }} className="group block">
      <Card className="p-5 hover:shadow-md hover:border-accent/40 transition-all">
        <div className="flex gap-4">
          <div className="shrink-0">
            {co?.logo_url ? (
              <img
                src={co.logo_url}
                alt={co.name}
                className="h-12 w-12 rounded-lg object-cover border border-border"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-cream grid place-items-center font-display font-bold text-primary border border-border">
                {co?.name?.[0]?.toUpperCase() ?? "K"}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold leading-tight text-foreground group-hover:text-accent transition">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">
                  {co?.name ?? "Company"}
                  {co?.verified ? (
                    <BadgeCheck className="inline h-3.5 w-3.5 ml-1 text-accent" />
                  ) : null}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="text-muted-foreground hover:text-accent transition shrink-0"
                aria-label="Save job"
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-cream text-foreground/80 border border-border font-normal"
              >
                <MapPin className="h-3 w-3 mr-1" />
                {job.region ?? job.location}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-cream text-foreground/80 border border-border font-normal"
              >
                <Briefcase className="h-3 w-3 mr-1" />
                {job.contract_type}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-cream text-foreground/80 border border-border font-normal"
              >
                {industryLabel(job.industry)}
              </Badge>
              {job.featured ? (
                <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              ) : null}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {formatSalary(
                  job.salary_min,
                  job.salary_max,
                  job.currency ?? "TZS",
                  job.salary_negotiable ?? false,
                )}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo(job.created_at)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function JobCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex gap-4 animate-pulse">
        <div className="h-12 w-12 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-3 w-1/3 bg-muted rounded" />
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-5 w-20 bg-muted rounded" />
          </div>
        </div>
      </div>
    </Card>
  );
}
