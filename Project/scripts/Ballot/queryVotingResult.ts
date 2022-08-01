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
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  // Query the winning proposal (does not include result)
  const winningProposal = await ballotContract.winnerName();
  console.log(
    `Winning proposal is ${ethers.utils.parseBytes32String(winningProposal)}`
  );


  // Query the text and result of a proposal, in addition to the winning proposal text done above
  const queryProposal = process.argv[3];

  if (queryProposal) {
    const proposal = await ballotContract.proposals(Number(queryProposal));
    const proposalName = ethers.utils.parseBytes32String(proposal.name);
    const votingResult = proposal.voteCount;

    console.log(
      `The voting result of proposal - ${proposalName} is ${votingResult}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
