export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
}

export interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface EducationItem {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
}

export interface SkillItem {
    id: string;
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
    link?: string;
    technologies?: string[];
}

export interface LanguageItem {
    id: string;
    name: string;
    level: string;
}

export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface ResumeTheme {
    color: string;
    font: string;
    spacing: number;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillItem[];
    projects: ProjectItem[];
    languages: LanguageItem[];
    certifications: CertificationItem[];
    sectionOrder: string[];
    theme: ResumeTheme;
    template: string;
}

export interface ResumeVersion {
    id: string;
    data: ResumeData;
    created_at: string;
    label?: string;
}

export interface Resume {
    id: string;
    user_id: string;
    title: string;
    template: string;
    data: ResumeData;
    is_public: boolean;
    versions?: ResumeVersion[];
    created_at: string;
    updated_at: string;
}

export const emptyResumeData: ResumeData = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    sectionOrder: ["personal", "experience", "education", "skills", "projects"],
    theme: {
        color: "#2563eb",
        font: "inter",
        spacing: 1.0,
    },
    template: "modern",
};
