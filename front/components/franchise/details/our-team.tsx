import Image from "next/image";
import Wrapper from "../../global/wrapper";
import Container from "../../global/container";

const OurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Thomas",
      role: "Lorem Ipsum",
      image: "/images/franchise/team-member.jpg",
    },
    {
      id: 2,
      name: "Thomas",
      role: "Lorem Ipsum",
      image: "/images/franchise/team-member.jpg",
    },
    {
      id: 3,
      name: "Thomas",
      role: "Lorem Ipsum",
      image: "/images/franchise/team-member.jpg",
    },
  ];

  return (
    <Wrapper className="flex items-center justify-center flex-col w-full">
      <Container animation="fadeUp" delay={0}>
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-medium">L&apos;équipe</h2>
        </div>
      </Container>

      <Container animation="fadeUp" delay={0.2} className="w-full">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
          {teamMembers.map((member, index) => (
            <Container
              key={member.id}
              animation="fadeUp"
              delay={index * 0.6 + 0.3}
            >
              <div className="group cursor-pointer relative">
                <div className="relative w-full max-md:aspect-square md:min-h-[360px] rounded-4xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  />
                  <div className="text-left absolute w-full h-full bg-gradient-to-t from-black to-transparent flex p-5 flex-col justify-end">
                    <h3 className="text-white text-lg font-medium">
                      {member.name}
                    </h3>
                    <p className="text-white/60 text-base font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default OurTeam;
