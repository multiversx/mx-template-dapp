import { AbiRegistry, SmartContract, Address } from '@multiversx/sdk-core/out';
import { contractAddress } from 'config';
import json from 'ping-pong.abi.json';

const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
