import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Resume } from "@/types/resume";
import { BuilderClient } from "./builder-client";

interface BuilderPageProps {
    params: Promise<{ id: string }>;
}

export default async function BuilderPage({ params }: BuilderPageProps) {
    const { id } = await params;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: resume, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error || !resume) {
        redirect("/dashboard");
    }

    return <BuilderClient resume={resume as Resume} />;
}
