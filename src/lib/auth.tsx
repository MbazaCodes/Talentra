import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

type Role = "job_seeker" | "employer" | "admin";

type Ctx = {
  user: User | null;
  session: null;
  roles: Role[];
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
};

const AuthContext = React.createContext<Ctx>({
  user: null,
  session: null,
  roles: [],
  loading: true,
  signOut: async () => {},
  refreshRoles: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadRoles = React.useCallback(async (userId: string | undefined) => {
    if (!userId) return setRoles([]);

    const { data: rolesData, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading roles:", error);
      return setRoles([]);
    }

    setRoles(rolesData?.map((r) => r.role as Role) || []);
  }, []);

  React.useEffect(() => {
    setLoading(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadRoles(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadRoles(session.user.id);
      } else {
        setRoles([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadRoles]);

  const signOut = React.useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const refreshRoles = React.useCallback(async () => {
    await loadRoles(user?.id);
  }, [user?.id, loadRoles]);

  const value = React.useMemo(
    () => ({ user, session: null, roles, loading, signOut, refreshRoles }),
    [user, roles, loading, signOut, refreshRoles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
