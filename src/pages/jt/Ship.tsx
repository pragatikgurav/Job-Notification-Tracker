import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChecklist, getPreferences, getSavedJobs } from "@/lib/jobStorage";
import { Lock, Rocket, CheckCircle2, Briefcase, Settings, BookmarkCheck } from "lucide-react";

export default function Ship() {
  const navigate = useNavigate();
  const allPassed = getChecklist().every(Boolean);
  const prefs = getPreferences();
  const savedJobs = getSavedJobs();

  if (!allPassed) {
    return (
      <StepLayout>
        <div className="text-center py-20 space-y-4">
          <Lock className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <h1 className="text-2xl font-bold">Ship is Locked</h1>
          <p className="text-muted-foreground">Complete all 10 test checklist items to unlock.</p>
          <Button variant="outline" onClick={() => navigate("/jt/07-test")}>
            Go to Test Checklist
          </Button>
        </div>
      </StepLayout>
    );
  }

  const applied = savedJobs.filter(j => j.status === "applied").length;
  const interviews = savedJobs.filter(j => j.status === "interview").length;
  const offers = savedJobs.filter(j => j.status === "offer").length;

  return (
    <StepLayout>
      <div className="text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Rocket className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Ready to Ship! 🎉</h1>
          <p className="text-muted-foreground text-lg">All tests passed. Your Job Tracker is production-ready.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center space-y-1">
              <Settings className="h-5 w-5 mx-auto text-primary" />
              <p className="text-sm font-medium">Preferences</p>
              <p className="text-xs text-muted-foreground">{prefs.role || "Any role"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-1">
              <BookmarkCheck className="h-5 w-5 mx-auto text-primary" />
              <p className="text-sm font-medium">Saved Jobs</p>
              <p className="text-xs text-muted-foreground">{savedJobs.length} jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center space-y-1">
              <Briefcase className="h-5 w-5 mx-auto text-primary" />
              <p className="text-sm font-medium">Applications</p>
              <div className="flex justify-center gap-1 flex-wrap">
                <Badge variant="secondary" className="text-[10px]">{applied} applied</Badge>
                <Badge variant="secondary" className="text-[10px]">{interviews} interview</Badge>
                <Badge variant="default" className="text-[10px]">{offers} offer</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">10 / 10 tests passed</span>
        </div>
      </div>
    </StepLayout>
  );
}
