import { NonFungibleTokenOfAccountOnNetwork as mx_NonFungibleTokenOfAccountOnNetwork } from "@multiversx/sdk-network-providers";
import BigNumber from "bignumber.js";

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
	_stakingPosition: NftStakingPosition;
};

export type NftStakingPosition = {
	nonce: number;
	staked_epoch: number;
	last_claimed_timestamp: number;
};

export type TokenStakingPosition = {
	staked_amount: BigNumber;
	staked_epoch: number;
	last_claimed_timestamp: number;
};

export const defaultTokenStakingPosition: TokenStakingPosition = {
	staked_amount: new BigNumber(0),
	staked_epoch: 0,
	last_claimed_timestamp: 0,
};

export type InternalToken = {
	name: string;
	symbol: string;
	identifier: string;
	decimals: number;
	decimalsToDisplay: number;
};
