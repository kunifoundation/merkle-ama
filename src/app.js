import path from 'path'
import fs from 'fs'
import * as _ from 'lodash';
import { fetchData } from './utils';
import parseData from './parse-data';
import verifyProof from './verify-proof';

const TOTAL_SUPPLY = 10000
const STEP = 500
const WAIT_TIME = 1500 // milisecond
const argv = process.argv
const MERKLE_ROOT_PUBLIC = argv[2]

function wait(waitTime) {
  return new Promise(resolve => setTimeout(() => {
    resolve()
  }, waitTime));
}

const fetchPart = async (from, to) => {
  const fData = _.range(from, to, 1).map(tokenId => fetchData('https://cjqvfn6rle.execute-api.us-east-2.amazonaws.com/api/kuni-saru', tokenId + 1))
  const data = await Promise.all(fData)
  return data
}

const failed = (data) => {
  const index = _.findIndex(data, item => item === null)
  if (index >=0) {
    console.log('Failed: ' + rs + '. Abort.');
    process.exit();
  }
  
}

const mainApi = async () => {
  const now = new Date();
  let dataRS = []
  console.log('Download part', 1);
  let data = await fetchPart(0, 500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 2);
  data = await fetchPart(500, 1000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 3);
  data = await fetchPart(1000, 1500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 4);
  data = await fetchPart(1500, 2000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 5);
  data = await fetchPart(2000, 2500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 6);
  data = await fetchPart(2500, 3000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 7);
  data = await fetchPart(3000, 3500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 8);
  data = await fetchPart(3500, 4000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 9);
  data = await fetchPart(4000, 4500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 10);
  data = await fetchPart(4500, 5000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 11);
  data = await fetchPart(5000, 5500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 12);
  data = await fetchPart(5500, 6000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 13);
  data = await fetchPart(6000, 6500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 14);
  data = await fetchPart(6500, 7000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 15);
  data = await fetchPart(7000, 7500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 16);
  data = await fetchPart(7500, 8000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 17);
  data = await fetchPart(8000, 8500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 18);
  data = await fetchPart(8500, 9000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 19);
  data = await fetchPart(9000, 9500)
  failed(data)
  dataRS = _.concat(dataRS, data)
  await wait(WAIT_TIME)
  console.log('Download part', 20);
  data = await fetchPart(9500, 10000)
  failed(data)
  dataRS = _.concat(dataRS, data)
  console.log('Download Done', dataRS.length, 'Saru hero.');
  data = parseData(data)
  console.log("Merkle Root", data.root);
  console.log(`Verify all proofs in the merkle data:`);
  const merkle_root = MERKLE_ROOT_PUBLIC || data.root
  _.forEach(data.tokens, ({proof, id, name, image, attributes }) => {
    if (!verifyProof(proof, merkle_root, id, {name, image, attributes})) {
      console.log('Failed at id: ' + id + '. Abort.');
      process.exit();
    }
  })
  const diff = ((new Date()).getTime() - now.getTime()) / 1000
  console.log('All passed successfully.', `${diff}s`);
}
mainApi()