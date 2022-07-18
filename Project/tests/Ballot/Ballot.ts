/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../../typechain";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(strings: string[]): string[] {
  return strings.map((string) => ethers.utils.formatBytes32String(string));
}

describe("Ballot", function () {
  let contract: Ballot;
  let accounts: SignerWithAddress[];

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("Ballot");
    contract = await contractFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await contract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await contract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async function () {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await contract.proposals(index);
        expect(proposal.voteCount).to.eq(0);
      }
    });

    it("sets the deployer address as chairperson", async function () {
      const address = await contract.chairperson();
      const deployer = accounts[0].address;
      console.log(address);
      expect(address).to.eq(deployer);
    });

    it("sets the voting weight for the chairperson as 1", async function () {
      const chairpersonVoter = await contract.voters(accounts[0].address);
      expect(chairpersonVoter.weight).to.eq(1);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", function () {
    it("gives right to vote for another address", async function () {
      // let newVoter = await contract.voters(accounts[1].address);
      // expect(newVoter.weight).to.eq(0);
      // const tx = await contract.giveRightToVote(accounts[1].address);
      // await tx.wait();
      // newVoter = await contract.voters(accounts[1].address);
      // expect(newVoter.weight).to.eq(1);
      const tx = await contract.giveRightToVote(accounts[1].address);
      await tx.wait();
      const newVoter = await contract.voters(accounts[1].address);
      expect(newVoter.weight).to.eq(1);
    });

    it("can not give right to vote for someone that has voted", async function () {
      const tx = await contract.giveRightToVote(accounts[1].address);
      await tx.wait();
      const voteTx = await contract.connect(accounts[1]).vote(2);
      await voteTx.wait();
      await expect(
        contract.giveRightToVote(accounts[1].address)
      ).to.be.revertedWith("The voter already voted.");
    });

    it("can not give right to vote for someone that already has voting rights", async function () {
      const tx = await contract.giveRightToVote(accounts[1].address);
      await tx.wait();
      await expect(
        contract.giveRightToVote(accounts[1].address)
      ).to.be.revertedWith("");
    });
  });

  describe("when the voter interact with the vote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the voter interact with the delegate function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the giveRightToVote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the vote function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when the an attacker interact with the delegate function in the contract", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function before any votes are cast", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winnerName function after one vote is cast for the first proposal", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });

  describe("when someone interact with the winningProposal function and winnerName after 5 random votes are cast for the proposals", function () {
    // TODO
    it("is not implemented", async function () {
      throw new Error("Not implemented");
    });
  });
});
