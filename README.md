# Argo

> AI-powered travel planning — drop in a video URL, get a day-by-day itinerary.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat&logo=google-cloud&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)
![Status](https://img.shields.io/badge/Status-In_Development-orange?style=flat)

---

## What It Does

Argo lets users drop in any travel video or blog URL. An AI pipeline extracts the real-world locations mentioned, enriches them with live data, and organizes them into a collaborative, editable multi-day itinerary.

<!-- Screenshots: replace with actual images before publishing -->
<!--
Hero: /itinerary/{slug} — Day 1 / Day 2 with activities and travel times
Supporting grid: dashboard · collection · job progress overlay · share modal
-->

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│          Next.js 15 (Vercel)  +  Supabase Realtime       │
└──────────────────────┬───────────────────────────────────┘
                       │ REST
                       ▼
         ┌─────────────────────────────┐
         │        Express API          │
         │       (Cloud Run)           │
         │  auth → validate → enqueue  │
         └──────────────┬──────────────┘
                        │ Pub/Sub message
                        ▼
         ┌───────────────────────────────────────────┐
         │          Worker  (Cloud Run Jobs)         │
         │                                           │
         │  video URL  ──▶  [ Video Pipeline   ]    │
         │  web URL    ──▶  [ Web Pipeline     ]    │
         │  plan req   ──▶  [ Planning Pipeline]    │
         │                                           │
         │  writes progress to DB                    │
         └──────────────┬────────────────────────────┘
                        │ reads / writes
                        ▼
              ┌──────────────────┐
              │    Supabase      │◀── Realtime subscription ── Browser
              │   PostgreSQL     │
              └──────────────────┘
```

**Why this design:**

**Cloud Run Jobs for the worker** — content analysis takes 30s–2 min. Cloud Run Jobs scale to zero when idle and spin up per-job, so there's no always-on process to manage or pay for.

**Pub/Sub between API and worker** — the API returns to the user in milliseconds; analysis runs asynchronously. If a worker crashes mid-job, Pub/Sub re-delivers the message. The API and worker share zero in-memory state.

**Supabase Realtime instead of a WebSocket to the worker** — the worker writes job progress (step label + percentage) directly to the database row. The browser subscribes to that row via Supabase Realtime. No direct worker↔frontend connection is needed — the worker stays fully stateless.

**Resilience** — every component is independently replaceable. A failed job is re-queued, not lost. Progress survives browser refreshes because it lives in the database, not memory.

---

## AI Pipeline

### Video Analysis — why three signals instead of one

```
Video URL
  ├─ Audio   ──▶  transcript
  ├─ Frames  ──▶  OCR on key frames
  └─ Metadata  (title, description, tags)
        │
        └─▶  LLM synthesis  ──▶  structured location list
```

Audio alone misses locations that only appear as on-screen text or map overlays. OCR alone misses spoken-only mentions. Running all three in parallel, then synthesizing with an LLM, gives meaningfully better recall than any single signal.

### Itinerary Generation — why K-means before sequencing

```
Selected locations (lat/lng)
  ├─ K-means clustering    ──▶  one geographic cluster per day
  ├─ Per-cluster ordering  ──▶  respects opening hours
  └─ Google Routes API     ──▶  travel times + route polylines
```

Naive sequential ordering produces itineraries where users backtrack across the city. Clustering by proximity first ensures each day is geographically coherent; the sequencer then optimizes order within each cluster.

---

## Status

Argo is actively in development. Core pipelines are working; features are being iterated on.

Happy to walk through a demo — reach out or open an issue.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| API | Express.js on Cloud Run |
| Background Jobs | Cloud Run Jobs + Pub/Sub |
| AI / ML | OpenAI, Google Gemini |
| Database | Supabase (PostgreSQL + Realtime) |
| Infrastructure | GCP, Terraform, GitHub Actions |

---

## Project Structure

```
argo/
├── frontend/          # Next.js app (App Router, server + client components)
├── backend/
│   ├── api/           # Express REST API (Cloud Run service)
│   ├── worker/        # Job handlers (Cloud Run Jobs)
│   └── shared/        # Shared types and constants
├── database/          # Supabase migrations (45+ versioned SQL files)
├── infrastructure/    # Terraform configs for all GCP resources
└── .github/           # CI/CD — auto-deploys to Vercel + Cloud Run on push to main
```

