const fs = require("fs");
const path = require("path");

// Données d'exemple pour initialiser Strapi
const sampleData = {
  hero: {
    title: "La confiance au volant.",
    subtitle:
      "Simplifiez la vente ou l'achat de votre voiture premium grâce à notre réseau de courtiers certifiés.",
    sellButtonText: "Vendre",
    buyButtonText: "Acheter",
    ctaText: "Découvrir le réseau DRIVE",
  },
  testimonials: [
    {
      name: "Laurent P.",
      location: "Lyon",
      quote:
        "Achat d'une 911 Carrera impeccable ; transaction transparente, équipe ultra-réactive.",
      order: 1,
    },
    {
      name: "Julie M.",
      location: "Paris",
      quote:
        "Tesla Model 3 vendue en 48 h, zéro stress. DRIVE s'est occupé de tout !",
      order: 2,
    },
    {
      name: "Antoine D.",
      location: "Nice",
      quote:
        "En moins d'une semaine j'avais des offres sérieuses. Je recommande à 200 %.",
      order: 3,
    },
  ],
  faqs: [
    {
      title: "Comment se passe le processus de vente ?",
      content:
        "Le processus de vente avec DRIVE est simple et transparent. Vous commencez par soumettre les détails de votre véhicule, puis nos experts l'évaluent et vous proposent une estimation. Une fois acceptée, nous nous occupons de toute la paperasserie et du transfert.",
      order: 1,
    },
    {
      title: "Combien de temps prend la vente ?",
      content:
        "En moyenne, nos clients vendent leur véhicule en moins d'une semaine. Certaines ventes peuvent être finalisées en 48h selon le type de véhicule et la demande du marché.",
      order: 2,
    },
    {
      title: "Quels sont les frais ?",
      content:
        "Nos frais sont transparents et compétitifs. Ils varient selon la valeur du véhicule et sont clairement expliqués avant toute transaction. Aucun frais caché.",
      order: 3,
    },
  ],
};

console.log("🚀 Configuration Strapi terminée !");
console.log("");
console.log("📋 Prochaines étapes :");
console.log("1. Démarrer Strapi : cd server && npm run dev");
console.log("2. Créer un compte admin à http://localhost:1337/admin");
console.log("3. Générer un API Token dans Settings > API Tokens");
console.log(
  "4. Configurer les permissions pour Public dans Settings > Users & Permissions"
);
console.log("5. Ajouter le token dans votre fichier .env.local");
console.log("6. Créer le contenu dans l'interface d'administration Strapi");
console.log("");
console.log("📊 Données d'exemple à créer :");
console.log(JSON.stringify(sampleData, null, 2));

