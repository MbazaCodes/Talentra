import * as React from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Globe2,
  Search,
  Bookmark,
  User2,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useLang, useT } from "@/lib/i18n";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/Logo-copy.png"
        alt="Talentra logo"
        className="h-10 w-10 rounded-lg object-contain"
      />
      <span className="font-display text-lg font-semibold tracking-tight">
        Talentra
      </span>
    </Link>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe2 className="h-4 w-4" />
          <span className="uppercase text-xs font-semibold">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("sw")}>
          Kiswahili
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const { user, signOut, roles } = useAuth();
  const t = useT();
  const isEmployer = roles.includes("employer");
  const isAdmin = roles.includes("admin");

  const notifications = React.useMemo(() => {
    if (!user) return [];
    if (isAdmin) {
      return [
        {
          title: "Content review pending",
          body: "Review 3 page changes waiting approval.",
        },
        {
          title: "New employer signup",
          body: "A new employer account just registered.",
        },
      ];
    }
    if (isEmployer) {
      return [
        {
          title: "New applicant",
          body: "2 candidates applied to your latest job.",
        },
        {
          title: "Listing performance",
          body: "Your active jobs received 18 views today.",
        },
      ];
    }
    return [
      {
        title: "New job matches",
        body: "See 5 roles that match your profile.",
      },
      {
        title: "Saved job update",
        body: "A job you saved has a new salary update.",
      },
    ];
  }, [user, isEmployer, isAdmin]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/jobs"
              className="text-foreground/80 hover:text-foreground transition"
            >
              {t("browse_jobs")}
            </Link>
            <Link
              to="/job-seekers"
              className="text-foreground/80 hover:text-foreground transition"
            >
              For job seekers
            </Link>
            <Link
              to="/employers"
              className="text-foreground/80 hover:text-foreground transition"
            >
              For employers
            </Link>
            {isAdmin ? (
              <Link
                to="/admin"
                className="text-foreground/80 hover:text-foreground transition"
              >
                Admin
              </Link>
            ) : null}
            <Link
              to="/post-job"
              className="text-foreground/80 hover:text-foreground transition"
            >
              {t("post_job")}
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-foreground transition"
            >
              {t("about")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LangToggle />
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full"
                  >
                    <Bell className="h-4 w-4" />
                    {notifications.length ? (
                      <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
                    ) : null}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  {notifications.length ? (
                    notifications.map((item) => (
                      <DropdownMenuItem
                        key={item.title}
                        className="flex flex-col items-start gap-1 py-3"
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.body}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="text-sm text-muted-foreground">
                      No new notifications
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
              >
                <Link to="/dashboard">{t("dashboard")}</Link>
              </Button>
              {isEmployer ? (
                <Button asChild size="sm" className="hidden md:inline-flex">
                  <Link to="/post-job">{t("post_job")}</Link>
                </Button>
              ) : null}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <User2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      {t("dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                    {t("sign_out")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link to="/auth">{t("sign_in")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>
                  {t("sign_up")}
                </Link>
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8 flex flex-col gap-1">
                <Link
                  to="/jobs"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  {t("browse_jobs")}
                </Link>
                <Link
                  to="/job-seekers"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  For job seekers
                </Link>
                <Link
                  to="/employers"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  For employers
                </Link>
                <Link
                  to="/post-job"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  {t("post_job")}
                </Link>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="px-3 py-3 rounded-lg hover:bg-muted"
                  >
                    Admin
                  </Link>
                ) : null}
                <Link
                  to="/dashboard"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  {t("dashboard")}
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  {t("about")}
                </Link>
                <Link
                  to="/contact"
                  className="px-3 py-3 rounded-lg hover:bg-muted"
                >
                  {t("contact")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-primary text-primary-foreground/90 mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground font-display font-bold">
              T
            </span>
            <span className="font-display text-lg font-semibold">Talentra</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            Built for Tanzania's workforce — connecting talent with opportunity.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Job seekers</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link to="/job-seekers">Job seeker hub</Link>
            </li>
            <li>
              <Link to="/jobs">Browse jobs</Link>
            </li>
            <li>
              <Link to="/dashboard">My applications</Link>
            </li>
            <li>
              <Link to="/auth">Create account</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Employers</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link to="/employers">Employer hub</Link>
            </li>
            <li>
              <Link to="/post-job">Post a job</Link>
            </li>
            <li>
              <Link to="/dashboard">Manage listings</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Talentra Tanzania
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  const { user } = useAuth();
  const items = [
    { to: "/", label: "Home", icon: Search },
    { to: "/jobs", label: "Jobs", icon: Briefcase },
    { to: "/dashboard", label: "Saved", icon: Bookmark },
    {
      to: user ? "/dashboard" : "/auth",
      label: user ? "Me" : "Sign in",
      icon: User2,
    },
  ] as const;
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-accent" }}
            >
              <it.icon className="h-5 w-5" />
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
