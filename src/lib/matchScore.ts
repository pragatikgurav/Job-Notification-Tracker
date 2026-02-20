import { Job } from "@/data/sampleJobs";
import { Preferences } from "@/lib/jobStorage";

export function calculateMatchScore(job: Job, prefs: Preferences): number {
  if (!prefs.role && !prefs.location && !prefs.jobType && !prefs.keywords) return 50;

  let score = 0;
  let factors = 0;

  // Role match
  if (prefs.role) {
    factors++;
    const roleWords = prefs.role.toLowerCase().split(/\s+/);
    const titleLower = job.title.toLowerCase();
    const matched = roleWords.filter(w => titleLower.includes(w)).length;
    score += (matched / roleWords.length) * 100;
  }

  // Location match
  if (prefs.location) {
    factors++;
    if (job.location.toLowerCase().includes(prefs.location.toLowerCase()) || job.type === "remote") {
      score += 100;
    }
  }

  // Job type match
  if (prefs.jobType) {
    factors++;
    if (job.type === prefs.jobType) score += 100;
  }

  // Salary range match
  if (prefs.salaryMin > 0 || prefs.salaryMax < 200000) {
    factors++;
    if (job.salary >= prefs.salaryMin && job.salary <= prefs.salaryMax) score += 100;
    else if (job.salary >= prefs.salaryMin - 20000) score += 50;
  }

  // Keywords match
  if (prefs.keywords) {
    factors++;
    const kws = prefs.keywords.toLowerCase().split(",").map(k => k.trim()).filter(Boolean);
    if (kws.length > 0) {
      const matched = kws.filter(kw => job.keywords.some(jk => jk.includes(kw))).length;
      score += (matched / kws.length) * 100;
    }
  }

  return factors > 0 ? Math.round(score / factors) : 50;
}
