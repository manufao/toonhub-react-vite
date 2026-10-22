import {
	Carousel,
	DiscoverLink,
	Grain,
	Headline,
	Intro,
	NavButtons,
	TopLabel
} from './components';
import { IMAGES } from './data/images';
import { useCarousel } from './hooks/useCarousel';

export default function App() {
	const { activeIndex, isAnimating, navigate } = useCarousel(IMAGES.length);

	return (
		<main
			className={`relative w-full overflow-hidden text-white font-inter transition-[background-color] duration-[650ms] ease-smooth ${IMAGES[activeIndex].bgClass}`}
		>
			<section className="relative h-dvh min-h-[540px] w-full overflow-hidden">
				<Grain />
				<Headline />
				<TopLabel />

				<Carousel activeIndex={activeIndex} />

				<div className="absolute bottom-6 left-4 z-60 max-w-[320px] sm:bottom-20 sm:left-24">
					<Intro />
					<NavButtons
						disabled={isAnimating}
						onPrev={() => navigate('prev')}
						onNext={() => navigate('next')}
					/>
				</div>

				<DiscoverLink />
			</section>
		</main>
	);
}
