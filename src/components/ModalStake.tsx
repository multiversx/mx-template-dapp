import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { InternalToken } from "types";
import BigNumber from "bignumber.js";
import {
	TokenPayment,
	ESDTTransferPayloadBuilder,
	Address,
} from "@multiversx/sdk-core";
import { string2hex } from "helpers";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account/refreshAccount";
import { tokenStakingContractAddress } from "config";

type ModalStakeProps = {
	token: InternalToken;
	show: boolean;
	setShow: any;
	alreadyStaked: BigNumber;
};

export function ModalStake({
	token,
	show,
	setShow,
	alreadyStaked,
}: ModalStakeProps) {
	const handleClose = () => {
		setShow(false);
		setAmount("");
	};
	const handleShow = () => setShow(true);

	const [amount, setAmount] = useState("");

	const onStake = async () => {
		//TODO check if amount > balance

		const payload =
			new ESDTTransferPayloadBuilder()
				.setPayment(
					TokenPayment.fungibleFromAmount(
						token.identifier,
						new BigNumber(amount),
						token.decimals
					)
				)
				.build()
				.toString() +
			"@" +
			string2hex("stake");

		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: payload,
				receiver: tokenStakingContractAddress,
				gasLimit: 10_000_000,
			},
			transactionsDisplayInfo: {
				processingMessage: "Staking...",
				errorMessage: "An error has occured during stake",
				successMessage: "Tokens staked successfully",
			},
		});

		handleClose();
	};

	//TODO fix close button
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Stake {token.symbol}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="input-group">
						<input
							type="number"
							className="form-control form-control-lg"
							placeholder="Amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<div className="input-group-append">
							<span className="input-group-text">
								{token.symbol}
							</span>
						</div>
					</div>
					<div className="d-flex justify-content-end">
						<p className="mt-3">Available: 0 {token.symbol}</p>
					</div>

					{alreadyStaked.isGreaterThan(0) && (
						<p>
							By staking, your pending rewards will be
							automatically claimed.
						</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-lg btn-secondary mr-2"
						onClick={() => handleClose()}
					>
						Cancel
					</button>
					<button
						className="btn btn-lg btn-primary "
						onClick={() => onStake()}
					>
						Stake
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
