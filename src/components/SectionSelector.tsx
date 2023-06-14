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
		<div
			className={className + " btn-group btn-group-toggle"}
			data-toggle="buttons"
		>
			{sections.map((s: string, i: number) => (
				<label
					className={
						"btn btn-outline-primary btn-lg " +
						(section == s ? "active" : "")
					}
					key={i}
				>
					<input
						type="radio"
						name="section"
						{...(section == s ? { checked: true } : {})}
						onClick={() => setSection(s)}
					/>
					{s}
				</label>
			))}
		</div>
	);
};
