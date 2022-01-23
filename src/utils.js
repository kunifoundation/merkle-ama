import { sortBy, map } from 'lodash';
import { BigNumber, utils } from 'ethers';
import axios from 'axios';

const { keccak256, defaultAbiCoder } = utils

export const normalizeOneToken = (tokenId, {attributes, image, name}) => {
  const sortedAttrs = sortBy(attributes, 'trait_type')
  return {
    id: BigNumber.from(tokenId),
    attrNames: map(sortedAttrs, ({trait_type}) => trait_type),
    attrValues: map(sortedAttrs, ({value}) => value),
    imageUrl: image,
    name
  }
}

export const hashOneToken = (tokenId, token) => {
  const {id, attrNames, attrValues, imageUrl, name} = normalizeOneToken(tokenId, token)
  return keccak256(defaultAbiCoder.encode(
    ['uint256', 'string[]', 'string[]', 'string', 'string'],
    [id, attrNames, attrValues, imageUrl, name]
  ))
}


export const fetchData = async (url, tokenId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/${tokenId}`).then(({data}) => resolve({...data, id: tokenId})).catch(err => {
      console.log(`Download Error TokenId: ${tokenId}`);
      resolve(null)
    })
  })
}


export default {
  normalizeOneToken,
  hashOneToken,
  fetchData
}