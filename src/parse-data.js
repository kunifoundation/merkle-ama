import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import utils from './utils';
import { map as _map } from 'lodash';

export default (data) => {
  const leaves = _map(data.tokens, token => utils.hashOneToken(token))
  const tree = new MerkleTree(leaves, keccak256, {sort: true})
  const tokenWithProof = _map(data.tokens, (item, index) => {
    item.proof = tree.getHexProof(leaves[index])
    return item
  })

  data.root = tree.getHexRoot()
  data.tokens = tokenWithProof

  return data
}

