import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { emptyProfile, type UserProfile } from "@/lib/impulsa-data";

type Ctx = {
  profile: UserProfile;
  update: (patch: Partial<UserProfile>) => void;
  reset: () => void;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);

  const value = useMemo<Ctx>(
    () => ({
      profile,
      update: (patch) => setProfile((p) => ({ ...p, ...patch })),
      reset: () => setProfile(emptyProfile),
    }),
    [profile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
