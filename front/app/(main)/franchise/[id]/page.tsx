import AboutUs from "@/components/franchise/details/about-us";
import Hero from "@/components/franchise/details/hero";
import OurTeam from "@/components/franchise/details/our-team";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import NeedAssistance from "@/components/main/need-assistance";
import OurTestimonials from "@/components/main/our-testimonials";
import AgencyVehiclesWrapper from "@/components/franchise/agency-vehicles-wrapper";
import { getAgencyById } from "@/lib/agencies";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface FranchiseDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  props: FranchiseDetailsPageProps
): Promise<Metadata> {
  const params = await props.params;
  const id = Number.parseInt(params.id, 10);
  const agency = await getAgencyById(id);

  if (!agency) {
    return {
      title: "Agence DRIVE",
    };
  }

  return {
    title: `${agency.name} | DRIVE`,
    description: `${agency.name} - ${agency.displayAddress}`,
  };
}

const FranchiseDetailsPage = async ({ params }: FranchiseDetailsPageProps) => {
  const resolvedParams = await params;
  const id = Number.parseInt(resolvedParams.id, 10);

  if (!Number.isFinite(id)) {
    notFound();
  }

  const agency = await getAgencyById(id);

  if (!agency) {
    notFound();
  }

  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero agency={agency} />
      </SnapElement>
      <SnapScrollContentBox>
        <div className="flex flex-col w-full min-h-screen md:gap-20 pt-20">
          <OurTeam agency={agency} />
          <AboutUs agency={agency} />
        </div>
      </SnapScrollContentBox>
      <SnapElement>
        <NeedAssistance />
      </SnapElement>
      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapElement>
        <AgencyVehiclesWrapper agencyId={agency.id} />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default FranchiseDetailsPage;
