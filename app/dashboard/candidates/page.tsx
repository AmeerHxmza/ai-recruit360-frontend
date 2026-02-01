"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TruthfulnessScore } from "@/components/truthfulness-score";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Github,
  Mic,
  BrainCircuit
} from "lucide-react";

const CANDIDATES = [
  { id: 1, name: "Liam Johnson", role: "Frontend Dev", status: "Interviewed", score: 92, applied: "2h ago", github: "liamj", flagged: false },
  { id: 2, name: "Emma Wilson", role: "Frontend Dev", status: "Verified", score: 85, applied: "5h ago", github: "emmaw", flagged: false },
  { id: 3, name: "Noah Brown", role: "Backend Dev", status: "Applied", score: 45, applied: "1d ago", github: "noahb", flagged: true },
  { id: 4, name: "Olivia Davis", role: "Product Manager", status: "Interviewed", score: 78, applied: "1d ago", github: "divyad", flagged: false },
  { id: 5, name: "William Miller", role: "DevOps", status: "Interviewed", score: 24, applied: "2d ago", github: "williamm", flagged: true },
];

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Candidates</h2>
          <p className="text-muted-foreground">
            View and manage candidate applications.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="accent">Invite Candidate</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates..."
            className="pl-8 w-full"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Status
        </Button>
      </div>

      {/* Candidates Table */}
      <div className="rounded-md border bg-white dark:bg-slate-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Truthfulness Score</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CANDIDATES.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CandidateRow({ candidate }: { candidate: any }) {
  return (
    <TableRow className="group cursor-pointer hover:bg-muted/50">
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{candidate.name}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Github className="w-3 h-3" /> {candidate.github}
          </span>
        </div>
      </TableCell>
      <TableCell>{candidate.role}</TableCell>
      <TableCell>
        <Badge variant={candidate.flagged ? "destructive" : "secondary"} className={candidate.status === "Interviewed" ? "bg-blue-100 text-blue-700 hover:bg-blue-200 border-0" : ""}>
          {candidate.flagged ? "Flagged" : candidate.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="w-[180px]">
          <TruthfulnessScore score={candidate.score} size="sm" showLabel={true} />
          {candidate.flagged && <span className="text-xs text-red-500 font-medium mt-1 block">Suspicious Activity Detected</span>}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{candidate.applied}</TableCell>
      <TableCell className="text-right">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">View Details</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <SheetTitle className="text-2xl">{candidate.name}</SheetTitle>
                  <SheetDescription>{candidate.role} • Applied {candidate.applied}</SheetDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">GitHub Verified</Badge>
                <Badge variant={candidate.flagged ? "destructive" : "default"}>
                  Score: {candidate.score}%
                </Badge>
              </div>
            </SheetHeader>

            <div className="space-y-6">
              {/* Resume Summary */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Resume Summary
                </h3>
                <div className="p-4 rounded-lg bg-muted text-sm space-y-2">
                  <p>Senior Frontend Developer with 5 years of experience in React and TypeScript.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                  </div>
                </div>
              </div>

              {/* Quiz/Reasoning Log */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" /> AI Reasoning Log
                </h3>
                <div className="bg-slate-950 text-slate-50 p-4 rounded-lg text-sm font-mono space-y-3">
                  <div className="border-l-2 border-green-500 pl-3">
                    <div className="text-green-400 text-xs mb-1">Pass • Code Verification</div>
                    <p>Candidate demonstrated strong understanding of React Hooks in the coding challenge. Solution was optimal O(n).</p>
                  </div>
                  <div className="border-l-2 border-yellow-500 pl-3">
                    <div className="text-yellow-400 text-xs mb-1">Warning • Voice Stress Analysis</div>
                    <p>Slight hesitation detected when asked about "Database Sharding experience". Recommendation: Probe further in technical round.</p>
                  </div>
                  {candidate.flagged && (
                    <div className="border-l-2 border-red-500 pl-3">
                      <div className="text-red-400 text-xs mb-1">Fail • Browser Behavior</div>
                      <p>Tab switching detected 4 times during the quiz. High probability of external assistance.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Recording */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Mic className="w-4 h-4" /> Voice Interview
                </h3>
                <div className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Tech Screen Recording</div>
                      <div className="text-xs text-muted-foreground">14:20 mins</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Play</Button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end gap-3">
              <Button variant="destructive">Reject</Button>
              <Button variant="accent">Move to Offer</Button>
            </div>
          </SheetContent>
        </Sheet>
      </TableCell>
    </TableRow>
  )
}
