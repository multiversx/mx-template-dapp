import React, { useEffect, useState } from "react";
import { faBan, faGrip } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import { Loader, PageState } from "components";
import { FormatAmount } from "@multiversx/sdk-dapp/UI";
import {
	nftStakingContractAddress,
	tokenStakingContractAddress,
	stakingToken,
	collectionIdentifier,
	rewardToken,
} from "config";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account/refreshAccount";
import { MyApiNetworkProvider } from "helpers/MyApiNetworkProvider";
import {
	TokenPayment,
	MultiESDTNFTTransferPayloadBuilder,
	Address,
} from "@multiversx/sdk-core";
import {
	useGetAccount,
	useGetActiveTransactionsStatus,
	useGetNetworkConfig,
} from "hooks";
import {
	ServerTransactionType,
	NonFungibleToken,
	TokenStakingPosition,
	defaultTokenStakingPosition,
} from "types";
import CountUp from "react-countup";
import { NftVisualizer } from "components/NftVisualizer";
import { SectionSelector } from "components/SectionSelector";
import { string2hex } from "helpers";
import BigNumber from "bignumber.js";

enum Section {
	staked = "Staked",
	wallet = "Wallet",
}

type errorsType = {
	staked: string | undefined;
	rewards: string | undefined;
	apr: string | undefined;
	generic: string | undefined;
};

