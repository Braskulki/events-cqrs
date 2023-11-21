import { Repository } from 'typeorm';
import { singleton } from 'tsyringe';

import { AddressModel } from '@src/domain/models/address.model';
import { IAddressRepository } from '@src/infra/database/repositories/interfaces/address-repository.interface';
import AddressEntity from '../entities/address.entity';
import { ReadDatabaseProvider, WriteDatabaseProvider } from '../connection';

@singleton()
export class AddressRepository implements IAddressRepository {
  private readonly readRepository: Repository<AddressEntity>;
  private readonly writeRepository: Repository<AddressEntity>;

  constructor() {
    this.readRepository = ReadDatabaseProvider.getRepository(AddressEntity);
    this.writeRepository = WriteDatabaseProvider.getRepository(AddressEntity);
  }

  async save(data: AddressModel): Promise<AddressModel> {
    const address = await this.writeRepository.save(data);

    return address as AddressModel;
  }

  async findOne(data: Partial<AddressModel>): Promise<AddressModel | null> {
    const address = await this.readRepository.findOne({ where: data });

    if (!address) return null;

    return address as AddressModel;
  }
}
