import { ModernTemplate } from "./Modern";
import { MinimalTemplate } from "./Minimal";
import { CorporateTemplate } from "./Corporate";
import { StudentTemplate } from "./Student";
import { DeveloperTemplate } from "./Developer";
import { CreativeTemplate } from "./Creative";
import { CompactTemplate } from "./Compact";
import { DarkModeTemplate } from "./DarkMode";

export const RESUME_TEMPLATES = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    corporate: CorporateTemplate,
    student: StudentTemplate,
    developer: DeveloperTemplate,
    creative: CreativeTemplate,
    compact: CompactTemplate,
    dark: DarkModeTemplate,
} as const;

export type TemplateId = keyof typeof RESUME_TEMPLATES;

export const AVAILABLE_TEMPLATES = [
    { id: "modern", name: "Modern", description: "Clean and impactful" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant" },
    { id: "corporate", name: "Corporate", description: "Traditional and professional" },
    { id: "student", name: "Student", description: "Focused on potential" },
    { id: "developer", name: "Developer", description: "Tech-focused and modern" },
    { id: "creative", name: "Creative", description: "Unique and bold" },
    { id: "compact", name: "Compact", description: "High density for one-page" },
    { id: "dark", name: "Dark Mode", description: "Sleek and professional dark theme" },
] as const;
