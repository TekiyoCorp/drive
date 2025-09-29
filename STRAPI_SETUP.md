# Configuration Strapi CMS pour Drive

## 🚀 Mise en place

### 1. Démarrer Strapi

```bash
cd server
npm run dev
```

### 2. Configuration initiale

1. Ouvrez http://localhost:1337/admin
2. Créez votre compte administrateur
3. Une fois connecté, vous verrez les types de contenu créés :
   - **Hero Section** (Single Type)
   - **Témoignages** (Collection Type)
   - **FAQ** (Collection Type)
   - **Contenu Global** (Single Type)

### 3. Configuration des permissions

1. Allez dans **Settings** > **Users & Permissions Plugin**
2. Cliquez sur **Public**
3. Activez les permissions suivantes :
   - **Hero**: `find`
   - **Testimonial**: `find`
   - **FAQ**: `find`
   - **Global-content**: `find`
   - **Upload**: `find` (pour les images)

### 4. Génération de l'API Token

1. Allez dans **Settings** > **API Tokens**
2. Cliquez sur **Create new API Token**
3. Nom: `Frontend Token`
4. Token type: `Read-only`
5. Copiez le token généré

### 5. Configuration du frontend

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=votre-token-ici
```

### 6. Création du contenu

#### Hero Section

1. Allez dans **Content Manager** > **Hero Section**
2. Cliquez sur **Create new entry**
3. Remplissez les champs :
   - **Title**: "La confiance au volant."
   - **Subtitle**: "Simplifiez la vente ou l'achat de votre voiture premium grâce à notre réseau de courtiers certifiés."
   - **Sell Button Text**: "Vendre"
   - **Buy Button Text**: "Acheter"
   - **CTA Text**: "Découvrir le réseau DRIVE"
   - **Background Image**: Uploadez une image (optionnel)
4. **Publish**

#### Témoignages

1. Allez dans **Content Manager** > **Testimonials**
2. Créez plusieurs témoignages avec :
   - **Name**: Nom du client
   - **Location**: Ville
   - **Quote**: Témoignage
   - **Avatar**: Photo (optionnel)
   - **Order**: Numéro d'ordre (1, 2, 3...)
3. **Publish** chaque témoignage

#### FAQ

1. Allez dans **Content Manager** > **FAQs**
2. Créez plusieurs questions avec :
   - **Title**: Question
   - **Content**: Réponse
   - **Order**: Numéro d'ordre
3. **Publish** chaque FAQ

## 🔧 Développement

### Structure des fichiers créés

```
server/src/
├── api/
│   ├── hero/
│   │   ├── content-types/hero/schema.json
│   │   ├── controllers/hero.ts
│   │   ├── routes/hero.ts
│   │   └── services/hero.ts
│   ├── testimonial/
│   ├── faq/
│   └── global-content/
└── components/
    └── shared/
        └── social-link.json

lib/
└── strapi.ts              # API client

hooks/
└── use-strapi-data.ts     # Hooks React
```

### Utilisation dans les composants

```tsx
import { useHeroData } from "@/hooks/use-strapi-data";
import { getStrapiMediaURL } from "@/lib/strapi";

const MyComponent = () => {
  const { data, loading, error } = useHeroData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.subtitle}</p>
      {data?.backgroundImage && (
        <img src={getStrapiMediaURL(data.backgroundImage)} alt="Hero" />
      )}
    </div>
  );
};
```

## 📝 Types de contenu disponibles

### Hero Section (Single Type)

- `title`: Titre principal
- `subtitle`: Sous-titre
- `backgroundImage`: Image de fond
- `sellButtonText`: Texte bouton vendre
- `buyButtonText`: Texte bouton acheter
- `ctaText`: Texte call-to-action

### Testimonials (Collection Type)

- `name`: Nom du client
- `location`: Localisation
- `quote`: Témoignage
- `avatar`: Photo de profil
- `order`: Ordre d'affichage

### FAQ (Collection Type)

- `title`: Question
- `content`: Réponse
- `order`: Ordre d'affichage

### Global Content (Single Type)

- `siteName`: Nom du site
- `siteDescription`: Description
- `logo`: Logo principal
- `logoSmall`: Logo petit format
- `contactEmail`: Email de contact
- `contactPhone`: Téléphone
- `socialMedia`: Liens réseaux sociaux

## 🔍 API Endpoints

Une fois configuré, les endpoints suivants seront disponibles :

- `GET /api/hero` - Hero section
- `GET /api/testimonials` - Liste des témoignages
- `GET /api/faqs` - Liste des FAQ
- `GET /api/global-content` - Contenu global
- `GET /uploads/*` - Fichiers médias

## 🚨 Dépannage

### Erreur CORS

Si vous avez des erreurs CORS, vérifiez que `middlewares.ts` est bien configuré avec l'URL de votre frontend.

### Token invalide

Assurez-vous que le token API est correctement configuré dans `.env.local` et que les permissions sont activées.

### Contenu non affiché

Vérifiez que le contenu est **publié** dans Strapi (pas seulement sauvegardé en brouillon).

