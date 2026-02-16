-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create exam_types table
CREATE TABLE IF NOT EXISTS exam_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type_id UUID NOT NULL REFERENCES exam_types(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  user_type TEXT NOT NULL DEFAULT 'student', -- 'student', 'coach', 'admin'
  bio TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create study_progress table
CREATE TABLE IF NOT EXISTS study_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  progress_percentage INTEGER DEFAULT 0,
  notes TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- Create mock_tests table
CREATE TABLE IF NOT EXISTS mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type_id UUID NOT NULL REFERENCES exam_types(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  total_questions INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  passing_percentage INTEGER DEFAULT 60,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create test_questions table
CREATE TABLE IF NOT EXISTS test_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_test_id UUID NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('a', 'b', 'c', 'd')),
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium', -- 'easy', 'medium', 'hard'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test_attempts table
CREATE TABLE IF NOT EXISTS test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mock_test_id UUID NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
  score INTEGER,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5, 2),
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  time_taken_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test_responses table
CREATE TABLE IF NOT EXISTS test_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_attempt_id UUID NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
  user_answer TEXT,
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create coaching_profiles table
CREATE TABLE IF NOT EXISTS coaching_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  specialization TEXT[] NOT NULL, -- array of exam types they can coach
  hourly_rate DECIMAL(10, 2) NOT NULL,
  experience_years INTEGER,
  bio TEXT,
  qualifications TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create coaching_sessions table
CREATE TABLE IF NOT EXISTS coaching_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  description TEXT,
  payment_type TEXT NOT NULL, -- 'coaching_session', 'test_pack', 'subscription'
  reference_id UUID, -- references coaching_sessions.id or other entity
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create roadmap_templates table
CREATE TABLE IF NOT EXISTS roadmap_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type_id UUID NOT NULL REFERENCES exam_types(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_roadmaps table
CREATE TABLE IF NOT EXISTS user_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_type_id UUID NOT NULL REFERENCES exam_types(id) ON DELETE CASCADE,
  roadmap_template_id UUID REFERENCES roadmap_templates(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  target_exam_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, exam_type_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roadmaps ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view public coach profiles" ON user_profiles FOR SELECT USING (user_type = 'coach');

-- Create RLS policies for study_progress
CREATE POLICY "Users can view their own progress" ON study_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON study_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON study_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for mock_tests
CREATE POLICY "Published tests are viewable by all" ON mock_tests FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Creators can view their own tests" ON mock_tests FOR SELECT USING (created_by = auth.uid());

-- Create RLS policies for test_attempts
CREATE POLICY "Users can view their own attempts" ON test_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own attempts" ON test_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for test_responses
CREATE POLICY "Users can view their own responses" ON test_responses FOR SELECT USING (
  test_attempt_id IN (SELECT id FROM test_attempts WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert their own responses" ON test_responses FOR INSERT WITH CHECK (
  test_attempt_id IN (SELECT id FROM test_attempts WHERE user_id = auth.uid())
);

-- Create RLS policies for coaching_profiles
CREATE POLICY "Coaches can view their own profile" ON coaching_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Everyone can view verified coaches" ON coaching_profiles FOR SELECT USING (is_verified = TRUE);
CREATE POLICY "Coaches can update their own profile" ON coaching_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for coaching_sessions
CREATE POLICY "Users can view their sessions" ON coaching_sessions FOR SELECT USING (
  auth.uid() = coach_id OR auth.uid() = student_id
);
CREATE POLICY "Students can book sessions" ON coaching_sessions FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own payments" ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_roadmaps
CREATE POLICY "Users can view their own roadmaps" ON user_roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roadmaps" ON user_roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own roadmaps" ON user_roadmaps FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample exam types
INSERT INTO exam_types (name, description, category) VALUES
  ('SSC CGL', 'Staff Selection Commission Combined Graduate Level', 'Government Exams'),
  ('UPSC', 'Union Public Service Commission', 'Government Exams'),
  ('GATE', 'Graduate Aptitude Test in Engineering', 'Engineering Exams'),
  ('CAT', 'Common Admission Test', 'Management Exams')
ON CONFLICT DO NOTHING;
