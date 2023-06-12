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
					<div className="bg-dark p-4">
						<SectionSelector
							section={section}
							sections={[...Object.values(Section)]}
							setSection={setSection}
						/>
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
};

const SectionSelector = ({
	section,
	sections,
	setSection,
}: SectionSelectorProps) => {
	//TODO migliorare grafica
	return (
		<div className="mb-2">
			{sections.map((s: string) => (
				<button
					className={
						"btn btn-lg btn-" +
						(section == s ? "primary" : "outline-primary")
					}
					onClick={() => setSection(s)}
				>
					Staked
				</button>
			))}
		</div>
	);
};
