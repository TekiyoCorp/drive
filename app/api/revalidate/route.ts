import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * API Route pour la revalidation ISR via webhooks Strapi
 * 
 * Usage:
 * - Revalidation automatique: POST /api/revalidate?token=xxx (avec payload Strapi)
 * - Revalidation manuelle: GET /api/revalidate?token=xxx&page=/catalogue
 * 
 * Le token doit correspondre à REVALIDATE_TOKEN dans les variables d'environnement
 */

interface StrapiWebhookPayload {
  event: 'entry.create' | 'entry.update' | 'entry.delete' | 'entry.publish' | 'entry.unpublish';
  model: string;
  entry?: {
    id?: number | string;
    documentId?: string;
    [key: string]: unknown;
  };
}

/**
 * Mapping des content types Strapi vers les pages Next.js à revalider
 */
function getPagesToRevalidate(model: string, entryId?: number | string): string[] {
  const pages: string[] = [];

  switch (model) {
    case 'api::agency.agency':
      // Revalider la page de l'agence spécifique et la liste des agences
      pages.push('/franchise');
      if (entryId) {
        pages.push(`/franchise/${entryId}`);
      }
      // Les agences apparaissent aussi sur la page d'accueil
      pages.push('/');
      break;

    case 'api::vehicle.vehicle':
      // Revalider la page du véhicule spécifique et la liste du catalogue
      pages.push('/catalogue');
      if (entryId) {
        pages.push(`/catalogue/${entryId}`);
      }
      // Les véhicules apparaissent aussi sur la page d'accueil
      pages.push('/');
      break;

    case 'api::hero.hero':
      // Hero apparaît sur la page d'accueil
      pages.push('/');
      break;

    case 'api::faq.faq':
      // Les FAQs apparaissent sur plusieurs pages
      pages.push('/');
      pages.push('/catalogue');
      pages.push('/franchise');
      pages.push('/about');
      pages.push('/contact');
      pages.push('/vendre');
      pages.push('/open-agency');
      break;

    case 'api::testimonial.testimonial':
      // Les témoignages apparaissent sur plusieurs pages
      pages.push('/');
      pages.push('/franchise');
      pages.push('/about');
      break;

    case 'api::feature.feature':
      // Les features apparaissent sur la page d'accueil
      pages.push('/');
      break;

    case 'api::about-us.about-us':
      pages.push('/about');
      break;

    case 'api::key-figures.key-figures':
      pages.push('/about');
      break;

    case 'api::why-drive.why-drive':
      pages.push('/about');
      break;

    case 'api::maximize-your-profitability.maximize-your-profitability':
      pages.push('/about');
      break;

    case 'api::open-drive-agency.open-drive-agency':
      pages.push('/open-agency');
      break;

    case 'api::open-agency-hero.open-agency-hero':
      pages.push('/open-agency');
      break;

    case 'api::open-agency-features.open-agency-features':
      pages.push('/open-agency');
      break;

    case 'api::open-agency-showcase.open-agency-showcase':
      pages.push('/open-agency');
      break;

    case 'api::open-agency-media-slider.open-agency-media-slider':
      pages.push('/open-agency');
      break;

    case 'api::sell-my-car.sell-my-car':
      pages.push('/');
      pages.push('/vendre');
      break;

    case 'api::selling-fee.selling-fee':
      pages.push('/vendre');
      break;

    case 'api::secure-intermediation.secure-intermediation':
      pages.push('/vendre');
      break;

    case 'api::vehicle-condition.vehicle-condition':
      pages.push('/vendre');
      break;

    case 'api::contact.contact':
      pages.push('/contact');
      break;

    case 'api::global-content.global-content':
      // Le contenu global affecte toutes les pages
      pages.push('/');
      pages.push('/catalogue');
      pages.push('/franchise');
      pages.push('/about');
      pages.push('/contact');
      pages.push('/vendre');
      pages.push('/open-agency');
      break;

    default:
      // Pour les content types non mappés, revalider la page d'accueil par défaut
      console.warn(`Content type non mappé: ${model}, revalidation de la page d'accueil uniquement`);
      pages.push('/');
  }

  return pages;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const page = searchParams.get('page');

    // Vérifier le token
    const expectedToken = process.env.REVALIDATE_TOKEN;
    if (!expectedToken) {
      console.error('REVALIDATE_TOKEN n\'est pas configuré dans les variables d\'environnement');
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      );
    }

    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // Revalidation manuelle d'une page spécifique
    if (page) {
      revalidatePath(page);
      console.log(`✅ Page revalidée manuellement: ${page}`);
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        page,
      });
    }

    // Sans paramètre page, revalider la page d'accueil par défaut
    revalidatePath('/');
    console.log('✅ Page d\'accueil revalidée');
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      page: '/',
    });
  } catch (error) {
    console.error('Erreur lors de la revalidation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la revalidation' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    // Vérifier le token
    const expectedToken = process.env.REVALIDATE_TOKEN;
    if (!expectedToken) {
      console.error('REVALIDATE_TOKEN n\'est pas configuré dans les variables d\'environnement');
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      );
    }

    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // Vérifier si une page spécifique est demandée manuellement
    const manualPage = searchParams.get('page');
    if (manualPage) {
      revalidatePath(manualPage);
      console.log(`✅ Page revalidée manuellement: ${manualPage}`);
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        page: manualPage,
        method: 'manual',
      });
    }

    // Traiter le payload du webhook Strapi
    let payload: StrapiWebhookPayload | null = null;
    try {
      payload = await request.json();
    } catch {
      // Si pas de payload JSON, revalider la page d'accueil par défaut
      revalidatePath('/');
      console.log('✅ Page d\'accueil revalidée (pas de payload)');
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        page: '/',
        method: 'default',
      });
    }

    if (!payload || !payload.model) {
      revalidatePath('/');
      console.log('✅ Page d\'accueil revalidée (payload invalide)');
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        page: '/',
        method: 'default',
      });
    }

    // Déterminer les pages à revalider basées sur le content type
    const entryId = payload.entry?.id || payload.entry?.documentId;
    const pagesToRevalidate = getPagesToRevalidate(payload.model, entryId);

    // Revalider toutes les pages concernées ET les tags de cache
    const revalidatedPages: string[] = [];
    
    // Créer un tag basé sur le modèle pour revalider tous les fetch de ce content type
    const contentTag = `strapi-${payload.model}`;
    
    // Revalider le tag de contenu (invalide tous les fetch avec ce tag)
    try {
      revalidateTag(contentTag);
      console.log(`✅ Tag revalidé: ${contentTag}`);
    } catch (error) {
      console.error(`❌ Erreur lors de la revalidation du tag ${contentTag}:`, error);
    }
    
    // Revalider les pages spécifiques avec type explicite
    for (const page of pagesToRevalidate) {
      try {
        // Revalider la page et le layout
        revalidatePath(page, 'page');
        revalidatePath(page, 'layout');
        revalidatedPages.push(page);
        console.log(`✅ Page revalidée: ${page} (modèle: ${payload.model}, événement: ${payload.event})`);
      } catch (error) {
        console.error(`❌ Erreur lors de la revalidation de ${page}:`, error);
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      pages: revalidatedPages,
      model: payload.model,
      event: payload.event,
      entryId: entryId?.toString(),
    });
  } catch (error) {
    console.error('Erreur lors de la revalidation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la revalidation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

