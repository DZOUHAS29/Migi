import { MongoClient, Db, Collection, ServerApiVersion } from 'mongodb';

let db: Db | null = null;

const client = new MongoClient("mongodb://root:root@localhost:27017");

export const connectMongo = async (): Promise<Db> => {
    if (db) return db;

    try {
        await client.connect();

        db = client.db("migi");

        return db;
    } catch (error) {

        await client.close();

        db = null;

        throw error;
    }
}

export const getCollection = async (name: string) => {
    const database = db ?? await connectMongo()

    if (database) return database.collection(name);

    return null;
}