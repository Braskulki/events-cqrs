import { ReadDatabaseProvider, WriteDatabaseProvider } from '@src/infra/database/connection';
import { Get, JsonController } from 'routing-controllers';

@JsonController('/health')
export class HealthController {

  @Get()
  async health() {
    const readDbStatus = await ReadDatabaseProvider.query('SELECT 1 "ON"');
    const writeDbStatus = await WriteDatabaseProvider.query('SELECT 1 "ON"');

    return { applicationRunning: true, readDbConnected: !!readDbStatus?.[0]?.ON, writeDbConnected: !!writeDbStatus?.[0]?.ON };
  }

}
