/* eslint-disable no-console */
import KeycloakClient from './domain/authentication/keycloak/keycloak';
import { ReadDatabaseProvider, WriteDatabaseProvider } from './infra/database/connection';
import { Server } from './server';
import { injectContainers } from './shared/dependencies-injection-register';
import './shared/module-alias';
import 'dotenv/config';



(async () => {
  await WriteDatabaseProvider.initialize();
  console.log('WRITE DATABASE STARTED');

  await ReadDatabaseProvider.initialize();
  console.log('READ DATABASE STARTED');

  injectContainers();

  await KeycloakClient.start();

  new Server();
  // eslint-disable-next-line no-console
})().catch((err) => console.error(err));
