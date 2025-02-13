import { contractAddress } from 'config';
import json from 'contracts/ping-pong.abi.json';
import { AbiRegistry, Address, SmartContract } from './sdkCore';

const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
