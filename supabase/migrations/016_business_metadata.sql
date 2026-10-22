-- Add metadata fields for bulk data ingestion (OSM, etc.) and verification
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS source_id text,
  ADD COLUMN IF NOT EXISTS lat numeric(10, 7),
  ADD COLUMN IF NOT EXISTS lng numeric(10, 7),
  ADD COLUMN IF NOT EXISTS data_confidence text CHECK (data_confidence IN ('low', 'medium', 'high')),
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hours_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_permission boolean DEFAULT false;

ALTER TABLE public.business_submissions
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS source_id text,
  ADD COLUMN IF NOT EXISTS lat numeric(10, 7),
  ADD COLUMN IF NOT EXISTS lng numeric(10, 7),
  ADD COLUMN IF NOT EXISTS data_confidence text CHECK (data_confidence IN ('low', 'medium', 'high')),
  ADD COLUMN IF NOT EXISTS phone_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS hours_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS photo_permission boolean DEFAULT false;
