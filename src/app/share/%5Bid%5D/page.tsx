import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { RESUME_TEMPLATES, TemplateId } from "@/components/templates/TemplateRegistry";
import { Resume } from "@/types/resume";

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: resume, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !resume) {
        return notFound();
    }

    if (!resume.is_public) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl border max-w-md">
                    <h1 className="text-2xl font-bold mb-4">This resume is private</h1>
                    <p className="text-gray-500">The owner has disabled public sharing for this resume.</p>
                </div>
            </div>
        );
    }

    const typedResume = resume as Resume;
    const ResumeTemplate = RESUME_TEMPLATES[typedResume.template as TemplateId || "modern"];

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center py-12 px-4 shadow-inner">
            <div className="max-w-[210mm] w-full shadow-2xl bg-white h-fit">
                <ResumeTemplate data={typedResume.data} />
            </div>
        </div>
    );
}
