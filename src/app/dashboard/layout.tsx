import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background">
            {children}
            <Toaster />
        </div>
    );
}
