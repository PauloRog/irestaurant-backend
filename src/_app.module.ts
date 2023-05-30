import { environments } from '@infra/config';
import { DatabaseModule } from '@infra/database';
import { LoggerMiddleware } from '@infra/middleware';
import { DomainModule } from '@modules/domain';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [environments], isGlobal: true }),
    DatabaseModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return { prismaOptions: await configService.get('prisma') };
      },
      inject: [ConfigService],
    }),
    DomainModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
