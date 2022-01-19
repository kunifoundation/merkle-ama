import path from 'path'
import fs from 'fs'
import * as _ from 'lodash';
import {fetchData} from './utils';
import parseData from './parse-data';
import verifyProof from './verify-proof';

const TOTAL_SUPPLY = 50
const argv = process.argv
const MERKLE_ROOT_PUBLIC = argv[2]


const mainApi = async () => {
  const fData = _.range(0, TOTAL_SUPPLY, 1).map(tokenId => fetchData('https://cjqvfn6rle.execute-api.us-east-2.amazonaws.com/api/saru', tokenId + 1))
  let data = await Promise.all(fData)
  data = parseData(data)
  console.log("Merkle Root", data.root);
  console.log(`Verify all proofs in the merkle data:`);
  _.forEach(data.tokens, ({proof, id, name, image, attributes }) => {
    if (!verifyProof(proof, MERKLE_ROOT_PUBLIC, id, {name, image, attributes})) {
      console.log('Failed at id: ' + id + '. Abort.');
      process.exit();
    }
  })

  console.log('All passed successfully.');
}

mainApi()