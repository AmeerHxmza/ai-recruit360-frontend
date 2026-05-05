"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Loader2, Bot, User, CheckCircle2, XCircle } from "lucide-react";

type Stage = "apply" | "screening" | "knockout" | "interview" | "done";

type ApplicationData = {
  fullName: string;
  email: string;
  gender: string;
  address: string;
  cvFile: File | null;
};

const JOBS: Record<string, { title: string; keywords: string[] }> = {
  "1": { title: "Senior React Developer", keywords: ["react", "typescript", "frontend", "javascript"] },
  "2": { title: "Product Designer", keywords: ["design", "figma", "ux", "ui"] },
  "3": { title: "DevOps Engineer", keywords: ["devops", "aws", "kubernetes", "docker"] },
};
const FRONTEND_MOCK_MODE = true;

export default function ApplyJobPage() {
  const params = useParams<{ jobId: string }>();
  const router = useRouter();
  const jobId = params.jobId;
  const job = JOBS[jobId] ?? { title: "Open Position", keywords: ["experience"] };

  const [stage, setStage] = useState<Stage>("apply");
  const [screeningMessage, setScreeningMessage] = useState("Analyzing CV against job requirements...");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [application, setApplication] = useState<ApplicationData>({
    fullName: "",
    email: "",
    gender: "",
    address: "",
    cvFile: null,
  });

  const questions = useMemo(
    () => [
      `Hi ${application.fullName || "candidate"}, please introduce yourself in 60 seconds.`,
      "Walk me through the most relevant project from your CV.",
      "Which achievement in your CV best proves your impact?",
      "What tools and technologies do you use most confidently?",
      "Describe a challenge you solved and what you learned.",
      `How does your experience fit this ${job.title} role?`,
      "How do you collaborate with team members under deadlines?",
      "Tell me about a mistake you made and how you corrected it.",
      "What are your compensation and availability expectations?",
      "Why should we shortlist you for the onsite interview?",
    ],
    [application.fullName, job.title]
  );

  const evaluateCvMatch = () => {
    if (FRONTEND_MOCK_MODE) return true;
    const resumeText = `${application.cvFile?.name ?? ""} ${application.address}`.toLowerCase();
    return job.keywords.some((keyword) => resumeText.includes(keyword));
  };

  const handleApplySubmit = () => {
    if (!application.fullName.trim() || !application.email.trim() || !application.gender.trim() || !application.address.trim() || !application.cvFile) {
      return;
    }
    setStage("screening");
    setTimeout(() => {
      const isMatch = evaluateCvMatch();
      if (isMatch) {
        setScreeningMessage(
          FRONTEND_MOCK_MODE
            ? "Frontend mock mode: CV accepted. Proceeding to AI interview..."
            : "CV matched. Proceeding to AI interview..."
        );
        setStage("interview");
      } else {
        setScreeningMessage("CV did not match minimum criteria.");
        setStage("knockout");
      }
    }, 1800);
  };

  const handleNextQuestion = () => {
    if (questionIndex >= questions.length - 1) {
      setStage("done");
      return;
    }
    setQuestionIndex((prev) => prev + 1);
  };

  const progress = Math.round(((questionIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">AI-Recruit360 Candidate Portal</p>
          <h1 className="mt-2 text-3xl font-bold">{job.title}</h1>
          <p className="mt-1 text-muted-foreground">Job ID: {jobId}</p>
        </div>

        {stage === "apply" && (
          <Card className="surface-card">
            <CardHeader>
              <CardTitle>Start Application</CardTitle>
              <CardDescription>Upload your profile details and CV to begin screening.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" value={application.fullName} onChange={(e) => setApplication((prev) => ({ ...prev, fullName: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={application.email} onChange={(e) => setApplication((prev) => ({ ...prev, email: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" placeholder="e.g. Male, Female, Prefer not to say" value={application.gender} onChange={(e) => setApplication((prev) => ({ ...prev, gender: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={application.address} onChange={(e) => setApplication((prev) => ({ ...prev, address: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cv">CV Upload</Label>
                <label htmlFor="cv" className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed p-4 hover:bg-muted/40">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    {application.cvFile ? application.cvFile.name : "Click to upload your CV (PDF/DOCX)"}
                  </span>
                </label>
                <input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setApplication((prev) => ({ ...prev, cvFile: e.target.files?.[0] ?? null }))}
                />
              </div>
              <Button className="w-full" variant="accent" onClick={handleApplySubmit}>
                Submit and Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === "screening" && (
          <Card className="surface-card">
            <CardContent className="flex min-h-[220px] flex-col items-center justify-center space-y-3 py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <h3 className="text-xl font-semibold">CV Screening in Progress</h3>
              <p className="text-muted-foreground">{screeningMessage}</p>
            </CardContent>
          </Card>
        )}

        {stage === "knockout" && (
          <Card className="surface-card border-destructive/30">
            <CardContent className="flex min-h-[260px] flex-col items-center justify-center space-y-3 py-12 text-center">
              <XCircle className="h-10 w-10 text-destructive" />
              <h3 className="text-xl font-semibold">Application Not Matched</h3>
              <p className="max-w-lg text-muted-foreground">
                Thank you for applying. Based on current job requirements, your CV did not match minimum criteria for this role.
              </p>
              <Button variant="outline" onClick={() => router.push("/")}>Exit Platform</Button>
            </CardContent>
          </Card>
        )}

        {stage === "interview" && (
          <Card className="surface-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Interviewer</CardTitle>
                <Badge variant="secondary">Question {questionIndex + 1} / {questions.length}</Badge>
              </div>
              <CardDescription>Answer each question based on your CV and experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="rounded-xl border bg-muted/30 p-5">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Bot className="h-5 w-5" />
                  <p className="font-medium">AI Interviewer asks:</p>
                </div>
                <p className="text-lg font-medium">{questions[questionIndex]}</p>
              </div>
              <div className="rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                  <User className="h-5 w-5" />
                  <p className="font-medium">Your response area</p>
                </div>
                <textarea
                  className="h-28 w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Type your answer here..."
                />
              </div>
              <Button className="w-full" variant="accent" onClick={handleNextQuestion}>
                {questionIndex >= questions.length - 1 ? "Finish Interview" : "Next Question"}
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === "done" && (
          <Card className="surface-card border-primary/30">
            <CardContent className="flex min-h-[300px] flex-col items-center justify-center space-y-4 py-14 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <h3 className="text-2xl font-semibold">Interview Completed</h3>
              <p className="max-w-xl text-muted-foreground">
                Thank you for completing your AI interview. We will inform you about invitation or rejection for the onsite real interview.
                Your application data has been submitted to the recruiter dashboard.
              </p>
              <Button variant="outline" onClick={() => router.push("/")}>Exit Platform</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
