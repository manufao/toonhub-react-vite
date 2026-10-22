import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import persoChemiseVerte from "./assets/perso/perso-chemise-verte.webp";
import persoHoodieRose from "./assets/perso/perso-hoodie-rose-transparent-v2.webp";
import persoTshirtMenthe from "./assets/perso/perso-tshirt-menthe.webp";
import persoWowIncantation from "./assets/perso/perso-wow-incantation.webp";

type Direction = "next" | "prev";
type Role = "center" | "left" | "right" | "back";

const IMAGES = [
  { src: persoChemiseVerte, bg: "#6BBF7A" },
  { src: persoHoodieRose, bg: "#E882B4" },
  { src: persoTshirtMenthe, bg: "#6EB5FF" },
  { src: persoWowIncantation, bg: "#B23A48" },
] as const;

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MOBILE_QUERY = "(max-width: 639px)";

const HEADLINE_STYLE: CSSProperties = {
  fontFamily: "'Anton', sans-serif",
  fontSize: "clamp(60px, 16vw, 220px)",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "0.04em",
};

const NAV_BUTTON_CLASS =
  "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/12 aria-disabled:cursor-default sm:h-16 sm:w-16";

const FIGURE_TRANSITION = ["transform", "filter", "opacity", "left", "height", "bottom"]
  .map((property) => `${property} 650ms ${EASE}`)
  .join(", ");

function getRole(index: number, activeIndex: number): Role {
  if (index === activeIndex) return "center";
  if (index === (activeIndex + IMAGES.length - 1) % IMAGES.length) return "left";
  if (index === (activeIndex + 1) % IMAGES.length) return "right";
  return "back";
}

function getRoleStyle(role: Role, isMobile: boolean): CSSProperties {
  switch (role) {
    case "center":
      return {
        left: "50%",
        height: isMobile ? "60%" : "78%",
        bottom: isMobile ? "22%" : 0,
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.1})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    case "left":
    case "right":
      return {
        left: role === "left" ? (isMobile ? "20%" : "30%") : isMobile ? "80%" : "70%",
        height: isMobile ? "16%" : "28%",
        bottom: isMobile ? "32%" : "12%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
      };
    case "back":
      return {
        left: "50%",
        height: isMobile ? "13%" : "22%",
        bottom: isMobile ? "32%" : "12%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(4px)",
        opacity: 1,
        zIndex: 5,
      };
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isAnimating) return;
    const timeout = window.setTimeout(() => setIsAnimating(false), 650);
    return () => window.clearTimeout(timeout);
  }, [isAnimating, activeIndex]);

  const navigate = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((current) =>
        direction === "next"
          ? (current + 1) % IMAGES.length
          : (current + IMAGES.length - 1) % IMAGES.length,
      );
    },
    [isAnimating],
  );

  return (
    <main
      className="relative w-full overflow-hidden text-white"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color 650ms ${EASE}`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <section className="relative h-dvh min-h-[540px] w-full overflow-hidden">
        {/* Subtle paper-like grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50"
          style={{
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-2 flex select-none flex-col items-center justify-center overflow-visible"
          style={{ top: "18%" }}
        >
          <span className="whitespace-nowrap uppercase text-white" style={HEADLINE_STYLE}>
            EMMANUEL
          </span>
          <span className="whitespace-nowrap uppercase text-white" style={HEADLINE_STYLE}>
            MARAVILHA
          </span>
        </div>

        <div
          className="absolute left-4 top-6 z-60 text-xs font-semibold uppercase sm:left-8"
          style={{ letterSpacing: "0.18em", opacity: 0.9 }}
        >
          EMMANUEL MARAVILHA
        </div>

        <div
          role="region"
          aria-roledescription="carrousel"
          aria-label="Figurines d'Emmanuel Maravilha"
          className="absolute inset-0 z-3"
        >
          {IMAGES.map((item, index) => (
            <div
              key={item.src}
              className="absolute"
              style={{
                ...getRoleStyle(getRole(index, activeIndex), isMobile),
                aspectRatio: "0.6 / 1",
                transition: FIGURE_TRANSITION,
                willChange: "transform, filter, opacity",
              }}
            >
              <img
                src={item.src}
                alt={`Figurine d'Emmanuel Maravilha n°${index + 1}`}
                draggable={false}
                className="h-full w-full select-none"
                style={{ objectFit: "contain", objectPosition: "bottom center" }}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-4 z-60 max-w-[320px] sm:bottom-20 sm:left-24">
          <p
            className="mb-2 text-base font-bold uppercase sm:mb-3 sm:text-[22px]"
            style={{ letterSpacing: "0.02em", opacity: 0.95 }}
          >
            DÉVELOPPEUR, SOCIABLE, GAMER, RIGOUREUX
          </p>
          <p className="mb-4 hidden text-xs leading-[1.6] text-white/85 sm:mb-5 sm:block sm:text-sm">
            Ex-éleveur de murlocs reconverti en chef d'une armée d'agents IA.
            Développeur dans l'âme, accro à la veille tech : si une news sort
            ce matin, je l'ai déjà testée avant le café.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Figurine précédente"
              aria-disabled={isAnimating}
              onClick={() => navigate("prev")}
              className={NAV_BUTTON_CLASS}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Figurine suivante"
              aria-disabled={isAnimating}
              onClick={() => navigate("next")}
              className={NAV_BUTTON_CLASS}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#discover"
          onClick={(event) => event.preventDefault()}
          className="absolute bottom-6 right-4 z-60 flex items-center gap-2 uppercase text-white transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10 sm:gap-3"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          DISCOVER IT
          <ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
        </a>
      </section>
    </main>
  );
}
