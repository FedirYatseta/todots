// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { tasks?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    await db.command({
        collMod: process.env.TODO_COLLECTION_NAME,
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "day", "category"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string"
                    },
                    day: {
                        bsonType: "number",
                        description: "'price' is required and is a number"
                    },
                    category: {
                        bsonType: "string",
                        description: "'category' is required and is a string"
                    }
                }
            }
        },
        // validationLevel: "moderate"
    });

    const tasksCollection: mongoDB.Collection = db.collection(process.env.TODO_COLLECTION_NAME!);

    collections.tasks = tasksCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tasksCollection.collectionName}`);
}







