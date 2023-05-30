import { ModuleMetadata, Type } from '@nestjs/common';
import { PrismaClientOptions } from '@prisma/client/runtime';

export interface PrismaModuleOptions {
  isGlobal?: boolean;
  DatabaseServiceOptions?: DatabaseServiceOptions;
}

export interface DatabaseServiceOptions {
  prismaOptions?: PrismaClientOptions;
  explicitConnect?: boolean;
}

export interface PrismaOptionsFactory {
  createPrismaOptions():
    | Promise<DatabaseServiceOptions>
    | DatabaseServiceOptions;
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<PrismaOptionsFactory>;
  useClass?: Type<PrismaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DatabaseServiceOptions> | DatabaseServiceOptions;
  inject?: any[];
}
