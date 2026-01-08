import { createMMKV, MMKV } from "react-native-mmkv";

export const storage: MMKV = createMMKV({
  id: `user-storage`,
  encryptionKey: process.env.MMKV_ENCRYPTION_KEY,
});
