import React, { useEffect, useState } from "react";
import { NftStake } from "components/NftStake";
import { TokenStake } from "components/TokenStake";
import { SectionSelector } from "components/SectionSelector";

enum Section {
	nftStake = "Stake NFT",
	tokenStake = "Stake Token",
}

export const Dashboard = () => {
	const [section, setSection] = useState<Section>(Section.nftStake);

	return (
		<div className="container mt-3">
			<SectionSelector
				section={section}
				sections={[...Object.values(Section)]}
				setSection={setSection}
				className="mr-5 w-100"
			/>

			{section === Section.nftStake && <NftStake />}
			{section === Section.tokenStake && <TokenStake />}
		</div>
	);
};
