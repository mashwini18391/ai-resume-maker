"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { emptyResumeData } from "@/types/resume";

export async function createResume(title: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const { data, error } = await supabase
        .from("resumes")
        .insert({
            user_id: user.id,
            title: title || "Untitled Resume",
            template: "modern",
            data: emptyResumeData,
        })
        .select("id")
        .single();

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export async function deleteResume(resumeId: string) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", resumeId)
        .eq("user_id", user.id);

    if (error) {
        console.error("Error deleting resume:", error);
        throw new Error("Could not delete resume");
    }
}

export async function updateResume(
    resumeId: string,
    updates: { title?: string; template?: string; data?: unknown; is_public?: boolean; versions?: unknown[] }
) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase
        .from("resumes")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", resumeId)
        .eq("user_id", user.id);

    if (error) {
        console.error("Error updating resume:", error);
        throw new Error("Could not update resume");
    }
}

export async function toggleSharing(resumeId: string, isPublic: boolean) {
    return updateResume(resumeId, { is_public: isPublic });
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
