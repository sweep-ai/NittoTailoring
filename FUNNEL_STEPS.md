# Alpha Reset System — Funnel Steps

Configure these steps in **Sweep OS → Funnels → Alpha Reset System → Steps**, in order.

| Setting | Value |
|---------|-------|
| **Funnel ID** | `ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c` |
| **Site** | Alpha Reset System (Nitto Tailoring) |

---

## User journey

```
/  Quiz landing
│  (multi-step quiz: name → questions → contact)
▼
/training  Personalized training VSL
│  (watch video → open Typeform)
▼
/thank-you  Post-application confirmation
   OR
/booking → Calendly embed → /thank-you
```

`/applynow` is a standalone apply VSL with an inline Typeform.

---

## Steps to create in Sweep OS

Add these steps **in this order**. Event names are case-sensitive and must match exactly.

| Step | Event name | Label | Description |
|------|------------|-------|-------------|
| 1 | `quiz_page_view` | Quiz Page View | User lands on `/` |
| 2 | `form_submit` | Quiz Submitted | User completes the root quiz on `/` |
| 3 | `training_page_view` | Training Page View | User views `/training` |
| 4 | `apply_page_view` | Apply Page View | User views `/applynow` |
| 5 | `booking_page_view` | Booking Page View | User views `/booking` |
| 6 | `thank_you_page_view` | Thank You Page View | User views `/thank-you` |

---

## Step details

### Step 1 — `quiz_page_view`

**Label:** Quiz Page View

**When it fires:** On route change to `/`.

**Implementation:** `FunnelTracker` (`src/components/analytics/FunnelTracker.tsx`)

**Metadata sent:**

```json
{
  "route": "/",
  "page_url": "https://example.com/",
  "page_title": "Alpha Reset System",
  "utm": { "source": "...", "medium": "...", "campaign": "..." },
  "referrer": "https://..."
}
```

---

### Step 2 — `form_submit` + lead capture

**Label:** Quiz Submitted

**When it fires:** User completes all quiz steps on `/` and clicks **See my plan** on the contact step.

**Next action:** Redirect to `/training`.

**Implementation:** `submitQuizLead()` in `src/lib/funnelTrack.ts` (called from `QuizFlow`)

Sends **two** requests on submit:

1. `POST /funnels/events` — `form_submit` with `idempotency_key: form_submit_{session_id}_root-quiz`
2. `POST /funnels/leads` — creates/updates Client Board lead with contact info + `quiz_answers`

**Lead payload:**

```json
{
  "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
  "email": "lead@example.com",
  "name": "Jane",
  "phone": "+15551234567",
  "instagram": "@handle",
  "source": "quiz",
  "funnel_step_reached": "form_submit",
  "quiz_answers": {
    "result": "A",
    "holding_back": "B",
    "occupation": "C"
  }
}
```

**Event metadata** (same moment):

```json
{
  "form_id": "root-quiz",
  "form_fields": [
    "name",
    "result",
    "holdingBack",
    "instagram",
    "occupation",
    "email",
    "phone"
  ],
  "result": "A",
  "holding_back": "B",
  "occupation": "C",
  "page_url": "https://example.com/",
  "page_title": "Alpha Reset System",
  "utm": {},
  "referrer": "..."
}
```

Choice answer IDs are included in event metadata and `quiz_answers`. Email and phone go to `/funnels/leads` only (not event metadata).

---

### Step 3 — `training_page_view`

**Label:** Training Page View

**When it fires:** On route change to `/training` (after quiz completion).

**Implementation:** `FunnelTracker`

**Metadata sent:**

```json
{
  "route": "/training",
  "page_url": "https://example.com/training",
  "page_title": "Alpha Reset System",
  "utm": {},
  "referrer": "..."
}
```

---

### Step 4 — `apply_page_view`

**Label:** Apply Page View

**When it fires:** On route change to `/applynow`.

**Implementation:** `FunnelTracker`

**Metadata sent:**

```json
{
  "route": "/applynow",
  "page_url": "https://example.com/applynow",
  "page_title": "Alpha Reset System",
  "utm": {},
  "referrer": "..."
}
```

---

### Step 5 — `booking_page_view`

**Label:** Booking Page View

**When it fires:** On route change to `/booking`.

