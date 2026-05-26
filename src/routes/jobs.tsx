import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { JobCard, JobCardSkeleton, type JobCardData } from '@/components/job-card';
import { supabase } from '@/integrations/supabase/client';
import {
  REGIONS,
  INDUSTRIES,
  POSITION_LEVELS,
  CONTRACT_TYPES,
  QUALIFICATIONS,
  SALARY_BANDS,
} from '@/lib/kazi-data';

type JobsSearch = {
  q?: string;
  region?: string;
  industry?: string;
  level?: string;
  contract?: string;
  qualification?: string;
  salary?: string;
};

export const Route = createFileRoute('/jobs')({
  validateSearch: (s: Record<string, unknown>): JobsSearch => ({
    q: typeof s.q === 'string' ? s.q : undefined,
    region: typeof s.region === 'string' ? s.region : undefined,
    industry: typeof s.industry === 'string' ? s.industry : undefined,
    level: typeof s.level === 'string' ? s.level : undefined,
    contract: typeof s.contract === 'string' ? s.contract : undefined,
    qualification: typeof s.qualification === 'string' ? s.qualification : undefined,
    salary: typeof s.salary === 'string' ? s.salary : undefined,
  }),
  component: JobsPage,
});

function JobsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = React.useState(search.q ?? '');

  React.useEffect(() => {
    setQ(search.q ?? '');
  }, [search.q]);

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', search],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select(
          'id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)',
        )
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(50);

      if (search.q) query = query.ilike('title', `%${search.q}%`);
      if (search.region) query = query.eq('region', search.region);
      if (search.industry) query = query.eq('industry', search.industry);
      if (search.level) query = query.eq('position_level', search.level as never);
      if (search.contract) query = query.eq('contract_type', search.contract as never);
      if (search.qualification) query = query.eq('qualification', search.qualification as never);
      if (search.salary) {
        const band = SALARY_BANDS.find((b) => b.value === search.salary);
        if (band?.min) query = query.gte('salary_min', band.min);
        if (band?.max) query = query.lte('salary_max', band.max);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as JobCardData[];
    },
  });

  const update = (patch: Partial<JobsSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });
  const clear = () => navigate({ search: {} });
  const activeCount = Object.values(search).filter(Boolean).length;

  const filters = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Region</Label>
        <Select
          value={search.region ?? '_all'}
          onValueChange={(v) => update({ region: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Any region</SelectItem>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Industry</Label>
        <Select
          value={search.industry ?? '_all'}
          onValueChange={(v) => update({ industry: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Any industry</SelectItem>
            {INDUSTRIES.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Position level
        </Label>
        <Select
          value={search.level ?? '_all'}
          onValueChange={(v) => update({ level: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Any level</SelectItem>
            {POSITION_LEVELS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Contract type
        </Label>
        <Select
          value={search.contract ?? '_all'}
          onValueChange={(v) => update({ contract: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any contract" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Any contract</SelectItem>
            {CONTRACT_TYPES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Qualification
        </Label>
        <Select
          value={search.qualification ?? '_all'}
          onValueChange={(v) => update({ qualification: v === '_all' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Any qualification</SelectItem>
            {QUALIFICATIONS.map((q) => (
              <SelectItem key={q.value} value={q.value}>
                {q.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Salary</Label>
        <Select
          value={search.salary ?? 'any'}
          onValueChange={(v) => update({ salary: v === 'any' ? undefined : v })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Any salary" />
          </SelectTrigger>
          <SelectContent>
            {SALARY_BANDS.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {activeCount > 0 ? (
        <Button variant="ghost" size="sm" onClick={clear} className="w-full">
          <X className="h-3 w-3" /> Clear all filters
        </Button>
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      <div className="bg-cream/60 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display text-2xl md:text-3xl font-semibold">Find your next role</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: q || undefined });
            }}
            className="mt-4 flex gap-2 max-w-2xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Job title, skill, or company"
                className="pl-9 bg-background"
              />
            </div>
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Search
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{filters}</div>
              </SheetContent>
            </Sheet>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid md:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden md:block">
          <div className="sticky top-20 rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display font-semibold mb-4">Filters</h2>
            {filters}
          </div>
        </aside>

        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {isLoading ? 'Loading…' : `${data?.length ?? 0} jobs found`}
          </p>
          <div className="grid gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : data && data.length > 0 ? (
              data.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <p className="font-display text-lg font-semibold">No jobs match your filters</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try clearing some filters, or be the first to post a job.
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  <Button variant="outline" onClick={clear}>
                    Clear filters
                  </Button>
                  <Button asChild>
                    <Link to="/post-job">Post a job</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
