# Disaster Data Commons for Resilience (DDCR)

**Open-source AI platform for disaster information integration**

When disasters strike, fragmented information systems create a "dark 72 hours" where no authority has a unified picture of evacuee numbers, shelter capacities, or relief supply distribution. DDCR solves this by normalizing heterogeneous disaster data into a unified Common Operating Picture (COP) — without replacing any existing system.

## Design Principles

1. **"AI surfaces uncertainty, humans decide."** — AI does not generate "truth." It structures what is known, what is unknown, and where data conflicts exist.
2. **Vendor ecosystem, not vendor replacement.** — DDCR works *with* existing disaster system vendors through co-developed adapters.
3. **Hybrid architecture.** — Sensitive personal data stays on-premise; anonymized analytics leverage cloud AI (Google Gemini, Vertex AI).
4. **Provenance first.** — Every data point carries lineage metadata: who reported it, when, how, and with what confidence.
5. **Open standards only.** — JSON Schema, GeoJSON, W3C PROV-O. No proprietary middleware.

## UI Mockups

### Common Operating Picture Dashboard
![COP Dashboard](mockups/cop-dashboard-screenshot.png)
[Open interactive mockup](mockups/cop-dashboard.html)

### Conflict Resolution View
![Conflict View](mockups/conflict-view-screenshot.png)
[Open interactive mockup](mockups/conflict-view.html)

### Data Feed — Multi-Source Ingestion
![Data Feed](mockups/data-feed-screenshot.png)
[Open interactive mockup](mockups/data-feed.html)

Shows real-time data flowing from diverse sources with different confidence levels:
- **Government Systems** (high confidence) — automated CSV/DB ingestion
- **Staff Reports** (medium-high) — field observations, Excel uploads
- **NPO/Partner Orgs** (medium) — structured report forms
- **SNS/Public Info** (low) — AI-extracted, requires verification

## Architecture

```
Existing Systems → Adapter Layer → AI Normalization → Decision Support → COP Dashboard
(untouched)       (vendor co-built)  (schema mapping,    (conflict flagging,  (what we know,
                                      provenance tracking) natural language     what we don't,
                                                           queries)            who said what)
```

### Hybrid Infrastructure

| Component | Environment | Rationale |
|---|---|---|
| Personal data processing | **On-premise** | Legal requirement; internet-independent |
| Real-time COP generation | **On-premise** | Must operate during connectivity loss |
| Schema mapping rule generation | **Google Cloud (Gemini)** | Anonymized data only |
| Model evaluation | **Google Cloud (Vertex AI)** | Anonymized test datasets |
| Satellite damage assessment | **Google Cloud (Geospatial AI)** | Public imagery |

## Schemas

DDCR defines open schemas for disaster data entities. All schemas are [JSON Schema](https://json-schema.org/) compliant and designed to be used with any database or API — no proprietary middleware required.

| Schema | Description |
|---|---|
| [`shelter.schema.json`](schemas/shelter.schema.json) | Emergency shelter with capacity, evacuees, supply status, and vulnerable population tracking |
| [`supply.schema.json`](schemas/supply.schema.json) | Relief supply tracking with allocation and provenance |
| [`decision.schema.json`](schemas/decision.schema.json) | Immutable decision audit trail — who decided what, based on which evidence |

### Key Schema Features

**Provenance tracking** — Every observed value includes:
- Who reported it (source entity)
- How it was collected (field observation, system input, AI normalized, etc.)
- Confidence level (high / medium / low)
- When it was observed

**Conflict preservation** — When multiple sources report different values for the same field, DDCR preserves all values with their provenance rather than silently overwriting:

```json
{
  "evacuees": {
    "value": 147,
    "observed_at": "2026-01-01T06:30:00Z",
    "provenance": {
      "reported_by": "JGSDF_3rd_Regiment",
      "method": "field_observation",
      "confidence": "high"
    },
    "conflicts": [
      {
        "source": "Yokohama_City_System",
        "value": 203,
        "observed_at": "2026-01-01T05:00:00Z",
        "confidence": "medium"
      }
    ]
  }
}
```

Decision-makers see: *"JGSDF reports 147 (field observation, 06:30, high confidence) — conflicts with city system showing 203 (05:00, medium confidence)."*

## Technology Stack

| Layer | Technology | License |
|---|---|---|
| Database | PostgreSQL + PostGIS | PostgreSQL License |
| On-premise LLM | Ollama (open models) | MIT |
| API Server | FastAPI (Python) | MIT |
| Authentication | Keycloak | Apache 2.0 |
| Geospatial | Geolonia Maps SDK | MIT |
| Cloud AI | Google Gemini API, Vertex AI | — |

## Background

DDCR was born from the lessons of the 2024 Noto Peninsula earthquake, where 34,000+ displaced people across 600+ shelters could not be tracked by any single system. Building a victim database required integrating 15 incompatible data sources — a challenge that recurs in every major disaster in Japan.

### Stakeholder Validation

Two multi-stakeholder workshops have validated the problem framing and technical approach:

- **Ishikawa Prefecture** (March 2025) — 50 participants including prefectural government, 2 disaster-affected municipalities, and 12+ companies
- **Tokushima Prefecture** (November 2025) — 50 participants including prefectural/municipal government and 10+ disaster-related organizations

Both workshops confirmed: the diversity of disaster data, the critical need for cross-organizational databases, and that monolithic systems alone are insufficient.

## Organizations

- **[Code for Japan](https://code4japan.org/)** — Applicant. Civic tech nonprofit (est. 2013). Operates data interoperability platforms for municipalities (Saga City, Hamamatsu City). Built Tokyo's COVID-19 dashboard (replicated to 65+ government sites, Good Design Gold Award 2020).
- **[DIT/CC](https://bdx.jp/)** — Strategic partner. Permanent secretariat of D-CERT (Digital Agency's official disaster digital support team). Founded by LINE Yahoo, NTT, SoftBank, PwC, Tokio Marine Holdings, Fujifilm, and Mitsui Sumitomo Insurance.
- **Kanagawa Prefecture** — Government partner (9.4M residents, 33 municipalities). DIT/CC's director serves as the prefecture's Chief Digital Officer.

## Status

DDCR is currently in the schema definition and prototyping phase. This repository will grow as development progresses. Contributions and feedback are welcome.

## License

MIT License. See [LICENSE](LICENSE).

---

*Building open infrastructure for disaster resilience.*
