import { NonFungibleToken } from "helpers/MyApiNetworkProvider";

type NftVisualizerProps = {
	nft: NonFungibleToken; //TODO cambiare tipo
	changeCallback: (checked: boolean) => void;
};

export const NftVisualizer = ({ nft, changeCallback }: NftVisualizerProps) => {
	return (
		<div className="card card-nft">
			<div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
				<div className="hover-img border-radius-lg">
					<img
						src={nft.media[0].url}
						className="img-fluid border-radius-lg"
						alt={nft.name}
					/>
				</div>
			</div>
			<div className="card-body py-3 d-flex justify-content-between">
				<h6 className="m-0 font-weight-bold">{nft.name}</h6>
				<h6 className="m-0 text-end">{nft.identifier.split("-")[2]}</h6>
			</div>
			<input
				type="checkbox"
				className="form-control form-check-input m-2"
				id={"check-" + nft.identifier}
				checked={nft._checked}
				onChange={(e) => changeCallback(e.target.checked)}
			/>
		</div>
	);
};
