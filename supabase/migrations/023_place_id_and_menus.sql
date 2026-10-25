-- Migration 023: Add google_place_id to businesses & create business_menu_items table
-- Target: Supabase public schema
-- Created: 2026-10-25

-- 1. Add google_place_id column to businesses table
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS google_place_id text;
CREATE INDEX IF NOT EXISTS idx_businesses_google_place_id ON public.businesses(google_place_id);

-- 2. Create business_menu_items table
CREATE TABLE IF NOT EXISTS public.business_menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  section text,
  name_original text NOT NULL,
  name_ko text,
  name_en text,
  price_vnd bigint,
  price_text text,
  grade text CHECK (grade IN ('A', 'B', 'C', 'D')),
  source text,
  verified_date date,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_business_menu_items_business_id ON public.business_menu_items(business_id);
CREATE INDEX IF NOT EXISTS idx_business_menu_items_grade ON public.business_menu_items(grade);
CREATE INDEX IF NOT EXISTS idx_business_menu_items_section ON public.business_menu_items(section);

-- 3. Row Level Security (RLS)
ALTER TABLE public.business_menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "menu_items_public_select"
  ON public.business_menu_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "menu_items_staff_all"
  ON public.business_menu_items
  FOR ALL
  TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());
