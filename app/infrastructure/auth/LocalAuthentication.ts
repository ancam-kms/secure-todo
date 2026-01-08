import { LocalAuthRepository } from '@/app/domain/repositories/auth/LocalAuthRepository';
import { authenticateAsync } from 'expo-local-authentication';

export class LocalAuthentication implements LocalAuthRepository {
  async authenticate(): Promise<boolean> {
    const result = await authenticateAsync({
      promptMessage: 'Authenticate',
    });
    return result.success;
  }
}