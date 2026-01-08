import { LocalAuthRepository } from '@/app/domain/repositories/auth/LocalAuthRepository';

export class AuthenticateUser {
  constructor(private readonly localAuthRepo: LocalAuthRepository) {}

  execute(): Promise<boolean> {
    return this.localAuthRepo.authenticate();
  }
}

