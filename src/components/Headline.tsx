export function Headline() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-2 flex select-none flex-col items-center justify-center overflow-visible top-[18%]"
    >
      <span className="whitespace-nowrap uppercase text-white font-anton text-[length:clamp(60px,16vw,220px)] font-black leading-none tracking-[0.04em]">
        EMMANUEL
      </span>
      <span className="whitespace-nowrap uppercase text-white font-anton text-[length:clamp(60px,16vw,220px)] font-black leading-none tracking-[0.04em]">
        MARAVILHA
      </span>
    </div>
  );
}
