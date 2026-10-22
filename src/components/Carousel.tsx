import { IMAGES } from "../data/images";
import { getRole } from "../lib/figureRole";
import { Figure } from "./Figure";

type CarouselProps = {
  activeIndex: number;
};

export function Carousel({ activeIndex }: CarouselProps) {
  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Figurines d'Emmanuel Maravilha"
      className="absolute inset-0 z-3"
    >
      {IMAGES.map((item, index) => (
        <Figure
          key={item.src}
          src={item.src}
          index={index}
          role={getRole(index, activeIndex, IMAGES.length)}
        />
      ))}
    </div>
  );
}
