/*
  # PII Machine Learning System Database Schema

  ## Overview
  This migration creates the complete database schema for the PII (Persatuan Insinyur Indonesia) 
  Machine Learning Dashboard system.

  ## New Tables Created

  ### 1. members
  Stores PII membership and professional engineer information
  - `id` (uuid, primary key) - Unique member identifier
  - `member_id` (text) - PII member ID (e.g., PII-001)
  - `name` (text) - Member full name
  - `email` (text) - Member email address
  - `region` (text) - Regional chapter (Jakarta, Jawa Barat, etc.)
  - `certification` (text) - Certification level (IPU, IPM, IPP, or none)
  - `status` (text) - Membership status (Active/Inactive)
  - `activity_score` (integer) - Member activity score (0-100)
  - `training_attendance` (integer) - Training attendance percentage
  - `years_of_membership` (integer) - Years as PII member
  - `join_date` (date) - Date joined PII
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. ml_models
  Tracks machine learning models and their performance metrics
  - `id` (uuid, primary key) - Model unique identifier
  - `name` (text) - Model name
  - `type` (text) - Model type (Classification/Prediction/Clustering)
  - `status` (text) - Current status (active/training/inactive)
  - `accuracy` (numeric) - Model accuracy percentage
  - `precision` (numeric) - Precision metric
  - `recall` (numeric) - Recall metric
  - `f1_score` (numeric) - F1 score metric
  - `dataset_size` (integer) - Training dataset size
  - `last_trained` (timestamptz) - Last training timestamp
  - `created_at` (timestamptz) - Model creation timestamp

  ### 3. predictions
  Stores prediction history and results
  - `id` (uuid, primary key) - Prediction unique identifier
  - `model_id` (uuid, foreign key) - Reference to ml_models table
  - `input_data` (jsonb) - Input parameters used for prediction
  - `predicted_status` (text) - Predicted membership status
  - `predicted_certification` (text) - Predicted next certification level
  - `confidence_score` (numeric) - Prediction confidence (0-100)
  - `created_at` (timestamptz) - Prediction timestamp

  ### 4. activity_logs
  Tracks user actions and system activities
  - `id` (uuid, primary key) - Log entry unique identifier
  - `user_name` (text) - User who performed action
  - `action_type` (text) - Type of action performed
  - `details` (text) - Detailed description of action
  - `created_at` (timestamptz) - Action timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies created for authenticated users to read all data
  - Insert/Update/Delete policies for authenticated users
  
  ## Notes
  - All tables use UUID primary keys for better scalability
  - Timestamps use timestamptz for timezone support
  - JSONB used for flexible prediction input storage
  - Default values set for timestamps and status fields
*/

-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id text UNIQUE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  region text NOT NULL,
  certification text NOT NULL DEFAULT 'Belum Tersertifikasi',
  status text NOT NULL DEFAULT 'Active',
  activity_score integer DEFAULT 0,
  training_attendance integer DEFAULT 0,
  years_of_membership integer DEFAULT 0,
  join_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ml_models table
CREATE TABLE IF NOT EXISTS ml_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'inactive',
  accuracy numeric(5,2) DEFAULT 0.0,
  precision numeric(5,2) DEFAULT 0.0,
  recall numeric(5,2) DEFAULT 0.0,
  f1_score numeric(5,2) DEFAULT 0.0,
  dataset_size integer DEFAULT 0,
  last_trained timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES ml_models(id) ON DELETE CASCADE,
  input_data jsonb NOT NULL,
  predicted_status text,
  predicted_certification text,
  confidence_score numeric(5,2),
  created_at timestamptz DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  action_type text NOT NULL,
  details text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ml_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for members table
CREATE POLICY "Members are viewable by authenticated users"
  ON members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Members can be inserted by authenticated users"
  ON members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Members can be updated by authenticated users"
  ON members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Members can be deleted by authenticated users"
  ON members FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for ml_models table
CREATE POLICY "ML models are viewable by authenticated users"
  ON ml_models FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "ML models can be inserted by authenticated users"
  ON ml_models FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "ML models can be updated by authenticated users"
  ON ml_models FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "ML models can be deleted by authenticated users"
  ON ml_models FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for predictions table
CREATE POLICY "Predictions are viewable by authenticated users"
  ON predictions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Predictions can be inserted by authenticated users"
  ON predictions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Predictions can be deleted by authenticated users"
  ON predictions FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for activity_logs table
CREATE POLICY "Activity logs are viewable by authenticated users"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Activity logs can be inserted by authenticated users"
  ON activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_members_region ON members(region);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_members_certification ON members(certification);
CREATE INDEX IF NOT EXISTS idx_predictions_model_id ON predictions(model_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_name);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
