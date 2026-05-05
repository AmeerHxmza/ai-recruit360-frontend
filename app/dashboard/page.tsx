import { StatsCard } from "@/components/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, CalendarCheck, Clock, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Active Jobs"
          value="12"
          description="+2 from last month"
          icon={Briefcase}
        />
        <StatsCard
          title="Total Candidates"
          value="1,284"
          description="+180 new applications"
          icon={Users}
        />
        <StatsCard
          title="Interviews Completed"
          value="342"
          description="AI conducted interviews"
          icon={CalendarCheck}
        />
        <StatsCard
          title="Avg. Truth Score"
          value="78%"
          description="+4% increase in quality"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-7">
        <Card className="surface-card hover-lift xl:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Sarah Williams", action: "completed interview for", role: "Senior React Developer", time: "2m ago", score: "High Truthfulness" },
                { name: "Michael Chen", action: "applied to", role: "Backend Engineer", time: "15m ago", score: "Pending" },
                { name: "Jessica Davis", action: "was flagged for", role: "Product Manager", time: "1h ago", score: "Fraud Alert" },
                { name: "David Kim", action: "completed interview for", role: "DevOps Engineer", time: "3h ago", score: "High Truthfulness" },
              ].map((item, i) => (
                <div key={i} className="flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-bold">{item.name}</span> {item.action} <span className="text-primary">{item.role}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.time} • {item.score}
                    </p>
                  </div>
                  <div className={`text-xs font-medium sm:ml-auto ${item.score === "Fraud Alert" ? "text-red-500" : item.score === "High Truthfulness" ? "text-green-500" : "text-muted-foreground"}`}>
                    {item.score === "Fraud Alert" ? "⚠️ Flagged" : item.score === "High Truthfulness" ? "Verified" : "Processing"}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="surface-card hover-lift xl:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 transition-colors duration-300 hover:bg-primary/15 dark:border-primary/30 dark:bg-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-primary">Today, 2:00 PM</span>
                </div>
                <div className="font-semibold text-sm">Review Flagged Candidates</div>
                <p className="text-xs text-muted-foreground mt-1">3 candidates detected with suspicious activity</p>
              </div>
              <div className="rounded-lg border border-accent/20 bg-accent/10 p-4 transition-colors duration-300 hover:bg-accent/15 dark:border-accent/30 dark:bg-accent/10">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-accent">Tomorrow, 10:00 AM</span>
                </div>
                <div className="font-semibold text-sm">Frontend Team Sync</div>
                <p className="text-xs text-muted-foreground mt-1">Review top 5 candidates for React role</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
