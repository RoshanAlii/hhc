# HealthServe — Home healthcare in Dubai

A full, functional web app for HealthServe Home Healthcare, converted from the original
static hi-fi mockups into a real **Next.js 15 (App Router) + TypeScript** application. The
confirmed brand design system (Healthserve Orange, Life Green, Lato, 8px corners on warm
white) is preserved exactly.

## Run it

```bash
npm install
npm run dev      # http://localhost:3200
npm run build    # production build
npm start        # serve the production build
```

## What's real (not just static screens)

- **Routing** — every screen is a real route (`/services`, `/services/[slug]`, `/journal/[slug]`,
  `/careers/[slug]`, `/cart`, `/checkout`, `/order/confirmation`, `/account`, …).
- **Cart** — React Context + `localStorage`. Add services (with variant) or packages, change
  quantity, remove, live header count. VAT (5%) and promo codes (`WELCOME10`, `HEALTH15`)
  computed live.
- **Checkout** — validated guest checkout (name / mobile / address / payment method), creates
  an order, clears the cart, and routes to a real confirmation with a generated order number.
- **Forms** — Contact, Careers apply, Organizations proposal, Help search, and a passwordless
  **OTP login** flow (demo code `4242`) are all interactive with client-side validation and
  success states.
- **Data-driven** — services, wellness services, packages, journal articles and job listings
  all come from `lib/data.ts`; detail pages are generated from that data.

> Prices are **sample AED values** so the cart/checkout math works end to end. Swap the
> numbers in `lib/data.ts` for the real price list when it's confirmed.

## Structure

```
app/                 App Router routes (one folder per screen)
components/          Header, Footer, Logo, forms, cart/checkout/service clients
lib/data.ts          All content + the price/data model
lib/cart.tsx         Cart context, order storage
app/globals.css      Brand tokens + component styles (ported from tokens.css + healthserve.css)
legacy-mockups/      The original static HTML mockups, kept for reference
```

## Notes / next steps

- Payments, OTP and form submissions are front-end simulations — wire them to a backend/
  gateway for production.
- A cart-level promo code is applied on the cart page for display; carrying it through to the
  charged total would need it stored in cart state.
- Photography and the logo are placeholders (SVG logo recreation in `components/Logo.tsx`);
  swap in the brand PNG and real imagery in `public/`.
