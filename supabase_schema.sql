-- ==========================================================================
-- NextGen Engineering Works - Supabase Database Schema
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================================

-- 1. Create the inquiries table to store contact submissions
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  company_name text,
  phone_number text not null,
  email_address text not null,
  requirement_type text not null,
  detailed_message text not null
);

-- 2. Enable Row Level Security (RLS) to secure the table
alter table public.inquiries enable row level security;

-- 3. Create a policy to allow anyone to submit inquiries (Anonymous inserts)
-- This allows our frontend client using the anon key to write entries.
create policy "Enable insert for anonymous users" 
on public.inquiries 
for insert 
to anon 
with check (true);

-- 4. (Optional) Create a policy to allow authenticated dashboard users/admins to read submissions
-- This ensures only you can view the submitted inquiries from your dashboard.
create policy "Enable select for authenticated users" 
on public.inquiries 
for select 
to authenticated 
using (true);
