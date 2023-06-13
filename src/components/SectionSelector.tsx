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
	//TODO migliorare grafica
	return (
		<div className={className}>
			{sections.map((s: string, i: number) => (
				<button
					className={
						"btn btn-lg px-4 mx-1 btn-" +
						(section == s ? "info" : "outline-info")
					}
					onClick={() => setSection(s)}
				>
					{s}
				</button>
			))}
		</div>
	);
};
