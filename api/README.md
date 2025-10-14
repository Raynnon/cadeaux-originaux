# Cadeaux Originaux - API

API REST pour la gestion des produits et catégories de cadeaux originaux.

## Architecture

```text
api/
├── src/
│   ├── config/              # Configuration
│   │   ├── database.js
│   │   └── developmentSetup.js
│   ├── models/              # Modèles Mongoose
│   │   ├── product.model.js
│   │   ├── category.model.js
│   │   └── index.js
│   ├── controllers/         # Logique métier
│   │   ├── products.controller.js
│   │   ├── categories.controller.js
│   │   └── auth.controller.js
│   ├── services/            # Services réutilisables
│   │   ├── crud.service.js
│   │   └── image.service.js
│   ├── middlewares/         # Middlewares Express
│   │   ├── auth.middleware.js
│   │   ├── upload.middleware.js
│   │   └── moveFile.middleware.js
│   ├── routes/              # Routes API
│   │   ├── products.routes.js
│   │   ├── categories.routes.js
│   │   ├── auth.routes.js
│   │   └── index.js
│   ├── utils/               # Utilitaires
│   │   └── copyDatabase.js
│   └── app.js               # Configuration Express
├── scripts/                 # Scripts standalone
├── public/                  # Fichiers statiques
└── index.js                 # Point d'entrée
```

## Installation

```bash
npm install
```

## Configuration

Créer un fichier `.env` à la racine :

```env
# Database
MONGODB_URI=mongodb+srv://...
# OU
DB_USER=username
DB_PASSWORD=password
DB_HOST=cluster.mongodb.net/
DB_NAME=database-name

# Server
PORT=3000
APP_URL=http://localhost:3000/

# Auth
USERNAME=admin
PASSWORD=secret
PASSPHRASE=jwt-secret-key

# Development
DEVELOPMENT_MOD=true
PRODUCTION_DB_NAME=production-db
PRODUCTION_URL=https://api.production.com
```

## Démarrage

```bash
# Mode développement
npm run dev

# Mode production
npm start

# Tests
npm test
```

## API Endpoints

### Authentication

#### Login

```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "secret"
}
```

**Response:** JWT token

### Products

#### Get all products

```http
GET /products?images=true&currentPage=1&productsPerPage=10
```

**Query parameters:**

- `images` (boolean) - Include image URLs
- `name` (string) - Search by name
- `whoKind` (string) - Filter by kind
- `whoType` (string) - Filter by type
- `occasions` (string) - Filter by occasion
- `parties` (string) - Filter by party type
- `price` (string) - Filter by price
- `sortBy` (string) - "Meilleures ventes" for most visited
- `currentPage` (number) - Page number
- `productsPerPage` (number) - Items per page
- `count` (boolean) - Return only count

#### Get products count

```http
GET /products?count=true
```

#### Create product

```http
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Product name",
  "price": "29.99",
  "description": "Description",
  "strongPoints": ["Point 1", "Point 2"],
  "whoKind": ["Homme", "Femme"],
  "whoType": ["Adulte"],
  "occasions": ["Anniversaire"],
  "parties": [],
  "urlAmazon": "https://amazon.fr/...",
  "image": [files]
}
```

#### Update product

```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Updated name",
  "price": "39.99",
  "imagesToDelete": ["image1.jpg"],
  "visits": "true",  // Increment visits counter
  "image": [new files]
}
```

#### Delete product

```http
DELETE /products/:id
Authorization: Bearer <token>
```

### Categories

#### Get all categories

```http
GET /categories?ordered=true
```

**Query parameters:**

- `ordered` (boolean) - Return organized menu structure
- `_id` (string) - Filter by ID
- `name` (string) - Filter by name

#### Create category

```http
POST /categories
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Category name",
  "description": "Description",
  "parent": ["Parent category"],
  "image": [files]
}
```

#### Update category

```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete category

```http
DELETE /categories/:id
Authorization: Bearer <token>
```

## Architecture Technique

### Séparation des responsabilités

- **Routes** : Définition des endpoints et middlewares
- **Controllers** : Gestion des requêtes/réponses HTTP
- **Services** : Logique métier réutilisable
- **Models** : Schémas de données Mongoose

### Flow d'une requête

```text
Client → Routes → Middlewares → Controllers → Services → Models → Database
```

### Middlewares

- **auth.middleware.js** : Vérification JWT
- **upload.middleware.js** : Upload de fichiers avec Multer
- **moveFile.middleware.js** : Déplacement des fichiers uploadés

### Services

- **crud.service.js** : Opérations CRUD génériques
- **image.service.js** : Ajout d'URLs d'images aux données

## Modèles de Données

### Product

```javascript
{
  name: String (required, unique),
  price: String (required),
  description: String,
  strongPoints: Array,
  whoKind: [String],
  whoType: [String],
  occasions: [String],
  parties: [String],
  urlAmazon: String (required),
  imagesFolder: String,
  createdAt: Date,
  editedAt: Date,
  visits: Number
}
```

### Category

```javascript
{
  name: String (required, unique),
  description: String,
  imagesFolder: String,
  parent: Array
}
```

## Gestion des Images

Les images sont stockées dans `/public/images/`:

- Products: `/public/images/products/[slug]/`
- Categories: `/public/images/categories/[slug]/`

## Mode Développement

En mode développement (`DEVELOPMENT_MOD=true`), l'API :

1. Télécharge les images de production
2. Copie la base de données de production

## Technologies

- **Node.js** + **Express** : Framework web
- **MongoDB** + **Mongoose** : Base de données
- **Multer** : Upload de fichiers
- **JWT** : Authentication
- **Axios** : Requêtes HTTP
- **Slugify** : Génération de slugs

## Scripts

```bash
# Développement avec auto-reload
npm run dev

# Production
npm start

# Tests
npm test
```

## Sécurité

- Authentication JWT sur toutes les routes de modification
- Validation des uploads de fichiers
- Variables d'environnement pour les secrets
- CORS activé
