import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Code, Languages, Info } from "lucide-react";

export function CompactTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="p-8 bg-white min-h-[1100px] text-slate-800"
            style={{
                fontFamily: theme.font || "Inter, sans-serif",
                lineHeight: theme.spacing,
            }}
        >
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header: Super Compact Multi-column */}
                <header className="border-b-2 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderBottomColor: theme.color }}>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                            {data.personalInfo.fullName || "Professional Name"}
                        </h1>
                        <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mt-1">
                            {data.experience[0]?.position || "Specialist"}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {data.personalInfo.email && (
                            <div className="flex items-center gap-1.5 min-w-[140px]">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{data.personalInfo.email}</span>
                            </div>
                        )}
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3" />
                                <span>{data.personalInfo.phone}</span>
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-1.5 min-w-[140px]">
                                <MapPin className="w-3 h-3" />
                                <span>{data.personalInfo.location}</span>
                            </div>
                        )}
                        {data.personalInfo.website && (
                            <div className="flex items-center gap-1.5">
                                <Globe className="w-3 h-3" />
                                <span className="text-slate-600 underline">web.portfolio</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Summary: Condensed */}
                {data.personalInfo.summary && (
                    <section className="bg-slate-50 p-4 rounded-lg border-l-4" style={{ borderLeftColor: theme.color }}>
                        <div className="flex items-start gap-3">
                            <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <p className="text-[12px] leading-relaxed text-slate-600 font-medium">
                                {data.personalInfo.summary}
                            </p>
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                    {/* Main Content: Experience & Projects */}
                    <div className="md:col-span-8 space-y-8">
                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="w-4 h-4 text-slate-400" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Experience</h2>
                                    <div className="flex-1 h-[1px] bg-slate-100" />
                                </div>
                                <div className="space-y-6">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="relative pl-4 border-l border-slate-100">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{exp.position}</h3>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tabular-nums">
                                                    {exp.startDate} — {exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: theme.color }}>{exp.company}</p>
                                            <p className="text-[12px] text-slate-500 leading-snug">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Code className="w-4 h-4 text-slate-400" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Selected Projects</h2>
                                    <div className="flex-1 h-[1px] bg-slate-100" />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    {data.projects.map((project) => (
                                        <div key={project.id} className="p-4 rounded-md bg-white border border-slate-100 hover:shadow-sm transition-shadow">
                                            <h3 className="text-[12px] font-black text-slate-800 uppercase mb-1">{project.name}</h3>
                                            <p className="text-[11px] text-slate-500 leading-tight mb-2 italic">
                                                {project.description}
                                            </p>
                                            {project.technologies && (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.map(t => (
                                                        <span key={t} className="text-[8px] font-black border border-slate-100 px-1 py-0.5 rounded text-slate-400">
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

                    {/* Sidebar: Skills & Education */}
                    <div className="md:col-span-4 space-y-8">
                        {/* Skills Breakdown */}
                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b pb-2 italic">Expertise</h2>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {data.skills.map((skill) => (
                                            <span key={skill.id} className="px-2 py-1 bg-slate-900 text-white rounded text-[9px] font-black uppercase tracking-widest shadow-sm">
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b pb-2 italic">Credentials</h2>
                                <div className="space-y-4">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="group">
                                            <div className="flex justify-between items-start mb-0.5">
                                                <h3 className="text-[11px] font-black text-slate-800 uppercase leading-tight">{edu.degree}</h3>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-400 leading-tight mb-1">{edu.institution}</p>
                                            <span className="text-[8px] font-black text-white px-1.5 py-0.5 rounded uppercase" style={{ backgroundColor: theme.color }}>
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 border-b pb-2 italic">Linguistics</h2>
                                <div className="space-y-2">
                                    {data.languages.map((lang) => (
                                        <div key={lang.id} className="flex justify-between items-center bg-slate-50 px-2 py-1.5 rounded">
                                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{lang.name}</span>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Micro Footer */}
            <footer className="mt-12 pt-4 border-t border-slate-100 flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] text-slate-300">
                <span>Ref: ISO-RESUME-8.2</span>
                <span className="italic">Confidential & Non-Transferable</span>
            </footer>
        </div>
    );
}
