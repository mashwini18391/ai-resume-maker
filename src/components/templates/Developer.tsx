import { ResumeData } from "@/types/resume";
import { Terminal, Code2, Cpu, Globe, Github, Linkedin, Mail } from "lucide-react";

export function DeveloperTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="bg-[#0d1117] min-h-[1100px] text-slate-300 overflow-hidden font-mono"
            style={{
                lineHeight: theme.spacing,
            }}
        >
            {/* Header / Terminal Bar */}
            <header className="bg-[#161b22] border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] font-bold text-slate-500 flex items-center gap-2 tracking-widest uppercase">
                    <Terminal className="w-3 h-3 text-emerald-500" />
                    {data.personalInfo.fullName?.toLowerCase().replace(/\s+/g, "_") || "user"}.sh — 80x24
                </div>
                <div className="w-12 h-1" />
            </header>

            <div className="p-10 space-y-12 max-w-5xl mx-auto">
                {/* Hero Section */}
                <section className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-emerald-500 animate-pulse">
                            <span className="text-xl">$</span>
                            <span className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">whoami</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter">
                            {data.personalInfo.fullName || "Developer User"}
                        </h1>
                        <p className="text-xl text-slate-400 font-bold tracking-tight">
                            <span className="text-sky-400 border-b-2 border-sky-400/20 pb-1">{data.experience[0]?.position || "Full Stack Engineer"}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-500 pt-4">
                        {data.personalInfo.email && (
                            <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer group">
                                <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                <span>{data.personalInfo.email}</span>
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5" />
                                <span>{data.personalInfo.location}</span>
                            </div>
                        )}
                        {data.personalInfo.linkedin && (
                            <div className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-pointer group">
                                <Linkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                <span>LinkedIn</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
                            <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                            <span>GitHub</span>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-12 gap-12 border-t border-slate-800/50 pt-12">
                    {/* Main Content (Terminal View) */}
                    <div className="col-span-12 lg:col-span-8 space-y-16">
                        {/* Summary */}
                        {data.personalInfo.summary && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <span className="text-lg">&gt;</span>
                                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">cat readme.md</h2>
                                </div>
                                <div className="bg-[#161b22] p-8 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                                        <Code2 className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <p className="text-[14px] leading-relaxed text-slate-400 font-medium">
                                        {data.personalInfo.summary}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <span className="text-lg">&gt;</span>
                                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">ls ./experience</h2>
                                </div>
                                <div className="space-y-10">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="group relative">
                                            <div className="absolute left-[-20px] top-2 bottom-0 w-[1px] bg-slate-800 group-hover:bg-emerald-500 transition-colors" />
                                            <div className="flex justify-between items-baseline mb-4">
                                                <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">{exp.position}</h3>
                                                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-emerald-500/20">
                                                    {exp.startDate} — {exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-sky-400 text-sm font-bold mb-4 uppercase tracking-widest">{exp.company}</p>
                                            <div className="text-[13px] text-slate-500 leading-relaxed font-medium bg-black/20 p-6 rounded-xl border border-slate-800/30 group-hover:border-slate-700 transition-colors">
                                                {exp.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Config View */}
                    <div className="col-span-12 lg:col-span-4 space-y-16">
                        {/* Skills / Stack */}
                        {data.skills.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <span className="text-lg">&gt;</span>
                                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">env | grep STACK</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span key={skill.id} className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded text-[11px] font-bold text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <span className="text-lg">&gt;</span>
                                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">history --edu</h2>
                                </div>
                                <div className="space-y-6">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="p-4 border border-slate-800 rounded-lg hover:bg-slate-800/20 transition-colors">
                                            <h3 className="text-white text-sm font-black mb-1 uppercase leading-tight">{edu.degree}</h3>
                                            <p className="text-slate-500 text-[11px] font-bold mb-2">{edu.institution}</p>
                                            <span className="text-[9px] text-emerald-500 underline underline-offset-4 decoration-emerald-500/20">{edu.startDate} - {edu.endDate}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* System Status / Meta */}
                        <section className="bg-slate-900 shadow-inner rounded-2xl p-6 border border-slate-800">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu className="w-4 h-4 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Analytics</span>
                            </div>
                            <div className="space-y-4">
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[95%] shadow-[0_0_10px_rgba(39,201,63,0.5)]" />
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500">
                                    <span>Productivity</span>
                                    <span className="text-emerald-500">95%</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Bottom Status Bar */}
            <footer className="bg-emerald-500 text-black px-6 py-1.5 fixed bottom-0 left-0 right-0 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] z-20">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> NORMAL</span>
                    <span>main*</span>
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-6">
                    <span>JS / TS / REACT</span>
                    <span>L: 42 C: 12</span>
                </div>
            </footer>
        </div>
    );
}
