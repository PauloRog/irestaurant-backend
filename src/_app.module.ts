import { environments } from '@infra/config';
import { DatabaseModule } from '@infra/database';
import { JwtAuthGuard } from '@infra/guards';
import { LoggerMiddleware } from '@infra/middleware';
import { DomainModule } from '@modules/domain';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    JwtModule.register({
      secret: 'secret1',
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
    DomainModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
