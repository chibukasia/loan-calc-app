import * as SecureStore from 'expo-secure-store';

export async function setStorageItemAsync(key: string, value: string | null) {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
}

export const getSecuredItemAsync = async (key: string) => {
    try {
      const data = await SecureStore.getItemAsync(key)
      if (data) {
        return data
      }
    } catch (error: any) {
      console.log('Error: ', error)
    }
  }