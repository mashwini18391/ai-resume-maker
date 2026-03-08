import { createClient } from "@/lib/supabase/server";
import { Resume } from "@/types/resume";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: resumes } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });

    return (
        <DashboardClient
            resumes={(resumes as Resume[]) || []}
            userEmail={user!.email || ""}
        />
    );
}
