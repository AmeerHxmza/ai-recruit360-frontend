import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TruthfulnessScore } from "@/components/truthfulness-score";
import { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  XCircle,
  Bot,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Check
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-white/85 backdrop-blur-md">
        <div className="page-shell flex h-16 items-center justify-between">
          <div className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:rotate-6">
              <Bot className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">AI-Recruit360</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#demo" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden text-sm font-medium transition-colors hover:text-primary sm:block">
              Login
            </Link>
            <Button variant="accent" className="h-9 px-4 text-sm sm:h-10 sm:px-5" asChild>
              <Link href="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-20 pt-14 sm:pt-20 lg:pb-28">
          <div className="page-shell grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-700">
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Hire with <span className="text-primary">Confidence</span>.<br />
                Verify with <span className="text-accent">AI</span>.
              </h1>
              <p className="mb-8 text-lg text-muted-foreground sm:text-xl text-balance">
                The world&apos;s first autonomous recruitment platform that validates candidate truthfulness in real-time using advanced voice analysis and code verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="accent" className="h-12 px-8 text-lg shadow-xl shadow-accent/20" asChild>
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
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-200" />
                  ))}
                </div>
                <p>Trusted by 500+ tech companies</p>
              </div>
            </div>

            {/* Glassmorphic Dashboard Mockup */}
            <div className="relative mx-auto w-full max-w-lg animate-in fade-in slide-in-from-right-4 duration-700 lg:max-w-none">
              <div className="relative rotate-1 rounded-xl border border-white/20 bg-white/40 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:rotate-0 md:p-6 dark:bg-black/40">
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">JD</div>
                      <div>
                        <div className="font-semibold text-sm">John Doe</div>
                        <div className="text-xs text-muted-foreground">Senior React Dev</div>
                      </div>
                    </div>
                    <TruthfulnessScore score={92} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 font-bold text-accent">AS</div>
                      <div>
                        <div className="font-semibold text-sm">Alice Smith</div>
                        <div className="text-xs text-muted-foreground">Backend Engineer</div>
                      </div>
                    </div>
                    <TruthfulnessScore score={45} className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-border shadow-sm opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">MK</div>
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
              <div className="absolute -bottom-4 left-2 rounded-xl border border-border bg-white p-4 shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:-left-6">
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
        <section className="section-spacing bg-white">
          <div className="page-shell">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Why Traditional Hiring is Broken</h2>
              <p className="text-muted-foreground text-lg">Resumes are often exaggerated. Screening takes hundreds of hours. We fix both.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover-lift border-red-100 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/50">
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

              <Card className="hover-lift border-emerald-100 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/50">
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
        <section id="features" className="section-spacing bg-muted/30">
          <div className="page-shell">
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
        <section id="demo" className="section-spacing bg-gradient-to-br from-[#0b1735] to-[#10224f] text-white">
          <div className="page-shell text-center">
            <Badge className="mb-6 bg-white/10 text-white hover:bg-white/20 border-0">Live Demo</Badge>
            <h2 className="text-4xl font-bold mb-6">See the Truthfulness Score™ in Action</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-blue-100/90">
              Our proprietary engine analyzes thousands of data points including voice tone, response consistency, and code veracity to generate a single trust metric.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-left mb-4">
                  <span className="text-sm text-primary/80">Candidate A</span>
                  <h3 className="font-bold text-lg">Honest & Direct</h3>
                </div>
                <TruthfulnessScore score={95} className="mb-4" />
                <p className="text-left text-sm text-blue-100/90">Consistent answers, natural coding flow, matches resume claims.</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-left mb-4">
                  <span className="text-sm text-primary/80">Candidate B</span>
                  <h3 className="font-bold text-lg">Slight Exaggeration</h3>
                </div>
                <TruthfulnessScore score={65} className="mb-4" />
                <p className="text-left text-sm text-blue-100/90">Minor inconsistencies in project timeline, valid technical skills.</p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/10 z-0"></div>
                <div className="relative z-10">
                  <div className="text-left mb-4">
                    <span className="text-sm text-primary/80">Candidate C</span>
                    <h3 className="font-bold text-lg">Fraud Detected</h3>
                  </div>
                  <TruthfulnessScore score={30} className="mb-4" />
                  <p className="text-left text-sm text-blue-100/90">Detected copy-paste code, voice mismatch, inconsistent history.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section-spacing bg-muted/30">
          <div className="page-shell">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your team size. Start validating candidates instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Tier */}
              <Card className="hover-lift border shadow-sm flex flex-col pt-6">
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
              <Card className="hover-lift relative z-10 flex flex-col border-primary shadow-xl md:scale-105">
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
              <Card className="hover-lift border shadow-sm flex flex-col pt-6">
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
        <section className="section-spacing bg-background text-center">
          <div className="page-shell">
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

      <footer className="border-t border-border bg-muted py-12">
        <div className="page-shell grid gap-8 md:grid-cols-4">
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

function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <Card className="hover-lift group border-0 shadow-lg bg-white dark:bg-black">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
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
