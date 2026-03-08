import { ResumeData } from "@/types/resume";
import { GraduationCap, Briefcase, Code, Languages, Award, BookOpen, User } from "lucide-react";

export function StudentTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="p-16 bg-white min-h-[1100px] text-zinc-900"
            style={{
                fontFamily: theme.font || "Quicksand, sans-serif",
                lineHeight: theme.spacing,
            }}
        >
            <div className="max-w-4xl mx-auto space-y-16">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-8 bg-zinc-50 p-12 rounded-[2.5rem] border-2 border-zinc-100 shadow-sm">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white animate-pulse shadow-lg" style={{ backgroundColor: theme.color }}>
                            <GraduationCap className="w-3.5 h-3.5" />
                            Open to Opportunities
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-zinc-900">
                            {data.personalInfo.fullName || "Your Name"}
                        </h1>
                        <p className="text-xl font-bold text-zinc-400">
                            {data.education[0]?.degree || "Student"} in {data.education[0]?.field || "Major"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm font-bold text-zinc-500 md:text-right">
                        {data.personalInfo.email && <p className="hover:text-zinc-800 transition-colors uppercase tracking-tighter">{data.personalInfo.email}</p>}
                        {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                        {data.personalInfo.location && <p className="flex items-center gap-2 justify-center md:justify-end">{data.personalInfo.location}</p>}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Left Column: Education & Experience (Main focus for students) */}
                    <div className="md:col-span-12 lg:col-span-8 space-y-16">
                        {/* Summary */}
                        {data.personalInfo.summary && (
                            <section className="relative">
                                <div className="absolute -left-6 top-0 bottom-0 w-1.5 rounded-full opacity-20" style={{ backgroundColor: theme.color }} />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-6 flex items-center gap-3">
                                    <User className="w-4 h-4 text-zinc-400" /> profile
                                </h2>
                                <p className="text-[15px] leading-relaxed text-zinc-500 font-medium italic">
                                    "{data.personalInfo.summary}"
                                </p>
                            </section>
                        )}

                        {/* Education (Timeline Style) */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-8 flex items-center gap-3">
                                    <BookOpen className="w-4 h-4 text-zinc-400" /> academic path
                                </h2>
                                <div className="space-y-12">
                                    {data.education.map((edu, idx) => (
                                        <div key={edu.id} className="relative pl-10">
                                            {/* Timeline Line */}
                                            {idx !== data.education.length - 1 && (
                                                <div className="absolute left-[7px] top-8 bottom-[-48px] w-0.5 bg-zinc-100" />
                                            )}
                                            {/* Dot */}
                                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-md ring-2 ring-zinc-50" style={{ backgroundColor: theme.color }} />

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="text-xl font-black text-zinc-800">{edu.degree}</h3>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                                                        {edu.startDate} — {edu.endDate}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{edu.institution}</p>
                                                {edu.field && <p className="text-sm text-zinc-400 font-bold">{edu.field}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-8 flex items-center gap-3">
                                    <Briefcase className="w-4 h-4 text-zinc-400" /> practical experience
                                </h2>
                                <div className="space-y-10">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="group p-8 rounded-[2rem] border-2 border-zinc-50 hover:border-zinc-100 hover:bg-zinc-50/50 transition-all shadow-sm hover:shadow-md">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-black text-zinc-800 group-hover:italic transition-all uppercase tracking-tight">{exp.position}</h3>
                                                    <p className="font-bold opacity-40 uppercase tracking-widest text-xs">@ {exp.company}</p>
                                                </div>
                                                <span className="text-[9px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-tighter" style={{ backgroundColor: theme.color }}>
                                                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">
                                                {exp.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Skills, Projects, Languages */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-16">
                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-8">Skillset</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill) => (
                                        <span key={skill.id} className="px-4 py-2 bg-zinc-50 border-2 border-zinc-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:scale-105 transition-transform cursor-default shadow-sm">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-8">Side Quests</h2>
                                <div className="space-y-6">
                                    {data.projects.map((project) => (
                                        <div key={project.id} className="space-y-2">
                                            <h3 className="text-md font-black text-zinc-800 uppercase tracking-tight leading-tight">{project.name}</h3>
                                            <p className="text-xs text-zinc-400 font-bold leading-relaxed italic">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages && data.languages.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-300 mb-8">Communication</h2>
                                <div className="space-y-4">
                                    {data.languages.map((lang) => (
                                        <div key={lang.id} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-black uppercase tracking-widest">{lang.name}</span>
                                                <span className="text-[9px] font-black opacity-30">{lang.level}</span>
                                            </div>
                                            <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden">
                                                <div className="h-full bg-zinc-200 rounded-full w-[80%] transition-all duration-1000" style={{ backgroundColor: theme.color + "40" }} />
                                            </div>
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
