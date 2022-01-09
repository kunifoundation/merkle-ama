# Merkle Saru
The NFT Sales is not only an investment opportunity. It is also a part of the game where users can help activate 10000 Kuni Saru NFTs to reconstruct the world of Aeprian. 

The sale will have 10000 boxes that cost the same price (0.4 BNB in private sale round, 0.5 BNB in public sale round). If you want to own Kuni Saru NFTs, you must buy the boxes. Then you open the boxes to get the Sarus.

**We need to ensure that all buyers (team, private sale buyers, public sale buyers) have the same opportunity to get the rarest Saru.** So the sale will be organized the same as a lottery sale. It means that nobody knows which Kuni Saru they will get when they buy the box, and the value of the box will be determined by a random number that is created after the sale is complete.

The Kuni Saru inner the box will be calculated from ID for the box and the random number by the formal below:
`SARU_TOKEN_ID = 1 + ((RANDOM_NUMBER + BOX_TOKEN_ID) % 10000)`

And now, how we generate the fair random number. See the formal below:

`RANDOM_NUMBER = SUM(BUYER_WALLET_ADDRESS + BLOCK_HASH)`

We will have over 6000 buyers using different wallet addresses. They also buy the boxes at different block hashes. So the total number of the buyer's wallet address and block hash can be considered a fair random number.

### What if miners control the random number?
As we know, in a public blockchain, the miners are powerful. They can control the block hash by adding or removing the transactions in the block. So they can manage the random number.
Before and during the sale, people (except the team) don't know what SARU_TOKEN_ID is the rarest Kuni Saru. So even if the miners can control the random number, they don't know what they need to do to get the rarest Kuni Saru.

### What if the team updates the ID of the rarest Kuni Saru?
Before the sale, the team will publish proof of the NFT metadata and ID. If the team updates any metadata or ID, the proof will be changed. Any people can verify it by the algorithm below:

`PROOF_HASH = Merkle_Tree(Metadata + ID)`

The team will publish the software to automatically and easily calculate the proof from the NFT Data. So people can verify the proof every time they want. If the proof is changed, they can report it to the team and the community.
