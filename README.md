# ClearTechnique - Exam Preparation Platform

A comprehensive exam preparation platform designed specifically for Indian government competitive exams like SSC CGL, UPSC, GATE, and Banking exams. Features include structured study roadmaps, realistic mock tests, performance analytics, and a coaching marketplace.

## Features

### Phase 1: Core Platform
- **Landing Page**: Marketing website showcasing features, pricing, and testimonials
- **Authentication**: Secure user registration and login with Supabase
- **Student Dashboard**: Personalized dashboard with quick stats and progress overview
- **Study Roadmap**: Structured learning paths with topic progression tracking
- **Progress Tracking**: Visual progress indicators for each subject and topic

### Phase 2: Testing & Practice
- **Mock Tests**: Realistic full-length and topic-specific practice tests
- **Test Types**: Full mock exams and topic-wise practice tests
- **Difficulty Levels**: Easy, Medium, and Hard variants
- **Performance Analytics**: Detailed score analysis and weak area identification
- **Test History**: Track attempts and review past tests

### Phase 3: Advanced Features
- **Coaching Marketplace**: Connect with expert coaches for personalized guidance
- **Coach Profiles**: Ratings, reviews, expertise areas, and availability
- **Session Booking**: Schedule and manage coaching sessions
- **Payment Integration**: Stripe checkout for subscriptions and coaching sessions
- **Pricing Plans**: Starter, Pro, and Premium subscription tiers

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Payments**: Stripe
- **Components**: shadcn/ui
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── pricing/                 # Pricing page
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── error/
│   ├── dashboard/               # Protected dashboard routes
│   │   ├── page.tsx            # Main dashboard
│   │   ├── tests/              # Mock tests
│   │   ├── roadmap/            # Study roadmap
│   │   ├── coaching/           # Coaching marketplace
│   │   ├── coaching/[id]/      # Coach details
│   │   └── settings/           # User settings
│   ├── actions/                 # Server actions
│   └── layout.tsx
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── dashboard/               # Dashboard components
│   │   ├── nav.tsx             # Navigation bar
│   │   ├── progress-card.tsx   # Progress display
│   │   ├── study-stats.tsx     # Analytics charts
│   │   └── upcoming-tests.tsx  # Test schedule
│   └── checkout.tsx            # Stripe checkout
├── lib/
│   ├── supabase/               # Supabase client setup
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── proxy.ts            # Session handling
│   ├── stripe.ts               # Stripe client
│   └── products.ts             # Product catalog
├── scripts/
│   ├── 001_create_tables.sql   # Database schema
│   ├── 002_rls_policies.sql    # Row-level security
│   └── 003_seed_data.sql       # Sample data
├── middleware.ts               # Auth middleware
└── public/                      # Static assets
```

## Database Schema

### Tables
- **auth.users**: Supabase managed user authentication
- **profiles**: User profiles with exam preferences
- **exams**: Supported exam types (SSC CGL, UPSC, etc.)
- **subjects**: Exam subjects/categories
- **topics**: Learning topics within subjects
- **user_progress**: Student progress tracking
- **mock_tests**: Test metadata and questions
- **test_attempts**: User test results
- **coaches**: Coach profiles and details
- **coaching_sessions**: Booking and session management
- **subscriptions**: Subscription and payment tracking

### Row-Level Security (RLS)
All tables use RLS policies to ensure users can only access their own data:
- Users can only view/edit their own profiles and progress
- Test results are private to each user
- Coaching session data is visible only to relevant parties

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ and pnpm
- Supabase account with PostgreSQL database
- Stripe account for payment processing

### 2. Environment Variables

Create a `.env.local` file with:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

### 3. Database Setup

1. Create Supabase project
2. Run migration scripts in SQL editor:
   ```sql
   -- Execute scripts in order:
   -- 001_create_tables.sql
   -- 002_rls_policies.sql
   -- 003_seed_data.sql
   ```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Key Features Walkthrough

### Authentication Flow
1. User signs up with email/password via `/auth/sign-up`
2. Email confirmation is required
3. Authenticated users access dashboard at `/dashboard`
4. Session managed via Supabase and middleware

### Study Roadmap
- 4 main subjects (Quantitative Aptitude, English, Reasoning, General Awareness)
- Each subject divided into topics with progression tracking
- Visual progress bars show completion percentage
- Topics marked as completed, in-progress, or pending

### Mock Tests
- Full-length SSC CGL exams (200 questions, 3 hours)
- Topic-specific tests with varying difficulty
- Multiple attempts allowed
- Score tracking and historical comparison

### Coaching Marketplace
- Browse coaches by expertise and ratings
- View detailed coach profiles with reviews
- Book sessions for specific time slots
- Integrated messaging system (placeholder)

### Payment System
- 3 subscription tiers (Starter, Pro, Premium)
- Monthly and yearly billing options
- Stripe Checkout integration
- Secure session management

## Future Enhancements

1. **Video Lectures**: Upload and stream study video content
2. **Community Forum**: Student discussion and doubt solving
3. **Live Classes**: Real-time interactive coaching sessions
4. **Mobile App**: iOS and Android native apps
5. **AI Recommendations**: Personalized study suggestions based on performance
6. **Gamification**: Points, badges, and leaderboards
7. **Resume Building**: Career guidance and resume templates
8. **Job Portal**: Connect with recruiters post-exam

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/sign-up` - New user registration
- `POST /api/auth/logout` - User logout

### Dashboard Data
- `GET /api/dashboard/stats` - User statistics
- `GET /api/dashboard/progress` - Progress tracking
- `GET /api/dashboard/tests` - Available tests

### Tests
- `GET /api/tests` - List all tests
- `POST /api/tests/[id]/start` - Start a test
- `POST /api/tests/[id]/submit` - Submit answers

### Coaching
- `GET /api/coaches` - List coaches
- `GET /api/coaches/[id]` - Coach details
- `POST /api/coaching/[id]/book` - Book session

### Payments
- `POST /api/stripe/checkout-session` - Create checkout session
- `POST /api/stripe/webhooks` - Handle Stripe events

## Testing

### Manual Testing Checklist
- [ ] Landing page loads and is responsive
- [ ] Sign up flow works with email confirmation
- [ ] Login redirects to dashboard
- [ ] Dashboard displays correct user data
- [ ] Study roadmap shows all subjects
- [ ] Mock tests can be started
- [ ] Coach profiles load with details
- [ ] Stripe checkout integration works

### Test Accounts

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

## Deployment

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy (automatic on push to main)

### Database Backup
- Supabase provides automatic daily backups
- Configure backup retention in project settings
- Manual exports available via pg_dump

## Support & Contributing

For issues and questions:
1. Check existing issues on GitHub
2. Contact support team
3. Submit feature requests

## License

Copyright 2024 ClearTechnique. All rights reserved.
