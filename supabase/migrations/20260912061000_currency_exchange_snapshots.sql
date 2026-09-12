-- Add foreign currency exchange snapshot columns to transactions and recurring_items

ALTER TABLE public.transactions
  ADD COLUMN IF NOT EXISTS original_amount NUMERIC(14,3),
  ADD COLUMN IF NOT EXISTS original_currency TEXT,
  ADD COLUMN IF NOT EXISTS converted_amount NUMERIC(14,3),
  ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS rate_date DATE;

ALTER TABLE public.recurring_items
  ADD COLUMN IF NOT EXISTS original_amount NUMERIC(14,3),
  ADD COLUMN IF NOT EXISTS original_currency TEXT,
  ADD COLUMN IF NOT EXISTS converted_amount NUMERIC(14,3),
  ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS rate_date DATE;
