import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Resume } from "@/types/resume";
import {
    Github,
    Linkedin,
    Globe,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Download,
    Award,
    BookOpen,
    Briefcase,
    Code2,
    User
} from "lucide-react";
import Link from "next/link";

export default async function PortfolioPage({ params }: { params: Promise<{ id: string }> }) {
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
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
                <div className="text-center space-y-4 max-w-md">
                    <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                        <User className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">PRIVATE PORTFOLIO</h1>
                    <p className="text-slate-400">This professional portfolio is currently private. Please contact the owner for access.</p>
                    <Link href="/" className="inline-block pt-4 text-primary hover:underline font-bold uppercase text-xs tracking-widest">Back to homepage</Link>
                </div>
            </div>
        );
    }

    const { data } = resume as Resume;
    const accent = data.theme.color || "#2563eb";

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-primary/30 selection:text-white">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-slate-950/50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="font-black text-white tracking-tighter text-xl capitalize">
                        {data.personalInfo.fullName.split(' ')[0]}.
                    </span>
                    <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <Link
                        href={`/share/${id}`}
                        className="bg-white/10 hover:bg-white text-white hover:text-slate-950 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 border border-white/10"
                    >
                        <Download className="w-3.5 h-3.5" /> Resume
                    </Link>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-6">
                    <div className="max-w-4xl w-full">
                        <div className="space-y-6 text-center">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.2em] text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                Available for opportunities
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                {data.personalInfo.fullName}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                                {data.personalInfo.summary}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
                                {data.personalInfo.linkedin && (
                                    <a href={data.personalInfo.linkedin} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110">
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                )}
                                {data.personalInfo.website && (
                                    <a href={data.personalInfo.website} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110">
                                        <Globe className="w-6 h-6" />
                                    </a>
                                )}
                                <a href={`mailto:${data.personalInfo.email}`} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all hover:scale-110">
                                    <Mail className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">EXPERIENCE</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-8 md:pl-0 border-l border-white/10 md:border-l-0">
                                    <div className="md:grid md:grid-cols-4 md:gap-8">
                                        <div className="mb-2 md:mb-0">
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                                {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                            </p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                                            <p className="text-primary font-bold mb-4">{exp.company}</p>
                                            <p className="text-slate-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-32 px-6 bg-slate-950/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase whitespace-nowrap">Selected Work</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {data.projects.map((project, i) => (
                                <div key={i} className="group p-8 bg-white/5 hover:bg-white/[0.08] rounded-3xl border border-white/10 transition-all duration-500 hover:translate-y-[-8px]">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                                            <Code2 className="w-6 h-6" />
                                        </div>
                                        {project.link && (
                                            <a href={project.link} className="p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{project.name}</h3>
                                    <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map(tech => (
                                            <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills & Info */}
                <section className="py-32 px-6">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-black text-white tracking-tight uppercase">Skills</h2>
                                <div className="h-[1px] flex-1 bg-white/10" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map(skill => (
                                    <span key={skill.id} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-primary transition-colors hover:text-white duration-300">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-3xl font-black text-white tracking-tight uppercase">Education</h2>
                                <div className="h-[1px] flex-1 bg-white/10" />
                            </div>
                            <div className="space-y-8">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="group">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                                            {edu.startDate} — {edu.endDate}
                                        </p>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{edu.degree}</h3>
                                        <p className="text-slate-400 text-sm">{edu.institution}</p>
                                        {edu.gpa && <p className="text-xs text-primary mt-2 font-bold uppercase tracking-widest">GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer / Contact */}
                <footer id="contact" className="py-20 border-t border-white/5 px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">GET IN TOUCH</h2>
                        <a href={`mailto:${data.personalInfo.email}`} className="text-2xl md:text-4xl font-bold text-primary hover:text-white transition-colors break-all">
                            {data.personalInfo.email}
                        </a>
                        <div className="pt-12 text-slate-500 text-xs font-bold uppercase tracking-[0.4em]">
                            © {new Date().getFullYear()} {data.personalInfo.fullName}. All rights reserved.
                        </div>
                    </div>
                </footer>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                :root {
                    --primary: ${accent};
                }
                .text-primary { color: var(--primary); }
                .bg-primary { background-color: var(--primary); }
                .border-primary { border-color: var(--primary); }
                html { scroll-behavior: smooth; }
            ` }} />
        </div>
    );
}