export const TokenStake = () => {
	const {
		network: { apiAddress },
	} = useGetNetworkConfig();
	const apiNetworkProvider = new MyApiNetworkProvider(apiAddress);

	const { address } = useGetAccount();
	const { success, fail } = useGetActiveTransactionsStatus();

	const [section, setSection] = useState<Section>(Section.staked);

	const [stakingPosition, setStakingPosition] =
		useState<TokenStakingPosition>(defaultTokenStakingPosition);
	const [rewards, setRewards] = useState<BigNumber | undefined>();
	const [apr, setApr] = useState<BigNumber>(new BigNumber(0));

	const [transactions, setTransactions] = useState<ServerTransactionType[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(false); //TODO
	const [error, setError] = useState<errorsType>({
		staked: undefined,
		rewards: undefined,
		apr: undefined,
		generic: undefined,
	});

	const fetchStakedTokens = async () => {
		apiNetworkProvider
			.getAccountStakedTokens(address, tokenStakingContractAddress)
			.then((_stakedPosition) => {
				setStakingPosition(_stakedPosition);
				setError((prev) => ({
					...prev,
					staked: undefined,
				}));
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, staked: message }));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const fetchRewards = async () => {
		apiNetworkProvider
			.getAccountRewards(address, tokenStakingContractAddress)
			.then((res) => {
				setRewards(res);
				setError((prev) => ({ ...prev, rewards: undefined }));
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, rewards: message }));
			});
	};

	const fetchApr = async () => {
		apiNetworkProvider
			.getContractApr(tokenStakingContractAddress)
			.then((_apr) => {
				setApr(_apr);
				setError((prev) => ({
					...prev,
					apr: undefined,
				}));
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, apr: message }));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const claimRewards = async () => {
		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: "claim_rewards",
				receiver: tokenStakingContractAddress,
				gasLimit: 20_000_000,
			},
			transactionsDisplayInfo: {
				processingMessage: "Claiming rewards...",
				errorMessage: "An error has occured during claiming",
				successMessage: "Rewards claimed successfully!",
			},
		});
	};
	/*
	const changeCheckedStaked = (index: number, checked: boolean) => {
		const _stakedNfts = [...stakedNfts];
		_stakedNfts[index]._checked = checked;
		setStakedNfts(_stakedNfts);
	};
	const changeCheckedWallet = (index: number, checked: boolean) => {
		const _walletNfts = [...walletNfts];
		_walletNfts[index]._checked = checked;
		setWalletNfts(_walletNfts);
	};

	const fetchStakedNfts = async () => {
		apiNetworkProvider
			.getAccountStakedNfts(address, nftStakingContractAddress)
			.then((_stakedPositions) => {
				if (_stakedPositions.length === 0) {
					setStakedNfts([]);
					return;
				}
				apiNetworkProvider
					.getNftsFromCollection(
						collectionIdentifier,
						_stakedPositions.map((sp) => sp.nonce.toString(16))
					)
					.then((_stakedNfts) => {
						_stakedNfts.forEach((nft) => {
							const stakedPosition = _stakedPositions.find(
								(sp) => sp.nonce === nft.nonce
							);
							if (stakedPosition) {
								nft._stakingPosition = stakedPosition;
							}
						});
						setStakedNfts(_stakedNfts);
						setError((prev) => ({
							...prev,
							staked: undefined,
						}));
					})
					.catch((err) => {
						const { message } = err as AxiosError;
						setError((prev) => ({ ...prev, staked: message }));
					});
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, staked: message }));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const fetchWalletNfts = () => {
		apiNetworkProvider
			.getAccountNftsFromCollection(address, collectionIdentifier)
			.then((res) => {
				setWalletNfts(res);
				setError((prev) => ({ ...prev, wallet: undefined }));
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, wallet: message }));
			});
	};

	const stakeNfts = async (stakeAll: boolean = false) => {
		const nftsToStake = walletNfts.filter(
			(nft) => nft._checked || stakeAll
		);

		const tokenPayments: TokenPayment[] = nftsToStake.map((nft) =>
			TokenPayment.nonFungible(nft.ticker, nft.nonce)
		);
		const payload =
			new MultiESDTNFTTransferPayloadBuilder()
				.setPayments(tokenPayments)
				.setDestination(new Address(nftStakingContractAddress))
				.build()
				.toString() +
			"@" +
			string2hex("stake_multiple");

		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: payload,
				receiver: address,
				gasLimit: 3_000_000 + 1_500_000 * nftsToStake.length,
			},
			transactionsDisplayInfo: {
				processingMessage: "Staking NFTs...",
				errorMessage: "An error has occured during staking",
				successMessage: "NFTs staked successfully!",
			},
		});
	};

	const unstakeNfts = async (unstakeAll: boolean = false) => {
		const nftsToUnstake = stakedNfts.filter(
			(nft) => nft._checked || unstakeAll
		);
		const noncesToUnstake = nftsToUnstake.map(
			(nft) => nft.identifier.split("-")[2]
		);

		const payload = "unstake_multiple@" + noncesToUnstake.join("@");

		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: payload,
				receiver: nftStakingContractAddress,
				gasLimit: 4_000_000 + 2_000_000 * nftsToUnstake.length,
			},
			transactionsDisplayInfo: {
				processingMessage: "Unstaking NFTs...",
				errorMessage: "An error has occured during unstaking",
				successMessage: "NFTs unstaked successfully!",
			},
		});
	};

    */

	useEffect(() => {
		if (success || fail) {
			fetchStakedTokens();
			fetchRewards();
		}
	}, [success, fail]);

	useEffect(() => {
		fetchStakedTokens();
		fetchRewards();
		fetchApr();
		setInterval(function () {
			fetchRewards();
		}, 6000);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (error.generic) {
		return (
			<div className="my-5">
				<PageState
					icon={faBan}
					className="text-muted"
					title="Error fetching Data"
				/>
			</div>
		);
	}

	return (
		<div className="bg-secondary p-4 mt-4">
			<div className="text-center display-3 mb-4">
				{error.rewards && !rewards && (
					<PageState title="Sorry, we can't calculate your rewards. Please try again later." />
				)}
				{rewards && (
					<CountUp
						end={rewards
							.dividedBy(10 ** stakingToken.decimals)
							.toNumber()}
						decimals={stakingToken.decimalsToDisplay}
						duration={2}
						useEasing={true}
						preserveValue={true}
						prefix="Rewards: "
						suffix={" " + stakingToken.symbol}
					/>
				)}
				<div>
					<button
						className="btn btn-lg btn-primary"
						onClick={() => claimRewards()}
						disabled={!rewards || rewards.isZero()}
					>
						Claim Rewards
					</button>
				</div>

				<div className="mt-4 text-left">
					<p>
						<span className="display-3">APR:&nbsp;</span>
						<span className="display-4">{apr.toString()} %</span>
					</p>
					<p>
						<span className="display-3">
							Your staked tokens:&nbsp;
						</span>
						<span className="display-4">
							<FormatAmount
								value={stakingPosition.staked_amount.toString(
									10
								)}
								token={stakingToken.symbol}
								digits={stakingToken.decimalsToDisplay}
								decimals={stakingToken.decimals}
							/>
						</span>
					</p>
				</div>

				<div>
					<button
						className="btn btn-lg btn-primary mr-4"
						onClick={() => claimRewards()}
						disabled={!rewards || rewards.isZero()}
					>
						Stake
					</button>
					<button
						className="btn btn-lg btn-primary"
						onClick={() => claimRewards()}
						disabled={!rewards || rewards.isZero()}
					>
						Unstake
					</button>
				</div>
			</div>
		</div>
	);
};
