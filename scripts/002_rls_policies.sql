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
