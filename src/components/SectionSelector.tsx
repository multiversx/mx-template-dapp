import React from "react";

type SectionSelectorProps = {
	section: string;
	sections: string[];
	setSection: any; //TODO cercare di mettere Dispatch<SetStateAction<Section>>
	className?: string;
};

export const SectionSelector = ({
	section,
	sections,
	setSection,
	className,
}: SectionSelectorProps) => {
	return (
		<div className={className}>
			{sections.map((s: string, i: number) => (
				<button
					className={
						"btn btn-lg px-4 btn-" +
						(section == s ? "primary" : "outline-primary")
					}
					onClick={() => setSection(s)}
				>
					{s}
				</button>
			))}
		</div>
	);
};
