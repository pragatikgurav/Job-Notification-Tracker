import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleJobs } from "@/data/sampleJobs";
import { getSavedJobs, setSavedJobs } from "@/lib/jobStorage";
import { ArrowRight, Trash2, Inbox } from "lucide-react";
import { toast } from "sonner";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [saved, setSavedState] = useState(getSavedJobs());

  const remove = (id: string) => {
    const updated = saved.filter(j => j.id !== id);
    setSavedState(updated);
    setSavedJobs(updated);
    toast.success("Job removed");
  };

  const jobs = saved.map(s => ({ ...s, details: sampleJobs.find(j => j.id === s.id)! })).filter(s => s.details);

  return (
    <StepLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Saved Jobs</h1>
          <p className="text-muted-foreground">Jobs you've bookmarked for later.</p>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No saved jobs yet. Go to Job Matching to save some!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {jobs.map(({ id, status, details }) => (
              <Card key={id}>
                <CardContent className="py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{details.title}</p>
                    <p className="text-sm text-muted-foreground">{details.company} · {details.location}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">{status}</Badge>
                  <Button size="sm" variant="ghost" onClick={() => remove(id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Button onClick={() => navigate("/jt/05-status")} className="gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
