import {
	Address,
	SmartContract,
	SmartContractAbi,
	AbiRegistry,
	ResultsParser,
	VariadicValue,
	Struct,
} from "@multiversx/sdk-core";
import {
	ApiNetworkProvider,
	NonFungibleTokenOfAccountOnNetwork as mx_NonFungibleTokenOfAccountOnNetwork,
} from "@multiversx/sdk-network-providers";
import stakingAbi from "staking.abi.json";

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
	_stakingPosition: {
		nonce: number;
		staked_epoch: number;
		last_claimed_timestamp: number;
	};
};

export class MyApiNetworkProvider extends ApiNetworkProvider {
	async getAccountFromHerotag(herotag: string): Promise<string> {
		herotag = herotag.replace(".elrond", "");
		const response = await this.doGetGeneric(`usernames/${herotag}`);
		return response.address;
	}

	async getAccountTransfersCount(address: string): Promise<number> {
		const response = await this.doGetGeneric(
			`accounts/${address}/transfers/count`
		);
		return response;
	}

	async getAccountAllTokens(address: string): Promise<[any]> {
		const response = await this.doGetGeneric(
			`accounts/${address}/tokens?size=10000&includeMetaESDT=true`
		);
		return response;
	}

	async getAccountAllNfts(address: string): Promise<[any]> {
		const response = await this.doGetGeneric(
			`accounts/${address}/nfts?size=10000&excludeMetaESDT=true`
		);
		return response;
	}

	async getNftsFromCollection(
		collection: string,
		nonces: string[]
	): Promise<[any]> {
		const response = await this.doGetGeneric(
			`collections/${collection}/nfts?size=10000&identifiers=${nonces.join(
				","
			)}`
		);
		return response;
	}

	async getAccountNftsFromCollection(
		address: string,
		collection: string
	): Promise<[NonFungibleToken]> {
		const response = await this.doGetGeneric(
			`accounts/${address}/nfts?size=10000&collections=${collection}`
		);
		return response;
	}

	async getAccountStakedNfts(
		address: string,
		contractAddress: string
	): Promise<any[]> {
		const smartContract = new SmartContract({
			address: new Address(contractAddress),
			abi: new SmartContractAbi(AbiRegistry.create(stakingAbi)),
		});

		const interaction = smartContract.methods.getUserStaking([address]);
		const query = interaction.check().buildQuery();
		const queryResponse = await this.queryContract(query);
		const firstValue = new ResultsParser().parseQueryResponse(
			queryResponse,
			interaction.getEndpoint()
		).firstValue;
		if (firstValue) {
			return (firstValue as VariadicValue).getItems().map((stakedPos) => {
				return {
					nonce: (stakedPos as Struct)
						.getFieldValue("nonce")
						.toNumber(),
					staked_epoch: (stakedPos as Struct)
						.getFieldValue("staked_epoch")
						.toNumber(),
					last_claimed_timestamp: (stakedPos as Struct)
						.getFieldValue("last_claimed_timestamp")
						.toNumber(),
				};
			});

			return [...(firstValue as VariadicValue).getItems()];
		}
		return [];
	}
}

/**
 * Computes a shard for an address.
 *
 * @param {Address} address Address to use for calculation
 * @return {number} Shard the address belongs to
 * @memberof ElrondService
 */
export function computeShard(address: Address): number {
	const numShards = 3;
	const maskHigh = parseInt("11", 2);
	const maskLow = parseInt("01", 2);
	const pubKey = address.pubkey();
	const lastByteOfPubKey = pubKey[31];
	if (isAddressOfMetachain(pubKey)) {
		return 4294967295;
	}
	let shard = lastByteOfPubKey & maskHigh;

	if (shard > numShards - 1) {
		shard = lastByteOfPubKey & maskLow;
	}

	return shard;
}

/**
 * Checks if an address belongs to the metachain. (Should only be system scs).
 *
 * @private
 * @param {Buffer} pubKey Public key of the address
 * @return {boolean} Whether the address belongs to the metachain
 * @memberof ElrondService
 */
function isAddressOfMetachain(pubKey: Buffer): boolean {
	// prettier-ignore
	const metachainPrefix = Buffer.from([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
	const pubKeyPrefix = pubKey.slice(0, metachainPrefix.length);

	if (pubKeyPrefix.equals(metachainPrefix)) {
		return true;
	}

	const zeroAddress = Buffer.alloc(32).fill(0);

	if (pubKey.equals(zeroAddress)) {
		return true;
	}

	return false;
}
