export interface LocalAuthRepository {
  authenticate(): Promise<boolean>;
}
