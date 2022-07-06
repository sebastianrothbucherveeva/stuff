const prompt = require('prompt-sync')();
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const MongoClient = require('mongodb').MongoClient;
const DATA = require('./data');

async function doIt() {
  const mongoServer = await MongoMemoryServer.create({instance: {port: 57202}});
  const uri = await mongoServer.getUri('analytics');

  // insert test data
  const conn = await MongoClient.connect(uri);
  await conn.db().collection('pageviews').insertMany(DATA);

  console.log();

  prompt('Database running on ' + uri + ' (enter key to end)');

  await mongoServer.stop();
  console.log('ended');
}

doIt();
