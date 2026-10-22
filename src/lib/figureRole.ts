export type Role = 'center' | 'left' | 'right' | 'back';

export function getRole(
	index: number,
	activeIndex: number,
	count: number
): Role {
	if (index === activeIndex) {
		return 'center';
	}
	if (index === (activeIndex + count - 1) % count) {
		return 'left';
	}
	if (index === (activeIndex + 1) % count) {
		return 'right';
	}
	return 'back';
}

export const ROLE_CLASSES: Record<Role, string> = {
	center:
		'left-1/2 h-[60%] bottom-[22%] sm:h-[78%] sm:bottom-0 [transform:translateX(-50%)_scale(1.25)] sm:[transform:translateX(-50%)_scale(1.1)] blur-[0px] opacity-100 z-20',
	left: 'left-[20%] sm:left-[30%] h-[16%] sm:h-[28%] bottom-[32%] sm:bottom-[12%] [transform:translateX(-50%)_scale(1)] blur-[2px] opacity-85 z-10',
	right:
		'left-[80%] sm:left-[70%] h-[16%] sm:h-[28%] bottom-[32%] sm:bottom-[12%] [transform:translateX(-50%)_scale(1)] blur-[2px] opacity-85 z-10',
	back: 'left-1/2 h-[13%] sm:h-[22%] bottom-[32%] sm:bottom-[12%] [transform:translateX(-50%)_scale(1)] blur-[4px] opacity-100 z-5'
};
