-- Run once in the Neon SQL editor.
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  segment text NOT NULL CHECK (segment IN ('seller', 'buyer', 'investor')),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  timeline text NOT NULL,
  location text NOT NULL,
  budget text,
  property_type text,
  message text,
  score integer NOT NULL,
  stage text NOT NULL,
  next_action text NOT NULL
);
