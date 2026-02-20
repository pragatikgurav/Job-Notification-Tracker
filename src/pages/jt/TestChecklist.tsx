import { useState } from "react";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getChecklist, saveChecklist } from "@/lib/jobStorage";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, HelpCircle, RotateCcw, ArrowRight } from "lucide-react";

const testItems = [
  { label: "Preferences persist after refresh", tip: "Set preferences in Step 02, refresh the page, and verify they're still there." },
  { label: "Match score calculates correctly", tip: "Set specific preferences and check that job scores change accordingly in Step 03." },
  { label: '"Show only matches" toggle works', tip: "Toggle the switch in Step 03 and verify low-score jobs are filtered out." },
  { label: "Save job persists after refresh", tip: "Save a job in Step 03, refresh, and check it appears in Step 04." },
  { label: "Apply opens in new tab", tip: "Click the external link icon on a job in Step 03 and verify it opens in a new tab." },
  { label: "Status update persists after refresh", tip: "Change a job's status in Step 05, refresh, and verify it's still updated." },
  { label: "Status filter works correctly", tip: "Use the status dropdown in Step 05 to filter jobs and verify the list updates." },
  { label: "Digest generates top 10 by score", tip: "Check that Step 06 shows exactly 10 jobs sorted by match score." },
  { label: "Digest persists for the day", tip: "Visit Step 06, refresh, and verify the same digest is shown." },
  { label: "No console errors on main pages", tip: "Open browser DevTools and navigate through all steps — check for red errors." },
];

export default function TestChecklist() {
  const navigate = useNavigate();
  const [checks, setChecks] = useState<boolean[]>(getChecklist());
  const passed = checks.filter(Boolean).length;
  const allPassed = passed === 10;

  const toggle = (idx: number) => {
    const updated = [...checks];
    updated[idx] = !updated[idx];
    setChecks(updated);
    saveChecklist(updated);
  };

  const reset = () => {
    const fresh = new Array(10).fill(false);
    setChecks(fresh);
    saveChecklist(fresh);
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Test Checklist</h1>
          <p className="text-muted-foreground">Verify everything works before shipping.</p>
        </div>

        {/* Summary */}
        <Card>
          <CardContent className="py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {allPassed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                )}
                <span className="font-semibold">Tests Passed: {passed} / 10</span>
              </div>
              <Badge variant={allPassed ? "default" : "secondary"}>
                {allPassed ? "Ready to Ship" : "In Progress"}
              </Badge>
            </div>
            <Progress value={passed * 10} className="h-2" />
            {!allPassed && (
              <p className="text-sm text-amber-600">Resolve all issues before shipping.</p>
            )}
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Checklist</CardTitle>
              <Button variant="ghost" size="sm" onClick={reset} className="gap-1 text-muted-foreground">
                <RotateCcw className="h-3 w-3" /> Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {testItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-accent/50 transition-colors"
              >
                <Checkbox
                  checked={checks[idx]}
                  onCheckedChange={() => toggle(idx)}
                  id={`test-${idx}`}
                />
                <label htmlFor={`test-${idx}`} className="flex-1 text-sm cursor-pointer select-none">
                  {item.label}
                </label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-xs">
                    <p className="text-xs">{item.tip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          onClick={() => navigate("/jt/08-ship")}
          disabled={!allPassed}
          className="gap-2"
        >
          {allPassed ? "Continue to Ship" : "Complete all tests first"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
