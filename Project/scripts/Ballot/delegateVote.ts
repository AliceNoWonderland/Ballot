import { Contract, ethers } from "ethers";
// eslint-disable-next-line node/no-missing-import
import { getWallet } from "./utils/connectWallet";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
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
  if (process.argv.length < 4) throw new Error("Delegate address missing");
  const delegateAddress = process.argv[3];
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
  if (voterAddress === delegateAddress)
    throw new Error("Cannot delegate to yourself");

  if (voter.voted)
    throw new Error(`This address ${voterAddress} has already voted`);

  const delegatedVoter = await ballotContract.voters(delegateAddress);
  if (!delegatedVoter.weight.eq(1))
    throw new Error(
      `Delegated address ${delegateAddress} has no right to vote`
    );

  await ballotContract.delegate(delegateAddress);

  console.log(
    `Vote has successfully delegated from ${voterAddress} to ${delegateAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
