import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function CorporateTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="bg-white min-h-[1100px] text-slate-900 shadow-sm print:shadow-none"
            style={{
                fontFamily: theme.font || "Inter, sans-serif",
                lineHeight: theme.spacing,
            }}
        >
            {/* Top Accent Bar */}
            <div className="h-4 w-full" style={{ backgroundColor: theme.color }} />

            <div className="p-12 space-y-12">
                {/* Header Section */}
                <header className="flex justify-between items-start border-b-2 pb-10" style={{ borderBottomColor: `${theme.color}20` }}>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black uppercase tracking-tight">
                            {data.personalInfo.fullName || "Your Name"}
                        </h1>
                        <p className="text-lg font-bold text-slate-500 uppercase tracking-[0.2em]" style={{ color: theme.color }}>
                            {data.experience[0]?.position || "Professional Title"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-right">
                        {data.personalInfo.email && (
                            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-600">
                                <span>{data.personalInfo.email}</span>
                                <Mail className="w-3.5 h-3.5" />
                            </div>
                        )}
                        {data.personalInfo.phone && (
                            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-600">
                                <span>{data.personalInfo.phone}</span>
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-600">
                                <span>{data.personalInfo.location}</span>
                                <MapPin className="w-3.5 h-3.5" />
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-12">
                    {/* Left Side: Summary & Experience (70%) */}
                    <div className="col-span-8 space-y-12">
                        {/* Summary */}
                        {data.personalInfo.summary && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-4">
                                    <span>Executive Summary</span>
                                    <div className="flex-1 h-[1px] bg-slate-100" />
                                </h2>
                                <p className="text-[14px] leading-relaxed text-slate-600 font-medium">
                                    {data.personalInfo.summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-4">
                                    <span>Professional Experience</span>
                                    <div className="flex-1 h-[1px] bg-slate-100" />
                                </h2>
                                <div className="space-y-10">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="relative">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <h3 className="font-black text-[16px] uppercase tracking-tight">{exp.position}</h3>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 border border-slate-100 rounded">
                                                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[14px] font-bold mb-3" style={{ color: theme.color }}>{exp.company}</p>
                                            <div className="text-[13px] text-slate-500 leading-relaxed font-medium pl-4 border-l-2 border-slate-50">
                                                {exp.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Side: Education, Skills, Langs (30%) */}
                    <div className="col-span-4 space-y-12">
                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Education</h2>
                                <div className="space-y-6">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="space-y-1">
                                            <h3 className="font-black text-[13px] leading-tight">{edu.degree}</h3>
                                            <p className="text-[12px] font-bold text-slate-500 italic">{edu.institution}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                                {edu.startDate} — {edu.endDate}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Expertise</h2>
                                <div className="flex flex-col gap-2">
                                    {data.skills.map((skill) => (
                                        <div key={skill.id} className="flex items-center justify-between text-[12px] font-bold py-1 border-b border-slate-50 hover:bg-slate-50 transition-colors px-1">
                                            <span className="text-slate-700">{skill.name}</span>
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Languages</h2>
                                <div className="space-y-3">
                                    {data.languages.map((lang) => (
                                        <div key={lang.id} className="flex justify-between items-center text-[12px] font-bold">
                                            <span className="text-slate-600">{lang.name}</span>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications && data.certifications.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Accreditation</h2>
                                <div className="space-y-4">
                                    {data.certifications.map((cert) => (
                                        <div key={cert.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-lg">
                                            <p className="font-black text-[11px] leading-tight uppercase mb-1">{cert.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold">{cert.issuer} • {cert.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
