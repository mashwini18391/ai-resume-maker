import { Button } from "@/components/ui/button";
import {
  FileText,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Download,
  Eye,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                ResumeAI
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="cursor-pointer">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Build your dream resume
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              in minutes
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Craft professional, ATS-friendly resumes with the power of AI.
            Generate impactful summaries, bullet points, and skills tailored to
            your experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="h-13 px-8 text-base cursor-pointer">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base cursor-pointer"
              >
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-primary">land your dream job</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI to help you stand out from the crowd
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Content Generation",
                desc: "Generate professional summaries, bullet points, and skills tailored to your role using cutting-edge AI.",
              },
              {
                icon: Eye,
                title: "Live Preview",
                desc: "See your resume update in real-time as you type. Switch between editor and preview instantly.",
              },
              {
                icon: Download,
                title: "PDF Export",
                desc: "Export your polished resume as a clean PDF with one click. Ready to send to employers.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Build a complete, professional resume in under 10 minutes with AI assistance.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                desc: "Your data is securely stored with enterprise-grade encryption. Only you can access your resumes.",
              },
              {
                icon: FileText,
                title: "Multiple Resumes",
                desc: "Create and manage multiple resumes for different job applications from one dashboard.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to build your resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who landed their dream jobs with
              ResumeAI
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="h-13 px-10 text-base cursor-pointer"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              ResumeAI © {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with AI ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
