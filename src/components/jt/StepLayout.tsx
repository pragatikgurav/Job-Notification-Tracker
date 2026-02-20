import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getChecklist, getCurrentStep, setCurrentStep } from "@/lib/jobStorage";
import { Check, Lock, Briefcase } from "lucide-react";
import { useEffect } from "react";

const steps = [
  { num: 1, label: "Welcome", path: "/jt/01-welcome" },
  { num: 2, label: "Preferences", path: "/jt/02-preferences" },
  { num: 3, label: "Job Matching", path: "/jt/03-matching" },
  { num: 4, label: "Saved Jobs", path: "/jt/04-saved" },
  { num: 5, label: "Status", path: "/jt/05-status" },
  { num: 6, label: "Digest", path: "/jt/06-digest" },
  { num: 7, label: "Test", path: "/jt/07-test" },
  { num: 8, label: "Ship", path: "/jt/08-ship" },
];

export default function StepLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const activeIdx = steps.findIndex(s => s.path === currentPath);
  const highestStep = getCurrentStep();
  const allTestsPassed = getChecklist().every(Boolean);

  useEffect(() => {
    if (activeIdx + 1 > highestStep) setCurrentStep(activeIdx + 1);
  }, [activeIdx, highestStep]);

  const canNavigate = (idx: number) => {
    if (idx === 7) return allTestsPassed; // Ship locked
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">Job Tracker</span>
        </div>
      </header>

      {/* Step indicator */}
      <nav className="border-b bg-card/50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              const isCompleted = idx < activeIdx;
              const locked = !canNavigate(idx);

              return (
                <button
                  key={step.num}
                  onClick={() => !locked && navigate(step.path)}
                  disabled={locked}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                    isActive && "bg-primary text-primary-foreground shadow-sm",
                    isCompleted && !isActive && "bg-secondary text-secondary-foreground",
                    !isActive && !isCompleted && !locked && "text-muted-foreground hover:bg-accent",
                    locked && "text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  {locked ? (
                    <Lock className="h-3 w-3" />
                  ) : isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">
                      {step.num}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
