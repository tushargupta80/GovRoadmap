# ClearTechnique - Local Development Setup Guide

This guide will help you set up the ClearTechnique exam prep platform locally with proper email confirmation.

## Prerequisites

- Node.js 18+ and npm/pnpm
- A Supabase account (free tier works great for development)
- A Stripe account (for payment testing)
- Git (already set up with this repo)

## Step 1: Clone and Install Dependencies

```bash
# Dependencies are automatically installed via v0
# Just make sure you have the latest by running:
pnpm install
# or npm install
```

## Step 2: Configure Supabase

### Create a New Supabase Project

1. Go to https://supabase.com and sign in
2. Create a new project:
   - Project name: "ClearTechnique" (or any name)
   - Database password: (save this securely)
   - Region: Choose closest to you
3. Wait for the project to be ready

### Get Your Environment Variables

1. Go to Project Settings → API
2. Copy these values:
   - `NEXT_PUBLIC_SUPABASE_URL` - Copy the "Project URL"
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Copy the "Anon public" key
   - `SUPABASE_SERVICE_ROLE_KEY` - Copy the "Service role secret" key

### Configure Email Redirect URLs

This is CRITICAL for email confirmation to work:

1. In Supabase, go to **Authentication → URL Configuration**
2. Under "Site URL", set it to:
   ```
   http://localhost:3000
   ```
3. Under "Redirect URLs", add:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/dashboard
   http://localhost:3000/
   ```
4. Click "Save"

### Create Environment Variables File

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (optional, for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Replace the values with your actual keys.

## Step 3: Set Up Supabase Database

### Option A: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Go to the **SQL Editor**
3. Create a new query and paste the contents of `scripts/001_create_tables.sql`
4. Run the query
5. Repeat with `scripts/002_rls_policies.sql`
6. (Optional) Repeat with `scripts/003_seed_data.sql` for sample data

### Option B: Using Command Line

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Step 4: Configure Stripe (Optional but Recommended)

1. Go to https://stripe.com and sign up for a free account
2. Go to the Dashboard and find your API keys:
   - Publishable key (starts with `pk_test_`)
   - Secret key (starts with `sk_test_`)
3. Add these to your `.env.local` file
4. Enable Stripe integration in v0 (if using v0 dashboard)

## Step 5: Run the Development Server

```bash
pnpm dev
# or npm run dev
```

The app will run at http://localhost:3000

## Step 6: Test Authentication

### Sign Up Flow (Email Confirmation)

1. Go to http://localhost:3000
2. Click "Sign Up" or navigate to `/auth/sign-up`
3. Enter an email and password
4. Click "Sign up"
5. You should see a "Check your email" message
6. **Important**: Check your email for the confirmation link
   - If using fake email: Check Supabase dashboard → Authentication → Users (you should see your user listed)
   - If using real email: Check your inbox/spam folder
7. Click the confirmation link
8. You should be redirected to `/auth/callback` and then to the dashboard
9. You're now logged in!

### Troubleshooting Email Confirmation

**Issue: "localhost" showing in email link**
- ✅ FIXED! We updated the redirect URL to `http://localhost:3000/auth/callback`
- Make sure you've configured the Redirect URLs in Supabase (Step 2, "Configure Email Redirect URLs")

**Issue: Email link expired or not received**
- Check Supabase dashboard → Authentication → Users to verify the user was created
- Try requesting a new confirmation email
- Make sure you've allowed enough time for the email (usually instant)

**Issue: "Could not authenticate user" error**
- Verify your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that Supabase redirect URLs are configured
- Clear your browser cache and try again

## Step 7: Test the Platform

1. **Dashboard**: Navigate to `/dashboard` (you should see it after login)
2. **Study Roadmap**: Go to `/dashboard/roadmap`
3. **Mock Tests**: Go to `/dashboard/tests`
4. **Coaching**: Go to `/dashboard/coaching`
5. **Pricing**: Go to `/pricing`

## Step 8: Test Payments (Stripe)

1. Make sure Stripe keys are configured in `.env.local`
2. Go to `/pricing`
3. Click on any plan to start checkout
4. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits
5. Complete the test payment

## Database Schema Overview

The platform uses these main tables:

- **exam_types** - SSC CGL, UPSC, GATE, etc.
- **topics** - Quant, English, Reasoning, GK
- **user_progress** - Tracks user progress on topics
- **mock_tests** - Full-length and topic-specific tests
- **test_attempts** - User's test scores and history
- **coaches** - Coaching marketplace profiles
- **bookings** - Session bookings with coaches
- **subscriptions** - User subscription status

## Useful Supabase Dashboard Links

For your project:

- **SQL Editor**: Write and run SQL queries
- **Authentication → Users**: See all users and manage them
- **Authentication → URL Configuration**: Configure redirect URLs (IMPORTANT!)
- **Database → Tables**: View and manage database tables
- **Realtime**: Monitor real-time events

## Deploying to Production

When you're ready to deploy:

1. Create a production Supabase project
2. Copy the production environment variables
3. Push your database schema to production
4. Update Stripe environment variables to use live keys
5. Update Supabase redirect URLs to your production domain
6. Deploy to Vercel

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Email confirmation links show localhost | Configure Redirect URLs in Supabase (see Step 2) |
| Cannot sign up - "User already exists" | Use a different email or delete the user from Supabase dashboard |
| Database tables don't exist | Run the SQL scripts from the `scripts/` folder |
| "Permission denied" error | Check Row Level Security (RLS) policies are configured correctly |
| Stripe payments not working | Verify API keys in `.env.local` and use test card 4242 4242 4242 4242 |

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Support**: https://supabase.com/support

Happy coding! 🚀
