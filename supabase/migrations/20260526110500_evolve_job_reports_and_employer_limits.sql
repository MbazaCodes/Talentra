-- Add premium employer tiers, reporting, and stronger job ownership metadata

create type public.report_status as enum ('open', 'reviewed', 'dismissed');

alter table public.companies
  add column premium boolean not null default false,
  add column suspended boolean not null default false;

alter table public.jobs
  add column created_by_role app_role not null default 'employer';

create table public.job_reports (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null,
  details text,
  status report_status not null default 'open',
  created_at timestamptz not null default now()
);
create index job_reports_job_id_idx on public.job_reports(job_id);
create index job_reports_status_idx on public.job_reports(status);

alter table public.job_reports enable row level security;

create policy "Users report jobs" on public.job_reports for insert with check (auth.uid() = reporter_id);
create policy "Report owners and admin can view" on public.job_reports for select using (
  auth.uid() = reporter_id or public.has_role(auth.uid(), 'admin')
);
create policy "Report owners or admin can delete" on public.job_reports for delete using (
  auth.uid() = reporter_id or public.has_role(auth.uid(), 'admin')
);
create policy "Admins update reports" on public.job_reports for update using (
  public.has_role(auth.uid(), 'admin')
);
