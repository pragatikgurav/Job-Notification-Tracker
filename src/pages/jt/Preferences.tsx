import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPreferences, savePreferences, type Preferences as PrefsType } from "@/lib/jobStorage";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";

export default function Preferences() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<PrefsType>(getPreferences());

  useEffect(() => { setPrefs(getPreferences()); }, []);

  const update = (key: keyof PrefsType, value: string | number) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    savePreferences(prefs);
    toast.success("Preferences saved!");
  };

  return (
    <StepLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Set Your Preferences</h1>
          <p className="text-muted-foreground">Tell us what you're looking for and we'll match jobs accordingly.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">Job Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Desired Role</Label>
                <Input placeholder="e.g. Frontend Developer" value={prefs.role} onChange={e => update("role", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Preferred Location</Label>
                <Input placeholder="e.g. San Francisco" value={prefs.location} onChange={e => update("location", e.target.value)} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select value={prefs.jobType} onValueChange={v => update("jobType", v)}>
                  <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Min Salary ($)</Label>
                <Input type="number" value={prefs.salaryMin} onChange={e => update("salaryMin", Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Max Salary ($)</Label>
                <Input type="number" value={prefs.salaryMax} onChange={e => update("salaryMax", Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Keywords (comma-separated)</Label>
              <Input placeholder="e.g. react, typescript, node" value={prefs.keywords} onChange={e => update("keywords", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={handleSave} variant="secondary" className="gap-2">
            <Save className="h-4 w-4" /> Save
          </Button>
          <Button onClick={() => { handleSave(); navigate("/jt/03-matching"); }} className="gap-2">
            Save & Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </StepLayout>
  );
}
