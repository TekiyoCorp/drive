import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { getAgencyTextFallbacks } from "@/lib/agencies";
import type { AgencySummary } from "@/types/agency";



const template = [
  "Chez {Nom de l'agence}, vous ne parcourez pas un simple stock: vous entrez dans un écosystème pensé pour acheter, vendre ou réserver votre prochain véhicule avec clarté, vitesse et zéro friction. Notre équipe locale connaît le terrain, les habitudes de conduite et les contraintes réelles à {Ville} et dans {Zone desservie}. Chaque voiture présentée ici a fait l'objet de vérifications rigoureuses (dossier complet, historique déclaré par le vendeur, contrôles visuels et mécaniques le cas échéant) et d'une mise en ligne transparente: photos fidèles, descriptifs précis, prix net clairement affiché, disponibilité mise à jour.",
  "Vous achetez: parcourez les annonces, comparez les caractéristiques, demandez un rappel en 30 secondes ou réservez le véhicule qui vous intéresse directement en ligne. La réservation bloque l'auto pendant un délai court afin d'organiser l'essai, la vérification sur place et les formalités. Vous vendez: déposez votre véhicule via notre formulaire dédié, obtenez une estimation encadrée par le marché, et laissez l'agence gérer l'exposition, les visites qualifiées et l'administratif. Notre rôle est simple: fluidifier la décision et sécuriser l'opération pour les deux parties.",
  "Le rendez-vous se déroule sans perte de temps: accueil à {Adresse courte}, vérification des points importants, essai sur un parcours représentatif de la conduite locale, réponses nettes sur financement, extension, reprise éventuelle et délais d'immatriculation. Nous travaillons avec des partenaires sélectionnés (assurance, financement, immatriculation) pour raccourcir le chemin entre “ça me plaît” et “je repars serein”. Si vous n'êtes pas sûr du modèle, l'équipe vous oriente vers des alternatives de même segment, de gabarit différent ou de budget voisin, disponibles en stock {Ville} ou dans les agences proches.",
  "Transparence d'abord: chaque annonce indique clairement le kilométrage, l'énergie, la boîte, la puissance, l'année, les options principales et, lorsque pertinent, les informations d'entretien connues. Les photos montrent les forces, pas seulement les angles flatteurs. Si un détail mérite d'être signalé, il est écrit; si une information manque, on la récupère avant la visite. Notre objectif est que vous arriviez au rendez-vous avec 90% des réponses déjà en tête, et que les 10% restants se règlent sur place.",
  "La réservation en ligne est conçue pour être simple: un acompte optionnel peut être proposé pour sécuriser le créneau et déclencher la préparation du véhicule et des documents. Une notification interne part immédiatement vers l'équipe {Nom de l'agence} afin d'organiser l'essai, valider la disponibilité réelle et préparer, si besoin, le chiffrage de reprise de votre véhicule actuel. Vous pouvez à tout moment demander un rappel: nous confirmons le créneau, le trajet d'accès et les pièces à apporter (pièce d'identité, permis, justificatif de domicile, éléments d'entretien, etc.).",
  "Parce qu'un achat automobile est autant rationnel qu'émotionnel, nous accordons de l'importance à l'expérience sur place: véhicule propre et prêt à l'essai, explications concrètes (consommations réelles, coût d'usage en ville {Ville}, stationnement, ZFE le cas échéant), et projection claire sur votre usage quotidien. Si la voiture convoitée n'est pas le meilleur choix pour vous, on vous le dit; si une alternative colle mieux à votre besoin ou à votre budget, vous la verrez tout de suite.",
  "{Nom de l'agence} s'adresse aux conducteurs urbains, périurbains et grands rouleurs de {Zone desservie}. Nous accompagnons les profils particuliers comme les professionnels (artisans, indépendants, TPE), avec des solutions adaptées aux contraintes de financement et d'assurance. Notre promesse tient en trois mots: lisible, rapide, fiable. Pas de jargon inutile, pas de frais cachés, pas d'attente interminable.",
  "Infos pratiques: l'agence est située au {Adresse complète}. Accès {métro/bus/rocade/parking}, créneaux d'essai sur rendez-vous du {Jours} de {Horaires}. Téléphone: {Téléphone}. Email: {Email}. Pour gagner du temps, utilisez les boutons “Réserver” ou “Être rappelé” sur l'annonce: votre demande part directement à l'équipe locale, et vous recevez une confirmation avec l'heure et la personne en charge de votre dossier.",
];

interface AboutUsProps {
  agency: AgencySummary;
}

const FranchiseAboutUs = async ({ agency }: AboutUsProps) => {
  const fallbacks = await getAgencyTextFallbacks();

  return (
    <Wrapper className="w-full max-md:py-16">
      <Container animation="fadeUp" delay={0.2} className="w-full">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          {template.map((paragraph, index) => (
            <Container key={index} animation="fadeUp" delay={index * 0.6 + 0.3}>
              <p className="text-white text-base font-medium">
                {paragraph
                  .replaceAll("{Nom de l'agence}", agency?.name || "votre agence DRIVE")
                  .replaceAll("{Ville}", agency?.city || "votre ville")
                  .replaceAll("{Zone desservie}", fallbacks.serviceArea)
                  .replaceAll("{Adresse courte}", agency?.displayAddress || "notre showroom")
                  .replaceAll("{Adresse complète}", agency?.displayAddress || "notre showroom")
                  .replaceAll("{Téléphone}", agency?.phone || fallbacks.phone)
                  .replaceAll("{Email}", agency?.email || fallbacks.email)
                  .replaceAll("{Horaires}", fallbacks.openingHours)
                  .replaceAll("{Jours}", fallbacks.openingDays)}
              </p>
            </Container>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default FranchiseAboutUs;
