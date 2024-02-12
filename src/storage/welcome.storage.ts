import AsyncStorage from "@react-native-async-storage/async-storage";
import { asynckeys } from "../utils/async.keys";

export async function setUser(value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(asynckeys.acct_creation, jsonValue);
  } catch (e) {
    throw e;
  }
}

export async function getUserData(): Promise<{
  email: string;
  email_verified: boolean;
} | null> {
  try {
    const value = await AsyncStorage.getItem(asynckeys.acct_creation);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    throw e;
  }
}

export async function deleteUserData() {
  try {
    await AsyncStorage.removeItem(asynckeys.acct_creation);
  } catch (e) {
    throw e;
  }
}
