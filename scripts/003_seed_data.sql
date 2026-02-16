-- Insert sample exam types
INSERT INTO exam_types (name, description, category) VALUES
  ('SSC CGL', 'Staff Selection Commission Combined Graduate Level', 'Government Exams'),
  ('UPSC', 'Union Public Service Commission', 'Government Exams'),
  ('GATE', 'Graduate Aptitude Test in Engineering', 'Engineering Exams'),
  ('CAT', 'Common Admission Test', 'Management Exams')
ON CONFLICT (name) DO NOTHING;

-- Insert sample topics for SSC CGL
INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'General Awareness', 'Current affairs, history, geography, science', 1 
FROM exam_types WHERE name = 'SSC CGL'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Quantitative Aptitude', 'Mathematics, reasoning, problem solving', 2 
FROM exam_types WHERE name = 'SSC CGL'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'English Language', 'Grammar, vocabulary, comprehension', 3 
FROM exam_types WHERE name = 'SSC CGL'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Reasoning Ability', 'Logical reasoning, analytical skills', 4 
FROM exam_types WHERE name = 'SSC CGL'
ON CONFLICT DO NOTHING;

-- Insert sample topics for UPSC
INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Indian History', 'Ancient, medieval, and modern history of India', 1 
FROM exam_types WHERE name = 'UPSC'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Indian Polity', 'Constitution, governance, political system', 2 
FROM exam_types WHERE name = 'UPSC'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Indian Economy', 'Economic systems, policies, development', 3 
FROM exam_types WHERE name = 'UPSC'
ON CONFLICT DO NOTHING;

INSERT INTO topics (exam_type_id, name, description, order_index) 
SELECT id, 'Geography', 'Physical and human geography', 4 
FROM exam_types WHERE name = 'UPSC'
ON CONFLICT DO NOTHING;
