"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackToast } from "@/components/ui/feedback-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Link2,
  Users,
  Github,
  AlertTriangle,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Loader2
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  department: string;
  candidates: number;
  status: "Active" | "Closed";
  githubRequired: boolean;
  knockoutEnabled: boolean;
  candidateRole: string;
};

export default function JobsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error" | "info" } | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      candidates: 45,
      status: "Active",
      githubRequired: true,
      knockoutEnabled: true,
      candidateRole: "Frontend Dev",
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      candidates: 12,
      status: "Active",
      githubRequired: false,
      knockoutEnabled: true,
      candidateRole: "Product Manager",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      candidates: 28,
      status: "Closed",
      githubRequired: true,
      knockoutEnabled: false,
      candidateRole: "DevOps",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 280);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = `${job.title} ${job.department}`.toLowerCase().includes(search.toLowerCase().trim());
      const matchesStatus =
        statusFilter === "all" ? true : statusFilter === "active" ? job.status === "Active" : job.status === "Closed";
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  return (
    <div className="space-y-6 lg:space-y-8">
      {toast ? <FeedbackToast message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Jobs</h2>
          <p className="text-muted-foreground">
            Manage your open positions and requirements.
          </p>
        </div>
        <CreateJobDialog onDone={(message, tone) => setToast({ message, tone })} />
      </div>

      {/* Filters */}
      <div className="surface-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8 w-full"
            value={search}
            onChange={(event) => {
              setIsLoading(true);
              setSearch(event.target.value);
            }}
          />
        </div>
        <Button
          variant="outline"
          className="sm:w-auto capitalize"
          onClick={() => {
            setIsLoading(true);
            setStatusFilter((prev) => (prev === "all" ? "active" : prev === "active" ? "closed" : "all"));
          }}
        >
          Status: {statusFilter}
        </Button>
      </div>

      {/* Jobs List */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} className="surface-card space-y-4 p-6">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-full" />
              </Card>
            ))
          : filteredJobs.map((job) => (
          <Card key={job.id} className="surface-card hover-lift relative overflow-visible">
            <div className={`absolute top-0 left-0 w-1 h-full ${job.status === "Active" ? "bg-green-500" : "bg-slate-300"}`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <ShareJobDialog jobTitle={job.title} jobId={job.id} onDone={(message, tone) => setToast({ message, tone })} />
                  <JobActionsMenu
                    job={job}
                    onCopyLink={(jobId) => {
                      navigator.clipboard.writeText(`https://ai-recruit360.com/apply/${jobId}`);
                      setToast({ message: "Job link copied to clipboard.", tone: "success" });
                    }}
                    onUpdate={(jobId) => {
                      const selected = jobs.find((item) => item.id === jobId) ?? null;
                      setEditingJob(selected);
                    }}
                    onDelete={(jobId) => {
                      setJobs((prev) => prev.filter((item) => item.id !== jobId));
                      setToast({ message: "Job deleted successfully.", tone: "success" });
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{job.candidates} Active</span>
                </div>
                <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                  {job.status}
                </Badge>
              </div>

              <div className="space-y-2">
                {job.githubRequired && (
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Github className="w-3 h-3" />
                    GitHub Verification Required
                  </div>
                )}
                {job.knockoutEnabled && (
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <AlertTriangle className="w-3 h-3" />
                    Knockout Criteria Active
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/20">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-primary hover:text-primary hover:bg-primary/10"
                onClick={() => router.push(`/dashboard/candidates?job=${encodeURIComponent(job.candidateRole)}`)}
              >
                View Candidates
              </Button>
            </CardFooter>
          </Card>
        ))}
        {!isLoading && filteredJobs.length === 0 ? (
          <Card className="surface-card col-span-full p-8 text-center">
            <CardTitle className="text-lg">No jobs found</CardTitle>
            <CardDescription className="mt-2">Try adjusting search or status filter.</CardDescription>
          </Card>
        ) : null}
      </div>
      <EditJobDialog
        key={editingJob?.id ?? "no-edit"}
        job={editingJob}
        onClose={() => setEditingJob(null)}
        onSave={(updatedJob) => {
          setJobs((prev) => prev.map((item) => (item.id === updatedJob.id ? updatedJob : item)));
          setEditingJob(null);
          setToast({ message: "Job updated successfully.", tone: "success" });
        }}
      />
    </div>
  );
}

function CreateJobDialog({ onDone }: { onDone: (message: string, tone: "success" | "error" | "info") => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onDone("Job created successfully.", "success");
    }, 800);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="accent">
          <Plus className="mr-2 h-4 w-4" /> Create Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>
            Set up the requirements for your new position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Backend Engineer" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" placeholder="Brief description of the role" />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-base">Require GitHub</Label>
              <p className="text-xs text-muted-foreground">Verify candidate&apos;s code contributions</p>
            </div>
            <Switch id="github-mode" />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30">
            <div className="space-y-0.5">
              <Label className="text-base text-red-900 dark:text-red-200">Knockout Criteria</Label>
              <p className="text-xs text-red-700/80 dark:text-red-300/80">Auto-reject low Truthfulness scores</p>
            </div>
            <Switch id="knockout-mode" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="accent" onClick={handleCreate} disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ShareJobDialog({
  jobTitle,
  jobId,
  onDone,
}: {
  jobTitle: string;
  jobId: number;
  onDone: (message: string, tone: "success" | "error" | "info") => void;
}) {
  const jobLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/apply/${jobId}`
      : `/apply/${jobId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobLink);
    onDone("Job link copied to clipboard.", "success");
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=We are hiring for a ${encodeURIComponent(jobTitle)}! Apply here:&url=${encodeURIComponent(jobLink)}`, '_blank');
    onDone("Opened X share.", "info");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobLink)}`, '_blank');
    onDone("Opened LinkedIn share.", "info");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary" title="Share Job">
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Job Listing</DialogTitle>
          <DialogDescription>
            Share this link to attract more candidates for the {jobTitle} position.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={jobLink}
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyToClipboard} variant="secondary">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start mt-6 flex-col gap-2">
          <span className="text-xs text-muted-foreground mb-2">Or share directly to:</span>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1 gap-2 border-primary/30 hover:bg-primary/10" onClick={shareOnLinkedIn}>
              <Linkedin className="h-4 w-4 text-[#0A66C2]" />
              LinkedIn
            </Button>
            <Button type="button" variant="outline" className="flex-1 gap-2 border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800" onClick={shareOnTwitter}>
              <Twitter className="h-4 w-4 text-black dark:text-white fill-current" />
              X (Twitter)
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function JobActionsMenu({
  job,
  onDelete,
  onUpdate,
  onCopyLink,
}: {
  job: Job;
  onDelete: (jobId: number) => void;
  onUpdate: (jobId: number) => void;
  onCopyLink: (jobId: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen((prev) => !prev)}>
        <MoreVertical className="w-4 h-4" />
      </Button>
      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border bg-card p-1 shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => {
              onUpdate(job.id);
              setIsOpen(false);
            }}
          >
            <Pencil className="h-4 w-4" />
            Update
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => {
              onCopyLink(job.id);
              setIsOpen(false);
            }}
          >
            <Link2 className="h-4 w-4" />
            Copy Link
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
            onClick={() => {
              onDelete(job.id);
              setIsOpen(false);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

function EditJobDialog({
  job,
  onClose,
  onSave,
}: {
  job: Job | null;
  onClose: () => void;
  onSave: (job: Job) => void;
}) {
  const [formState, setFormState] = useState<Job | null>(job);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job || !formState) return null;

  return (
    <Dialog open={!!job} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
          <DialogDescription>Edit details for the selected role.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Job Title</Label>
            <Input
              id="edit-title"
              value={formState.title}
              onChange={(event) => setFormState((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-department">Department</Label>
            <Input
              id="edit-department"
              value={formState.department}
              onChange={(event) => setFormState((prev) => (prev ? { ...prev, department: event.target.value } : prev))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-status">Status</Label>
            <select
              id="edit-status"
              value={formState.status}
              onChange={(event) =>
                setFormState((prev) =>
                  prev
                    ? { ...prev, status: event.target.value === "Closed" ? "Closed" : "Active" }
                    : prev
                )
              }
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Require GitHub</p>
              <p className="text-xs text-muted-foreground">Validate public code activity.</p>
            </div>
            <Switch
              checked={formState.githubRequired}
              onCheckedChange={(checked) => setFormState((prev) => (prev ? { ...prev, githubRequired: checked } : prev))}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Knockout Criteria</p>
              <p className="text-xs text-muted-foreground">Auto-flag low truthfulness scores.</p>
            </div>
            <Switch
              checked={formState.knockoutEnabled}
              onCheckedChange={(checked) => setFormState((prev) => (prev ? { ...prev, knockoutEnabled: checked } : prev))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button
            variant="accent"
            disabled={isSubmitting || !formState.title.trim() || !formState.department.trim()}
            onClick={() => {
              setIsSubmitting(true);
              setTimeout(() => {
                onSave({
                  ...formState,
                  title: formState.title.trim(),
                  department: formState.department.trim(),
                });
              }, 500);
            }}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
