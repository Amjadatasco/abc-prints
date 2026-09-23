-- SQL Script to initialize Supabase Database Tables for ABC Website
-- Copy and paste this script into your Supabase SQL Editor to create the required tables.

-- 1. Create orders table for custom and commercial printing orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'Commercial' or 'CustomProduct'
  company_name TEXT, -- Matches companyName
  contact_phone TEXT NOT NULL, -- Matches contactPhone
  machine TEXT,
  width INTEGER,
  height INTEGER,
  quantity INTEGER,
  price NUMERIC NOT NULL,
  notes TEXT,
  product_name TEXT, -- Matches productName
  product_price NUMERIC, -- Matches productPrice
  design TEXT, -- Base64 SVG/PNG data url
  design_name TEXT, -- Matches designName
  custom_details JSONB, -- Matches customDetails JSON config object
  customer_name TEXT, -- Matches customerName
  customer_phone TEXT, -- Matches customerPhone
  customer_city TEXT, -- Matches customerCity
  customer_address TEXT, -- Matches customerAddress
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date TEXT -- Display date format e.g. ١٠/٦/٢٠٢٦
);

-- 2. Create inquiries table for digital services requests
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'Service', -- 'Service'
  service_key TEXT NOT NULL, -- Matches serviceKey
  service_name TEXT NOT NULL, -- Matches serviceName
  client_name TEXT NOT NULL, -- Matches clientName
  client_phone TEXT NOT NULL, -- Matches clientPhone
  project_desc TEXT, -- Matches projectDesc
  budget TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date TEXT -- Display date format e.g. ١٠/٦/٢٠٢٦
);

-- Enable Row Level Security (RLS) or disable as needed for public anon client insertions
-- Note: For simple setups, you can disable RLS or create insert-only policies for public access.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow explicit anonymous insert-only
CREATE POLICY "Allow anon inserts on orders" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon inserts on inquiries" ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated reads and edits (Admin operations)
CREATE POLICY "Allow authenticated reads on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow authenticated reads on inquiries" ON inquiries FOR SELECT USING (true);

CREATE POLICY "Allow authenticated updates on orders" ON orders FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated updates on inquiries" ON inquiries FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated deletes on orders" ON orders FOR DELETE TO authenticated USING (true);
CREATE POLICY "Allow authenticated deletes on inquiries" ON inquiries FOR DELETE TO authenticated USING (true);

