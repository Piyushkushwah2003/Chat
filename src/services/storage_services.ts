import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string) => {
  try {
    const stored = await AsyncStorage.getItem(key);
    if (!stored) {
      return undefined;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error retrieving item ${key}:`, error);
    throw error;
  }
};

export const setItem = async (name: string, obj: any) => {
  try {
    const json = JSON.stringify(obj);
    await AsyncStorage.setItem(name, json);
    return obj;
  } catch (e) {
    console.error(`Error persisting ${name}:`, e);
  }
};

export const clearItem = async (name: string) => {
  try {
    await AsyncStorage.setItem(name, '');
  } catch (e) {
    console.error(`Error persisting ${name}:`, e);
  }
};

export let StorageKeys = {
  Token: 'Token',
  Role: 'Role',
};
