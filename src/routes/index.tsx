import * as React from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, ArrowRight, BadgeCheck, Briefcase, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { JobCard, JobCardSkeleton, type JobCardData } from '@/components/job-card';
import { supabase } from '@/integrations/supabase/client';
import { REGIONS, INDUSTRIES } from '@/lib/kazi-data';
import { useT, useLang } from '@/lib/i18n';
import heroImg from '@/assets/hero-kazi.jpg';

export const Route = createFileRoute('/')({ component: LandingPage });

function LandingPage() {
  const t = useT();
  const { lang } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = React.useState('');
  const [region, setRegion] = React.useState<string>('');

  const { data: featured, isLoading } = useQuery({
    queryKey: ['featured-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(
          'id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)',
        )
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return (data ?? []) as unknown as JobCardData[];
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: '/jobs',
      search: { q: q || undefined, region: region || undefined } as never,
    });
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />

      {/* Hero — split screen */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-cream border border-border text-foreground/80">
              <Sparkles className="h-3 w-3 mr-1 text-accent" /> {t('tagline')}
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
              {t('hero_title_1')}{' '}
              <span className="relative whitespace-nowrap">
                <span className="text-accent">{t('hero_title_2')}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-peach/50 -z-10 rounded" />
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">{t('hero_sub')}</p>

            <form
              onSubmit={handleSearch}
              className="bg-card border border-border rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t('search_title')}
                  className="border-0 shadow-none focus-visible:ring-0 px-0"
                />
              </div>
              <div className="sm:w-48 flex items-center gap-2 px-3 sm:border-l border-border">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="border-0 shadow-none focus:ring-0 px-0 h-auto">
                    <SelectValue placeholder={t('search_location')} />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {t('search_btn')}
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-muted-foreground">Popular:</span>
              {['Dar es Salaam', 'ICT', 'NGO', 'Banking', 'Remote'].map((tag) => (
                <Link
                  key={tag}
                  to="/jobs"
                  search={{ q: tag } as never}
                  className="text-foreground/80 hover:text-accent underline-offset-4 hover:underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-accent/20 via-peach/20 to-primary/10 rounded-4xl blur-2xl" />
            <img
              src={heroImg}
              alt="Diverse Tanzanian professionals at work"
              width={1024}
              height={1024}
              className="relative rounded-4xl shadow-xl object-cover aspect-square w-full border-4 border-background"
            />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg border border-border p-4 flex items-center gap-3 max-w-55">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <div className="font-display font-semibold">12,500+</div>
                <div className="text-xs text-muted-foreground">Active jobs</div>
              </div>
            </div>
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-card rounded-2xl shadow-lg border border-border p-4 items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <div className="font-display font-semibold">800+</div>
                <div className="text-xs text-muted-foreground">Verified employers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Browse by industry</h2>
          <Link
            to="/jobs"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES.slice(0, 8).map((i) => (
            <Link
              key={i.value}
              to="/jobs"
              search={{ industry: i.value } as never}
              className="group rounded-xl border border-border bg-card p-4 hover:border-accent/40 hover:shadow-sm transition"
            >
              <div className="font-display font-semibold text-foreground group-hover:text-accent transition">
                {lang === 'sw' ? i.sw : i.en}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === 'sw' ? i.en : i.sw}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured jobs */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Latest opportunities
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Fresh listings from Tanzania's top employers
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            All jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)
          ) : featured && featured.length > 0 ? (
            featured.map((j) => <JobCard key={j.id} job={j} />)
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-accent text-accent-foreground mb-3">
              <BadgeCheck className="h-3 w-3 mr-1" /> For employers
            </Badge>
            <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Hire the right talent across Tanzania, faster.
            </h3>
            <p className="mt-3 text-primary-foreground/80">
              Post your first job free. Reach verified candidates in every region.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/post-job">
                Post a job <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="md:col-span-2 rounded-xl border border-dashed border-border p-10 text-center">
      <p className="font-display text-lg font-semibold">No jobs posted yet</p>
      <p className="text-sm text-muted-foreground mt-1">
        Be the first to post — your listing will appear here.
      </p>
      <Button asChild className="mt-4">
        <Link to="/post-job">Post a job</Link>
      </Button>
    </div>
  );
}
