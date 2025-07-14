/**
 * Checks if a specific environment variable exists.
 * Throws a descriptive error if not found.
 *
 * @param {string} name - The name of the environment variable.
 * @returns {string} - The value of the environment variable.
 * @throws Will throw an error if the variable is missing or undefined.
 */
function envVariablesChecker(name) {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return String(value);
}

/**
 * Centralized configuration object for Appwrite.
 * Populates required IDs and endpoints from environment variables.
 */
const config = {
  appwriteURL: envVariablesChecker("VITE_APPWRITE_URL"), // Appwrite API endpoint
  projectId: envVariablesChecker("VITE_APPWRITE_PROJECT_ID"), // Appwrite project ID
  databaseId: envVariablesChecker("VITE_APPWRITE_DATABASE_ID"), // ID of the target database
  collectionId: envVariablesChecker("VITE_APPWRITE_COLLECTION_ID"), // ID of the collection for posts/documents
  bucketId: envVariablesChecker("VITE_APPWRITE_BUCKET_ID"), // Storage bucket ID for media/files
  connectionsCollectionId: envVariablesChecker(
    "VITE_APPWRITE_CONNECTIONS_COLLECTION_ID"
  ),
};

export default config;
