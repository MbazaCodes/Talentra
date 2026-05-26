import * as React from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/integrations/firebase/client";

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

  const loadRoles = React.useCallback(async (uid: string | undefined) => {
    if (!uid || !db) return setRoles([]);
    const snapshot = await getDoc(doc(db, "users", uid));
    if (!snapshot.exists()) return setRoles([]);
    const data = snapshot.data() as { role?: Role };
    setRoles(data.role ? [data.role] : []);
  }, []);

  React.useEffect(() => {
    if (!auth) {
      setUser(null);
      setRoles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadRoles(firebaseUser.uid);
      } else {
        setRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loadRoles]);

  const signOut = React.useCallback(async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  const refreshRoles = React.useCallback(async () => {
    await loadRoles(user?.uid);
  }, [user?.uid, loadRoles]);

  const value = React.useMemo(
    () => ({ user, session: null, roles, loading, signOut, refreshRoles }),
    [user, roles, loading, signOut, refreshRoles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
