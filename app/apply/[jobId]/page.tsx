"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  UploadCloud,
  Github,
  CheckCircle2,
  Mic,
  MicOff,
  PhoneOff,
  FileText,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Schemas ---

const githubSchema = z.object({
  githubUrl: z.string().url().includes("github.com", { message: "Must be a valid GitHub URL" }),
});

// --- Components ---

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { id: 1, label: "Resume Upload" },
    { id: 2, label: "Verification" },
    { id: 3, label: "AI Interview" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                currentStep > step.id ? "bg-primary text-primary-foreground" :
                  currentStep === step.id ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                    "bg-slate-200 dark:bg-slate-800 text-muted-foreground"
              )}
            >
              {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : step.id}
            </div>
            <span className={cn("text-xs font-medium", currentStep >= step.id ? "text-primary" : "text-muted-foreground")}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadStep({ onNext }: { onNext: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Upload your Resume</h2>
        <p className="text-muted-foreground">We'll analyze your skills to personalize the interview.</p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          file ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30" : ""
        )}
      >
        {file ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <FileText className="w-8 h-8" />
            </div>
            <p className="font-semibold text-lg">{file.name}</p>
            <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="font-semibold text-lg mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground">PDF, DOCX up to 10MB</p>
          </>
        )}
      </div>

      <Button onClick={onNext} disabled={!file} className="w-full h-12 text-lg" variant="accent">
        Continue
      </Button>
    </div>
  );
}

function VerificationStep({ onNext }: { onNext: () => void }) {
  const form = useForm<z.infer<typeof githubSchema>>({
    resolver: zodResolver(githubSchema),
    defaultValues: { githubUrl: "" },
  });

  const [checking, setChecking] = useState(false);

  function onSubmit(values: z.infer<typeof githubSchema>) {
    setChecking(true);
    // Simulate check
    setTimeout(() => {
      setChecking(false);
      onNext();
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Technical Verification</h2>
        <p className="text-muted-foreground">Verify your coding history to skip basic questions.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="https://github.com/username" className="pl-10 h-12" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-lg flex gap-3">
            <div className="mt-0.5">⚠️</div>
            <p className="text-sm text-amber-900 dark:text-amber-200">
              Ensure your repositories are public. Our AI will scan your commit history and code quality to generate your initial Truthfulness Score.
            </p>
          </div>

          <Button type="submit" className="w-full h-12 text-lg" disabled={checking} variant="accent">
            {checking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify & Start Interview"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function InterviewStep() {
  const [isSpeaking, setIsSpeaking] = useState(false); // AI Speaking
  const [isListening, setIsListening] = useState(false); // User Speaking
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState("AI Speaking...");

  // Simulate conversation flow
  useEffect(() => {
    setIsSpeaking(true);
    const timer = setTimeout(() => {
      setIsSpeaking(false);
      setIsListening(true);
      setStatus("Listening...");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-[600px] bg-black rounded-2xl overflow-hidden relative text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/80 to-transparent">
        <Badge variant="outline" className="text-white border-white/20 bg-white/10">
          Part 1: Experience
        </Badge>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono">REC 00:45</span>
        </div>
      </div>

      {/* Visualizer Center */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="mb-8 text-center space-y-2">
          <h3 className="text-2xl font-light text-blue-200 opacity-80">AI Interviewer</h3>
          <p className="text-lg font-medium">{status}</p>
        </div>

        {/* Waveform Animation */}
        <div className="flex items-center justify-center gap-1 h-24 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-100 ease-in-out",
              )}
              style={{
                height: isSpeaking ? `${Math.random() * 100}%` : isListening ? "4px" : "4px",
                animation: isSpeaking ? `bounce 0.5s infinite ${i * 0.1}s` : "none"
              }}
            />
          ))}
        </div>

        {/* User Waveform (Listening) */}
        {isListening && (
          <div className="absolute bottom-32 flex items-center justify-center gap-1 h-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-green-500 rounded-full animate-pulse"
                style={{ height: `${Math.random() * 40 + 10}px` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-center items-center gap-6">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Button
          size="lg"
          variant="destructive"
          className="rounded-full px-8 h-12"
        >
          <PhoneOff className="mr-2 w-5 h-5" /> End Interview
        </Button>
      </div>
    </div>
  );
}

// --- Main Page ---

export default function ApplicationWizard() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-xl font-semibold text-slate-500 uppercase tracking-widest mb-1">Senior React Developer</h1>
          <div className="text-sm text-slate-400">Application Process</div>
        </div>

        <StepIndicator currentStep={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl bg-white dark:bg-slate-900 border-none">
              <CardContent className="p-0">
                {step === 1 && (
                  <div className="p-8">
                    <UploadStep onNext={() => setStep(2)} />
                  </div>
                )}
                {step === 2 && (
                  <div className="p-8">
                    <VerificationStep onNext={() => setStep(3)} />
                  </div>
                )}
                {step === 3 && (
                  <div className="p-0 overflow-hidden rounded-xl">
                    <InterviewStep />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
