import { ResumeData } from "@/types/resume";
import { Star, Sparkles, Zap, Heart, Rocket, Target, Smile } from "lucide-react";

export function CreativeTemplate({ data }: { data: ResumeData }) {
    const { theme } = data;

    return (
        <div
            className="p-0 bg-white min-h-[1100px] text-black overflow-hidden relative"
            style={{
                fontFamily: "Space Grotesk, sans-serif, system-ui",
                lineHeight: theme.spacing,
            }}
        >
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-100px] right-[-100px] w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.color }} />
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.color }} />

            <div className="px-16 py-20 relative z-10">
                {/* Hero Header */}
                <header className="mb-24 grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-12 lg:col-span-8">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 text-black text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] transition-transform hover:rotate-0"
                            style={{ backgroundColor: theme.color }}
                        >
                            <Sparkles className="w-4 h-4" />
                            {data.experience[0]?.position || "Available for work"}
                        </div>
                        <h1 className="text-8xl font-black uppercase leading-[0.75] tracking-tighter mb-8 italic drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                            {data.personalInfo.fullName || "Your Name"}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400">
                            {data.personalInfo.email && <span className="hover:text-black transition-colors border-b-2 border-black/5 pb-1">{data.personalInfo.email}</span>}
                            {data.personalInfo.phone && <span className="hover:text-black transition-colors border-b-2 border-black/5 pb-1">{data.personalInfo.phone}</span>}
                            {data.personalInfo.location && <span className="hover:text-black transition-colors border-b-2 border-black/5 pb-1">{data.personalInfo.location}</span>}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-20">
                    {/* Left Rail */}
                    <div className="col-span-12 lg:col-span-4 space-y-16">
                        {/* Summary */}
                        {data.personalInfo.summary && (
                            <section className="bg-black text-white p-10 rounded-none border-t-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] rotate-[1.5deg]" style={{ borderTopColor: theme.color }}>
                                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-3">
                                    <Smile className="w-6 h-6" style={{ color: theme.color }} />
                                    The Vibe
                                </h2>
                                <p className="text-[14px] font-bold leading-relaxed italic opacity-80">
                                    "{data.personalInfo.summary}"
                                </p>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                                    <Star className="w-7 h-7 fill-black" style={{ color: theme.color }} />
                                    Power Ups
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {data.skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="px-5 py-3 border-4 border-black text-xs font-black uppercase tracking-widest hover:translate-x-1 hover:translate-y-[-4px] transition-all cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                                            style={{ backgroundColor: `${theme.color}10` }}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                                    <Zap className="w-7 h-7 fill-black" style={{ color: theme.color }} />
                                    The Lore
                                </h2>
                                <div className="space-y-6">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)]">
                                            <h3 className="font-black text-sm uppercase mb-1">{edu.degree}</h3>
                                            <p className="text-xs font-black text-slate-400 italic">{edu.institution}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Main Feed */}
                    <div className="col-span-12 lg:col-span-8 space-y-24">
                        {/* Experience */}
                        {data.experience.length > 0 && (
                            <section>
                                <h2 className="text-5xl font-black uppercase mb-12 border-b-8 border-black pb-4 italic tracking-tighter">
                                    The Journey
                                </h2>
                                <div className="space-y-16">
                                    {data.experience.map((exp) => (
                                        <div key={exp.id} className="group relative">
                                            <div className="absolute left-[-20px] top-0 bottom-0 w-2 bg-black opacity-5 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: theme.color }} />
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-3xl font-black uppercase group-hover:italic transition-all leading-none mb-2" style={{ color: theme.color }}>{exp.position}</h3>
                                                    <p className="text-xl font-black opacity-40 uppercase tracking-tighter">@ {exp.company}</p>
                                                </div>
                                                <span className="text-[10px] font-black uppercase bg-black text-white px-4 py-1.5 border-4 border-black rotate-[2deg]">
                                                    {exp.startDate} — {exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-[15px] font-bold leading-relaxed text-slate-500 group-hover:text-black transition-colors">
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
                                <h2 className="text-5xl font-black uppercase mb-12 border-b-8 border-black pb-4 italic tracking-tighter">
                                    Recent Drops
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {data.projects.map((project) => (
                                        <div key={project.id} className="p-8 border-4 border-black hover:translate-x-1 hover:translate-y-[-4px] transition-all cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white group">
                                            <h3 className="font-black text-xl uppercase mb-4 group-hover:italic" style={{ color: theme.color }}>{project.name}</h3>
                                            <p className="text-[13px] font-bold text-slate-500 leading-relaxed mb-6 group-hover:text-black">{project.description}</p>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300">
                                                <Target className="w-4 h-4" />
                                                Live Now
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Deco Bar */}
            <div className="h-10 w-full flex border-t-8 border-black">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 transition-all hover:flex-[2]"
                        style={{ backgroundColor: i % 2 === 0 ? theme.color : "black" }}
                    />
                ))}
            </div>
        </div>
    );
}
