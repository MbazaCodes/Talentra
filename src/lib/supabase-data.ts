import { supabase } from "@/integrations/supabase/client";

export type Role = "job_seeker" | "employer" | "admin";

export interface SeekerProfile {
  id: string;
  full_name: string | null;
  email?: string;
  role?: Role;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  phone?: string | null;
  skills?: string[];
  experience?: string[];
  education?: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApplicationRecord {
  id: string;
  applicant_id: string;
  job_id: string;
  jobTitle?: string;
  companyName?: string;
  status: string;
  created_at: string;
}

export interface SavedJobRecord {
  id: string;
  user_id: string;
  job_id: string;
  jobTitle?: string;
  companyName?: string;
  created_at: string;
}

export async function getUserProfile(uid: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).single();

  if (error || !data) return null;
  return data as SeekerProfile;
}

export async function saveUserProfile(uid: string, profile: Partial<SeekerProfile>) {
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (profile.full_name !== undefined) updateData.full_name = profile.full_name;
  if (profile.headline !== undefined) updateData.headline = profile.headline;
  if (profile.bio !== undefined) updateData.bio = profile.bio;
  if (profile.location !== undefined) updateData.location = profile.location;
  if (profile.phone !== undefined) updateData.phone = profile.phone;

  const { error } = await supabase.from("profiles").update(updateData).eq("id", uid);

  if (error) throw error;
}

export async function uploadResumeFile(uid: string, file: File) {
  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now();
  const fileName = `${uid}/${timestamp}.${fileExt}`;
  const filePath = `resumes/${fileName}`;

  const { error: uploadError } = await supabase.storage.from("resumes").upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("resumes").getPublicUrl(filePath);

  await saveUserProfile(uid, { resumeUrl: publicUrl });
  return publicUrl;
}

export async function fetchUserApplications(uid: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      id,
      applicant_id,
      job_id,
      status,
      created_at,
      jobs (
        title,
        companies (
          name
        )
      )
    `,
    )
    .eq("applicant_id", uid)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    applicant_id: item.applicant_id,
    job_id: item.job_id,
    jobTitle: item.jobs?.title || "",
    companyName: item.jobs?.companies?.name || "",
    status: item.status,
    created_at: item.created_at,
  })) as ApplicationRecord[];
}

export async function fetchSavedJobs(uid: string) {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(
      `
      id,
      user_id,
      job_id,
      created_at,
      jobs (
        title,
        companies (
          name
        )
      )
    `,
    )
    .eq("user_id", uid)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved jobs:", error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    user_id: item.user_id,
    job_id: item.job_id,
    jobTitle: item.jobs?.title || "",
    companyName: item.jobs?.companies?.name || "",
    created_at: item.created_at,
  })) as SavedJobRecord[];
}

export async function ensureUserDocument(uid: string, email: string, role: Role, fullName: string) {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", uid)
    .single();

  if (!existingProfile) {
    // Create profile
    await supabase.from("profiles").insert({
      id: uid,
      full_name: fullName,
    });
  }

  // Ensure user role
  const { data: existingRole } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", uid)
    .eq("role", role)
    .single();

  if (!existingRole) {
    await supabase.from("user_roles").insert({
      user_id: uid,
      role: role,
    });
  }
}
