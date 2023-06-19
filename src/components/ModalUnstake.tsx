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
import { FormatAmount } from "@multiversx/sdk-dapp/UI";
import { sendTransactions } from "@multiversx/sdk-dapp/services/transactions/sendTransactions";
import { refreshAccount } from "@multiversx/sdk-dapp/utils/account/refreshAccount";
import { tokenStakingContractAddress } from "config";

type ModalStakeProps = {
	token: InternalToken;
	show: boolean;
	setShow: any;
	alreadyStaked: BigNumber;
};

export function ModalUnstake({
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

	const onUnstake = async () => {
		const _amount = new BigNumber(amount).multipliedBy(
			10 ** token.decimals
		);

		if (_amount.gt(alreadyStaked)) {
			alert("You can't unstake more than you have staked");
			//TODO show error in a better way
			return;
		}

		await refreshAccount();

		const { sessionId } = await sendTransactions({
			transactions: {
				value: 0,
				data: "unstake@" + _amount.toString(16),
				receiver: tokenStakingContractAddress,
				gasLimit: 10_000_000,
			},
			transactionsDisplayInfo: {
				processingMessage: "Unstaking...",
				errorMessage: "An error has occured during unstake",
				successMessage: "Tokens unstaked successfully",
			},
		});

		handleClose();
	};

	//TODO fix close button
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Unstake {token.symbol}</Modal.Title>
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
						<p className="mt-3">
							Staked:&nbsp;
							<FormatAmount
								value={alreadyStaked.toString(10)}
								token={token.symbol}
								digits={token.decimalsToDisplay}
								decimals={token.decimals}
							/>
						</p>
					</div>

					<p>Your pending rewards will be automatically claimed.</p>
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
						onClick={() => onUnstake()}
					>
						Unstake
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
