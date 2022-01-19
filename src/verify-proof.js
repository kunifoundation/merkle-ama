import keccak256 from 'keccak256';
import { utils } from 'ethers';
import { hashOneToken } from './utils';
import { map as _map, forEach as _forEach } from 'lodash';

export default (proof, merkleRoot, tokenId, metadata) => {
  let computeHash = utils.hexlify(hashOneToken(tokenId, metadata))
  _forEach(proof, proItem => {
    const hexProof = utils.hexlify(proItem)
    if (computeHash <= hexProof) {
      computeHash = utils.hexlify(keccak256(computeHash + hexProof.substring(2)))
    } else {
      computeHash = utils.hexlify(keccak256(proItem + computeHash.substring(2)))
    }
  })

  if (utils.hexlify(computeHash) != merkleRoot) {
    console.log("Inconstent root: root computed from proofs is " + utils.hexlify(computeHash) + ", expected root is " + merkleRoot);
  }
  return utils.hexlify(computeHash) == merkleRoot;
}