import { ListUsersParams, UserModel } from '@src/domain/models/user.model';

export interface IListUserUseCase {
  execute(params: ListUsersParams): Promise<UserModel[]>;
}
