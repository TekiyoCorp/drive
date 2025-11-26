# Problème de Z-Index : Navbar visible au-dessus du Panel de Filtres

## 🐛 Problème

Quand le panel de filtres s'ouvre en full screen, la navbar reste visible au-dessus alors qu'elle devrait être cachée.

## 📋 Structure du Code

### 1. **Navbar** (`components/main/navbar.tsx`)

```tsx
// Ligne 115
<header className="relative top-24 inset-x-0 z-30 w-full h-16 hidden xl:block pointer-events-none" style={{ zIndex: 30 }}>
  <Wrapper
    className={cn(
      "flex items-center justify-between gap-2 pointer-events-auto",
      isHomePage ? "px-8 lg:px-16" : "px-8 lg:px-24"
    )}
    style={{ zIndex: 30 }}
  >
    {/* Contenu navbar avec LiquidGlass, liens, boutons */}
  </Wrapper>
</header>
```

**Z-index actuel :** `z-30` (30)

---

### 2. **Panel de Filtres** (`components/catalogue/catalogue-filter.tsx`)

```tsx
// Lignes 291-321
<AnimatePresence>
  {isPanelOpen && (
    <>
      {/* Backdrop overlay */}
      <motion.button
        className="fixed inset-0 bg-black/60 backdrop-blur-[10px] z-[10000]"
        onClick={onCancelPanel}
      />
      
      {/* Panel full screen */}
      <motion.div
        className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[#050505]/95 backdrop-blur-[20px] text-white"
        style={{
          zIndex: 10001,
          position: "fixed",
        }}
      >
        {/* Contenu du panel */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Z-index actuel :** `z-[10001]` (10001)

---

### 3. **Wrapper Component** (`components/global/wrapper.tsx`)

```tsx
const Wrapper = ({ className, children }: Props) => {
  return (
    <section
      className={cn(
        "h-full mx-auto w-full lg:max-w-screen-2xl px-2.5 md:px-4 lg:px-16",
        className
      )}
    >
      {children}
    </section>
  );
};
```

**Z-index :** Aucun (hérite du contexte parent)

---

### 4. **Layout Principal** (`app/(main)/layout.tsx`)

```tsx
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollSnap>
      <main className="w-full grow flex flex-col h-screen max-sm:overflow-x-hidden">
        <Navbar />
        <MobileNavbar />
        <div className="grow flex flex-col z-10 bg-[#181818]">{children}</div>
        <Footer />
      </main>
    </ScrollSnap>
  );
}
```

**Z-index du conteneur children :** `z-10` (10)

---

## 🔍 Analyse du Problème

### Hiérarchie des Z-Index Actuelle

```
Panel de filtres:     z-index: 10001  ✅ (le plus élevé)
Overlay backdrop:     z-index: 10000
Dialog (Spotlight):    z-index: 50
Navbar header:         z-index: 30     ❌ (devrait être en dessous)
Navbar Wrapper:        z-index: 30     ❌ (devrait être en dessous)
Contenu children:      z-index: 10
```

### Problèmes Potentiels

1. **Contexte de Stacking**
   - Le `<header>` a `position: relative` avec `z-30`
   - Le `<Wrapper>` (section) à l'intérieur peut créer un nouveau contexte de stacking
   - Le panel est rendu dans `CatalogueFilter` qui est dans `CatalogueContent` qui est dans `children` (z-10)

2. **Ordre de Rendu dans le DOM**
   - La navbar est rendue dans le layout principal
   - Le panel est rendu dans un composant enfant (dans `children` avec z-10)
   - Même si le panel a z-10001, il peut être limité par le contexte de stacking du parent

3. **Position Fixed vs Relative**
   - Navbar : `position: relative`
   - Panel : `position: fixed`
   - Les éléments `fixed` devraient normalement être au-dessus des éléments `relative`, mais le contexte de stacking peut interférer

---

## 💡 Solutions Possibles

### Solution 1 : Rendre le Panel au Niveau Racine (Portail)

Utiliser un Portal React pour rendre le panel directement dans `document.body` :

```tsx
import { createPortal } from 'react-dom';

// Dans CatalogueFilter
{isPanelOpen && createPortal(
  <motion.div style={{ zIndex: 10001 }}>
    {/* Panel content */}
  </motion.div>,
  document.body
)}
```

### Solution 2 : Réduire encore plus le Z-Index de la Navbar

```tsx
// Navbar
<header style={{ zIndex: 1 }}>  // Au lieu de 30
```

### Solution 3 : S'assurer que le Panel est dans un Contexte de Stacking Supérieur

Déplacer le rendu du panel au niveau du layout principal plutôt que dans un composant enfant.

### Solution 4 : Utiliser `!important` dans le CSS

```tsx
style={{
  zIndex: '10001 !important',
  position: 'fixed',
}}
```

---

## 🎯 Question pour GPT

**"Pourquoi un élément avec `z-index: 10001` et `position: fixed` apparaît-il en dessous d'un élément avec `z-index: 30` et `position: relative` ? Le panel est rendu dans un composant enfant qui est dans un conteneur avec `z-index: 10`. Est-ce que le contexte de stacking du parent limite le z-index du panel ?"**

