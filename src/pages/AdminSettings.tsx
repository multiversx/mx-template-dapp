import React, { useEffect, useState } from "react";
import { faBan, faGrip } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import { Loader, PageState } from "components";
import { contractAddress, collectionIdentifier, rewardToken } from "config";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account/refreshAccount";
import { MyApiNetworkProvider } from "helpers/MyApiNetworkProvider";
import {
	TokenPayment,
	ESDTTransferPayloadBuilder,
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

export const AdminSettings = () => {
	const {
		network: { apiAddress },
	} = useGetNetworkConfig();
	const apiNetworkProvider = new MyApiNetworkProvider(apiAddress);

	const { address } = useGetAccount();
	const { success, fail } = useGetActiveTransactionsStatus();

	const [rewardsPerDay, setRewardsPerDay] = useState(0);
	const [depositRewards, setDepositRewards] = useState(0);

	const [isLoading, setIsLoading] = useState(true);

	const changeRewardsPerDay = async () => {
		await refreshAccount();

		const bigNumberRewardsPerDay = new BigNumber(
			rewardsPerDay
		).multipliedBy(10 ** rewardToken.decimals);
		let hexRewardsPerDay = bigNumberRewardsPerDay.toString(16);
		if (hexRewardsPerDay.length % 2 != 0) {
			hexRewardsPerDay = "0" + hexRewardsPerDay;
		}

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: "set_tokens_per_day@" + hexRewardsPerDay,
				receiver: contractAddress,
				gasLimit: 10_000_000,
			},
			transactionsDisplayInfo: {
				processingMessage: "Changing config...",
				errorMessage: "An error has occured during change",
				successMessage: "Config changed successfully",
			},
		});
	};

	const depositRewardsToContract = async () => {
		await refreshAccount();

		const payload =
			new ESDTTransferPayloadBuilder()
				.setPayment(
					TokenPayment.fungibleFromAmount(
						rewardToken.identifier,
						depositRewards,
						rewardToken.decimals
					)
				)
				.build()
				.toString() +
			"@" +
			string2hex("deposit_rewards");

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: payload,
				receiver: contractAddress,
				gasLimit: 10_000_000,
			},
			transactionsDisplayInfo: {
				processingMessage: "Depositing rewards...",
				errorMessage: "An error has occured during deposit",
				successMessage: "Rewards deposited successfully",
			},
		});
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div>
			<div className="container">
				<div className="bg-secondary p-4 mt-4">
					<div>
						<h1>Change rewards per day</h1>
						<input
							type="number"
							className="form-control"
							placeholder="Rewards per day"
							value={rewardsPerDay}
							onChange={(e) => setRewardsPerDay(+e.target.value)}
						/>
						<button
							className="btn btn-primary mt-2"
							onClick={changeRewardsPerDay}
						>
							Set rewards per day
						</button>
					</div>

					<hr />

					<div>
						<h1>Deposit rewards</h1>
						<input
							type="number"
							className="form-control"
							placeholder="Amount"
							value={depositRewards}
							onChange={(e) => setDepositRewards(+e.target.value)}
						/>
						<button
							className="btn btn-primary mt-2"
							onClick={depositRewardsToContract}
						>
							Deposit rewards
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
