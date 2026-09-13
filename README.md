# Elsewhere Dashboard

Elsewhere & Co. international jastip catalogue and operations dashboard.

The public catalogue is at `/`; staff sign in at `/dashboard`. A customer selects one product variant, submits contact/shipping information and receives an order reference. Staff manage that order, manually record and verify payments, and progress shipping with a courier and tracking number.

## Local development

Requires Node 22.13+ (Node 24 recommended).

```sh
npm ci
cp .env.example .env.local
# Fill the public Supabase URL and publishable key.
npm run dev:vercel
```

`npm run build:vercel` is the build used by the existing Vercel configuration. The original `npm run dev` / `npm run build` Cloudflare/Vinext workflow remains available.

```sh
npm run typecheck
npm test
npm run build:vercel
```

## Activate the database integration

The code requires `supabase/migrations/202609120001_commerce.sql` applied **once** to the existing Supabase project. It does not include credentials and has not been applied to a hosted project as part of this change.

1. Back up the existing database and inspect its schema/policies. The migration expects the existing `workspace_members`, `trips`, `trip_expenses`, `products`, `product_variants`, and `product_categories` tables used by this dashboard. It runs in one transaction and aborts if those definitions are incompatible. The core schema was absent from this repository; inspect the actual schema before applying.
2. Apply the migration with a database administrator, or through the Supabase SQL editor. Deploy the matching frontend in the same maintenance window: anonymous raw-table access is removed and the old landing page will stop reading the catalogue after this migration.
3. Existing members retain staff access through their authenticated email. Membership provisioning stays in the Supabase administrator workflow; signup alone grants no dashboard/data access. Existing workspace members can read commerce records; only existing owner/editor roles may record or verify payments and update orders. Existing write policies and their created_by checks are preserved.
4. Configure `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and optionally `VITE_WHATSAPP_NUMBER` in local/Vercel environment settings; rebuild after changes. Allow the actual `/dashboard` URL in Supabase Auth redirect URLs for password resets.
5. In the dashboard, select the trip. Set and **save its IDR exchange rate**; configure fashion and non-fashion cargo prices. External exchange-rate lookup is a suggestion only and never silently changes selling prices.
6. Set the trip to **Open PO**. In each product's variant editor, set its sale mode, total stock or total preorder capacity, price, weight, and active flag. Publish the product. New preorder capacity defaults to zero; existing inventory is not guessed or converted.
7. Test with a dedicated test trip: submit an order from a signed-out browser; verify it appears in Orders; record then verify a payment; progress status through confirmation, purchase, arrival and packing; pay the balance and enter courier/tracking before shipping. Verify that nonmembers cannot read orders, receipts, unpublished products or change membership.

The private `order-receipts` bucket limits uploads to 5 MB JPG/PNG/WEBP/PDF. Product photo uploads continue using the existing `product-images` bucket. Check that existing buckets and policies match this setup. Security-definer RPCs have a fixed search path and explicit execute grants; see the [Supabase function guidance](https://supabase.com/docs/guides/database/functions) and [Storage access-control documentation](https://supabase.com/docs/guides/storage/security/access-control).

## Pricing and inventory rules

- Catalogue and checkout use the same database price function; dashboard calculations mirror it and are tested for parity. Product custom margin overrides the default (20% food/drinks; 25% otherwise). Fashion aliases include `Pakaian`, `Tas`, and `Sepatu`. Currency and both cargo rates come from the product's current trip.
- The customer's submitted price is checked, never trusted. An order stores immutable product names, quantity, unit price, and pricing inputs. Future product/FX edits cannot rewrite that order's price.
- Active variants from published Ready products in Open PO trips appear publicly. No cost price, margin, customer data or private trip finance is returned by the public catalogue RPC.
- Stock/capacity means the total sellable allocation for the trip, **including units already ordered**. All noncancelled orders consume it, including completed orders. Do not enter “remaining stock” as the total allocation. Database row locks prevent simultaneous submissions overselling the allocation.
- One order contains one variant with 1–20 units. Repeating a request token returns the original order without another reservation. Keep the form open and use retry after a network error.
- New orders reserve capacity immediately and remain reserved until staff cancels them. Review unpaid/spam orders regularly; this version has no automatic expiry or bot challenge. Public traffic protection/rate limiting should be configured at the deployment boundary before a broad launch.

## Payments and fulfillment

Payment recording and verification are distinct. Only verified payments contribute to cash collected. Pending records also count against the maximum recordable balance, preventing duplicate DP/pelunasan entries; erroneous unverified records can be removed. Verified records cannot be silently deleted or edited.

Status flow: `new → confirmed → purchased → arrived → packed → shipped → completed`. Shipping requires full verified payment and courier/tracking details. Cancellation is allowed only from new/confirmed with no payment records. Refunds and paid-order cancellation require a future explicit refund workflow; do not mutate verified ledger records manually through the app.

Domestic shipping fees are confirmed separately and are **not** included in the goods invoice, payment totals or dashboard revenue in this release. There is no payment gateway or courier API. WhatsApp links open a draft for the user/staff to send; the app does not send messages automatically. Without a configured business number, customer order creation still works and staff can initiate confirmation from Orders.

Core overview metrics now derive from orders/payments for the selected trip. Existing marketing/demo panels remain marked as examples; they are not customer analytics. The public catalogue refreshes every 30 seconds/on window focus using its safe RPC. Staff order lists refresh every 15 seconds and after mutations. No new Realtime publication configuration is required.

## Validation and rollback

`npm test` runs the actual migration and RPCs in an isolated PostgreSQL-compatible PGlite database with synthetic Supabase auth/storage scaffolding. It checks visibility, RLS, price parity and snapshots, capacity/retries, payment verification, cancellation and shipping gates. This does not prove compatibility with an uninspected hosted schema or test true concurrent PostgreSQL sessions. Perform the staging walkthrough above before production.

For rollback, stop new submissions and preserve/export any orders and payment records. Redeploying the old frontend alone will not work with the new anonymous access restrictions. Restore the recorded pre-migration policies/schema through the database administrator after reconciling transactions; do not drop commerce tables containing real orders. The pre-migration `collected_fund` and `confirmed_orders` fields are preserved but no longer used as live transaction totals.
