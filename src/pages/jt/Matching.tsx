import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { sampleJobs } from "@/data/sampleJobs";
import { getPreferences, getSavedJobs, setSavedJobs } from "@/lib/jobStorage";
import { calculateMatchScore } from "@/lib/matchScore";
import { ArrowRight, Bookmark, ExternalLink, MapPin, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function Matching() {
  const navigate = useNavigate();
  const prefs = getPreferences();
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [savedJobs, setSavedJobsState] = useState(getSavedJobs());

  const scoredJobs = useMemo(() =>
    sampleJobs.map(job => ({ ...job, score: calculateMatchScore(job, prefs) }))
      .sort((a, b) => b.score - a.score),
    [prefs]
  );

  const filtered = showOnlyMatches ? scoredJobs.filter(j => j.score >= 60) : scoredJobs;

  const toggleSave = (jobId: string) => {
    const exists = savedJobs.find(j => j.id === jobId);
    let updated;
    if (exists) {
      updated = savedJobs.filter(j => j.id !== jobId);
    } else {
      updated = [...savedJobs, { id: jobId, status: "saved" as const }];
    }
    setSavedJobsState(updated);
    setSavedJobs(updated);
    toast.success(exists ? "Job removed" : "Job saved!");
  };

  const isSaved = (id: string) => savedJobs.some(j => j.id === id);

  const scoreBadgeColor = (score: number) => {
    if (score >= 75) return "default";
    if (score >= 50) return "secondary";
    return "outline";
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Job Matching</h1>
            <p className="text-muted-foreground">Jobs scored against your preferences.</p>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={showOnlyMatches} onCheckedChange={setShowOnlyMatches} id="match-toggle" />
            <Label htmlFor="match-toggle" className="text-sm">Show only matches (≥60%)</Label>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(job => (
            <Card key={job.id}>
              <CardContent className="py-4 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold truncate">{job.title}</p>
                    <Badge variant={scoreBadgeColor(job.score)}>{job.score}%</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <Badge variant="outline" className="text-[10px]">{job.type}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={isSaved(job.id) ? "secondary" : "outline"} onClick={() => toggleSave(job.id)}>
                    <Bookmark className={`h-4 w-4 ${isSaved(job.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={() => navigate("/jt/04-saved")} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
