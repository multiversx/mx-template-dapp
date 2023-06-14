import React, { useEffect, useState } from "react";
import { faBan, faGrip } from "@fortawesome/free-solid-svg-icons";

import { AxiosError } from "axios";
import { Loader, PageState, TransactionsTable } from "components";

import {
	apiTimeout,
	contractAddress,
	collectionIdentifier,
	rewardToken,
} from "config";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account/refreshAccount";
import { getTransactions } from "helpers";
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
import { ServerTransactionType, NonFungibleToken } from "types";
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
	wallet: string | undefined;
	rewards: string | undefined;
	generic: string | undefined;
};

export const Dashboard = () => {
	const {
		network: { apiAddress },
	} = useGetNetworkConfig();
	const apiNetworkProvider = new MyApiNetworkProvider(apiAddress);

	const { address } = useGetAccount();
	const { success, fail } = useGetActiveTransactionsStatus();

	const [section, setSection] = useState<Section>(Section.staked);
	const [stakedNfts, setStakedNfts] = useState<NonFungibleToken[]>([]); //TODO creare tipo
	const [walletNfts, setWalletNfts] = useState<NonFungibleToken[]>([]);

	const [rewards, setRewards] = useState<BigNumber | undefined>();

	const [transactions, setTransactions] = useState<ServerTransactionType[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<errorsType>({
		staked: undefined,
		wallet: undefined,
		rewards: undefined,
		generic: undefined,
	});

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
			.getAccountStakedNfts(address, contractAddress)
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

	const fetchRewards = async () => {
		apiNetworkProvider
			.getAccountRewards(address, contractAddress)
			.then((res) => {
				setRewards(res);
				setError((prev) => ({ ...prev, rewards: undefined }));
			})
			.catch((err) => {
				const { message } = err as AxiosError;
				setError((prev) => ({ ...prev, rewards: message }));
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
				.setDestination(new Address(contractAddress))
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
				receiver: contractAddress,
				gasLimit: 4_000_000 + 2_000_000 * nftsToUnstake.length,
			},
			transactionsDisplayInfo: {
				processingMessage: "Unstaking NFTs...",
				errorMessage: "An error has occured during unstaking",
				successMessage: "NFTs unstaked successfully!",
			},
		});
	};

	const claimRewards = async () => {
		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: "claim_rewards",
				receiver: contractAddress,
				gasLimit: "20000000",
			},
			transactionsDisplayInfo: {
				processingMessage: "Claiming rewards...",
				errorMessage: "An error has occured during claiming",
				successMessage: "Rewards claimed successfully!",
			},
		});
	};

	useEffect(() => {
		if (success || fail) {
			fetchStakedNfts();
			fetchWalletNfts();
			fetchRewards();
		}
	}, [success, fail]);

	useEffect(() => {
		fetchStakedNfts();
		fetchWalletNfts();
		fetchRewards();
		setInterval(function () {
			fetchRewards();
		}, 6000);
	}, []);

	useEffect(() => {
		if (section === Section.staked) {
			fetchStakedNfts();
		} else {
			fetchWalletNfts();
		}
	}, [section]);

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
		<div>
			<div className="container">
				<div className="bg-secondary p-4 mt-4">
					<div className="text-center display-3 mb-4">
						{error.rewards && !rewards && (
							<PageState title="Sorry, we can't calculate your rewards. Please try again later." />
						)}
						{rewards && (
							<CountUp
								end={rewards
									.dividedBy(10 ** rewardToken.decimals)
									.toNumber()}
								decimals={rewardToken.decimalsToDisplay}
								duration={6}
								useEasing={true}
								preserveValue={true}
								prefix="Rewards: "
								suffix={" " + rewardToken.symbol}
							/>
						)}
						<div>
							<button
								className="btn btn-lg btn-info ml-4"
								onClick={() => claimRewards()}
							>
								Claim Rewards
							</button>
						</div>
					</div>

					<div className="mb-4 d-md-flex justify-content-md-end">
						<SectionSelector
							section={section}
							sections={[...Object.values(Section)]}
							setSection={setSection}
							className="mr-5"
						/>

						<div className="mt-md-0 mt-2">
							{section === Section.staked && (
								<>
									<button
										className="btn btn-lg px-4 btn-outline-info"
										onClick={() => unstakeNfts()}
										disabled={
											stakedNfts.filter(
												(nft) => nft._checked
											).length === 0
										}
									>
										Unstake
									</button>
									<button
										className="btn btn-lg px-4 ml-md-1 btn-outline-info"
										onClick={() => unstakeNfts(true)}
									>
										Unstake All
									</button>
								</>
							)}

							{section === Section.wallet && (
								<>
									<button
										className="btn btn-lg px-4 btn-outline-info"
										onClick={() => stakeNfts()}
										disabled={
											walletNfts.filter(
												(nft) => nft._checked
											).length === 0
										}
									>
										Stake
									</button>
									<button
										className="btn btn-lg px-4 ml-1 btn-outline-info"
										onClick={() => stakeNfts(true)}
									>
										Stake All
									</button>
								</>
							)}
						</div>
					</div>

					<div className="nft-container">
						{section === Section.staked &&
							stakedNfts.length === 0 &&
							error.staked && (
								<PageState
									icon={faBan}
									title="Can't load your staked NFTs... Please try again later"
								/>
							)}
						{section === Section.staked &&
							stakedNfts.length === 0 &&
							!error.staked && (
								<PageState
									icon={faGrip}
									title="You don't have any staked NFT. Stake some from your wallet!"
								/>
							)}
						{section === Section.staked &&
							stakedNfts.map((nft, i) => (
								<NftVisualizer
									nft={nft}
									changeCallback={(checked) =>
										changeCheckedStaked(i, checked)
									}
								/>
							))}

						{section === Section.wallet &&
							walletNfts.length === 0 &&
							error.wallet && (
								<PageState
									icon={faBan}
									title="Can't load your wallet NFTs... Please try again later"
								/>
							)}
						{section === Section.wallet &&
							walletNfts.length === 0 &&
							!error.wallet && (
								<PageState
									icon={faGrip}
									title="You don't have any NFT in your wallet"
								/>
							)}
						{section === Section.wallet &&
							walletNfts.map((nft, i) => (
								<NftVisualizer
									nft={nft}
									changeCallback={(checked) =>
										changeCheckedWallet(i, checked)
									}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
