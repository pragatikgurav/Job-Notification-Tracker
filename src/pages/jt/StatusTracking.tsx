import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleJobs } from "@/data/sampleJobs";
import { getSavedJobs, setSavedJobs, type SavedJob } from "@/lib/jobStorage";
import { ArrowRight, Inbox } from "lucide-react";
import { toast } from "sonner";

const statuses = ["saved", "applied", "interview", "offer", "rejected"] as const;

export default function StatusTracking() {
  const navigate = useNavigate();
  const [saved, setSavedState] = useState(getSavedJobs());
  const [filter, setFilter] = useState("all");

  const updateStatus = (id: string, status: SavedJob["status"]) => {
    const updated = saved.map(j => j.id === id ? { ...j, status } : j);
    setSavedState(updated);
    setSavedJobs(updated);
    toast.success("Status updated");
  };

  const filtered = filter === "all" ? saved : saved.filter(j => j.status === filter);
  const jobs = filtered.map(s => ({ ...s, details: sampleJobs.find(j => j.id === s.id)! })).filter(s => s.details);

  const statusColor = (s: string) => {
    const map: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      applied: "default", interview: "secondary", offer: "default", rejected: "destructive", saved: "outline"
    };
    return map[s] || "outline";
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Status Tracking</h1>
            <p className="text-muted-foreground">Update and filter your application statuses.</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>{saved.length === 0 ? "No saved jobs yet." : "No jobs match this filter."}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {jobs.map(({ id, status, details }) => (
              <Card key={id}>
                <CardContent className="py-4 flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{details.title}</p>
                    <p className="text-sm text-muted-foreground">{details.company}</p>
                  </div>
                  <Select value={status} onValueChange={(v) => updateStatus(id, v as SavedJob["status"])}>
                    <SelectTrigger className="w-32">
                      <Badge variant={statusColor(status)} className="capitalize">{status}</Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Button onClick={() => navigate("/jt/06-digest")} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
