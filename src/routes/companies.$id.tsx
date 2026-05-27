import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Globe, BadgeCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SiteHeader, SiteFooter, MobileBottomNav } from '@/components/site-chrome';
import { JobCard, type JobCardData } from '@/components/job-card';
import { supabase } from '@/integrations/supabase/client';
import { RequestReference } from '@/components/request-reference';
import { industryLabel } from '@/lib/kazi-data';

export const Route = createFileRoute('/companies/$id')({
  component: CompanyPage,
});

function CompanyPage() {
  const { id } = Route.useParams();
  const { data: co } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      const { data } = await supabase.from('companies').select('*').eq('id', id).maybeSingle();
      return data;
    },
  });
  const { data: jobs } = useQuery({
    queryKey: ['company-jobs', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('jobs')
        .select(
          'id,title,location,region,industry,contract_type,salary_min,salary_max,salary_negotiable,currency,created_at,deadline,featured,companies(name,logo_url,verified)',
        )
        .eq('company_id', id)
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      return (data ?? []) as unknown as JobCardData[];
    },
  });

  if (!co) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl">Company not found</h1>
          <Button asChild className="mt-4">
            <Link to="/jobs">Browse jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <SiteHeader />
      <div className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-start gap-5">
            {co.logo_url ? (
              <img
                src={co.logo_url}
                alt={co.name}
                className="h-20 w-20 rounded-2xl border-4 border-background object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-2xl bg-cream text-primary grid place-items-center font-display font-bold text-3xl border-4 border-background">
                {co.name[0]}
              </div>
            )}
            <div>
              <h1 className="font-display text-3xl font-semibold">
                {co.name}{' '}
                {co.verified ? <BadgeCheck className="inline h-5 w-5 text-accent" /> : null}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-primary-foreground/80">
                {co.industry ? (
                  <Badge className="bg-accent text-accent-foreground">
                    {industryLabel(co.industry)}
                  </Badge>
                ) : null}
                {co.location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {co.location}
                  </span>
                ) : null}
                {co.website ? (
                  <a
                    href={co.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-accent"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Website
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {co.description ? (
          <Card className="p-6">
            <p className="text-foreground/80 whitespace-pre-wrap">{co.description}</p>
          </Card>
        ) : null}

        <h2 className="font-display text-xl font-semibold mt-8 mb-4">
          Open roles ({jobs?.length ?? 0})
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {jobs?.length ? (
            jobs.map((j) => <JobCard key={j.id} job={j} />)
          ) : (
            <p className="text-sm text-muted-foreground">No open roles right now.</p>
          )}
        </div>
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </div>
  );
}
