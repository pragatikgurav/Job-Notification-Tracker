import { useNavigate } from "react-router-dom";
import StepLayout from "@/components/jt/StepLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ArrowRight, Search, Bell, CheckCircle2 } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  const features = [
    { icon: Search, title: "Smart Matching", desc: "Jobs scored against your preferences" },
    { icon: Bell, title: "Daily Digest", desc: "Top 10 jobs delivered automatically" },
    { icon: CheckCircle2, title: "Status Tracking", desc: "Track applications end-to-end" },
  ];

  return (
    <StepLayout>
      <div className="text-center space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Job Notification Tracker</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Set your preferences, discover matching jobs, track applications, and ship when everything checks out.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {features.map(f => (
            <Card key={f.title} className="border-dashed">
              <CardContent className="pt-6 text-center space-y-2">
                <f.icon className="h-6 w-6 mx-auto text-primary" />
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button size="lg" onClick={() => navigate("/jt/02-preferences")} className="gap-2">
          Get Started <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </StepLayout>
  );
}