**Implementation:** `FunnelTracker`

**Metadata sent:**

```json
{
  "route": "/booking",
  "page_url": "https://example.com/booking",
  "page_title": "Alpha Reset System",
  "utm": {},
  "referrer": "..."
}
```

---

### Step 6 — `thank_you_page_view`

**Label:** Thank You Page View

**When it fires:** On route change to `/thank-you` (after Typeform submit or Calendly booking).

**Implementation:** `FunnelTracker`

**Metadata sent:**

```json
{
  "route": "/thank-you",
  "page_url": "https://example.com/thank-you",
  "page_title": "Alpha Reset System",
  "utm": {},
  "referrer": "..."
}
```

---

## Routes not tracked

These routes do not fire funnel events today:

| Route | Page |
|-------|------|
| `/quiz` | Assessment flow |
| `/privacy-policy`, `/terms`, `/disclaimer` | Legal pages |

---

## Recommended future steps

| Step | Event name | Label | Trigger | Status |
|------|------------|-------|---------|--------|
| 7 | `form_start` | Quiz Started | User begins the root quiz | Planned |
| 8 | `apply_submit` | Application Submitted | Typeform completed | Planned |
| 9 | `booking_scheduled` | Discovery Call Booked | Calendly `event_scheduled` on `/booking` | Planned |

---

## Environment variables

### Local development (`npm run dev`)

```env
VITE_FUNNEL_ID=ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c
VITE_API_BASE_URL=https://api.sweepai.site
VITE_API_PROXY_TARGET=https://api.sweepai.site
VITE_FUNNEL_TRACK_DEBUG=true
```

In dev, requests automatically go to `/sweep-api/funnels/events` and Vite proxies them to `VITE_API_PROXY_TARGET`. This avoids CORS — the production API does not allow direct browser requests from `localhost`.

Restart `npm run dev` after changing `.env`. You should see in the console:

```
[Sweep] Dev proxy active: /sweep-api → https://api.sweepai.site
Sweep funnel tracking accepted: { event_id: "...", status: "accepted" }
```

### Production (Vercel)

```env
VITE_API_BASE_URL=https://api.sweepai.site
VITE_FUNNEL_ID=ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c
```

Optional: `VITE_FUNNEL_TRACKING_ENABLED=false` disables all tracking. `VITE_FUNNEL_TRACK_DEBUG=true` logs payloads to the console.

---

## Quick setup checklist

- [ ] Create funnel in Sweep OS (or confirm existing funnel ID)
- [ ] Add step 1: `quiz_page_view` → **Quiz Page View**
- [ ] Add step 2: `form_submit` → **Quiz Submitted**
- [ ] Add step 3: `training_page_view` → **Training Page View**
- [ ] Add step 4: `apply_page_view` → **Apply Page View**
- [ ] Add step 5: `booking_page_view` → **Booking Page View**
- [ ] Add step 6: `thank_you_page_view` → **Thank You Page View**
- [ ] Set `VITE_API_BASE_URL` in production `.env`
- [ ] Deploy and verify events in **Funnels → Events** tab

---

## Testing

```bash
# Quiz page view
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "quiz_page_view",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "route": "/", "page_url": "https://example.com/" }
  }'

# Training page view
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "training_page_view",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "route": "/training", "page_url": "https://example.com/training" }
  }'

# Apply page view
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "apply_page_view",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "route": "/applynow", "page_url": "https://example.com/applynow" }
  }'

# Quiz submit
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "form_submit",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "form_id": "root-quiz" }
  }'

# Booking page view
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "booking_page_view",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "route": "/booking", "page_url": "https://example.com/booking" }
  }'

# Thank you page view
curl -X POST "$VITE_API_BASE_URL/funnels/events" \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "ee46f8a6-ace5-4dd1-9279-abf58ae6ae9c",
    "event_name": "thank_you_page_view",
    "visitor_id": "test_visitor",
    "session_id": "test_session",
    "metadata": { "route": "/thank-you", "page_url": "https://example.com/thank-you" }
  }'
```

Expected response: `202 Accepted` with `{ "status": "accepted", "event_id": "..." }`.

See [FUNNEL_INTEGRATION_GUIDE.md](./FUNNEL_INTEGRATION_GUIDE.md) for full API documentation.
