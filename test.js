
import { DataAPIClient, CollectionInsertManyError } from '@datastax/astra-db-ts';
// Initialize the client
const client = new DataAPIClient('AstraCS:pGtxJJbbJAZOiLOblLNMjXbu:0b1551c5fcf8b10d013037c597bc364216e3dfd6c4544fd67067c71174889cd8');
const db = client.db('https://dd79574f-3cc5-4f84-978b-7b14572a051b-us-east-2.apps.astra.datastax.com');
const database = client.db('https://dd79574f-3cc5-4f84-978b-7b14572a051b-us-east-2.apps.astra.datastax.com');
const collection = database.collection('History_data');

(async () => {
  const colls = await db.listCollections();
  console.log('Connected to AstraDB:', colls);
})();



// Get an existing collection

// Insert documents into the collection
(async function () {
    try {
        const result = await collection.insertMany(
            [
              {
                name: 'Jane Doe',
                age: 42,
              },
              {
                nickname: "Bobby",
                color: "blue",
                foods: ["carrots", "chocolate"],
              }
            ],
            {
              chunkSize: 2,
              concurrency: 2,
              ordered: false,
            }
          );
      console.log("Inserted:", result);
    } catch (error) {
      if (error instanceof CollectionInsertManyError) {
        console.log(error.insertedIds());
      }
    }
  })();