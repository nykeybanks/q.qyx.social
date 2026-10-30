# Q Social - Deployment Guide

## Pre-Deployment Checklist

### Environment Setup
- [ ] Verify all environment variables in `.env.local` (copy from `.env.example`)
- [ ] Test Supabase connection with correct URL and API keys
- [ ] Verify database is initialized with all required tables
- [ ] Check theme is persisting correctly (test login, change theme, navigate away)
- [ ] Verify theme script prevents flash on page reload

### Authentication
- [ ] Test user registration flow end-to-end
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials (error handling)
- [ ] Test forgot password flow
- [ ] Test password reset flow
- [ ] Verify email redirects work correctly
- [ ] Test keyboard shortcuts (Cmd/Ctrl + K, Cmd/Ctrl + /, G+H, etc.)

### User Experience
- [ ] Test responsive design on mobile, tablet, desktop
- [ ] Verify all navigation links work correctly
- [ ] Test error pages (404, 500) load correctly
- [ ] Verify loading states appear while fetching data
- [ ] Test error boundary catches and displays errors gracefully
- [ ] Verify theme persists across page navigation
- [ ] Test that online/offline status indicator works

### Real-Time Features
- [ ] Test unread notifications badge updates in real-time
- [ ] Test unread messages badge updates in real-time
- [ ] Test vault balance updates in real-time
- [ ] Verify toast notifications appear for new events
- [ ] Test that multiple tabs sync state properly

### API Routes
- [ ] Test POST /api/posts creates post with content validation
- [ ] Test POST /api/posts/[postId]/like toggles like correctly
- [ ] Test POST /api/posts/[postId]/bookmark toggles bookmark
- [ ] Test POST /api/users/[userId]/follow toggles follow
- [ ] Test POST /api/rewards/grant updates vault balance
- [ ] Verify all API routes require authentication
- [ ] Verify rate limiting works on sensitive endpoints

### Dashboard Features
- [ ] Test creating a new vibe/post
- [ ] Test uploading media in Q Gram
- [ ] Test creating a circle
- [ ] Test joining/leaving a circle
- [ ] Test settings page saves preferences
- [ ] Test profile page displays user info
- [ ] Test vault page shows correct balances

### Performance & Analytics
- [ ] Verify Vercel Analytics is tracking events
- [ ] Check bundle size with `npm run build`
- [ ] Verify images are optimized
- [ ] Test page load performance with Lighthouse
- [ ] Check Core Web Vitals metrics

### Security
- [ ] Verify HTTPS is enforced
- [ ] Check that passwords are properly hashed
- [ ] Verify API endpoints check authentication
- [ ] Test CORS headers are set correctly
- [ ] Verify sensitive data isn't exposed in browser
- [ ] Check that input validation prevents SQL injection
- [ ] Test that XSS prevention is working

### SEO & Meta
- [ ] Verify page title and meta description are set
- [ ] Check robots.txt is accessible
- [ ] Verify sitemap.xml is generated
- [ ] Test Open Graph tags for social sharing
- [ ] Verify favicon displays correctly

### Third-Party Services
- [ ] Verify Supabase connectivity
- [ ] Check Vercel Analytics integration
- [ ] Test error reporting (if configured)
- [ ] Verify AI SDK endpoints are accessible (if using)

## Deployment Steps

### 1. Pre-Deployment
```bash
# Update dependencies
pnpm install

# Run linting
pnpm run lint

# Build the project
pnpm run build

# Test the production build locally
pnpm run start
```

### 2. Environment Variables
Make sure all required environment variables are set in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- All other required vars from `.env.example`

### 3. Database
- [ ] Run all migration scripts in `scripts/` folder
- [ ] Verify Row Level Security (RLS) policies are enabled
- [ ] Test database connections from production environment
- [ ] Backup database before deploying

### 4. Deploy to Vercel
```bash
# Deploy to production
vercel deploy --prod

# Or if using GitHub integration, push to main branch
git push origin main
```

### 5. Post-Deployment
- [ ] Monitor Vercel Analytics for errors
- [ ] Check application logs for issues
- [ ] Test all features in production environment
- [ ] Monitor Core Web Vitals
- [ ] Set up monitoring alerts

## Rollback Procedure

If issues occur:
```bash
# Revert to previous deployment in Vercel dashboard
# Or deploy a previous commit
git revert <commit-hash>
git push origin main
```

## Performance Optimization

### Bundle Analysis
```bash
npm run build
npm run analyze  # if configured
```

### Image Optimization
- Use Next.js Image component for all images
- Ensure images are properly compressed
- Use WebP format where supported

### Code Splitting
- Dynamic imports are configured automatically
- Route-based code splitting in App Router
- CSS is automatically optimized

## Monitoring & Maintenance

### Set Up Alerts
- [ ] Configure Vercel alerts for deployment failures
- [ ] Set up error tracking alerts
- [ ] Monitor database performance
- [ ] Track API response times

### Regular Tasks
- [ ] Check for security updates weekly
- [ ] Review error logs daily
- [ ] Monitor database size growth
- [ ] Update dependencies monthly
- [ ] Review and optimize slow queries
- [ ] Audit user permissions and access

## Support & Debugging

### Common Issues

**Theme not persisting:**
- Check localStorage is not disabled
- Verify `q-social-theme` key exists in localStorage
- Ensure theme script runs before hydration

**Build failures:**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check for TypeScript errors: `pnpm run lint`

**Database connection errors:**
- Verify environment variables are set
- Check Supabase status page
- Test connection string locally

**Real-time updates not working:**
- Verify WebSocket connections are allowed
- Check Supabase realtime subscriptions
- Look for channel subscription errors in console

### Getting Help
- Check Vercel documentation: https://vercel.com/docs
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- GitHub Issues for this project

## Version Info
- Next.js: 16.0.10
- React: 19.2.0
- Node.js: 18+ recommended
- Tailwind CSS: 4.1.9

## License
MIT
