import { ListUsersParams, UserModel } from '@src/domain/models/user.model';
import { IListUserUseCase } from './list-user.interface';
import { inject, singleton } from 'tsyringe';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';

@singleton()
export class ListUserUseCaseUseCase implements IListUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepository: IUserRepository
  ) {}

  async execute(params: ListUsersParams): Promise<UserModel[]> {
    return this.userRepository.find(params);
  }
}
