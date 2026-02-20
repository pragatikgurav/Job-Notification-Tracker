import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleJobs } from "@/data/sampleJobs";
import { getPreferences, getDigest, saveDigest } from "@/lib/jobStorage";
import { calculateMatchScore } from "@/lib/matchScore";
import { ArrowRight, Newspaper, MapPin, Building2 } from "lucide-react";

export default function Digest() {
  const navigate = useNavigate();
  const prefs = getPreferences();
  const today = new Date().toISOString().split("T")[0];

  const [digestJobIds, setDigestJobIds] = useState<string[]>([]);

  useEffect(() => {
    const existing = getDigest();
    if (existing && existing.date === today) {
      setDigestJobIds(existing.jobIds);
    } else {
      const scored = sampleJobs
        .map(j => ({ id: j.id, score: calculateMatchScore(j, prefs) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(j => j.id);
      saveDigest({ date: today, jobIds: scored });
      setDigestJobIds(scored);
    }
  }, [today]);

  const digestJobs = useMemo(() =>
    digestJobIds.map(id => {
      const job = sampleJobs.find(j => j.id === id)!;
      return { ...job, score: calculateMatchScore(job, prefs) };
    }).filter(Boolean),
    [digestJobIds, prefs]
  );

  return (
    <StepLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Newspaper className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Daily Digest</h1>
            <p className="text-muted-foreground">Top 10 jobs for {today}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {digestJobs.map((job, i) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">#{i + 1}</span>
                  <Badge>{job.score}%</Badge>
                </div>
                <CardTitle className="text-base">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{job.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={() => navigate("/jt/07-test")} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
