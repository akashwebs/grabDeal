# GrabDeal - E-Commerce Deals Platform

A modern e-commerce deals aggregation platform built with Next.js, React, Express, and MongoDB.

## Project Structure

### Frontend
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Components**: React 19 with shadcn/ui
- **State Management**: React hooks with SWR-like patterns

### Backend
- **Server**: Express.js (Node.js)
- **Database**: MongoDB
- **API**: RESTful endpoints

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (or npm/yarn)
- MongoDB (running locally on port 27017)

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

### Running the Application

You need to run **two terminals** - one for the backend and one for the frontend.

#### Terminal 1: Start the Backend Server

```bash
pnpm dev:server
```

This will:
- Start Express server on `http://localhost:5000`
- Connect to MongoDB
- Output: "Server is running on port 5000"

If it's your first time, seed the database with initial data:

```bash
pnpm seed
```

This creates sample brands, offers, testimonials, and FAQs in MongoDB.

#### Terminal 2: Start the Frontend Server

```bash
pnpm dev
```

This will:
- Start Next.js dev server on `http://localhost:3000`
- Watch for file changes
- Output: "✓ Ready in XXXX ms"

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

All API endpoints are available at `http://localhost:5000/api`

### Offers
- `GET /api/offers` - Get all offers with optional filters
- `GET /api/offers/:id` - Get single offer
- `GET /api/offers/ending-soon` - Get offers ending soon (within 48 hours)
- `POST /api/offers` - Create new offer
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get single brand
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Categories
- `GET /api/categories` - Get all categories

### Testimonials
- `GET /api/testimonials` - Get verified testimonials
- `POST /api/testimonials` - Create testimonial

### FAQs
- `GET /api/faqs` - Get FAQs with optional category filter
- `POST /api/faqs` - Create FAQ

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Main homepage
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with theme tokens
│
├── components/
│   ├── header.tsx            # Navigation header
│   ├── hero-carousel.tsx     # Hero section with carousel
│   ├── promo-cards.tsx       # Promotional cards
│   ├── offer-card.tsx        # Individual offer card
│   ├── countdown-timer.tsx   # Countdown timer component
│   ├── offers-grid.tsx       # Grid of offers
│   ├── brand-grid.tsx        # Grid of brands
│   ├── ending-soon.tsx       # Ending soon offers section
│   ├── testimonials.tsx      # Customer testimonials
│   ├── faq-section.tsx       # FAQ accordion
│   └── footer.tsx            # Footer section
│
├── lib/
│   ├── api.ts                # API client wrapper
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
│
├── server/
│   ├── models/               # MongoDB schemas
│   │   ├── Brand.js
│   │   ├── Offer.js
│   │   ├── Category.js
│   │   ├── Testimonial.js
│   │   └── FAQ.js
│   │
│   ├── controllers/          # Business logic
│   │   ├── brandController.js
│   │   ├── offerController.js
│   │   ├── categoryController.js
│   │   ├── testimonialController.js
│   │   └── faqController.js
│   │
│   ├── routes/               # API routes
│   │   ├── brands.js
│   │   ├── offers.js
│   │   ├── categories.js
│   │   ├── testimonials.js
│   │   └── faqs.js
│   │
│   ├── middleware/           # Express middleware
│   ├── db/                   # Database connection
│   ├── seeds/                # Data seeding scripts
│   ├── server.js             # Express app entry point
│   └── .env                  # Server environment variables
│
├── public/                   # Static assets
├── .env.local                # Frontend environment variables
├── package.json
└── tsconfig.json
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/GrabDeal
NODE_ENV=development
```

## Database Setup

### MongoDB Connection
The application expects MongoDB to be running on `mongodb://localhost:27017`

To use a different MongoDB instance, update `MONGODB_URI` in `server/.env`

### Initial Data
Run the seed script to populate sample data:
```bash
pnpm seed
```

This creates:
- 8 brands with logos and discounts
- 8 offers with various discount types
- 3 testimonials with 5-star ratings
- 4 FAQs across different categories

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Countdown Timers**: Live countdown for expiring offers
- **Brand Showcase**: Browse top brands and their offers
- **Testimonials**: Customer feedback with ratings
- **FAQ Section**: Expandable FAQ accordion
- **Search & Filter**: Filter offers by brand and category
- **API Integration**: Clean separation between frontend and backend

## Development

### Component Development
Components are in `/components` and use:
- React hooks for state management
- Tailwind CSS for styling
- Lucide icons for iconography
- TypeScript for type safety

### Adding New Offers
Use the API endpoints to create new offers:

```bash
curl -X POST http://localhost:5000/api/offers \
  -H "Content-Type: application/json" \
  -d '{
    "brand_id": "BRAND_ID",
    "title": "50% OFF",
    "discount": 50,
    "valid_until": "2026-06-01T00:00:00Z",
    "status": "active"
  }'
```

## Troubleshooting

### Backend Connection Error
- Ensure `pnpm dev:server` is running
- Check if port 5000 is not in use: `lsof -i :5000`
- Verify MongoDB is running: `mongosh`

### No Data Showing
- Run `pnpm seed` to populate sample data
- Check browser console for API errors
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `pnpm dev`

## Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel deploy
```

### Backend (Any Node.js Host)
- Push code to GitHub
- Deploy to services like Heroku, Railway, or AWS
- Update `NEXT_PUBLIC_API_URL` to match backend URL
- Set `MONGODB_URI` to your production MongoDB

## Performance Optimization

- **Image Optimization**: Uses Next.js Image component
- **Code Splitting**: Components are lazy-loaded
- **API Caching**: Testimonials and FAQs can be cached
- **Countdown Optimization**: Uses single interval for all timers

## License

MIT - Feel free to use this project for learning and development.
