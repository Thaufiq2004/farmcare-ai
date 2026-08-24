# FarmCare AI — System Design

## Product goal

FarmCare AI helps a Bangladeshi farmer decide what to do next across three connected production systems: crops, livestock, and fisheries. It combines a calm daily brief with specific, time-bound actions rather than presenting raw sensor data.

## Product principles

1. **Action before information** — every alert ends with a practical next step.
2. **Local by default** — district and upazila context, Bangla-friendly language, BDT pricing, local seasons, and Bangladesh-relevant crops/species.
3. **Trust through explanation** — AI suggestions show confidence, reason, and when to escalate to an expert.
4. **Low-bandwidth resilience** — the core brief and saved actions should remain useful with slow or intermittent connectivity.
5. **One farm, three systems** — the same profile and timeline connect crop, animal, and pond decisions.

## Current MVP architecture

```text
React + Vite web app
  ├─ Shared navigation shell and farm context
  ├─ Dashboard: daily brief, risk alerts, progress, weather framing
  ├─ Crop care: stage-based tasks and photo-diagnosis entry point
  ├─ Livestock: herd health, vaccination, and treatment reminders
  ├─ Fisheries: pond water quality, stocking, and risk checks
  ├─ Market: local commodity prices and sell/hold signals
  └─ Assistant: conversational, multilingual next-step guidance
```

The judging build uses deterministic seeded demo data in the browser so the full product is explorable without API keys, accounts, or third-party dependencies. The API server is kept as the integration boundary for the next phase.

## Production-ready extension

```text
Web client
  -> API gateway / auth
     -> Farm profile + activity store (PostgreSQL)
     -> Advisory service (rules + model gateway)
     -> External adapters
          - Bangladesh Meteorological Department / weather provider
          - Department of Agricultural Extension and fisheries advisories
          - Local market price feeds
          - Optional image diagnosis model
     -> Notification adapter (SMS / WhatsApp / push)
```

### Core entities

- `Farm`: owner, district, upazila, land size, production systems, language.
- `CropPlot`: crop, variety, plot size, sowing date, growth stage, health status.
- `LivestockGroup`: animal type, count, breed, age band, health status, next check.
- `Pond`: species, area, stocking date, water readings, risk status.
- `Advisory`: module, severity, title, evidence, action, due date, confidence.
- `MarketQuote`: commodity, market, observed price, unit, direction, timestamp.
- `FarmEvent`: a shared timeline of tasks, observations, treatments, and harvests.

## AI safety and quality boundary

AI can summarize observations, rank actions, translate advice, and explain tradeoffs. It should not prescribe restricted medication or replace a veterinarian, fisheries officer, or agricultural extension professional. Low-confidence image or health diagnoses must recommend escalation and preserve the user's original observation.

## Feature research synthesis

The MVP takes proven patterns from leading farm products: photo-based crop diagnosis and expert escalation (Plantix), farm intelligence and disease detection, chatbot guidance, precision irrigation, and livestock record/monitoring workflows. Bangladesh-specific differentiation is the shared crop-livestock-fisheries model, district-aware context, Bangla-friendly interaction, BDT market signals, and low-bandwidth-first delivery.

## Delivery slices

1. **Slice 1 — Foundation:** live shell, dashboard, module navigation, seeded Bangladesh data.
2. **Slice 2 — Decisions:** crop/livestock/fisheries action flows, filters, dismissible alerts, assistant prompts.
3. **Slice 3 — Trust layer:** system design docs, AI confidence/escalation language, market intelligence, multilingual cues.
4. **Next production slice:** API contracts, persistent farm profiles, real weather/market adapters, auth, notifications, and model gateway.