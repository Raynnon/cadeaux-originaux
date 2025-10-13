# Mes Cadeaux Originaux - Frontoffice

A modern, responsive e-commerce gift discovery platform built with Next.js 14, React 18, and Tailwind CSS.

## ✨ Features

- **Next.js 14** - Latest Next.js with server-side rendering and API routes
- **React 18** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Responsive Design** - Mobile-first approach with full tablet and desktop support
- **Clean Architecture** - Separated data, components, and styling
- **Type-Safe** - PropTypes validation for all components
- **Performance Optimized** - Image optimization, code splitting, and lazy loading
- **SEO Friendly** - Server-side rendering with meta tags and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see `/api` directory)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.exemple .env.development

# Update .env.development with your API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_GOOGLE_ANALYTICS=your-ga-id (optional)

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`.

## 📝 Environment Variables

Create `.env.development` and `.env.production` files:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=UA-XXXXXXXXX-X
```

## 🛠️ Available Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔧 Technologies

- **Frontend Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS 3, PostCSS
- **HTTP Client**: Axios
- **Icons**: Hero Icons 2
- **Fonts**: Poppins (via @fontsource)
- **Utilities**: Slugify, Sentence-splitter
- **Image Optimization**: Sharp
- **Validation**: PropTypes

## 📁 Project Structure

```text
frontoffice/
├── components/          # React components
│   ├── header/         # Header and navigation
│   ├── subcomponents/  # Reusable sub-components
│   ├── categories/     # Category filtering components
│   ├── Homepage.js     # Homepage component
│   ├── Layout.js       # Main layout wrapper
│   └── Footer.js       # Footer component
│
├── pages/              # Next.js pages (routing)
│   ├── _app.js        # App wrapper with global config
│   ├── index.js       # Homepage route
│   ├── category/      # Category pages
│   └── produit/       # Product detail pages
│
├── data/               # ⭐ Data files (easy to customize)
│   ├── categories.js  # Categories showcase data
│   └── prices.js      # Price range definitions
│
├── constants/          # Application constants
│   └── index.js       # Centralized constants
│
├── public/             # Static assets
│   ├── images/        # Images
│   ├── icons/         # Icons
│   └── logos/         # Logo files
│
├── styles/             # Global styles
│   └── globals.css    # Global CSS styles
│
├── .env.example        # Environment variables template
└── next.config.js      # Next.js configuration
```

## 🎯 Key Features

### Category Browsing
- Browse products by various categories (Genre, Type, Occasion, Fête)
- Advanced filtering system with multiple filter options
- Real-time product filtering without page reload

### Product Discovery
- New products section
- Best sellers section
- Product suggestions throughout the site
- Detailed product pages with images and descriptions

### Responsive Navigation
- Sticky header with logo
- Mobile-friendly hamburger menu
- Desktop dropdown navigation
- Category-based product filtering

## 📖 Documentation

- **[STRUCTURE.md](./STRUCTURE.md)** - Detailed project structure and customization guide

## 🐛 Troubleshooting

**Build failing?**
- Run `npm install` to ensure dependencies are up to date
- Check that API is running and accessible
- Verify environment variables are set correctly

**Images not loading?**
- Check that Sharp is properly installed: `npm install sharp`
- Verify image paths in `/public` directory
- Check Next.js image optimization settings

**API connection errors?**
- Verify `NEXT_PUBLIC_API_URL` in `.env` file
- Ensure backend API is running
- Check CORS configuration on backend

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

Private project for Mes Cadeaux Originaux.

## 🤝 Contributing

This is a private project. Contact the maintainer for contribution guidelines.
