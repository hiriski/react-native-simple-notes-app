import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN } from '@/constants';

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN, token);
    console.log('User token has been saved!');
  } catch (error) {
    console.log('Failed to save user token', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
    return accessToken;
  } catch (error) {
    console.log('Failed to get user token', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    console.log('Token has been removed');
  } catch (error) {
    console.log('Failed to remove user token', error);
  }
};
