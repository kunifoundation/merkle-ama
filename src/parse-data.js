import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import utils from './utils';
import { map as _map, sortBy as _sortBy } from 'lodash';

export default (data) => {
  data = _sortBy(data, 'id')
  const leaves = _map(data, token => utils.hashOneToken(token.id, token))
  const tree = new MerkleTree(leaves, keccak256, {sort: true})
  const tokenWithProof = _map(data, (item, index) => {
    item.proof = tree.getHexProof(leaves[index])
    return item
  })

  return {tokens: tokenWithProof, root: tree.getHexRoot()}
}
