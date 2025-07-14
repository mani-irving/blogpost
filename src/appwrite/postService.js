// Import environment-specific config and Appwrite SDK components
import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

/**
 * PostService handles:
 * - CRUD operations on blog/post documents using Appwrite's Database service.
 * - File upload, preview, and deletion using Appwrite's Storage service.
 */
class PostService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client = this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.projectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  /**
   * Create a new post document in the Appwrite database.
   * @param {Object} post - Post data object
   * @returns {Promise} - Created document response
   */
  async createPost({
    title,
    slug,
    content,
    featuredImage = null,
    userId,
    userName,
    status,
  }) {
    try {
      return await this.database.createDocument(
        config.databaseId,
        config.collectionId,
        slug,
        { title, slug, content, status, featuredImage, userId, userName }
      );
    } catch (error) {
      console.error("Error in createPost:", error);
      throw new Error("Failed to create post. Please try again.");
    }
  }

  /**
   * Update an existing post by slug (document ID).
   * @param {string} slug - Unique document ID of the post
   * @param {Object} data - Updated post fields
   * @returns {Promise} - Updated document response
   */
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        config.databaseId,
        config.collectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.error(`Error in updatePost for slug "${slug}":`, error);
      throw new Error("Failed to update the post. Please try again.");
    }
  }

  /**
   * Delete a post by its slug (document ID).
   * @param {string} slug - Document ID to delete
   * @returns {Promise} - Deletion response
   */
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
    } catch (error) {
      console.error(`Error in deletePost for slug "${slug}":`, error);
      throw new Error("Failed to delete the post. Please try again.");
    }
  }

  /**
   * Get a single post by its slug (document ID).
   * @param {string} slug - Document ID to retrieve
   * @returns {Promise} - Document response
   */
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.databaseId,
        config.collectionId,
        slug
      );
    } catch (error) {
      console.error(`Error in getPost for slug "${slug}":`, error);
      throw new Error("Unable to fetch post. Please check the post ID.");
    }
  }

  /**
   * Get all posts based on a query.
   * Defaults to fetching posts with status === "active".
   * @param {Array} query - Appwrite query array
   * @returns {Promise} - List of documents
   */
  async getAllPosts(
    query = [Query.equal("status", "public"), Query.orderDesc("$updatedAt")]
  ) {
    try {
      return await this.database.listDocuments(
        config.databaseId,
        config.collectionId,
        query
      );
    } catch (error) {
      console.error("Error in getAllPosts:", error);
      throw new Error("Failed to fetch posts. Please try again later.");
    }
  }

  /**
   * Upload a file to the Appwrite storage bucket (featured image).
   * @param {File} file - File object from input
   * @returns {Promise} - Created file response
   */
  async uploadFeaturedImage(file) {
    try {
      return await this.storage.createFile(config.bucketId, ID.unique(), file);
    } catch (error) {
      console.error("Error in uploadFeaturedImage:", error);
      throw new Error("Image upload failed. Please try again.");
    }
  }

  /**
   * Get a preview URL for a file in storage.
   * @param {string} fileId - Unique ID of the file
   * @returns {URL} - File preview URL
   */
  filePreview(fileId) {
    return this.storage.getFileView(config.bucketId, fileId).toString();
  }

  /**
   * Delete a file from storage by its ID.
   * @param {string} fileId - File ID to delete
   * @returns {Promise} - Deletion response
   */
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.bucketId, fileId);
    } catch (error) {
      console.error(`Error in deleteFile for fileId "${fileId}":`, error);
      throw new Error("Failed to delete file. Please try again.");
    }
  }

  async createConnections({ follower, following }) {
    try {
      return await this.database.createDocument(
        config.databaseId,
        config.connectionsCollectionId,
        ID.unique(),
        { follower, following }
      );
    } catch (error) {
      console.error("Error in connectionsCollectionId:", error);
      throw new Error("Failed to create connections. Please try again.");
    }
  }

  async getAllConnections(query) {
    try {
      return await this.database.listDocuments(
        config.databaseId,
        config.connectionsCollectionId,
        query
      );
    } catch (error) {
      console.error("Error in getAllConnections:", error);
      throw new Error(
        "Failed to fetch all connections. Please try again later."
      );
    }
  }

  async deleteConnection(id) {
    try {
      return await this.database.deleteDocument(
        config.databaseId,
        config.connectionsCollectionId,
        id
      );
    } catch (error) {
      console.error(`Error in deleteConnection for id "${id}":`, error);
      throw new Error("Failed to delete the connection. Please try again.");
    }
  }
}

// Export a singleton instance of PostService
const postService = new PostService();
export default postService;
