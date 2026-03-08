"use client";

import { useState } from "react";
import { Resume } from "@/types/resume";
import { createResume, deleteResume, signOut } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    FileText,
    MoreVertical,
    Trash2,
    Edit,
    LogOut,
    Sparkles,
    Clock,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function DashboardClient({
    resumes,
    userEmail,
}: {
    resumes: Resume[];
    userEmail: string;
}) {

    const [newTitle, setNewTitle] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const handleCreate = async () => {
        setCreating(true);
        try {
            const result = await createResume(newTitle);
            toast.success("Resume created successfully!");
            window.location.href = `/dashboard/builder/${result.id}`;
        } catch (error) {
            console.error("Creation error:", error);
            toast.error("Failed to create resume");
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteResume(id);
            toast.success("Resume deleted");
            window.location.reload();
        } catch {
            toast.error("Failed to delete resume");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen">

            <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg">ResumeAI</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground hidden sm:block">
                                {userEmail}
                            </span>

                            <form action={signOut}>
                                <Button variant="ghost" size="sm" type="submit">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Sign out
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Your Resumes</h1>
                    <p className="text-muted-foreground">
                        Create, edit and manage your AI powered resumes
                    </p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger
                        nativeButton={false}
                        render={
                            <Card className="border-dashed border-2 border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 cursor-pointer group mb-8" />
                        }
                    >
                        <CardContent className="flex items-center justify-center py-10">
                            <div className="text-center">
                                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                                    <Plus className="w-7 h-7 text-primary" />
                                </div>
                                <p className="font-semibold text-lg">Create New Resume</p>
                                <p className="text-sm text-muted-foreground">
                                    Start building with AI
                                </p>
                            </div>
                        </CardContent>
                    </DialogTrigger>

                    <DialogContent>

                        <DialogHeader>
                            <DialogTitle>Create New Resume</DialogTitle>
                            <DialogDescription>
                                Give your resume a title
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 pt-2">

                            <div className="space-y-2">

                                <Label htmlFor="resume-title">Resume Title</Label>

                                <Input
                                    id="resume-title"
                                    placeholder="Software Engineer Resume"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />

                            </div>

                            <Button
                                onClick={handleCreate}
                                className="w-full"
                                disabled={creating}
                            >

                                {creating ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4 mr-2" />
                                )}

                                {creating ? "Creating..." : "Create Resume"}

                            </Button>

                        </div>

                    </DialogContent>

                </Dialog>

                {resumes.length > 0 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {resumes.map((resume) => (

                            <Card key={resume.id}>

                                <CardHeader>

                                    <div className="flex items-start justify-between">

                                        <div>

                                            <CardTitle>{resume.title}</CardTitle>

                                            <CardDescription className="flex items-center gap-1">

                                                <Clock className="w-3 h-3" />

                                                {formatDate(resume.updated_at)}

                                            </CardDescription>

                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                    />
                                                }
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    render={
                                                        <Link
                                                            href={`/dashboard/builder/${resume.id}`}
                                                            className="cursor-pointer"
                                                        />
                                                    }
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(resume.id)}
                                                    className="text-destructive"
                                                >

                                                    <Trash2 className="w-4 h-4 mr-2" />

                                                    Delete

                                                </DropdownMenuItem>

                                            </DropdownMenuContent>

                                        </DropdownMenu>

                                    </div>

                                </CardHeader>

                                <CardContent>

                                    <div className="flex gap-2 mb-4">

                                        <Badge variant="secondary">
                                            {resume.template}
                                        </Badge>

                                    </div>

                                    <Link href={`/dashboard/builder/${resume.id}`}>

                                        <Button variant="outline" className="w-full">

                                            <Edit className="w-4 h-4 mr-2" />

                                            Edit Resume

                                        </Button>

                                    </Link>

                                </CardContent>

                            </Card>

                        ))}

                    </div>

                ) : (

                    <div className="text-center py-16">

                        <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />

                        <h3 className="font-semibold mb-2">No resumes yet</h3>

                        <p className="text-muted-foreground">
                            Create your first resume
                        </p>

                    </div>

                )}

            </main>

        </div>
    );
}