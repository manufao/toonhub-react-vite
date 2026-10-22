import { type Role, ROLE_CLASSES } from '../lib/figureRole';

type FigureProps = {
	src: string;
	index: number;
	role: Role;
};

export function Figure({ src, index, role }: FigureProps) {
	return (
		<div
			className={`absolute aspect-[0.6/1] transition-[transform,filter,opacity,left,height,bottom] duration-[650ms] ease-smooth will-change-[transform,filter,opacity] ${ROLE_CLASSES[role]}`}
		>
			<img
				src={src}
				alt={`Figurine d'Emmanuel Maravilha n°${index + 1}`}
				draggable={false}
				className="h-full w-full select-none object-contain object-bottom"
			/>
		</div>
	);
}
