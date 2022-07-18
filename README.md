# Lesson 4 - Tests and Scripts
### deployment.ts
To deploy the Ballot contract with a set of proposals (pizza, salad, burger) in blockchain
console logs:
<pre><code>Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.7237796831967693
Deploying Ballot contract
Proposals: 
Proposal N. 1: pizza
Proposal N. 2: salad
Proposal N. 3: burger
Completed
Contract deployed at 0x5E0949a862e4437C22755Bf9f950629A84505daa</code></pre>
### qureyProposals.ts
To query proposal by giving a number as index, output is proposal name
<pre><code>yarn ts-node ./Ballot/queryProposals.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa 1
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.7220932271888991
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Querying proposals
Proposal is salad</code></pre>
### gitveVotingRights.ts
To give voting rights by input address
<pre><code>yarn ts-node ./Ballot/giveVotingRights.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97 
Wallet balance 1.7220932271888991
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Giving right to vote to 0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Awaiting confirmations
Transaction completed. Hash: 0xafd06ce06610659c999598c4356ea31d9bcab4eaa54a6e9e54d4dc6c7786f5cf</code></pre>
### castVote.ts
To cast a vote, if address has already voted or has no right to vote, it will output errors
<pre><code>yarn ts-node ./Ballot/castVote.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa 1
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.7220202416885584
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Awaiting confirmations
Vote successfully</code></pre>
### delegateVote.ts
To delegate vote from one address to another; if the sender address has already voted, it will error out; if the sender address and the delegated address are the same, it will error out; if the delegated address has no right to vote, it will error out
<pre><code>yarn ts-node ./Ballot/delegateVote.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa  0x58921d96CB5024d4a0c8eD88B0464febE3C17f97
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.721880855687908
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Error: This address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377 has already voted
    at main (/Users/alicehe/Documents/Ballot/Project/scripts/Ballot/delegateVote.ts:39:11)</code></pre>
<pre><code>yarn ts-node ./Ballot/delegateVote.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa  0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.721880855687908
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Error: Cannot delegate to yourself
    at main (/Users/alicehe/Documents/Ballot/Project/scripts/Ballot/delegateVote.ts:36:11)</code></pre>

### queryVotingResult.ts
To get voting result by providing proposal index, output the winning proposal along with the query proposal
<pre><code>yarn ts-node ./Ballot/queryVotingResult.ts  0x5E0949a862e4437C22755Bf9f950629A84505daa  0
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1.721880855687908
Attaching ballot contract interface to address 0x5E0949a862e4437C22755Bf9f950629A84505daa
Winning proposal is salad
The voting result of proposal - pizza is 0</code></pre>
