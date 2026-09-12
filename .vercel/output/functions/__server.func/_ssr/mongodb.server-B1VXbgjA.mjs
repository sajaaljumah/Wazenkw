import { t as require_lib } from "../_libs/mongodb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mongodb.server-B1VXbgjA.js
var import_lib = require_lib();
/**
* MongoDB Server Service for Wazen.
*
* Runs strictly on the server backend. Never imported into client bundles.
* All requests to MongoDB Atlas are made server-to-server.
* Connection string exists only in server environment variables (MONGODB_URI).
* Never exposes the connection string, credentials, or internal exceptions.
*/
var COLLECTIONS = {
	profiles: "profiles",
	transactions: "transactions",
	recurring_items: "recurring_items",
	budgets: "budgets",
	savings_goals: "savings_goals",
	emergency_funds: "emergency_funds",
	family_relationships: "family_relationships",
	learning_progress: "learning_progress",
	quizzes: "quizzes",
	challenges: "challenges",
	badges: "badges",
	assets: "assets",
	subscriptions: "subscriptions",
	stripe_events: "stripe_events"
};
var cachedClient = null;
var clientPromise = null;
var cachedDb = null;
/**
* Sanitizes any error message to ensure no connection string, username,
* or password could ever be leaked into client or logs.
*/
function sanitizeErrorMessage(error) {
	if (!error) return "Unknown database error.";
	return (error instanceof Error ? error.message : String(error)).replace(/mongodb(\+srv)?:\/\/[^\s@]+@/gi, "mongodb://***:***@").replace(/(password|pwd|user|auth)=[^&\s]+/gi, "$1=***");
}
/**
* Returns the active MongoClient, reusing the cached pool instance.
*/
async function getMongoClient() {
	const uri = process.env.MONGODB_URI;
	if (!uri || uri.trim() === "") throw new Error("MONGODB_URI is not configured in the server environment.");
	if (cachedClient) return cachedClient;
	if (!clientPromise) clientPromise = new import_lib.MongoClient(uri.trim(), {
		maxPoolSize: 10,
		minPoolSize: 1,
		serverSelectionTimeoutMS: 5e3,
		connectTimeoutMS: 1e4,
		appName: "Wazen-Finance-App"
	}).connect().then((connectedClient) => {
		cachedClient = connectedClient;
		return connectedClient;
	}).catch((err) => {
		clientPromise = null;
		cachedClient = null;
		throw new Error(`Failed to connect to MongoDB: ${sanitizeErrorMessage(err)}`);
	});
	return clientPromise;
}
/**
* Returns the default Wazen MongoDB database instance.
*/
async function getMongoDb(dbName = "Wazen") {
	if (cachedDb && cachedDb.databaseName === dbName) return cachedDb;
	cachedDb = (await getMongoClient()).db(dbName);
	return cachedDb;
}
var getDatabase = getMongoDb;
/**
* Returns a typed MongoDB collection.
*/
async function getCollection(name, dbName = "Wazen") {
	return (await getMongoDb(dbName)).collection(name);
}
//#endregion
export { COLLECTIONS, getCollection, getDatabase, getMongoDb };
