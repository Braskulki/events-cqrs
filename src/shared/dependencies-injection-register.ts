
import KeycloakClient from '@src/domain/authentication/keycloak/keycloak';
import { CreateUserUseCase, UpdateUserUseCase, SelfDeleteUserUseCase } from '@src/domain/handlers/command/user';
import { UserRepository, AddressRepository } from '@src/infra/database/repositories';
import { container } from 'tsyringe';

export function injectContainers(): void {
  container.registerSingleton('UserRepository', UserRepository);
  container.registerSingleton('AddressRepository', AddressRepository);


  container.registerSingleton('CreateUserUseCase', CreateUserUseCase);
  container.registerSingleton('UpdateUserUseCase', UpdateUserUseCase);
  container.registerSingleton('SelfDeleteUserUseCase', SelfDeleteUserUseCase);

  container.registerSingleton('AuthenticationService', KeycloakClient);
}
