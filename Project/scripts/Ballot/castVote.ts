import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { getWallet } from "./utils/connectWallet";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";

async function main() {
  const wallet = getWallet();
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Proposal index missing");
  const proposalIndex = process.argv[3];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  const voterAddress = wallet.address;
  const voter = await ballotContract.voters(voterAddress);
  if (!voter.weight.eq(1))
    throw new Error(`This address ${voterAddress} has no right to vote`);

  if (voter.voted)
    throw new Error(`This address ${voterAddress} has already voted`);

  const tx = await ballotContract.vote(Number(proposalIndex));
  console.log("Awaiting confirmations");
  await tx.wait();

  console.log("Vote successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
