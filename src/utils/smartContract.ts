import json from 'contracts/ping-pong.abi.json';

import { contractAddress } from 'config';
import { AbiRegistry, Address, SmartContract } from 'lib';

const abi = AbiRegistry.create(json);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});
