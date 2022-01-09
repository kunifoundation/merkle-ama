import keccak256 from 'keccak256';
import { BigNumber, utils } from 'ethers';
import { hashOneToken } from './utils';
import { map as _map, forEach as _forEach } from 'lodash';

export default (root, boxId, randomizedIndex, token, proof, total) => {
  // console.log('kkkk', token.id);
  let nftId = (((boxId + randomizedIndex) % total) + 1) //BigNumber.from(boxId).add(randomizedIndex).mod(total).add(BigNumber.from(1))
  nftId = BigNumber.from(nftId)
  const tId = BigNumber.from(token.id)
  if (!nftId.eq(tId)) {
    console.log("Inconsistent ID with: id=" + boxId + ", randomizedIndex=" + randomizedIndex + ", storageID=" + token.id, total);
    return false
  }
  let computeHash = utils.hexlify(hashOneToken(token))
  _forEach(proof, proItem => {
    const hexProof = utils.hexlify(proItem)
    if (computeHash <= hexProof) {
      computeHash = utils.hexlify(keccak256(computeHash + hexProof.substring(2)))
    } else {
      computeHash = utils.hexlify(keccak256(proItem + computeHash.substring(2)))
    }
  })

  if (utils.hexlify(computeHash) != root) {
    console.log("inconstent root: root computed from proofs is " + utils.hexlify(computeHash) + ", expected root is " + root);
  }
  return utils.hexlify(computeHash) == root;
}