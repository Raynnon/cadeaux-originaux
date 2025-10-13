# Project Structure & Customization Guide

This document provides a detailed guide to the frontoffice project structure and step-by-step instructions for customization.

## 📁 Detailed File Organization

```text
frontoffice/
├── components/                      # React components
│   ├── header/
│   │   ├── Header.js               # Main header with mobile menu
│   │   ├── SubHeader.js            # Sticky navigation bar
│   │   └── index.js                # Export file
│   │
│   ├── subcomponents/
│   │   ├── ProductsSuggestion.js   # Product suggestions grid
│   │   ├── Searchbox.js            # Search component (inactive)
│   │   └── index.js                # Export file
│   │
│   ├── categories/
│   │   ├── filterProducts.js       # Product filtering logic
│   │   ├── Pagination.js           # Pagination component
│   │   ├── CheckboxRadio.js        # Filter checkbox/radio inputs
│   │   ├── Select.js               # Filter select dropdowns
│   │   └── ProductsCard.js         # Product card component
│   │
│   ├── Homepage.js                  # Homepage main component
│   ├── Layout.js                    # Layout wrapper (header/footer)
│   └── Footer.js                    # Site footer
│
├── pages/                           # Next.js pages (automatic routing)
│   ├── _app.js                     # App wrapper with Google Analytics
│   ├── index.js                    # Homepage (/)
│   ├── category/
│   │   └── [category].js           # Dynamic category pages
│   └── produit/
│       └── [produit].js            # Dynamic product pages
│
├── data/                            # ⭐ Edit these files to customize content
│   ├── categories.js               # Homepage categories showcase
│   └── prices.js                   # Price range definitions
│
├── constants/
│   └── index.js                    # Centralized constants (labels, config)
│
├── public/                          # Static assets
│   ├── images/                     # Product and category images
│   ├── icons/                      # Icon files
│   └── logos/                      # Logo files
│
├── styles/
│   └── globals.css                 # Global CSS styles
│
├── .env.development                 # Development environment variables
├── .env.production                  # Production environment variables
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
└── package.json                     # Dependencies and scripts
```

## 🎯 Step-by-Step Customization

### 1️⃣ Update Homepage Categories

**File:** `data/categories.js`

The homepage displays 6 featured categories. To modify them:

```javascript
export const categoriesShowcase = [
  {
    name: 'Anniversaire',                                      // Category name
    image: '/images/categories-showcase/ballons-anniversaire.jpg',  // Image path
    link: '/category/Anniversaire'                            // Category page URL
  },
  // Add or modify categories here...
];
```

**Steps:**
1. Add your category image to `public/images/categories-showcase/`
2. Add a new object to the `categoriesShowcase` array
3. Set the `name`, `image` path, and `link` URL

### 2️⃣ Modify Price Ranges

**File:** `data/prices.js`

Price ranges used for filtering:

```javascript
export const priceRanges = [
  { shortName: '€', name: 'Pas cher' },
  { shortName: '€€', name: 'Bon rapport qualité prix' },
  { shortName: '€€€', name: 'Haut de gamme' }
];
```

### 3️⃣ Update Constants and Labels

**File:** `constants/index.js`

Change button labels, section titles, and configuration:

```javascript
// Button labels
export const LABELS = {
  BUY: 'Acheter',
  DISCOVER: 'Découvrir',
  FILTERS: 'Filters',
  NEW: 'NOUVEAU',
  POPULAR: 'POPULAIRE'
};

// Section titles
export const SECTION_TITLES = {
  NEW_PRODUCTS: 'Nouveaux produits',
  BEST_PRODUCTS: 'Meilleurs produits',
  BIRTHDAY_GIFTS: 'Nos meilleurs cadeaux d\'anniversaire'
};

// Pagination settings
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 24,  // Change products per page
  INITIAL_PAGE: 1
};
```

### 4️⃣ Customize Styling

#### Global Styles

**File:** `styles/globals.css`

```css
html {
    font-family: "Poppins";
}

/* Add your custom styles here */
.custom-class {
    /* Your styles */
}
```

#### Tailwind Configuration

**File:** `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Add custom colors, fonts, etc.
      colors: {
        'brand-orange': '#FB923C',
      }
    },
  },
  plugins: [],
}
```

### 5️⃣ Update Environment Variables

**Files:** `.env.development`, `.env.production`

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=UA-XXXXXXXXX-X
```

### 6️⃣ Modify Navigation

#### Header Component

**File:** `components/header/Header.js`

- Mobile menu structure
- Featured categories
- Logo display

#### SubHeader Component

**File:** `components/header/SubHeader.js`

- Sticky navigation bar
- Category dropdowns
- Scroll-based logo display

### 7️⃣ Add New Components

**Steps to add a new component:**

1. Create component file in `components/`
2. Add PropTypes validation
3. Add English documentation comments
4. Create `index.js` export file if needed
5. Import and use in pages

**Example:**

```javascript
import PropTypes from 'prop-types';

/**
 * MyNewComponent
 * Description of what this component does
 * @param {string} title - Component title
 */
export default function MyNewComponent({ title }) {
  return <div>{title}</div>;
}

MyNewComponent.propTypes = {
  title: PropTypes.string.isRequired
};
```

## 💡 Understanding the Architecture

### Data-Driven Design

Content is separated from components:
- **Components** (`components/`) - Handle display logic and UI
- **Data** (`data/`) - Store content (categories, prices)
- **Constants** (`constants/`) - Define reusable values and configuration
- **Pages** (`pages/`) - Define routes and fetch data

This means you can update content without modifying React code!

### Component Hierarchy

```text
_app.js (Google Analytics setup)
└── Layout
    ├── Header (mobile menu, logo)
    ├── SubHeader (sticky nav, dropdowns)
    ├── Page Content
    │   ├── Homepage
    │   │   ├── Banner section
    │   │   ├── Categories showcase
    │   │   └── ProductsSuggestion × 2
    │   │
    │   ├── Category Page
    │   │   ├── Filters sidebar
    │   │   ├── ProductsCard × N
    │   │   └── Pagination
    │   │
    │   └── Product Page
    │       ├── Product images
    │       ├── Product details
    │       └── ProductsSuggestion
    │
    └── Footer (links, copyright)
```

### PropTypes Validation

All components validate their props for type safety:

```javascript
Header.propTypes = {
  categories: PropTypes.object.isRequired
};
```

## 🔍 Common Tasks

### Adding a New Category

1. Add category data to backend API
2. Add category image to `public/images/categories-showcase/`
3. Add category to `categoriesShowcase` in `data/categories.js`

### Changing Products Per Page

Edit `constants/index.js`:

```javascript
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 30,  // Change from 24 to 30
  INITIAL_PAGE: 1
};
```

### Updating Logo

Replace files in `public/logos/`:
- `logo-cadeaux-originaux-small.png` - Main logo
- `logo-cadeaux-originaux-blanc.png` - White logo for sticky header

Keep the same filenames or update imports in components.