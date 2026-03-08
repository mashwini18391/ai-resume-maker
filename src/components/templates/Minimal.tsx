import { ResumeData } from "@/types/resume";

export function MinimalTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="p-16 bg-white min-h-[1100px] text-zinc-800"
            style={{
                fontFamily: theme.font || "Inter, sans-serif",
                lineHeight: theme.spacing,
            }}
        >
            {/* Header */}
            <header className="mb-20 text-center max-w-2xl mx-auto">
                <h1
                    className="text-4xl font-serif tracking-tight mb-4 lowercase italic opacity-90"
                    style={{ color: theme.color }}
                >
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">
                    {data.experience[0]?.position || "Professional"}
                </p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-t border-b border-zinc-50 py-4">
                    {data.personalInfo.email && <span className="hover:text-zinc-600 transition-colors uppercase">{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="hover:text-zinc-600 transition-colors">{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span className="hover:text-zinc-600 transition-colors">{data.personalInfo.location}</span>}
                </div>
            </header>

            {/* Main Sections */}
            <div className="max-w-2xl mx-auto space-y-16">
                {/* Summary */}
                {data.personalInfo.summary && (
                    <section>
                        <p className="text-[13px] leading-relaxed text-zinc-500 font-serif italic text-center px-8">
                            {data.personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-10 text-center">
                            Professional Experience
                        </h2>
                        <div className="space-y-12">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="group">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <h3 className="font-serif italic text-lg opacity-90 group-hover:opacity-100 transition-opacity">
                                            {exp.position}
                                        </h3>
                                        <span className="text-[9px] text-zinc-300 font-black uppercase tracking-widest bg-zinc-50 px-2 py-0.5 rounded">
                                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-4" style={{ color: theme.color }}>{exp.company}</p>
                                    <div className="text-[13px] text-zinc-500 leading-relaxed font-medium">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-10 text-center">
                            Education
                        </h2>
                        <div className="space-y-8">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="text-center">
                                    <h3 className="font-serif italic text-base opacity-90 mb-1">{edu.degree}</h3>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 mb-1">
                                        {edu.institution} {edu.field && `• ${edu.field}`}
                                    </p>
                                    <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-tighter">
                                        {edu.startDate} — {edu.endDate}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-10 text-center">
                            Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            {data.projects.map((project) => (
                                <div key={project.id}>
                                    <h3 className="font-serif italic text-base opacity-90 mb-2">{project.name}</h3>
                                    <p className="text-[12px] text-zinc-500 leading-relaxed italic">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer info (Skills, languages) */}
                <div className="grid grid-cols-2 gap-16 pt-8 border-t border-zinc-50">
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-6">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-zinc-500 italic font-serif">
                                {data.skills.map((skill) => (
                                    <span key={skill.id}>{skill.name}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages && data.languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-6">
                                Languages
                            </h2>
                            <div className="space-y-2">
                                {data.languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-center text-[11px]">
                                        <span className="font-serif italic text-zinc-500">{lang.name}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
