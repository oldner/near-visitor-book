import getConfig from "./config";
import * as nearAPI from "near-api-js";

import { Buffer } from "buffer";
Buffer.from("anything", "base64");

// Initializing contract

// class Near {
export default async function initContract() {
  const nearConfig = getConfig("testnet");

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
    headers: {},
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near, "my-app");

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read-only – they don't modify the state, but usually return some value
      viewMethods: ["get", "getById"],
      // Change methods can modify the state, but you don't receive the returned value when called
      changeMethods: ["create", "update", "del"],
      // Sender is the account ID to initialize transactions.
      // getAccountId() will return empty string if user is still unauthorized
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      sender: walletConnection.getAccountId(),
    }
  );

  console.log({ contract, currentUser, nearConfig, walletConnection });

  return { contract, currentUser, nearConfig, walletConnection };
}
