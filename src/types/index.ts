import { NonFungibleTokenOfAccountOnNetwork as mx_NonFungibleTokenOfAccountOnNetwork } from "@multiversx/sdk-network-providers";

export * from "./sdkDappTypes";

export type NonFungibleToken = mx_NonFungibleTokenOfAccountOnNetwork & {
	media: [
		{
			originalUrl: string;
			thumbnailUrl: string;
			url: string;
			fileType: string;
			fileSize: number;
		}
	];
	ticker: string;
	_checked: boolean;
	_stakingPosition: StakingPosition;
};

export type StakingPosition = {
	nonce: number;
	staked_epoch: number;
	last_claimed_timestamp: number;
};
