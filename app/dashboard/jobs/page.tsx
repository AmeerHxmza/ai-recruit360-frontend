"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  Users,
  Github,
  AlertTriangle,
  Share2,
  Twitter,
  Linkedin,
  Copy
} from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      candidates: 45,
      status: "Active",
      githubRequired: true,
      knockoutEnabled: true,
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      candidates: 12,
      status: "Active",
      githubRequired: false,
      knockoutEnabled: true,
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      candidates: 28,
      status: "Closed",
      githubRequired: true,
      knockoutEnabled: false,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
          <p className="text-muted-foreground">
            Manage your open positions and requirements.
          </p>
        </div>
        <CreateJobDialog />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-8 w-full"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      {/* Jobs List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${job.status === "Active" ? "bg-green-500" : "bg-slate-300"}`} />
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <ShareJobDialog jobTitle={job.title} jobId={job.id} />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
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
                  <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
                    <AlertTriangle className="w-3 h-3" />
                    Knockout Criteria Active
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/20">
              <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                View Candidates
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CreateJobDialog() {
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
              <p className="text-xs text-muted-foreground">Verify candidate's code contributions</p>
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
          <Button type="submit" variant="accent">Create Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ShareJobDialog({ jobTitle, jobId }: { jobTitle: string, jobId: number }) {
  const jobLink = `https://ai-recruit360.com/jobs/${jobId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobLink);
    // Ideally add a toast notification here
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=We are hiring for a ${encodeURIComponent(jobTitle)}! Apply here:&url=${encodeURIComponent(jobLink)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobLink)}`, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20" title="Share Job">
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
            <Button type="button" variant="outline" className="flex-1 gap-2 border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-900/20" onClick={shareOnLinkedIn}>
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
