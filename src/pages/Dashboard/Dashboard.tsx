import React, { useEffect, useState } from "react";
import { faBan, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

import { AxiosError } from "axios";
import { Loader, PageState, TransactionsTable } from "components";

import { apiTimeout, contractAddress, collectionIdentifier } from "config";
import { getTransactions } from "helpers";
import {
	MyApiNetworkProvider,
	NonFungibleToken,
} from "helpers/MyApiNetworkProvider";
import {
	TokenTransfer,
	MultiESDTNFTTransferPayloadBuilder,
} from "@multiversx/sdk-core";
import {
	useGetAccount,
	useGetActiveTransactionsStatus,
	useGetNetworkConfig,
} from "hooks";
import { ServerTransactionType } from "types";
import { NftVisualizer } from "./components/NftVisualizer";

enum Section {
	staked = "Staked",
	wallet = "Wallet",
}

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

	const [transactions, setTransactions] = useState<ServerTransactionType[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>();

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

	const fetchNfts = async () => {
		try {
			setIsLoading(true);

			//Get Staked NFTs
			apiNetworkProvider
				.getAccountStakedNfts(address, contractAddress)
				.then((_stakedPositions) => {
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
						});
				})
				.catch((err) => {
					const { message } = err as AxiosError;
					//setError(message);
				})
				.finally(() => {
					setIsLoading(false);
				});

			//Get Wallet NFTs
			apiNetworkProvider
				.getAccountNftsFromCollection(address, collectionIdentifier)
				.then((res) => {
					setWalletNfts(res);
				});
		} catch (err) {
			console.log(err);
			const { message } = err as AxiosError;
			setError(message);
		}
		setIsLoading(false);
	};

	const stakeNfts = async () => {
		const nftsToStake = walletNfts.filter((nft) => nft._checked);
	};

	useEffect(() => {
		if (success || fail) {
			fetchNfts();
		}
	}, [success, fail]);

	useEffect(() => {
		fetchNfts();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className="my-5">
				<PageState
					icon={faBan}
					className="text-muted"
					title="Error fetching Staked NFTs."
				/>
			</div>
		);
	}

	return (
		<div>
			<div className="container">
				<div className="bg-white p-4">
					<div className="bg-secondary p-4">
						<div className="mb-4 d-md-flex justify-content-md-end">
							<SectionSelector
								section={section}
								sections={[...Object.values(Section)]}
								setSection={setSection}
								className="mr-5"
							/>

							{section === Section.staked && (
								<button
									className="btn btn-lg px-4 btn-outline-info"
									onClick={() => {
										//TODO
									}}
								>
									Unstake
								</button>
							)}

							{section === Section.wallet && (
								<button
									className="btn btn-lg px-4 btn-outline-info"
									onClick={() => {
										//TODO
									}}
								>
									Stake
								</button>
							)}
						</div>
						<div className="nft-container">
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
		</div>
	);
};

type SectionSelectorProps = {
	section: string;
	sections: string[];
	setSection: any; //TODO cercare di mettere Dispatch<SetStateAction<Section>>
	className?: string;
};

const SectionSelector = ({
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
