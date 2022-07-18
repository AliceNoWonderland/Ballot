import { ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { getWallet } from "./utils/connectWallet";

function convertStringArrayToBytes32(strings: string[]): string[] {
  return strings.map((string) => ethers.utils.formatBytes32String(string));
}

async function main() {
  const wallet = getWallet();
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = parseFloat(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  const proposals = process.argv.slice(2);
  if (proposals.length < 2) throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const contractFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );
  const contract = await contractFactory.deploy(
    convertStringArrayToBytes32(proposals)
  );
  await contract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
