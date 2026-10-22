import { ArrowRight } from 'lucide-react';

export function DiscoverLink() {
	return (
		<a
			href="#discover"
			onClick={(event) => event.preventDefault()}
			className="absolute bottom-6 right-4 z-60 flex items-center gap-2 uppercase text-white transition-opacity duration-200 sm:bottom-20 sm:right-10 sm:gap-3 font-anton text-[length:clamp(20px,4vw,56px)] font-normal opacity-95 tracking-[-0.02em] leading-none no-underline"
		>
			DISCOVER IT
			<ArrowRight className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={2.25} />
		</a>
	);
}
