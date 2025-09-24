import { FRANCHISE } from "@/constants/franchise";
import Wrapper from "../global/wrapper";
import FranchiseCard from "./franchise-card";

const FeaturedAgencies = () => {
  return (
    <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-28 flex flex-col gap-4 md:gap-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {FRANCHISE.map((card, idx) => (
          <FranchiseCard
            key={idx}
            data={card}
            animation="fadeUp"
            delay={0.3 + idx * 0.5}
            priority={idx === 0}
            className="snap-start max-w-full md:rounded-4xl"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default FeaturedAgencies;
