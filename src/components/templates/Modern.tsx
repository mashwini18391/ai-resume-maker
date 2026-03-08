import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap, Wrench, FolderKanban, Languages, Award, User, FileText } from "lucide-react";

export function ModernTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="flex min-h-[1100px] bg-white text-slate-800 shadow-sm print:shadow-none"
            style={{
                fontFamily: theme.font || "Inter, sans-serif",
                lineHeight: theme.spacing,
            }}
        >
            {/* Sidebar (35%) */}
            <aside className="w-[320px] bg-slate-50 p-8 border-r border-slate-100 flex flex-col gap-8">
                {/* Profile Header in Sidebar */}
                <div className="space-y-4">
                    <div
                        className="w-20 h-1 bg-primary mb-6 rounded-full"
                        style={{ backgroundColor: theme.color }}
                    />
                    <h1 className="text-3xl font-black tracking-tighter leading-none break-words">
                        {data.personalInfo.fullName?.split(' ')[0]}<br />
                        <span style={{ color: theme.color }}>{data.personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                        {data.experience[0]?.position || "Professional"}
                    </p>
                </div>

                {/* Contact Info */}
                <section className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Contact</h2>
                    <div className="space-y-3 text-[13px]">
                        {data.personalInfo.email && (
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                                    <Mail className="w-3.5 h-3.5" style={{ color: theme.color }} />
                                </div>
                                <span className="truncate">{data.personalInfo.email}</span>
                            </div>
                        )}
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                                    <Phone className="w-3.5 h-3.5" style={{ color: theme.color }} />
                                </div>
                                <span>{data.personalInfo.phone}</span>
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                                    <MapPin className="w-3.5 h-3.5" style={{ color: theme.color }} />
                                </div>
                                <span>{data.personalInfo.location}</span>
                            </div>
                        )}
                        {data.personalInfo.linkedin && (
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                                    <Linkedin className="w-3.5 h-3.5" style={{ color: theme.color }} />
                                </div>
                                <span className="truncate">LinkedIn</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Expertise</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-slate-200 bg-white transition-all hover:border-primary/30"
                                    style={{ borderLeft: `3px solid ${theme.color}` }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {data.languages && data.languages.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Languages</h2>
                        <div className="space-y-3">
                            {data.languages.map((lang) => (
                                <div key={lang.id} className="group">
                                    <div className="flex justify-between items-center text-[12px] mb-1">
                                        <span className="font-bold">{lang.name}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{lang.level}</span>
                                    </div>
                                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{
                                                backgroundColor: theme.color,
                                                width: lang.level.toLowerCase().includes('native') ? '100%' :
                                                    lang.level.toLowerCase().includes('fluent') ? '90%' :
                                                        lang.level.toLowerCase().includes('advanced') ? '75%' :
                                                            lang.level.toLowerCase().includes('intermediate') ? '50%' : '30%'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Main Content (65%) */}
            <main className="flex-1 p-12 space-y-10">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <User className="w-5 h-5" style={{ color: theme.color }} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight border-b-2 flex-1 pb-1 border-slate-50 uppercase text-[15px]">Profile Summary</h2>
                        </div>
                        <p className="text-[14px] leading-relaxed text-slate-600 font-medium italic pl-4 border-l-2" style={{ borderLeftColor: `${theme.color}40` }}>
                            {data.personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <Briefcase className="w-5 h-5" style={{ color: theme.color }} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight border-b-2 flex-1 pb-1 border-slate-50 uppercase text-[15px]">Experience</h2>
                        </div>
                        <div className="space-y-8 relative">
                            {/* Vertical connecting line */}
                            <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-slate-100" />

                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8">
                                    <div
                                        className="absolute left-0 top-[6px] w-[14px] h-[14px] rounded-full border-2 bg-white z-10"
                                        style={{ borderColor: theme.color }}
                                    />
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-black text-[17px] tracking-tight">{exp.position}</h3>
                                        <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-[14px] font-bold mb-3" style={{ color: theme.color }}>{exp.company}</p>
                                    <div className="text-[13px] text-slate-500 whitespace-pre-line leading-relaxed font-medium">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <FolderKanban className="w-5 h-5" style={{ color: theme.color }} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight border-b-2 flex-1 pb-1 border-slate-50 uppercase text-[15px]">Projects</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {data.projects.map((project) => (
                                <div key={project.id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-black text-[16px] group-hover:text-primary transition-colors" style={{ color: theme.color }}>{project.name}</h3>
                                        {project.link && (
                                            <a href={project.link} target="_blank" className="p-1 rounded-md bg-slate-50 text-slate-400 hover:text-primary hover:bg-white transition-all">
                                                <Globe className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-[13px] text-slate-500 mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech) => (
                                                <span key={tech} className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 bg-slate-50 rounded border border-slate-100 text-slate-400">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <GraduationCap className="w-5 h-5" style={{ color: theme.color }} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight border-b-2 flex-1 pb-1 border-slate-50 uppercase text-[15px]">Education</h2>
                        </div>
                        <div className="space-y-6">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="relative pl-6 border-l-2 border-slate-100">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-black text-[15px]">{edu.degree} {edu.field && `• ${edu.field}`}</h3>
                                        <span className="text-[11px] font-bold text-slate-400">
                                            {edu.startDate} — {edu.endDate}
                                        </span>
                                    </div>
                                    <p className="text-[13px] font-bold mb-1" style={{ color: theme.color }}>{edu.institution}</p>
                                    {edu.gpa && <p className="text-[11px] font-black uppercase text-slate-400">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {data.certifications && data.certifications.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <Award className="w-5 h-5" style={{ color: theme.color }} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight border-b-2 flex-1 pb-1 border-slate-50 uppercase text-[15px]">Certifications</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {data.certifications.map((cert) => (
                                <div key={cert.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                                    <h3 className="font-bold text-[13px] leading-tight mb-1">{cert.name}</h3>
                                    <p className="text-[11px] text-slate-400 font-medium">{cert.issuer} • {cert.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
