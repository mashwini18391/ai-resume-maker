"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import {
    Resume,
    ResumeData,
    ResumeVersion,
    ExperienceItem,
    EducationItem,
    SkillItem,
    ProjectItem,
    LanguageItem,
    CertificationItem,
    emptyResumeData
} from "@/types/resume";
import { updateResume, toggleSharing, deleteResume } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Save,
    Sparkles,
    Plus,
    Trash2,
    Loader2,
    User,
    Briefcase,
    GraduationCap,
    Wrench,
    Eye,
    FileText as FileTextIcon,
    Download,
    Palette,
    Settings,
    GripVertical,
    Share2,
    Copy,
    CheckCircle2,
    Languages,
    Award,
    Target,
    LineChart,
    History,
    RefreshCw,
    Globe,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useReactToPrint } from "react-to-print";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RESUME_TEMPLATES, TemplateId, AVAILABLE_TEMPLATES } from "@/components/templates/TemplateRegistry";


// Sortable Section Component
function SortableSection({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="group mb-4">
            <Card>
                <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
                            <GripVertical className="w-4 h-4" />
                        </div>
                        <CardTitle className="text-sm font-semibold">{label}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}

export function BuilderClient({ resume }: { resume: Resume }) {
    // Merge database data with defaults to prevent "undefined" crashes
    const initialData = useMemo(() => {
        const baseData = resume.data || {};
        return {
            ...emptyResumeData,
            ...baseData,
            personalInfo: { ...emptyResumeData.personalInfo, ...(baseData.personalInfo || {}) },
            theme: { ...emptyResumeData.theme, ...(baseData.theme || {}) },
            experience: baseData.experience || [],
            education: baseData.education || [],
            skills: baseData.skills || [],
            projects: baseData.projects || [],
            languages: baseData.languages || [],
            certifications: baseData.certifications || [],
            sectionOrder: baseData.sectionOrder || emptyResumeData.sectionOrder,
        };
    }, [resume.data]);

    const [data, setData] = useState<ResumeData>(initialData);
    const [isPublic, setIsPublic] = useState(resume.is_public || false);
    const [saving, setSaving] = useState(false);
    const [aiLoading, setAiLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("content");
    const [versions, setVersions] = useState<ResumeVersion[]>(resume.versions || []);

    const handleRestore = (versionData: ResumeData) => {
        setData(versionData);
        toast.success("Version restored! Don't forget to save.");
    };
    const [showPreview, setShowPreview] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [jdText, setJdText] = useState("");
    const [jdAnalysis, setJdAnalysis] = useState<{ matchScore: number; missingKeywords: string[]; improvementSuggestions: string[] } | null>(null);
    const [resumeScore, setResumeScore] = useState<{ overallScore: number; sectionScores: Record<string, number>; topSuggestions: string[] } | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handlePrint = useReactToPrint({
        contentRef: previewRef,
        documentTitle: resume.title,
    });

    const updatePersonalInfo = useCallback(
        (field: string, value: string) => {
            setData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, [field]: value },
            }));
        },
        []
    );

    const handleSave = async () => {
        setSaving(true);
        try {
            // Create a new version
            const newVersion = {
                id: crypto.randomUUID(),
                data: JSON.parse(JSON.stringify(data)),
                created_at: new Date().toISOString(),
                label: "Auto-saved"
            };

            const updatedVersions = [...(versions || []), newVersion].slice(-10);

            await updateResume(resume.id, {
                data,
                is_public: isPublic,
                // versions: updatedVersions // Temporarily disabled to check if column exists
            });

            setVersions(updatedVersions);
            toast.success("Resume saved successfully!");
        } catch (error) {
            console.error("Save error details:", error);
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const handleToggleSharing = async () => {
        try {
            const newStatus = !isPublic;
            await toggleSharing(resume.id, newStatus);
            setIsPublic(newStatus);
            toast.success(newStatus ? "Public sharing enabled" : "Resume is now private");
        } catch {
            toast.error("Failed to update sharing settings");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this resume? This action cannot be undone.");
        if (!confirmed) return;

        try {
            await deleteResume(resume.id);
            toast.success("Resume deleted successfully");
            window.location.href = "/dashboard";
        } catch {
            toast.error("Failed to delete resume");
        }
    };

    const copyShareLink = () => {
        const url = `${window.location.origin}/share/${resume.id}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    // AI generation
    const generateWithAI = async (type: string, prompt: string, callback: (content: string) => void) => {
        setAiLoading(type);
        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, prompt }),
            });
            const result = await res.json();
            if (result.error) {
                toast.error(result.error);
            } else {
                callback(result.content);
                toast.success("AI content generated!");
            }
        } catch {
            toast.error("Failed to generate content");
        } finally {
            setAiLoading(null);
        }
    };

    // AI Bullet Improver
    const improveBullet = async (expId: string, currentText: string) => {
        setAiLoading(`bullet-${expId}`);
        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "bullet_improve", prompt: currentText }),
            });
            const result = await res.json();
            if (result.error) throw new Error(result.error);

            updateExperience(expId, "description", result.content);
            toast.success("Bullet point improved!");
        } catch (error) {
            toast.error("Failed to improve bullet point");
        } finally {
            setAiLoading(null);
        }
    };

    const analyzeJD = async () => {
        if (!jdText.trim()) return toast.error("Please paste a job description");
        setAiLoading("jd-analyze");
        try {
            const resumeText = JSON.stringify(data);
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "analyze_jd", prompt: `Resume: ${resumeText}\n\nJob Description: ${jdText}` }),
            });
            const result = await res.json();
            if (result.error) throw new Error(result.error);

            let content = result.content.trim();
            if (content.startsWith("```json")) content = content.substring(7, content.length - 3);
            else if (content.startsWith("```")) content = content.substring(3, content.length - 3);

            const parsedJd = JSON.parse(content);
            setJdAnalysis({
                matchScore: parsedJd.matchScore || 0,
                missingKeywords: parsedJd.missingKeywords || [],
                improvementSuggestions: parsedJd.improvementSuggestions || []
            });
            toast.success("Analysis complete!");
        } catch (error) {
            toast.error("Failed to analyze JD");
        } finally {
            setAiLoading(null);
        }
    };

    const getResumeScore = async () => {
        setAiLoading("scoring");
        try {
            const resumeText = JSON.stringify(data);
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "score_resume", prompt: resumeText }),
            });
            const result = await res.json();
            if (result.error) throw new Error(result.error);

            let content = result.content.trim();
            if (content.startsWith("```json")) content = content.substring(7, content.length - 3);
            else if (content.startsWith("```")) content = content.substring(3, content.length - 3);

            const parsedScore = JSON.parse(content);
            setResumeScore({
                overallScore: parsedScore.overallScore || 0,
                sectionScores: parsedScore.sectionScores || {},
                topSuggestions: parsedScore.topSuggestions || []
            });
            toast.success("Scoring complete!");
        } catch (error) {
            toast.error("Failed to get score");
        } finally {
            setAiLoading(null);
        }
    };

    // Experience CRUD
    const addExperience = () => {
        const newExp: ExperienceItem = {
            id: crypto.randomUUID(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        };
        setData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const updateExperience = (id: string, field: string, value: string | boolean) => {
        setData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        }));
    };

    const removeExperience = (id: string) => {
        setData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }));
    };

    // Education CRUD
    const addEducation = () => {
        const newEdu: EducationItem = {
            id: crypto.randomUUID(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            gpa: "",
        };
        setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            education: prev.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const removeEducation = (id: string) => {
        setData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    // Projects CRUD
    const addProject = () => {
        const newProject: ProjectItem = {
            id: crypto.randomUUID(),
            name: "",
            description: "",
            link: "",
            technologies: [],
        };
        setData((prev) => ({ ...prev, projects: [...prev.projects || [], newProject] }));
    };

    const updateProject = (id: string, field: string, value: any) => {
        setData((prev) => ({
            ...prev,
            projects: (prev.projects || []).map((p) =>
                p.id === id ? { ...p, [field]: value } : p
            ),
        }));
    };

    const removeProject = (id: string) => {
        setData((prev) => ({
            ...prev,
            projects: (prev.projects || []).filter((p) => p.id !== id),
        }));
    };

    // Skills CRUD
    const addSkill = () => {
        const newSkill: SkillItem = {
            id: crypto.randomUUID(),
            name: "",
            level: "intermediate",
        };
        setData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
    };

    const updateSkill = (id: string, field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill) =>
                skill.id === id ? { ...skill, [field]: value } : skill
            ),
        }));
    };

    const removeSkill = (id: string) => {
        setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== id),
        }));
    };

    // Drag and Drop handler
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setData((prev) => {
                const oldIndex = prev.sectionOrder.indexOf(active.id as string);
                const newIndex = prev.sectionOrder.indexOf(over?.id as string);
                return {
                    ...prev,
                    sectionOrder: arrayMove(prev.sectionOrder, oldIndex, newIndex),
                };
            });
        }
    };

    // ATS Score Calculator (Simplified)
    const atsScore = useMemo(() => {
        let score = 0;
        if (data.personalInfo.summary) score += 15;
        if (data.experience.length >= 2) score += 20;
        if (data.education.length >= 1) score += 15;
        if (data.skills.length >= 5) score += 20;
        if (data.projects && data.projects.length >= 2) score += 15;
        if (data.personalInfo.email && data.personalInfo.phone) score += 15;
        return score;
    }, [data]);

    const ResumeTemplate = RESUME_TEMPLATES[data.template as TemplateId || "modern"];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="font-bold text-lg leading-none">{resume.title}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={atsScore > 70 ? "success" : "warning"} className="text-[10px] h-4">
                                    ATS Score: {atsScore}%
                                </Badge>
                                {isPublic && (
                                    <Badge variant="secondary" className="text-[10px] h-4 gap-1">
                                        <Share2 className="w-2.5 h-2.5" /> Public
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant={showPreview ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowPreview(!showPreview)}
                            className="rounded-full px-4"
                        >
                            {showPreview ? <FileTextIcon className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showPreview ? "Editor" : "Preview"}
                        </Button>
                        <Separator orientation="vertical" className="h-6 mx-1" />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePrint()}
                            className="rounded-full"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={saving}
                            className="rounded-full px-6 shadow-lg shadow-primary/20"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className={`flex-1 overflow-y-auto p-6 bg-slate-50 transition-all duration-300 ${showPreview ? 'hidden lg:block lg:max-w-[500px] border-r' : 'w-full'}`}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
                        <TabsList className="w-full justify-start overflow-x-auto h-12 bg-transparent border-b rounded-none p-0 gap-6 mb-8">
                            <TabsTrigger value="personal" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">Personal</TabsTrigger>
                            <TabsTrigger value="content" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">Content</TabsTrigger>
                            <TabsTrigger value="skills" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">Skills</TabsTrigger>
                            <TabsTrigger value="analyze" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">Analysis</TabsTrigger>
                            <TabsTrigger value="design" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-2">Design</TabsTrigger>
                            <TabsTrigger value="settings" className="flex-1 py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none transition-all duration-300">
                                <Settings className="w-4 h-4 mb-1 mx-auto block" />
                                <span className="text-[10px] font-bold uppercase tracking-wider block">Settings</span>
                            </TabsTrigger>
                            <TabsTrigger value="history" className="flex-1 py-3 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none transition-all duration-300">
                                <History className="w-4 h-4 mb-1 mx-auto block" />
                                <span className="text-[10px] font-bold uppercase tracking-wider block">History</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Personal Info Tab */}
                        <TabsContent value="personal" className="mt-0 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Personal Information</CardTitle>
                                            <CardDescription>Tell us about yourself</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Full Name</Label>
                                            <Input
                                                value={data.personalInfo.fullName}
                                                onChange={e => updatePersonalInfo("fullName", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email</Label>
                                            <Input
                                                value={data.personalInfo.email}
                                                onChange={e => updatePersonalInfo("email", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone</Label>
                                            <Input
                                                value={data.personalInfo.phone}
                                                onChange={e => updatePersonalInfo("phone", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Location</Label>
                                            <Input
                                                value={data.personalInfo.location}
                                                onChange={e => updatePersonalInfo("location", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Professional Summary</Label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-primary hover:text-primary hover:bg-primary/5 gap-1"
                                                onClick={() => generateWithAI("summary", `Generate a summary for ${data.personalInfo.fullName} with these skills: ${data.skills.map(s => s.name).join(", ")}`, c => updatePersonalInfo("summary", c))}
                                                disabled={!!aiLoading}
                                            >
                                                {aiLoading === "summary" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                                Generate summary
                                            </Button>
                                        </div>
                                        <Textarea
                                            value={data.personalInfo.summary}
                                            onChange={e => updatePersonalInfo("summary", e.target.value)}
                                            rows={5}
                                            className="resize-none"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Content Tab with Drag and Drop */}
                        <TabsContent value="content" className="mt-0">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={data.sectionOrder || []}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {data.sectionOrder.map((sectionId) => (
                                        <SortableSection key={sectionId} id={sectionId} label={sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}>
                                            {sectionId === "experience" && (
                                                <div className="space-y-4 pt-2">
                                                    {(data.experience || []).map(exp => (
                                                        <div key={exp.id} className="p-4 border rounded-xl space-y-3 relative group/item">
                                                            <Button
                                                                variant="ghost" size="icon"
                                                                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-opacity text-destructive"
                                                                onClick={() => removeExperience(exp.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <Input placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, "company", e.target.value)} />
                                                                <Input placeholder="Position" value={exp.position} onChange={e => updateExperience(exp.id, "position", e.target.value)} />
                                                                <Input placeholder="Start Date" value={exp.startDate} onChange={e => updateExperience(exp.id, "startDate", e.target.value)} />
                                                                <Input placeholder="End Date" value={exp.endDate} onChange={e => updateExperience(exp.id, "endDate", e.target.value)} />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <div className="flex justify-between items-center gap-2">
                                                                    <span className="text-xs font-medium text-muted-foreground">Description</span>
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            variant="ghost" size="sm" className="h-6 text-[10px] gap-1 text-primary hover:bg-primary/5"
                                                                            onClick={() => improveBullet(exp.id, exp.description)}
                                                                            disabled={aiLoading === `bullet-${exp.id}`}
                                                                        >
                                                                            {aiLoading === `bullet-${exp.id}` ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <RefreshCw className="w-2.5 h-2.5" />}
                                                                            Improve with AI
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost" size="sm" className="h-6 text-[10px] gap-1 text-primary"
                                                                            onClick={() => generateWithAI("bullet", `Bullets for ${exp.position} at ${exp.company}`, c => updateExperience(exp.id, "description", c))}
                                                                        >
                                                                            <Sparkles className="w-2.5 h-2.5" /> AI Assist
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <Textarea value={exp.description} onChange={e => updateExperience(exp.id, "description", e.target.value)} rows={3} className="text-sm" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" className="w-full border-dashed py-6" onClick={addExperience}>
                                                        <Plus className="w-4 h-4 mr-2" /> Add Experience
                                                    </Button>
                                                </div>
                                            )}
                                            {sectionId === "education" && (
                                                <div className="space-y-4 pt-2">
                                                    {data.education.map(edu => (
                                                        <div key={edu.id} className="p-4 border rounded-xl space-y-3 relative group/item">
                                                            <Button
                                                                variant="ghost" size="icon"
                                                                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-opacity text-destructive"
                                                                onClick={() => removeEducation(edu.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                            <Input placeholder="Institution" value={edu.institution} onChange={e => updateEducation(edu.id, "institution", e.target.value)} />
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, "degree", e.target.value)} />
                                                                <Input placeholder="GPA" value={edu.gpa} onChange={e => updateEducation(edu.id, "gpa", e.target.value)} />
                                                                <Input placeholder="Start Date" value={edu.startDate} onChange={e => updateEducation(edu.id, "startDate", e.target.value)} />
                                                                <Input placeholder="End Date" value={edu.endDate} onChange={e => updateEducation(edu.id, "endDate", e.target.value)} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" className="w-full border-dashed py-6" onClick={addEducation}>
                                                        <Plus className="w-4 h-4 mr-2" /> Add Education
                                                    </Button>
                                                </div>
                                            )}
                                            {sectionId === "projects" && (
                                                <div className="space-y-4 pt-2">
                                                    {(data.projects || []).map(project => (
                                                        <div key={project.id} className="p-4 border rounded-xl space-y-3 relative group/item">
                                                            <Button
                                                                variant="ghost" size="icon"
                                                                className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-opacity text-destructive"
                                                                onClick={() => removeProject(project.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                            <Input placeholder="Project Name" value={project.name} onChange={e => updateProject(project.id, "name", e.target.value)} />
                                                            <Textarea placeholder="Project Description" value={project.description} onChange={e => updateProject(project.id, "description", e.target.value)} rows={2} className="text-sm" />
                                                            <Input placeholder="Technologies (comma separated)" value={project.technologies?.join(", ") || ""} onChange={e => updateProject(project.id, "technologies", e.target.value.split(",").map(s => s.trim()))} />
                                                        </div>
                                                    ))}
                                                    <Button variant="outline" className="w-full border-dashed py-6" onClick={addProject}>
                                                        <Plus className="w-4 h-4 mr-2" /> Add Project
                                                    </Button>
                                                </div>
                                            )}
                                        </SortableSection>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </TabsContent>

                        {/* Skills Tab */}
                        <TabsContent value="skills" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                <Wrench className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <CardTitle>Skills & Expertise</CardTitle>
                                                <CardDescription>What are you good at?</CardDescription>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost" size="sm" className="text-primary gap-1"
                                            onClick={() => generateWithAI("skills", `Suggest skills for a ${data.experience[0]?.position || "professional"}`, c => {
                                                const news = c.split("\n").filter(s => s.trim()).map(n => ({ id: crypto.randomUUID(), name: n.trim(), level: "intermediate" as const }));
                                                setData(prev => ({ ...prev, skills: [...prev.skills, ...news] }));
                                            })}
                                        >
                                            <Sparkles className="w-3.5 h-3.5" /> Suggest
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {data.skills.map(skill => (
                                            <Badge key={skill.id} variant="secondary" className="px-3 py-1 gap-1 group">
                                                {skill.name}
                                                <button onClick={() => removeSkill(skill.id)} className="ml-1 text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add a skill..."
                                            onKeyDown={e => {
                                                if (e.key === "Enter") {
                                                    const val = (e.target as HTMLInputElement).value;
                                                    if (val.trim()) {
                                                        setData(prev => ({ ...prev, skills: [...prev.skills, { id: crypto.randomUUID(), name: val.trim(), level: "intermediate" }] }));
                                                        (e.target as HTMLInputElement).value = "";
                                                    }
                                                }
                                            }}
                                        />
                                        <Button size="icon" onClick={() => {
                                            const input = document.querySelector('input[placeholder="Add a skill..."]') as HTMLInputElement;
                                            if (input.value.trim()) {
                                                setData(prev => ({ ...prev, skills: [...prev.skills, { id: crypto.randomUUID(), name: input.value.trim(), level: "intermediate" }] }));
                                                input.value = "";
                                            }
                                        }}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Analysis Tab */}
                        <TabsContent value="analyze" className="mt-0 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <LineChart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Resume Score & Analysis</CardTitle>
                                            <CardDescription>See how your resume performs</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {!resumeScore ? (
                                        <div className="text-center py-6">
                                            <Button onClick={getResumeScore} disabled={!!aiLoading}>
                                                {aiLoading === "scoring" ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <LineChart className="mr-2 h-4 w-4" />}
                                                Generate Overall Score
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-6 justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex justify-between items-end">
                                                        <Label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Overall Score</Label>
                                                        <span className="text-3xl font-black text-primary">{resumeScore.overallScore}/100</span>
                                                    </div>
                                                    <Progress value={resumeScore.overallScore} className="h-3" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(resumeScore.sectionScores).map(([name, score]) => (
                                                    <div key={name} className="p-4 border rounded-xl space-y-2">
                                                        <div className="flex justify-between text-xs font-bold uppercase text-slate-500">
                                                            <span>{name}</span>
                                                            <span className={score > 80 ? 'text-emerald-600' : 'text-amber-600'}>{score}%</span>
                                                        </div>
                                                        <Progress value={score} className="h-1.5" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-sm font-bold flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-primary" /> Top Suggestions
                                                </Label>
                                                <div className="space-y-2">
                                                    {resumeScore.topSuggestions.map((tip, i) => (
                                                        <div key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                            {tip}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full" onClick={getResumeScore} disabled={!!aiLoading}>
                                                Recalculate Score
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Target className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Job Description Match</CardTitle>
                                            <CardDescription>Tailor your resume to a specific job</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Paste Job Description</Label>
                                        <Textarea
                                            placeholder="Paste the job requirements here..."
                                            value={jdText}
                                            onChange={e => setJdText(e.target.value)}
                                            rows={6}
                                            className="resize-none"
                                        />
                                    </div>
                                    <Button className="w-full h-12 text-md" onClick={analyzeJD} disabled={!!aiLoading || !jdText}>
                                        {aiLoading === "jd-analyze" ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Target className="mr-2 h-4 w-4" />}
                                        Analyze Job Fit
                                    </Button>

                                    {jdAnalysis && (
                                        <div className="space-y-6 border-t pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                            <div className="flex items-center gap-4 justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-primary uppercase">Match Score</p>
                                                    <p className="text-2xl font-black">{jdAnalysis.matchScore}%</p>
                                                </div>
                                                <div className="h-10 flex-1 px-4">
                                                    <Progress value={jdAnalysis.matchScore} className="h-2" />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-xs font-bold uppercase text-slate-500">Missing Keywords</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {jdAnalysis.missingKeywords.map(kw => (
                                                        <Badge key={kw} variant="outline" className="text-amber-700 bg-amber-50 border-amber-200">{kw}</Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Label className="text-xs font-bold uppercase text-slate-500">How to improve</Label>
                                                <div className="space-y-2">
                                                    {jdAnalysis.improvementSuggestions.map((sug, i) => (
                                                        <div key={i} className="flex gap-2 text-sm text-slate-600 bg-white p-3 rounded-lg border shadow-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                            {sug}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                        </TabsContent>

                        {/* Design Tab */}
                        <TabsContent value="design" className="mt-0 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Palette className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Template & Theme</CardTitle>
                                            <CardDescription>Personalize the look and feel</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <Label className="text-lg font-bold text-slate-900 tracking-tight">Select Professional Template</Label>
                                            <Badge variant="outline" className="text-primary font-bold border-primary/20 bg-primary/5">
                                                {AVAILABLE_TEMPLATES.length} Designs Available
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
                                            {AVAILABLE_TEMPLATES.map(template => (
                                                <div
                                                    key={template.id}
                                                    className="group relative"
                                                >
                                                    <button
                                                        onClick={() => setData(prev => ({ ...prev, template: template.id }))}
                                                        className={`w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white ${data.template === template.id
                                                            ? 'border-primary shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] ring-1 ring-primary'
                                                            : 'border-slate-100 hover:border-slate-300 hover:shadow-xl shadow-sm'
                                                            }`}
                                                    >
                                                        <div className="aspect-[3/4] overflow-hidden relative bg-slate-100">
                                                            <img
                                                                src={`/templates/${template.id}.png`}
                                                                alt={template.name}
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).src = `https://placehold.co/400x533/f1f5f9/64748b?text=${template.name}`;
                                                                }}
                                                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${data.template !== template.id && 'grayscale-[0.5] group-hover:grayscale-0'}`}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                            {data.template === template.id && (
                                                                <div className="absolute top-4 right-4 z-10">
                                                                    <div className="bg-primary text-white p-2 rounded-full shadow-2xl animate-in zoom-in duration-300">
                                                                        <CheckCircle2 className="w-5 h-5" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="p-5 space-y-1 bg-white relative">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{template.name}</h3>
                                                                {template.id === 'modern' && <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] h-4">Popular</Badge>}
                                                            </div>
                                                            <p className="text-xs text-slate-500 line-clamp-1">{template.description}</p>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 pt-4 border-t">
                                        <div className="space-y-4">
                                            <Label className="text-sm font-bold flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" /> Accent Color
                                            </Label>
                                            <div className="flex flex-wrap gap-3">
                                                {["#2563eb", "#d33d3d", "#059669", "#7c3aed", "#ea580c", "#334155"].map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setData(prev => ({ ...prev, theme: { ...prev.theme, color } }))}
                                                        className={`w-8 h-8 rounded-full border-4 transition-all ${data.theme.color === color ? 'border-slate-300 scale-125' : 'border-transparent hover:scale-110'
                                                            }`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                                <Input
                                                    type="color"
                                                    value={data.theme.color}
                                                    onChange={e => setData(prev => ({ ...prev, theme: { ...prev.theme, color: e.target.value } }))}
                                                    className="w-10 h-8 p-0 border-none bg-transparent cursor-pointer rounded-full overflow-hidden"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-sm font-bold flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary" /> Spacing
                                            </Label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range" min="0.5" max="2" step="0.1"
                                                    value={data.theme.spacing}
                                                    onChange={e => setData(prev => ({ ...prev, theme: { ...prev.theme, spacing: parseFloat(e.target.value) } }))}
                                                    className="flex-1 accent-primary"
                                                />
                                                <span className="text-xs font-mono font-bold w-12">{data.theme.spacing}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Resume Settings</CardTitle>
                                            <CardDescription>Visibility and sharing options</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
                                        <div className="space-y-1">
                                            <p className="font-bold text-sm">Public Sharing</p>
                                            <p className="text-xs text-muted-foreground">Anyone with the link can view your resume</p>
                                        </div>
                                        <Button
                                            variant={isPublic ? "default" : "outline"}
                                            size="sm"
                                            onClick={handleToggleSharing}
                                            className="rounded-full px-4"
                                        >
                                            {isPublic ? "Publicly Visible" : "Make Public"}
                                        </Button>
                                    </div>

                                    {isPublic && (
                                        <div className="space-y-6">
                                            <div className="space-y-3 p-4 border rounded-xl animate-in fade-in slide-in-from-top-2 duration-300 bg-white">
                                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Shareable Resume Link</Label>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-sm font-mono truncate text-slate-500">
                                                        {isMounted ? window.location.origin : ""}/share/{resume.id}
                                                    </div>
                                                    <Button size="icon" variant="outline" onClick={copyShareLink}>
                                                        <Copy className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="space-y-4 p-6 border rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 bg-gradient-to-br from-primary/5 to-indigo-500/5 border-primary/20">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm tracking-tight">Public Portfolio Website</p>
                                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Premium Feature</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    Your resume has been converted into a high-performance portfolio website with smooth animations and professional layouts.
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-10 shadow-lg shadow-primary/20"
                                                        onClick={() => window.open(`/portfolio/${resume.id}`, '_blank')}
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-2" /> View Portfolio
                                                    </Button>
                                                    <Button
                                                        variant="outline" size="icon" className="h-10 w-10 border-primary/20 hover:bg-primary/5"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/portfolio/${resume.id}`);
                                                            toast.success("Portfolio link copied!");
                                                        }}
                                                    >
                                                        <Copy className="w-4 h-4 text-primary" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="font-bold text-sm text-destructive">Danger Zone</p>
                                            <p className="text-xs text-muted-foreground">Permanently delete this resume and all its data</p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleDelete}
                                            className="rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all px-6"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete Resume
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* History Tab */}
                        <TabsContent value="history" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <History className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle>Version History</CardTitle>
                                            <CardDescription>View and restore previous versions</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y">
                                        {(!versions || versions.length === 0) ? (
                                            <div className="p-12 text-center">
                                                <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <History className="w-6 h-6" />
                                                </div>
                                                <p className="text-sm text-slate-500 font-medium">No versions saved yet</p>
                                                <p className="text-xs text-slate-400 mt-1">Versions are automatically saved when you make changes</p>
                                            </div>
                                        ) : (
                                            (versions || []).slice().reverse().map((version, idx) => (
                                                <div key={version.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs">
                                                            {versions.length - idx}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900">
                                                                {new Date(version.created_at).toLocaleDateString()} at {new Date(version.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                                                {version.label || (idx === versions.length - 1 ? "Original Version" : "Auto-saved")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost" size="sm"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity gap-2 text-primary hover:text-primary hover:bg-primary/10"
                                                        onClick={() => handleRestore(version.data)}
                                                    >
                                                        <RefreshCw className="w-3.5 h-3.5" /> Restore
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Preview Panel */}
                <div className={`flex-[1.5] bg-slate-200/50 p-8 overflow-y-auto pattern-grid transition-all duration-500 ${!showPreview ? 'hidden lg:block' : 'block'}`}>
                    <div
                        ref={previewRef}
                        className="mx-auto bg-white shadow-2xl transition-transform duration-500 transform-gpu"
                        style={{
                            width: "210mm",
                            minHeight: "297mm",
                            boxShadow: "0 0 50px -12px rgb(0 0 0 / 0.25)"
                        }}
                    >
                        <ResumeTemplate data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
}
