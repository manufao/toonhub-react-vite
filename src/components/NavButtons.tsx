import { ArrowLeft, ArrowRight } from 'lucide-react';

const NAV_BUTTON_CLASS =
	'flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/12 aria-disabled:cursor-default sm:h-16 sm:w-16';

type NavButtonsProps = {
	disabled: boolean;
	onPrev: () => void;
	onNext: () => void;
};

export function NavButtons({ disabled, onPrev, onNext }: NavButtonsProps) {
	return (
		<div className="flex items-center gap-3 sm:gap-4">
			<button
				type="button"
				aria-label="Figurine précédente"
				aria-disabled={disabled}
				onClick={onPrev}
				className={NAV_BUTTON_CLASS}
			>
				<ArrowLeft size={26} strokeWidth={2.25} />
			</button>
			<button
				type="button"
				aria-label="Figurine suivante"
				aria-disabled={disabled}
				onClick={onNext}
				className={NAV_BUTTON_CLASS}
			>
				<ArrowRight size={26} strokeWidth={2.25} />
			</button>
		</div>
	);
}
