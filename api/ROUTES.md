# Routes API

## Authentication

```http
POST /login
Content-Type: application/json

{ "username": "admin", "password": "secret" }
```
Retourne un JWT token.

---

## Products

### GET /products
**Query params:**
- `images` (boolean) - Inclure URLs des images
- `name` (string) - Recherche par nom
- `whoKind`, `whoType`, `occasions`, `parties`, `price` (string) - Filtres
- `sortBy` (string) - "Meilleures ventes" pour tri par visites
- `currentPage`, `productsPerPage` (number) - Pagination
- `count` (boolean) - Retourne uniquement le nombre

### POST /products
**Auth:** Bearer token
**Content-Type:** multipart/form-data

```json
{
  "name": "Nom du produit",
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

### PUT /products/:id
**Auth:** Bearer token
**Content-Type:** multipart/form-data

Champs modifiables : tous les champs du POST
`imagesToDelete` (array) - Supprimer des images
`visits` ("true") - Incrémenter le compteur de visites

### DELETE /products/:id
**Auth:** Bearer token

---

## Categories

### GET /categories
**Query params:**
- `ordered` (boolean) - Structure de menu organisée
- `_id`, `name` (string) - Filtres

### POST /categories
**Auth:** Bearer token
**Content-Type:** multipart/form-data

```json
{
  "name": "Nom de la catégorie",
  "description": "Description",
  "parent": ["Catégorie parente"],
  "image": [files]
}
```

### PUT /categories/:id
**Auth:** Bearer token
**Content-Type:** multipart/form-data

Champs modifiables : tous les champs du POST

### DELETE /categories/:id
**Auth:** Bearer token

---

## Notes

- Images stockées dans `/public/images/products/[slug]/` et `/public/images/categories/[slug]/`
- Toutes les routes de modification (POST, PUT, DELETE) requièrent un token JWT
- Les arrays JSON doivent être stringifiés dans les requêtes multipart/form-data
