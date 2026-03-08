"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileText, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md relative z-10 border-border/50 shadow-2xl shadow-primary/5">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Sign in to your account to continue building your resume
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-medium cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4 mr-2" />
                            )}
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground pt-2">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-primary font-medium hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
