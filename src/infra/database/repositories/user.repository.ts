import { ListUsersParams, UserModel } from '@src/domain/models/user.model';
import { IUserRepository } from '@src/infra/database/repositories/interfaces/user-repository.interface';
import UserEntity from '../entities/user.entity';
import { ReadDatabaseProvider, WriteDatabaseProvider } from '../connection';
import { Repository } from 'typeorm';
import { singleton } from 'tsyringe';

@singleton()
export class UserRepository implements IUserRepository {
  private readonly readRepository: Repository<UserEntity>;
  private readonly writeRepository: Repository<UserEntity>;

  constructor() {
    this.readRepository = ReadDatabaseProvider.getRepository(UserEntity);
    this.writeRepository = WriteDatabaseProvider.getRepository(UserEntity);
  }

  async save(data: UserModel): Promise<UserModel> {
    const user = await this.writeRepository.save(data);
    await this.readRepository.save(user);

    return user as UserModel;
  }

  async findOne(data: Partial<UserModel>): Promise<UserModel | null> {
    const user = await this.readRepository.findOne({ where: data });

    if (!user) return null;

    return user as UserModel;
  }
  async find(data: ListUsersParams): Promise<UserModel[]> {
    const user = await this.readRepository.find({ where: data });

    return user as UserModel[];
  }
}
