

# Job Notification Tracker — Full 8-Step App

A guided, step-by-step Job Notification Tracker with a premium design, progress navigation, and a built-in test checklist that gates the final Ship step.

---

## Step Navigation & Layout

- Sidebar or top stepper showing all 8 steps with progress indicator (completed, current, locked states)
- Steps are navigable by clicking, except Step 08-Ship which is locked until all test checklist items pass
- Progress persists in localStorage so users can resume where they left off
- Clean, modern UI with consistent card-based layouts across all steps

---

## Step 01 — Welcome

- Hero section introducing the Job Notification Tracker
- Brief description of what the tool does and the 8-step flow
- "Get Started" button to proceed to Step 02

## Step 02 — Preferences

- Form to set job preferences: desired role, location, job type (remote/hybrid/onsite), salary range, keywords
- Preferences saved to localStorage and persist after refresh
- Clean form layout with validation

## Step 03 — Job Matching

- Display a list of sample jobs with a match score (calculated from Step 02 preferences)
- "Show only matches" toggle to filter jobs above a score threshold
- Each job card shows title, company, location, match score badge

## Step 04 — Saved Jobs

- Users can save jobs from Step 03
- Saved jobs list with ability to remove
- Persists in localStorage after refresh

## Step 05 — Status Tracking

- For each saved job, users can set a status: Applied, Interview, Offer, Rejected
- Status updates persist in localStorage
- Filter by status dropdown

## Step 06 — Digest

- Auto-generates a "Daily Digest" showing the top 10 jobs by match score
- Digest persists for the current day (regenerates next day)
- Clean summary card layout

## Step 07 — Test Checklist

- 10 test items, each with a checkbox and a "How to test" tooltip:
  1. Preferences persist after refresh
  2. Match score calculates correctly
  3. "Show only matches" toggle works
  4. Save job persists after refresh
  5. Apply opens in new tab
  6. Status update persists after refresh
  7. Status filter works correctly
  8. Digest generates top 10 by score
  9. Digest persists for the day
  10. No console errors on main pages
- Summary at top: "Tests Passed: X / 10"
- Warning when incomplete: "Resolve all issues before shipping."
- "Reset Test Status" button
- Checklist state persists in localStorage

## Step 08 — Ship

- **Locked** until all 10 checklist items are checked in Step 07
- Shows a locked state with message explaining the requirement
- Once unlocked: celebratory UI with confirmation that the app is ready to ship
- Summary of all settings and stats

---

## Technical Approach

- All data stored in **localStorage** (no backend needed)
- Routes: `/jt/01-welcome` through `/jt/08-ship`
- Shared layout component with step navigation and progress indicator
- Sample job data hardcoded for matching/scoring demonstrations
- Fully responsive design using existing Tailwind + shadcn/ui components

