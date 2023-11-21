import { FindOptionsWhere } from 'typeorm';
import { ListUsersParams, UserModel } from '../../../../domain/models/user.model';


export interface IUserRepository {
  save(data: UserModel): Promise<UserModel>;
  findOne(data: FindOptionsWhere<UserModel>): Promise<UserModel | null>;
  find(data: ListUsersParams): Promise<UserModel[]>;
}
