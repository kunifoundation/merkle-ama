import { sortBy, map } from 'lodash';
import { BigNumber, utils } from 'ethers';

const { keccak256, defaultAbiCoder } = utils


export const normalizeOneToken = ({attributes, id, image, name}) => {
  const sortedAttrs = sortBy(attributes, 'trait_type')
  return {
    id: BigNumber.from(id),
    attrNames: map(sortedAttrs, ({trait_type}) => trait_type),
    attrValues: map(sortedAttrs, ({value}) => value),
    imgMD5: image,
    name,
  }
}

export const hashOneToken = token => {
  const {id, attrNames, attrValues, imgMD5, name} = normalizeOneToken(token)
  return keccak256(defaultAbiCoder.encode(
    ['uint256', 'string[]', 'string[]', 'string', 'string'],
    [id, attrNames, attrValues, imgMD5, name]
  ))
}


export default {
  normalizeOneToken,
  hashOneToken
}