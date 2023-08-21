const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {userData, thoughtData} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
      // Delete the collections if they exist
      let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
      if (userCheck.length) {
        await connection.dropCollection('users');
      }
  
      let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
      if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
      }

await User.collection.insertMany(userData);
await Thought.collection.insertMany(thoughtData);

console.table(userData);
console.table(thoughtData);
console.info('Seeding complete!');
process.exit(0);
});