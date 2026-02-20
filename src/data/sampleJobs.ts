export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
  salary: number;
  keywords: string[];
  applyUrl: string;
}

export const sampleJobs: Job[] = [
  { id: "j1", title: "Frontend Developer", company: "Vercel", location: "San Francisco", type: "remote", salary: 140000, keywords: ["react", "typescript", "css"], applyUrl: "https://vercel.com/careers" },
  { id: "j2", title: "Full Stack Engineer", company: "Stripe", location: "New York", type: "hybrid", salary: 160000, keywords: ["node", "react", "postgresql"], applyUrl: "https://stripe.com/jobs" },
  { id: "j3", title: "Backend Engineer", company: "Datadog", location: "Boston", type: "onsite", salary: 150000, keywords: ["go", "kubernetes", "aws"], applyUrl: "https://careers.datadoghq.com" },
  { id: "j4", title: "React Developer", company: "Shopify", location: "Toronto", type: "remote", salary: 130000, keywords: ["react", "graphql", "typescript"], applyUrl: "https://shopify.com/careers" },
  { id: "j5", title: "DevOps Engineer", company: "HashiCorp", location: "Remote", type: "remote", salary: 145000, keywords: ["terraform", "docker", "aws"], applyUrl: "https://hashicorp.com/careers" },
  { id: "j6", title: "UI/UX Engineer", company: "Figma", location: "San Francisco", type: "hybrid", salary: 155000, keywords: ["react", "css", "design"], applyUrl: "https://figma.com/careers" },
  { id: "j7", title: "Platform Engineer", company: "Cloudflare", location: "Austin", type: "onsite", salary: 148000, keywords: ["rust", "typescript", "networking"], applyUrl: "https://cloudflare.com/careers" },
  { id: "j8", title: "Senior Frontend Engineer", company: "Linear", location: "Remote", type: "remote", salary: 170000, keywords: ["react", "typescript", "performance"], applyUrl: "https://linear.app/careers" },
  { id: "j9", title: "Software Engineer", company: "Notion", location: "New York", type: "hybrid", salary: 165000, keywords: ["react", "node", "postgresql"], applyUrl: "https://notion.so/careers" },
  { id: "j10", title: "Data Engineer", company: "Snowflake", location: "San Mateo", type: "onsite", salary: 158000, keywords: ["python", "sql", "spark"], applyUrl: "https://snowflake.com/careers" },
  { id: "j11", title: "Mobile Developer", company: "Discord", location: "San Francisco", type: "remote", salary: 152000, keywords: ["react", "mobile", "typescript"], applyUrl: "https://discord.com/careers" },
  { id: "j12", title: "Site Reliability Engineer", company: "GitLab", location: "Remote", type: "remote", salary: 160000, keywords: ["linux", "kubernetes", "monitoring"], applyUrl: "https://gitlab.com/careers" },
  { id: "j13", title: "TypeScript Developer", company: "Deno", location: "Remote", type: "remote", salary: 135000, keywords: ["typescript", "rust", "node"], applyUrl: "https://deno.com/careers" },
  { id: "j14", title: "Product Engineer", company: "Resend", location: "San Francisco", type: "hybrid", salary: 145000, keywords: ["react", "typescript", "api"], applyUrl: "https://resend.com/careers" },
  { id: "j15", title: "Infrastructure Engineer", company: "Fly.io", location: "Remote", type: "remote", salary: 155000, keywords: ["go", "rust", "distributed"], applyUrl: "https://fly.io/careers" },
];
