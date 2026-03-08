import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TruthfulnessScore } from "@/components/truthfulness-score";
import {
  CheckCircle2,
  XCircle,
  Bot,
  ShieldCheck,
  Zap,
  BarChart3,
  ArrowRight,
  Menu,
  Check
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">AI-Recruit360</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#demo" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden sm:block text-sm font-medium hover:underline">
              Login
            </Link>
            <Button variant="accent" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-background">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Hire with <span className="text-primary">Confidence</span>.<br />
                Verify with <span className="text-accent">AI</span>.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                The world's first autonomous recruitment platform that validates candidate truthfulness in real-time using advanced voice analysis and code verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="accent" className="h-12 px-8 text-lg shadow-xl shadow-orange-500/20" asChild>
                  <Link href="/auth/signup">
                    Start Hiring Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                  <Link href="#demo">
                    Book Demo
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-200" />
                  ))}
                </div>
                <p>Trusted by 500+ tech companies</p>
              </div>
            </div>

            {/* Glassmorphic Dashboard Mockup */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl p-4 md:p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-2 w-32 bg-slate-200 rounded-full dark:bg-slate-700" />
                </div>
                {/* Mockup Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">JD</div>
                      <div>
                        <div className="font-semibold text-sm">John Doe</div>
                        <div className="text-xs text-muted-foreground">Senior React Dev</div>
                      </div>
                    </div>
                    <TruthfulnessScore score={92} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">AS</div>
                      <div>
                        <div className="font-semibold text-sm">Alice Smith</div>
                        <div className="text-xs text-muted-foreground">Backend Engineer</div>
                      </div>
                    </div>
                    <TruthfulnessScore score={45} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">MK</div>
                      <div>
                        <div className="font-semibold text-sm">Mike K.</div>
                        <div className="text-xs text-muted-foreground">Product Manager</div>
                      </div>
                    </div>
                    <TruthfulnessScore score={78} className="w-32" />
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-border animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="text-green-500 w-5 h-5" />
                  <span className="font-bold text-sm">Verified</span>
                </div>
                <p className="text-xs text-muted-foreground">0 Fraudulent Claims</p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-24 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Traditional Hiring is Broken</h2>
              <p className="text-muted-foreground text-lg">Resumes are often exaggerated. Screening takes hundreds of hours. We fix both.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-red-100 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="w-6 h-6" />
                    The Problem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-red-900/80 dark:text-red-200/80">
                  <p>• 70% of resumes contain exaggerations or lies.</p>
                  <p>• Recruiters spend 15+ hours/week just screening CVs.</p>
                  <p>• Proxy interviews and cheating are rampant.</p>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-emerald-900/80 dark:text-emerald-200/80">
                  <p>• AI-verified skills using real-time challenges.</p>
                  <p>• <span className="font-bold">Truthfulness Score™</span> detects inconsistencies.</p>
                  <p>• Autonomous voice interviews available 24/7.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything you need to hire top talent</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Bot}
                title="Autonomous Interviews"
                description="Our AI conducts natural voice conversations, probing candidates on their experience without human bias."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Fraud Detection"
                description="Advanced algorithms analyze response patterns, tab-switching behaviors, and voice stress to detect cheating."
              />
              <FeatureCard
                icon={BarChart3}
                title="Instant Ranking"
                description="Candidates are automatically ranked by skill and truthfulness score. Stop guessing, start hiring."
              />
            </div>
          </div>
        </section>

        {/* Truthfulness Score Demo */}
        <section id="demo" className="py-24 bg-gradient-to-br from-[#002366] to-[#001540] text-white">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20 border-0">Live Demo</Badge>
            <h2 className="text-4xl font-bold mb-6">See the Truthfulness Score™ in Action</h2>
            <p className="text-blue-200 max-w-2xl mx-auto mb-12 text-lg">
              Our proprietary engine analyzes thousands of data points including voice tone, response consistency, and code veracity to generate a single trust metric.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-left mb-4">
                  <span className="text-sm text-blue-300">Candidate A</span>
                  <h3 className="font-bold text-lg">Honest & Direct</h3>
                </div>
                <TruthfulnessScore score={95} className="mb-4" />
                <p className="text-sm text-blue-200 text-left">Consistent answers, natural coding flow, matches resume claims.</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-left mb-4">
                  <span className="text-sm text-blue-300">Candidate B</span>
                  <h3 className="font-bold text-lg">Slight Exaggeration</h3>
                </div>
                <TruthfulnessScore score={65} className="mb-4" />
                <p className="text-sm text-blue-200 text-left">Minor inconsistencies in project timeline, valid technical skills.</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/10 z-0"></div>
                <div className="relative z-10">
                  <div className="text-left mb-4">
                    <span className="text-sm text-blue-300">Candidate C</span>
                    <h3 className="font-bold text-lg">Fraud Detected</h3>
                  </div>
                  <TruthfulnessScore score={30} className="mb-4" />
                  <p className="text-sm text-blue-200 text-left">Detected copy-paste code, voice mismatch, inconsistent history.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your team size. Start validating candidates instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Tier */}
              <Card className="border shadow-sm flex flex-col pt-6">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <CardDescription>For small teams scaling up.</CardDescription>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    $99
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4 text-sm text-muted-foreground mt-4">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      5 Active Jobs
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Up to 50 Candidates/mo
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Basic Truthfulness Scoring
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Standard Email Support
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              </Card>

              {/* Pro Tier (Highlighted) */}
              <Card className="border-primary shadow-xl flex flex-col relative scale-105 z-10">
                <div className="absolute top-0 inset-x-0 -mt-3 flex justify-center">
                  <Badge variant="default" className="px-3 py-1 bg-accent text-accent-foreground hover:bg-accent/90">Most Popular</Badge>
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl text-primary">Pro</CardTitle>
                  <CardDescription>For growing businesses.</CardDescription>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    $299
                    <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4 text-sm text-foreground mt-4">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent" />
                      Unlimited Active Jobs
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent" />
                      Up to 500 Candidates/mo
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent" />
                      Advanced Truthfulness Scoring
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent" />
                      AI Voice Analysis Logging
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent" />
                      Priority Support
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="accent" className="w-full text-md h-12" asChild>
                    <Link href="/auth/signup">Start Free Trial</Link>
                  </Button>
                </div>
              </Card>

              {/* Enterprise Tier */}
              <Card className="border shadow-sm flex flex-col pt-6">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>Custom volume pricing.</CardDescription>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    Custom
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4 text-sm text-muted-foreground mt-4">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Unlimited Everything
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Custom API Integrations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      Dedicated Success Manager
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      SLA Guarantees
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/auth/signup">Contact Sales</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white dark:bg-black text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to transform your hiring?</h2>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
              Join 5,000+ recruiters using AI-Recruit360 to save time and hire better talent.
            </p>
            <Button size="lg" variant="accent" className="h-14 px-10 text-lg rounded-full" asChild>
              <Link href="/auth/signup">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12 border-t border-border">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Bot className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="text-lg font-bold">AI-Recruit360</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The autonomous recruitment platform for the modern era. Verify truth, hire fast.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>Enterprise</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-black">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
