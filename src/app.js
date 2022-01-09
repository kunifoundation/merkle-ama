import path from 'path'
import fs from 'fs'
import * as _ from 'lodash';
const argv = process.argv


import parseData from './parse-data';
import verifyProof from './verify-proof';
const filename = argv[2]
const randomizedIndex = 12

// const argv = process.argv

const main = () => {
  let rs = fs.readFileSync(path.join(__dirname, '../', filename), {encoding: 'utf-8'})
  rs = JSON.parse(rs)
  let data = {tokens: []}
  rs.tokens.forEach((item, inx) => {
    console.log(((inx + randomizedIndex + 1) % _.size(rs.tokens)) + 1);
    data.tokens.push(rs.tokens[((inx + randomizedIndex + 1) % _.size(rs.tokens)) + 1])
  })
  console.log(data.tokens);
  // data = parseData(data)
  // console.log(data);
  // const json = JSON.stringify(data, null, 2)
  // fs.writeFileSync(path.join(__dirname, '../', 'merkle_data.json'), json)

  console.log(`Verify all proofs in the merkle data:`);
  let merkleData = JSON.parse(fs.readFileSync(path.join(__dirname, '../', `merkle_data.json`)), { encoding: 'utf8' });
  const merkleRoot = merkleData.root;

  merkleData.tokens.forEach((token, index) => {
    const proof = token.proof;
    const tokenData = data.tokens[index];
    const boxId = index + 1
    if (!verifyProof(merkleRoot, boxId, randomizedIndex, tokenData, proof, _.size(data.tokens))) {
      console.log('Failed at id: ' + boxId + '. Abort.');
      // process.exit();
    }
  });
  console.log('All passed successfully.');
}

main()
// console.log(process.argv.slice(2).argv);