import * as SecureStore from "expo-secure-store";

export class Storage {
  /**
   * Asynchronously saves a key-value pair to SecureStore.
   * @param key The key to store the value under.
   * @param value The value to be stored.
   */
  static async save(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Successfully saved key: ${key}`);
    } catch (e) {
      console.error(`Error saving data for key: ${key}`, e);
    }
  }

  /**
   * Asynchronously retrieves a value for a given key from SecureStore.
   * @param key The key of the value to retrieve.
   * @returns The stored value as a string, or null if the key doesn't exist.
   */
  static async getValueFor(key: string): Promise<string | null> {
    try {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(`Successfully retrieved value for key: ${key}`);
        return result;
      }
      console.log(`No value found for key: ${key}`);
      return null;
    } catch (e) {
      console.error(`Error retrieving data for key: ${key}`, e);
      return null;
    }
  }

  static async deleteValue(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log("Value deleted.");
    } catch (e) {
      console.error("Error deleting value from SecureStore:", e);
    }
  }
}
