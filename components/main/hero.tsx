import { ArrowRight } from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
// import Container from "../global/container";
import Wrapper from "../global/wrapper";
import Container from "../global/container";

const Hero = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Image
        src="/images/main/hero.webp"
        alt="Hero Image"
        width={1920}
        height={1080}
        className="w-full h-full rounded-3xl object-cover -z-10 "
        priority
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvCivSm0q1NNyLbVS7YO0z9l1dXZE4zVngjgG0h8p1dHqg1yUjglNiOhlr1/aaTbpKfIgUL8dYxSYGdwpCKcCYq6KWgmPfXejNNkGnXC7PxiPz3Q8kC6YPNccZCnexE4rSq5Sm58vn6VVjFaQ5iq+XvvPcK8b9Y6Y8c2k+7YxdJj9kjCdAWdAP0oQiYk+1/Q1KnTBMuV8cF9O1DFCrnUbUXN0CwQN8qKdaDqF6oT6j9L3hpJ0rMNqZPkjw1UtW8N6m99THQh8l6aw6epYsYkGf4iJkrB3o4H8nY18r2y7K/YKSzajzXKzaJqE9oy7J5UjKB4kdYdpNtl6mqdVfVgEpKvZjJINGhXGHOgKAMNYT82j0kNtPzKKZBXj6BdC5EHQF5vKXmUhKzN7MnUu9SfqJLpJ3Lqql7xhTmX//Z"
      />

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.6}>
            <h2 className="text-balance !leading-[1.25] text-center text-[32px] font-semibold tracking-tight mt-6 w-full">
              La confiance au volant.
            </h2>
          </Container>

          <Container delay={1}>
            <p className="text-base font-normal text-center text-white/80 max-w-[23rem] mx-auto mt-4 leading-relaxed">
              Simplifiez la vente ou l&apos;achat de votre voiture premium grâce
              à notre réseau de courtiers certifiés.
            </p>
          </Container>

          <Container delay={1.5}>
            <div className="mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-8 md:px-12">
                <span>Vendre</span>
              </LiquidGlassButton>
              <LiquidGlassButton className="px-8 md:px-12">
                <span>Acheter</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={2}>
            <button
              className="mt-6 flex items-center gap-1 text-base font-medium group cursor-pointer"
              aria-label="Discover the DRIVE network"
            >
              Découvrir le réseau DRIVE{" "}
              <ArrowRight className="size-5 ml-0 group-hover:ml-1 transition-all" />
            </button>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
