import Wrapper from "../global/wrapper";
import { getAgencies } from "@/lib/agencies";
import FranchiseCard from "./franchise-card";

const FeaturedAgencies = async () => {
  const agencies = await getAgencies();

  if (!agencies.length) {
    return (
      <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-28 flex flex-col gap-4 md:gap-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={`agency-skeleton-${idx}`}
              className="snap-start max-w-full md:rounded-4xl"
            >
              <div className="w-full max-w-[350px] h-[386px] md:h-[480px] rounded-[28px] overflow-hidden bg-[#1C1C1C]" />
            </div>
          ))}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-28 flex flex-col gap-4 md:gap-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {agencies.map((agency, idx) => (
          <FranchiseCard
            key={agency.id}
            data={{
              id: agency.id,
              name: agency.name,
              address: agency.displayAddress,
              phone: agency.phone,
              img: agency.imageUrl,
            }}
            animation="fadeUp"
            delay={0.3 + idx * 0.4}
            priority={idx === 0}
            className="snap-start max-w-full md:rounded-4xl"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default FeaturedAgencies;
