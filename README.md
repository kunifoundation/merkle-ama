# Merkle Saru
The NFT Sales is not only an investment opportunity. It is also a part of the game where users can help activate 10000 Kuni Saru NFTs to reconstruct the world of Aeprian. 

### Merkle tree construction
Merkle tree in this repo is constructed in the same way with [merkle tree js library](https://github.com/miguelmota/merkletreejs) with the following hash function:
```js
const leaves = _map(data, token => utils.hashOneToken(token.id, token))

const tree = new MerkleTree(leaves, keccak256, {sort: true});
```
Where `hashOneToken` is a function to hash 1 NFT data as the following pseudo-code:
```
id = tokenId of the Saru NFT.
attrNames = All of the Saru NFT's attribute names sorted alphabetically.
attrValues = All of the attribute values, in the corresponding order to attributeNames.
imageUrl = Url image of the main photo.
name = Name of the NFT.

return hash = keccak256(abiEncode(
  id, attrNames, attrValues, imageUrl, name
))
```

### How to run the tool
#### Node.js (Install)
Requirements:
- Node.js
- npm (Node.js package manager)

#### Usage
In order to get metadata, calculate, verification merkle root and proofs for all NFT data.
1. Get all of the necessary NFT's data from Amakuni using your NFT's `tokenUri(id)` function. The team will publish the software to automatically and easily calculate the proof from the NFT Data. So people can verify the proof every time they want. If the proof is changed, they can report it to the team and the community.
1. Get `MERKLE_ROOT_PUBLIC` from `Sale` contract.
1. set your current directory to the root directory of the repo.
1. `npm install` to install all of the dependencies.
1. `npm run build` to install all of the dependencies.
1. `node build/app.js [MERKLE_ROOT_PUBLIC]` function to Get Metadata, calculate the merkle tree and merkle proof verification. If it returns `True`, the data is fine, otherwise it is not.

#### Merkle root public: `0x310f2bf336de59955489dbb7f4233261fe1e7347a7d562b35ebc64b08752d05a`



