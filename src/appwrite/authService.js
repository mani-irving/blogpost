import config from "../config/config";
import { Client, Account, ID } from "appwrite";

/**
 * AuthService handles user authentication using Appwrite's Account API:
 * - Create account
 * - Login/logout
 * - Get current user
 */
class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client = this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.projectId);

    this.account = new Account(this.client);
  }

  /**
   * Register a new user and log them in.
   * @param {Object} userData - User info
   * @param {string} userData.name - Display name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @returns {Promise<Object>} - User session
   */
  async createAccount({ name, email, password }) {
    try {
      const registeredUser = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (registeredUser) {
        return await this.login({ email, password });
      } else {
        throw new Error("Account creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in createAccount:", error);
      throw new Error(
        error?.message || "Something went wrong during account creation."
      );
    }
  }

  /**
   * Log in a user using email/password.
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns {Promise<Object>} - Session object
   */
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.error("Error in login:", error);
      throw new Error(
        error?.message || "Invalid email or password. Please try again."
      );
    }
  }

  /**
   * Fetch currently authenticated user.
   * @returns {Promise<Object|null>} - User object or null
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error in getCurrentUser:", error);
      throw new Error("Unable to fetch current user.");
    }
  }

  /**
   * Log out the current user by removing all sessions.
   * @returns {Promise} - Response from Appwrite
   */
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Error in logout:", error);
      throw new Error("Logout failed. Please try again.");
    }
  }
}

// Export a singleton instance
const authService = new AuthService();
export default authService;
