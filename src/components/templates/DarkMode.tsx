import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Code, Languages, Award, Zap, Terminal } from "lucide-react";

export function DarkModeTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="bg-[#020617] min-h-[1100px] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200"
            style={{
                lineHeight: theme.spacing,
            }}
        >
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -z-10" />

            <div className="p-12 space-y-16 max-w-5xl mx-auto relative">
                {/* Header: Cyberpunk High Contrast */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-8 bg-slate-900/50 backdrop-blur-xl p-12 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50">Active Session</span>
                        </div>
                        <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
                            {data.personalInfo.fullName || "User Name"}
                        </h1>
                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                            {data.experience[0]?.position || "Lead Engineer"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm font-bold text-slate-400 md:text-right">
                        {data.personalInfo.email && (
                            <div className="flex items-center gap-3 justify-end group/item">
                                <span className="group-hover:text-emerald-400 transition-colors uppercase tracking-tighter">{data.personalInfo.email}</span>
                                <Mail className="w-4 h-4 opacity-50" />
                            </div>
                        )}
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-3 justify-end">
                                <span>{data.personalInfo.phone}</span>
                                <Phone className="w-4 h-4 opacity-50" />
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-3 justify-end">
                                <span>{data.personalInfo.location}</span>
                                <MapPin className="w-4 h-4 opacity-50" />
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="md:col-span-12 lg:col-span-8 space-y-16">
                        {/* Summary */}
                        {data.personalInfo.summary && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_profile</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <p className="text-[18px] leading-relaxed text-slate-400 font-medium border-l-2 pl-8 border-emerald-500/20 italic">
                                    {data.personalInfo.summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_history</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <div className="space-y-12">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="group relative">
                                            <div className="flex justify-between items-baseline mb-4">
                                                <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">{exp.position}</h3>
                                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-1 rounded-full border border-emerald-500/20 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                                    {exp.startDate} — {exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-sky-400 text-sm font-black uppercase tracking-[0.3em] mb-6">{exp.company}</p>
                                            <div className="text-[14px] text-slate-500 leading-relaxed font-medium bg-slate-900/30 p-8 rounded-3xl border border-slate-800 group-hover:border-slate-700 transition-all group-hover:bg-slate-900/50">
                                                {exp.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_projects</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {data.projects.map((project) => (
                                        <div key={project.id} className="p-8 rounded-[2rem] bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition-all group-hover:scale-110">
                                                <Code className="w-12 h-12 text-emerald-400" />
                                            </div>
                                            <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{project.name}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">{project.description}</p>
                                            {project.technologies && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(t => (
                                                        <span key={t} className="text-[9px] font-black text-emerald-500/70 border border-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-16">
                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_stack</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {data.skills.map((skill) => (
                                        <span key={skill.id} className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all cursor-default shadow-lg">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_edu</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <div className="space-y-8">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="space-y-2 border-l border-slate-800 pl-6 hover:border-emerald-500/30 transition-colors">
                                            <h3 className="text-lg font-black text-white uppercase leading-none">{edu.degree}</h3>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{edu.institution}</p>
                                            <span className="text-[10px] font-black text-sky-400 italic">{edu.startDate} — {edu.endDate}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xs font-black uppercase tracking-[0.6em] text-slate-500">_lang</h2>
                                    <div className="flex-1 h-[1px] bg-slate-800" />
                                </div>
                                <div className="space-y-4">
                                    {data.languages.map((lang) => (
                                        <div key={lang.id} className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                                            <span className="text-[12px] font-black text-slate-300 uppercase tracking-widest">{lang.name}</span>
                                            <span className="text-[10px] font-black text-emerald-500 opacity-60 uppercase">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* System Info */}
                        <section className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                            <div className="flex items-center gap-3 mb-6">
                                <Terminal className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Sys_Analyze</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-black/20 rounded-xl">
                                    <p className="text-xl font-black text-white">100%</p>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase">Uptime</p>
                                </div>
                                <div className="text-center p-3 bg-black/20 rounded-xl">
                                    <p className="text-xl font-black text-white">4.9s</p>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase">Response</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Matrix Footer */}
            <footer className="mt-16 py-8 border-t border-slate-800 text-center relative overflow-hidden">
                <div className="text-[10px] font-black text-slate-700 uppercase tracking-[1em]">
                    End of Document // System v4.2.0
                </div>
            </footer>
        </div>
    );
}
